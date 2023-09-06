const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function GetFollowersList(UserId = 1) {
    const FriendsList = await db.query(
        `SELECT UserName, UserId
        FROM users
        WHERE UserId = ANY
          (SELECT UserId
          FROM friends
          WHERE FriendId = ${UserId})`
    );
    return FriendsList;
}
async function removeAFollower(data) {
    await db.query(`DELETE FROM friends WHERE UserId = '${data.FollowerId}' AND FriendId = '${data.UserId}'`);
    console.log("The friend has been deleted from the friends list");
}

module.exports = {
    GetFollowersList,
    removeAFollower
}

