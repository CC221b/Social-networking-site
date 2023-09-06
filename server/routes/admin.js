const express = require("express");
const router = express.Router();
const adminService = require("../services/admin");

router.get("/blockUser/:UserName", async function (req, res, next) {
  let UserName = req.params.UserName;
  try {
    res.json(adminService.BlockUser(UserName));
  } catch (err) {
    console.error(`Error`, err.message);
    next(err);
  }
});

module.exports = router;
