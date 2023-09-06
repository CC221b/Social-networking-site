const db = require("./db");


async function InsertLikeToLikesTable(ImageId, AlbumId, FollowerId) {
    await db.query(`INSERT INTO likes (ImageId,AlbumId,IsLike,FollowerId)
    VALUES (${ImageId},${AlbumId},1,${FollowerId})`);
}

async function UpdateLike(ImageId, AlbumId, FollowerId, IsLike) {
    await db.query(`UPDATE likes SET IsLike = ${IsLike}
    WHERE ImageId = ${ImageId} and AlbumId = ${AlbumId} and FollowerId =${FollowerId}`)
}


module.exports = {
    InsertLikeToLikesTable,
    UpdateLike
};
