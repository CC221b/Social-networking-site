const express = require('express');
const router = express.Router();
const friendsListService = require('../services/friendsList');


router.get('/', async function (req, res, next) {
    try {
        res.json(await friendsListService.GetFriendList(req.body));
    }
    catch (err) {
        console.error(`The server can not get the friends list`, err.message);
        next(err);
    }
});

router.post('/addFriend', async function (req, res, next) {
    try {
        res.json(await friendsListService.addAFriend(req.body));
    }
    catch (err) {
        console.error(`The server can not get the friends list`, err.message);
        next(err);
    }
});

module.exports = router;