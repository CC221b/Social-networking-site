const ServeAlbumFriendToUser = async (FriendId, UserId, page) => {
  const responseFriendAlbum = await fetch(
    `http://localhost:1234/api/serveData/serveAlbum/friendAlbum/${FriendId}/${sessionStorage.getItem(
      "UserId"
    )}?page=${page}`
  );
  let CurrentFriendAlbum = await responseFriendAlbum.json();
  return CurrentFriendAlbum;
};

const ServeAlbumFriendToGuestAndAdmin = async (FriendId, page) => {
  const responseFriendAlbum = await fetch(
    `http://localhost:1234/api/serveData/serveAlbum/friendAlbum/${FriendId}?page=${page}`
  );
  let CurrentFriendAlbum = await responseFriendAlbum.json();
  return CurrentFriendAlbum;
};

const sendMessageToAdminAboutImage = async (Path, UserId, ImageName, ImageId) => {
    const responseMessage = await fetch(
        `http://localhost:1234/api/messages/messageAdminAboutImage`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Path: Path,
            UserId: UserId,
            ImageName: ImageName,
            ImageId: ImageId,
          }),
        }
      );
      if (responseMessage.statusText != "OK") alert("erroe in send message to the admin!!!!");
};

const InsertLikeToLikesTable = async (ImageId, AlbumId) => {
    const responseAddLike_insert = await fetch(
        `http://localhost:1234/api/likes/insertLikeToLikesTable/${ImageId}/${AlbumId}/${sessionStorage.getItem(
          "UserId"
        )}`
      );
      if(responseAddLike_insert.statusText !="OK") alert("not Ok to insert like");
};

const UpdateLike = async (ImageId, AlbumId, IsLike) => {
  const responseAddLike_update = await fetch(
    `http://localhost:1234/api/likes/updateLike/${ImageId}/${AlbumId}/${sessionStorage.getItem(
      "UserId"
    )}/${IsLike}`,{
      method: "PUT"
    }
  );
  if(responseAddLike_update.statusText !="OK") alert("not Ok to update add like");
};


module.exports = {
  ServeAlbumFriendToUser,
  ServeAlbumFriendToGuestAndAdmin,
  sendMessageToAdminAboutImage,
  InsertLikeToLikesTable,
  UpdateLike
};
