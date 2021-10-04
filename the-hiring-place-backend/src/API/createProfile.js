import express from "express";
import db from "../../database/connection.js";
import { validateResumeUpdateEntry } from './APIhelpers/middleware.js';

const router = express.Router();

// Create

router.post("/gradProfilePage", async (req, res) => {
  db.query(
    "INSERT INTO <table name> (name, pronouns, , ) VALUES (?, ?, ?, ?)",
    [req.body.name, req.body.pronouns, , ],

    function (error, results, fields) {
      if (error) throw error;
      return res.status(201).send(results);
    }
  );
});

router.post("/recrProfilePage", async (req, res) => {
  db.query(
    "INSERT INTO <table name> (, , , ) VALUES (?, ?, ?, ?)",
    [req.body.name, req.body.pronouns, , ],

    function (error, results, fields) {
      if (error) throw error;
      return res.status(201).send(results);
    }
  );
});


// Update

router.put(
  `/gradProfilePage/:grad_id`,
  validateResumeUpdateEntry,
  async (req, res) => {
    console.log(req.body);
    let query = res.locals.query;

    const sql = `UPDATE <table name> SET ${query.toString()} WHERE grad_id=${
      req.params.grad_id
    }`;

    db.query(sql, function (error, results, fields) {
      if (error) throw error;
      return res.status(200).send(results);
    });
  }
);

router.put(
  `/recrProfilePage/:recruiter_id`,
  validateResumeUpdateEntry,
  async (req, res) => {
    console.log(req.body);
    let query = res.locals.query;

    const sql = `UPDATE <table name> SET ${query.toString()} WHERE recruiter_id=${
      req.params.recruiter_id
    }`;

    db.query(sql, function (error, results, fields) {
      if (error) throw error;
      return res.status(200).send(results);
    });
  }
);

export default router;
