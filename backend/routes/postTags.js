/** Routes for post comment. */

const db = require("../db");
const express = require("express");
const router = express.Router({ mergeParams: true });


/** GET /        get tags for post
 *
 * => { categoryid, tag }
 *
 */

router.get("/", async function (req, res, next) {
  try {
    const result = await db.query(
      `SELECT tag
        FROM categories c
          JOIN categories_posts cp
            ON (c.id = cp.tag_id)
             JOIN  posts p ON (p.id = cp.post_id)
              WHERE (p.id = $1)`,
      [req.params.post_id]);
    return res.json(result.rows);
  } catch (err) {
    return next(err);
  }
});



/** POST /      add a tag
 *
 * => { id, tag }
 *
 */

router.post("/", async function (req, res, next) {
  try {
    const result = await db.query(
      `INSERT INTO categories_posts (tag_id, post_id) VALUES ($1, $2) 
        RETURNING post_id, tag_id`,
      [req.body.tag_id, req.params.post_id]);
    return res.json(result.rows[0]);
  } catch (err) {
    return next(err);
  }
});


/** PUT /[id]      update comment
 *
 * => { id, text }
 *
 */

router.put("/:id", async function (req, res, next) {
  console.log('tesxt.................',req.body.text)
  try {
    const result = await db.query(
      "UPDATE comments SET text=$1 WHERE id = $2 RETURNING id, text",
      [req.body.text, req.params.id]);
    return res.json(result.rows[0]);
  } catch (err) {
    return next(err);
  }
});


/** DELETE /[id]      delete comment
 *
 * => { message: "deleted" }
 *
 */

router.delete("/:id", async function (req, res, next) {
  try {
    await db.query("DELETE FROM comments WHERE id=$1", [req.params.id]);
    return res.json({ message: "deleted" });
  } catch (err) {
    return next(err);
  }
});


module.exports = router;
