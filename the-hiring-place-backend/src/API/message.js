import express from "express";
import { validationCheckEntries } from './APIhelpers/middleware.js';
import db from "../../database/connection.js";

const router = express.Router();

router.post('/', validationCheckEntries, async (req, res) => {
const {
  name,
  email,
  message,
} = req.body;

const sql = `INSERT INTO <table name> (name, email, message) VALUES ("${name}" , "${email}", "${message}");`;

  db.query(sql,
    function (error, results, fields) {
      if (error) throw error;
      return res.status(201).send(results);
    }
  );
});

router.get("/", async (req, res) => {
  const sql = `SELECT DATE_FORMAT(create_at, "%b %d %y %r") as create_at, contact_id, name, email, message FROM <table name>r ORDER BY contact_id DESC;`;
db.query(sql, function (error, results, fields) {
  if (error) throw error;
  return res.status(201).send(results);
});
});

router.delete(`/:userID`, async (req, res) => {
  const sql = `DELETE FROM my_profile_app.user WHERE userID=${req.params.userID};`;

db.query(sql, function (error, results, fields) {
  if (error) throw error;
  return res.status(201).send(results);
});
});

export default router;
