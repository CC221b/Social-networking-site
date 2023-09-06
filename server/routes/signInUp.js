const express = require('express');
const router = express.Router();
const signInUpService = require('../services/signInUp');


router.post('/signUp', async function(req, res, next) {
  try {
    res.json(await signInUpService.SignUp(req.body));
  } catch (err) {
    console.error(`Error`, err.message);
    next(err);
  }
});

router.post('/signIn', async function(req, res, next) {
  try {
    res.json(await signInUpService.SignIn(req.body));
  } catch (err) {
    console.error(`Error`, err.message);
    next(err);
  }
});


module.exports = router;