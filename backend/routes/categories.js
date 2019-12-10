/** Routes for post comment. */

const db = require("../db");
const express = require("express");
const router = express.Router({ mergeParams: true });

router.get("/", async (req, res, next) => {
  try {
    const result = await db.query(
      `SELECT * 
        FROM categories`);
    return res.json(result.rows.map(val => val.tag));
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
