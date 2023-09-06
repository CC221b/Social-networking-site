const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function GetMessages(UserId) {
    const Messages = await db.query(
        ` SELECT * FROM messages WHERE UserId=${UserId}`
    );
    return Messages;
}

async function AddToFriendsList(UserId, FriendId) {
    db.query(
        `INSERT INTO messages(UserId, Message, BodyMessage) Values (${FriendId}, "Attach a request to your friends list...${UserId}", ${UserId})`
    );
}

async function MessageToAdmin(Data) {
    db.query(
        `INSERT INTO adminMessages(UserId, Message, BodyMessage) Values (${Data.UserId}, "Attach a request to delete image from User...${Data.UserId}", '${JSON.stringify(Data)}')`
    );
}

async function ServeMessageToAdmin(page=1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const AdminMessages = await db.query(
        `select * FROM adminMessages ORDER BY IsDone=0 DESC LIMIT ${offset},${config.listPerPage}`
    );
    const data = helper.emptyOrRows(AdminMessages);
    return data;
}

async function DoneMessage(CodeAdminMessage) {
    db.query(`UPDATE adminMessages
    SET IsDone = 1
    WHERE CodeAdminMessage = ${CodeAdminMessage};`)
}

async function DeleteMessage(CodeMessage) {
    console.log(CodeMessage);
    db.query(`DELETE FROM messages WHERE CodeMessage=${CodeMessage};`)
}

async function FriendUploadImage(UserId, FollowerId) {
    console.log(UserId);
    console.log(FollowerId);
    db.query(
        `INSERT INTO messages(UserId, Message) Values (${FollowerId}, "${UserId} upload new image....")`
    );
}

module.exports = {
    GetMessages,
    AddToFriendsList,
    MessageToAdmin,
    ServeMessageToAdmin,
    DoneMessage,
    DeleteMessage,
    FriendUploadImage
}