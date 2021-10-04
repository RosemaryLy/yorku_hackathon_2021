import * as jwt from "jsonwebtoken";
import db from "../../../database/connection.js";

const jwtVerify = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.status(403).json({ message: "token not provided" });
  }
  try {
    const data = jwt.verify(token, process.env.ACCESS_JWT_SECRET);
    req.user = data;
    next();
  } catch (err) {
    return res.status(403).json({ message: "token expired" });
  }
};


//Profile validation
const validationCheckEntries = (req, res, next) => {
  const requiredEntryProps = [
    "name",
    "email",
    "message",
  ];
  const requestEntryProps = Object.keys(req.body);
  const propEntryNotFound = requiredEntryProps.filter(
    (property) => !requestEntryProps.includes(property)
  );
  const isValidEmail = (email) => {
    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    return pattern.test(email);
  };

  if (propEntryNotFound.length > 0 && requestEntryProps.length > 0) {
    const message = "validation error";

    return res.status(400).json({ message, invalid: `${propEntryNotFound}` });
  }

  if (!isValidEmail(req.body.email)) {
    return res.status(400).json({ message: "Invalid email" });
  }
  next();
};

//Update validation

const validateResumeUpdateEntry = (req, res, next) => {
  console.log(req.body);

  //Remove keys with empty values

  const removeFalsy = (obj) => {
    let newObj = {};
    Object.keys(obj).forEach((prop) => {
      if (obj[prop]) {
        newObj[prop] = obj[prop];
      }
    });
    return newObj;
  };

  var entry = removeFalsy(req.body);

  //Create string to input into query

  var query = [];

  Object.entries(entry).map((entry) => {
    query.push(`${entry[0]} = '${entry[1]}'`);
  });
  res.locals.query = query;

  next();
};

//Signup validation

const validationCheckUsers = async (req, res, next) => {
  const requiredUserProps = ["name", "password", "email"];
  const requestUserProps = Object.keys(req.body);
  const propUserNotFound = requiredUserProps.filter(
    (property) => !requestUserProps.includes(property)
  );

  const isValidEmail = (email) => {
    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    return pattern.test(email);
  };

  const emailExists = (email) => {
    const sql = `SELECT email FROM <table name>;`;
    db.query(sql, function (error, results, fields) {
      if (error) throw error;
      // console.log(results);
      var emailFound = results.filter((entry) => entry.email === email);
      // console.log(emailFound)
      if (emailFound.length > 0) {
        return emailFound[0];
      }
      return results;
    });
  };

  console.log(emailExists(req.body.email));

  if (propUserNotFound.length > 0 && requestUserProps.length > 0) {
    const message = "validation error";
    return res.status(400).json({ message, invalid: `${propUserNotFound}` });
  }

  if (!isValidEmail(req.body.email)) {
    return res.status(400).json({ message: "Invalid email" });
  }

  if (emailExists.length > 0) {
    return res.status(409).json({ message: "Email already registered" });
  }

  if (req.body.password.length < 8) {
    return res
      .status(400)
      .json({ message: "Password must be a minimum 8 characters" });
  }
  next();
};

export {
  jwtVerify,
  validationCheckUsers,
  validationCheckEntries,
  validateResumeUpdateEntry,
};
