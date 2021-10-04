import express from "express";
import * as jwtGenerator from "jsonwebtoken";
import bcrypt from "bcrypt";
import db from "../../database/connection.js";

import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

const validateAuthForm = (reqBody) => {
  const schemaUserForm = Joi.object({
    email: Joi.string().min(5).required(),
    password: Joi.string().min(8).required(),
  });

  return schemaUserForm.validate(reqBody);
};

const getCredentials = (req) => {
  return new Promise((resolve, reject) => {
    // Validate input
    const { error } = validateAuthForm(req.body);
    if (error) return reject(error.details[0].message);

    let { email, password } = req.body;

    const payload = {
      email,
      password,
    };

    return resolve(payload);
  });
};

const validateUser = (userCredentials, usersFullCredentials) => {
  return new Promise(async (resolve, reject) => {
    const index = usersFullCredentials.findIndex(
      (userFullCredentials) =>
        userFullCredentials.login_id === userCredentials.login_id
    );

    if (index === -1) {
      return reject({ error: "Invalid email or password.", status: 400 });
    } else {
      try {
        const validPassword = await bcrypt.compare(
          userCredentials.password,
          usersFullCredentials[index].password
        );

        if (!validPassword)
          return reject({ error: "Invalid email or password.", status: 400 });
        return resolve(usersFullCredentials[index]);
      } catch (error) {
        return reject(error);
      }
    }
  });
};

const getToken = (validUser) => {
  const payload = {
    email: validUser.email,
    isStudent: validUser.isStudent,
    isRecruiter: validUser.isRecruiter,
  };
  return jwtGenerator.sign(payload, `${process.env.ACCESS_JWT_SECRET}`);
};

router.post("/", async (req, res) => {
  const sql = `SELECT e.email, e.password, a.isStudent, a.isRecruiter 
    FROM `;

  try {
    const userCredentials = await getCredentials(req);
    const usersFullCredentials = await db.query(sql);
    const validUser = await validateUser(userCredentials, usersFullCredentials);
    const token = getToken(validUser);
    return res.status(201).json({ token: token });
  } catch (error) {
    if (error.status == 400) {
      return res.status(400).json({ message: "Invalid email or password!" });
    } else {
      return res.status(500).send(error);
    }
  } finally {
  }
});

export default router;
