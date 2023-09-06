const express = require("express");
const router = express.Router();
const searchService = require("../services/search");

router.get("/", async function (req, res, next) {
  try {
    res.json(await searchService.GetAllUsers());
  } catch (err) {
    console.error(`The server can not get the friends list`, err.message);
    next(err);
  }
});

module.exports = router;