const db = require("./db");
const helper = require("../helper");

async function SignUp(data) {
  let IsPrivate = 0;
  if (data.IsPrivate == 'yes') IsPrivate = 1
  const existsUserName = await db.query(
    `SELECT UserName FROM users WHERE UserName = "${data.UserName}"`
  );
  if (existsUserName.length === 0) {
    await db.query(`INSERT INTO users (UserName,NickName,Password,IsPrivate)
        VALUES ('${data.UserName}','${data.NickName}', ${JSON.parse(
      data.Password)},${IsPrivate} )`);
    const UserId = await db.query(
      `SELECT UserId FROM users WHERE UserName = "${data.UserName}"`
    );
    helper.createFolderToUserImage(UserId[0].UserId);
    return (UserId[0].UserId);
  }
  return "false";
}

async function SignIn(data) {
  const existsUser = await db.query(
    `SELECT *
        FROM users
        LEFT JOIN blacklist ON users.UserName=blacklist.UserName 
        WHERE blacklist.BlockedUserCode IS NULL AND users.UserName= '${data.UserName}'`
  );
  if (existsUser.length != 0) {
    if (existsUser[0].Password === JSON.parse(data.Password)) {
      return (existsUser[0].UserId);
    }
  }
  const blockedUser = await db.query(
    `SELECT *
        FROM blacklist WHERE UserName = '${data.UserName}'`
  );
  if (blockedUser.length != 0) {
    return "Your username has been blocked!";
  }
  return "false";
}

module.exports = {
  SignIn,
  SignUp,
};
