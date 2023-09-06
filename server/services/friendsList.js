const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function GetFriendList(UserId = 1) {
    const FriendsList = await db.query(
        `SELECT UserName, UserId
        FROM users
        WHERE UserId = ANY
          (SELECT FriendId
          FROM friends
          WHERE UserId = ${UserId})`
    );
    return FriendsList;
}
async function addAFriend(data) {
    await db.query(`INSERT INTO friends (UserId,FriendId)
        VALUES ('${data.UserId}','${data.FriendId}')`);
    console.log("Enter a new fried to userFriendList")
}

async function removeAFriend(data) {
    db.query(`DELETE FROM friends WHERE UserId = "${data.UserId}" AND FriendId = "${data.FriendId}"`);
    console.log("The friend has been deleted from the friends list");
}

async function existInTheFriendsList(UserId, FriendId) {
    const IsExistsFriend = await db.query(`SELECT EXISTS (SELECT * FROM friends WHERE UserId=${UserId} AND FriendId=${FriendId}) AS BOOL`);
    return IsExistsFriend[0].BOOL;
}

module.exports = {
    GetFriendList,
    addAFriend,
    removeAFriend,
    existInTheFriendsList
}

