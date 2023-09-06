const express = require("express");
const router = express.Router();
const messagesService = require("../services/messages");

router.get("/serveMessages/:UserId", async function (req, res, next) {
  let UserId = req.params.UserId;
  try {
    res.json(await messagesService.GetMessages(UserId));
  } catch (err) {
    console.error(`ERROR`, err.message);
    next(err);
  }
});

router.get("/addToFriendsList/:UserId/:FriendId",async function (req, res, next) {
    let UserId = req.params.UserId;
    let FriendId = req.params.FriendId;
    try {
      res.json(await messagesService.AddToFriendsList(UserId, FriendId));
    } catch (err) {
      console.error(`ERROR`, err.message);
      next(err);
    }
  }
);


router.post("/messageAdminAboutImage",async function (req, res, next) {
  try {
    res.json(await messagesService.MessageToAdmin(req.body));
  } catch (err) {
    console.error(`ERROR`, err.message);
    next(err);
  }
}
);

router.get("/serveMessagesToAdmin",async function (req, res, next) {
  try {
    res.json(await messagesService.ServeMessageToAdmin(req.query.page));
  } catch (err) {
    console.error(`ERROR`, err.message);
    next(err);
  }
}
);

router.put("/doneMessage/:CodeAdminMessage",async function (req, res, next) {
  let CodeAdminMessage = req.params.CodeAdminMessage;
  try {
    res.json(await messagesService.DoneMessage(CodeAdminMessage));
  } catch (err) {
    console.error(`ERROR`, err.message);
    next(err);
  }
}
);

router.get("/DeleteMessage/:CodeMessage",async function (req, res, next) {
  let CodeMessage = req.params.CodeMessage;
  try {
    res.json(await messagesService.DeleteMessage(CodeMessage));
  } catch (err) {
    console.error(`ERROR`, err.message);
    next(err);
  }
}
);

router.get("/FriendUploadImage/:UserId/:FollowerId",async function (req, res, next) {
  let UserId = req.params.UserId;
  let FollowerId = req.params.FollowerId;
  try {
    res.json(await messagesService.FriendUploadImage(UserId, FollowerId));
  } catch (err) {
    console.error(`ERROR`, err.message);
    next(err);
  }
}
);

module.exports = router;
