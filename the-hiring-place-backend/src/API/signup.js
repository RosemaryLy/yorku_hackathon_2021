import express from "express";
import bcrypt from "bcrypt";
import db from "../../database/connection.js";
import { validationCheckUsers } from './APIhelpers/middleware.js';

const router = express.Router();

router.post("/signup", validationCheckUsers, async (req, res) => {
  const { name, email, isStudent, isRecruiter } = req.body;

  const password = await bcrypt.hash(req.body.password, 10);

  const sql = `INSERT INTO <table name> (email, password, isStudent, isRecruiter) VALUES ("${name}", "${email}", "${password}", "${isStudent}", "${isRecruiter}");`;

  db.query(sql, function (error, results, fields) {
    if (error) throw error;
    return res.status(201).send(results);
  });
});

export default router;
