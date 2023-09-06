const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 1234;
const signInUpRouter = require("./routes/signInUp");
const uploadImageRouter = require("./routes/uploadImage");
const profilePictureRouter = require("./routes/profilePicture");
const serveDataRouter = require("./routes/serveData");
const adminRouter = require("./routes/admin");
const friendsListRouter = require("./routes/friendsList");
const messagesRouter = require("./routes/messages");
const searchRouter = require("./routes/search");
const followersListRouter = require("./routes/followersList");
/* */
const likesRouter = require("./routes/likes");
/* */

app.use(express.json());
app.use(cors());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/api/followersList", followersListRouter);

app.use("/api/friendsList", friendsListRouter);

app.use("/api/signInUp", signInUpRouter);

app.use("/api/uploadImage", uploadImageRouter);

app.use("/api/ProfilePicture", profilePictureRouter);

app.use("/api/serveData", serveDataRouter);

app.use("/api/admin", adminRouter);

app.use("/api/messages", messagesRouter);

app.use("/api/search", searchRouter);

/** */
 app.use("/api/likes", likesRouter);
/** */


app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

app.use(express.static('ProfilePicture'));

app.use(express.static('images'));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});




