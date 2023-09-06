const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function GetAlbumWithUserId(UserId, page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  let Album = await db.query(
    `SELECT SUM(likes.IsLike) as SumLikes, images.ImageId,images.Path,images.ImageName,images.AlbumId
    FROM images
    left join likes on images.ImageId =likes. ImageId
    WHERE images.AlbumId =${UserId}
    GROUP BY ImageId ORDER BY ImageId DESC LIMIT ${offset},${config.listPerPage};`
  );
  const data = helper.emptyOrRows(Album);
  return data;
}

async function GetAlbumWithUserName(UserName, page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  let Album = await db.query(
    `SELECT * FROM IMAGES WHERE AlbumId= ANY(SELECT UserId FROM users WHERE UserName='${UserName}') ORDER BY ImageId DESC LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(Album);
  return data;
}

async function serveAllUsers() {
  let AllUsers = await db.query(
    `SELECT * FROM Users`
  );
  return AllUsers;
}

async function GetUsers(UserId) {
  const EnabledUsers = await db.query(
    `SELECT users.UserId, users.UserName, users.NickName
    FROM users
    LEFT JOIN blacklist ON users.UserName = blacklist.UserName left JOIN friends on friends.UserId = users.UserId
    WHERE blacklist.UserName is null and users.UserId != ${UserId} AND (users.IsPrivate = 0 OR friends.FriendId =${UserId} )`
  );
  const AllUsers = await db.query(
    `SELECT users.UserId, users.UserName, users.NickName
     FROM users
     LEFT JOIN blacklist ON users.UserName = blacklist.UserName
     WHERE blacklist.UserName is null and users.UserId != ${UserId}`
  );
  return { EnabledUsers: EnabledUsers, AllUsers: AllUsers };
}

async function GetAllImage(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT users.UserName, images.AlbumId, images.ImageName, images.Path
    FROM images
    LEFT JOIN users ON users.UserId = images.AlbumId
    ORDER BY ImageId DESC LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  return data;
}

async function GetFriendAlbumToUser(UserId, FollowerId, page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  let Album = await db.query(
    `   SELECT SUM(likes.IsLike) as SumLikes,images.ImageId,images.Path,images.ImageName,images.AlbumId
    FROM IMAGES
    left join likes on likes.ImageId = images.ImageId
    WHERE images.AlbumId=${UserId} GROUP BY ImageId ORDER BY ImageId DESC LIMIT ${offset},${config.listPerPage}`
  );
  const dataAlbum = await helper.emptyOrRows(Album);
  if (dataAlbum.length > 0) {
    let lastImageInAlbumPage = await dataAlbum[dataAlbum.length-1].ImageId;
    let LikesImages = await db.query(`SELECT ImageId,IsLike,AlbumId,FollowerId
    FROM likes 
    WHERE likes.AlbumId=${UserId} and likes.FollowerId = ${FollowerId} and likes.ImageId > ${lastImageInAlbumPage}
    ORDER BY ImageId DESC`);
    for (let i = 0; i < dataAlbum.length; i++) {
      for (let j = 0; j < LikesImages.length; j++) {
        if(dataAlbum[i].ImageId == LikesImages[j].ImageId)
        {
          dataAlbum[i].IsLike = LikesImages[j].IsLike;
          break;
        }
    }
  }
  }
  console.log(dataAlbum);
  return dataAlbum;
}

async function GetPublicUsers() {
  let PublicUsers = await db.query(
    `SELECT * FROM users WHERE IsPrivate= 0`
  );
  return PublicUsers;
}

async function GetFriendAlbumToGuestAndAdmin(UserId, page=1) {
  const offset = helper.getOffset(page, config.listPerPage);
  let FriendAlbum = await db.query(
    `SELECT * FROM images WHERE AlbumId= ${UserId} order by ImageId desc limit ${offset},${config.listPerPage}`
  );
  const dataAlbum = await helper.emptyOrRows(FriendAlbum);
  return dataAlbum;
}

module.exports = {
  GetAlbumWithUserId,
  GetAlbumWithUserName,
  GetUsers,
  GetAllImage,
  GetFriendAlbumToUser,
  GetPublicUsers,
  serveAllUsers,
  GetFriendAlbumToGuestAndAdmin
};
