const ServeAlbumWithUserId = async (page, UserId) => {
  const responseAlbum = await fetch(
    `http://localhost:1234/api/serveData/serveAlbum/UserId/${UserId}?page=${page}`
  );
  let Album = await responseAlbum.json();
  return Album;
};


const ServeAlbumWithUserName = async (page, UserName) => {
  const responseAlbum = await fetch(
    `http://localhost:1234/api/serveData/serveAlbum/UserName?page=${page}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({UserName:UserName}),
    }
  );
  let Album = await responseAlbum.json();
  return Album;
};

const ServeAllImageAlbum = async (page = 1) => {
  const responseAlbum = await fetch(
    `http://localhost:1234/api/serveData/ServeAllImageAlbum?page=${page}`
  );
  const nextImagesInAlbum = await responseAlbum.json();
  return nextImagesInAlbum;
};

const DeleteImage = async (ImageName, UserId, Admin) => {
  let ImageData = {
    ImageName: ImageName,
    UserId: UserId,
    Admin: Admin,
  };
  const resDeleteImage = await fetch(
    "http://localhost:1234/api/uploadImage/DeleteImage",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ImageData),
    }
  );
  if (resDeleteImage.statusText == "OK") ServeAllImageAlbum();
};

const DeleteProfilePicture = async (ImageName) => {
  const resDeleteImage = await fetch(
    `http://localhost:1234/api/ProfilePicture/DeleteProfilePicture/${ImageName}`);
  return resDeleteImage.statusText;
};

const ServeUsers = async () => {
  const responseUsers = await fetch(`http://localhost:1234/api/search`);
  let Users = await responseUsers.json();
  return Users;
};

const addFriendToMyFriendsList = async (AddFriend) => {
  const responseAddFriend = await fetch(
    "http://localhost:1234/api/friendsList/addFriend",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(AddFriend),
    }
  );
  if (responseAddFriend.statusText == "OK") alert("ok");
};

const ProfilePicture = async (Image) => {
  let formData = new FormData();
  formData.append(
    "file",
    Image.data,
    `${sessionStorage.getItem("UserId")}.JPG`
  );
  const responseCreateProfilePicture = await fetch(
    "http://localhost:1234/api/ProfilePicture",
    {
      method: "POST",
      body: formData,
    }
  );
  if (!responseCreateProfilePicture) {
    alert("error in Profile Picture");
  }
};

module.exports = {
  ServeAlbumWithUserId,
  ServeAlbumWithUserName,
  ServeAllImageAlbum,
  DeleteImage,
  ServeUsers,
  addFriendToMyFriendsList,
  ProfilePicture,
  DeleteProfilePicture
};
