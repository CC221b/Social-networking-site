const db = require("./db");

async function BlockUser(UserName) {
  console.log(UserName);
  db.query(`Insert into blacklist (UserName) Select UserName FROM users where UserName='${UserName}'`)
}

module.exports = {
  BlockUser,
};
