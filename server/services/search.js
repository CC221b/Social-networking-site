const db = require('./db');
const helper = require("../helper");
const config = require("../config");

async function GetAllUsers() {
    const UsersData = await db.query(
        `SELECT * FROM users`
    );
    return UsersData
}

module.exports = {
    GetAllUsers
}