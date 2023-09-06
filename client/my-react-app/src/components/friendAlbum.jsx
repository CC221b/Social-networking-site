import React, { useState, useEffect } from "react";
import helperFriendPage from "./helperFriendPage";

export default function FriendAlbum(props) {
  const [Album, setAlbum] = useState([{ key: 0, value: { Path: "", AlbumId: 0 ,IsLike: 0} },]);
  const [ViewAlbum, setViewAlbum] = useState([{ Path: "", AlbumId: 0 , IsLike: 0}]);
  const [Page, setPage] = useState(1);

  useEffect(() => {
      clearInterval();
      setInterval(ServeAlbum(Page), 1000);
  }, []);

  const ServeAlbum = async (page = 1) => {
    let AlbumAlreadyImported = false;
    await setPage(page);
    if (page > 3) {
      Album.map(async (album) => {
      if (album.key === page) {
        AlbumAlreadyImported = true;
        await setViewAlbum(album.value);
      }});
    }
     if (!AlbumAlreadyImported) {
      if (sessionStorage.getItem("UserId") === "Guest" || sessionStorage.getItem("UserId") === "0") {
        let CurrentFriendAlbum = await helperFriendPage.ServeAlbumFriendToGuestAndAdmin(props.FriendId, page);
         await setViewAlbum(CurrentFriendAlbum);
         setAlbum([...Album, { key: page, value: CurrentFriendAlbum }]);
      } else {
         let CurrentFriendAlbum = await helperFriendPage.ServeAlbumFriendToUser(props.FriendId, sessionStorage.getItem('UserId'), page);
         await setViewAlbum(CurrentFriendAlbum);
         setAlbum([...Album, { key: page, value: CurrentFriendAlbum }]);
      }
    }
  };

  const prevAlbum = async () => {
    ServeAlbum(Page - 1);
  };

  const nextAlbum = async () => {
    ServeAlbum(Page + 1);
  };

  const HandleChangePage = (event) => {
    setPage(JSON.parse(event.target.value));
  };

  const SendMeesageTheAdmin = async (Path, UserId, ImageName, ImageId) => {
    let IfSendMessage = window.confirm("You Want To Send Message to admin about the images: " +Path +"UserId: " +UserId
    );
    if (IfSendMessage) {
      helperFriendPage.sendMessageToAdminAboutImage(Path, UserId, ImageName, ImageId);
    }
  };

  const Likes = async (event, ImageId, AlbumId, IsLike) => {
    if (event.target.checked) {
      let flagInsert = true;
      if(IsLike === 0) flagInsert=false;
      if (flagInsert) {
        helperFriendPage.InsertLikeToLikesTable(ImageId, AlbumId);
      } else {
        helperFriendPage.UpdateLike(ImageId, AlbumId, 1);
      } 
    } else {
      helperFriendPage.UpdateLike(ImageId, AlbumId, 0);
    }
  };

  return (
    <div>
      {ViewAlbum.map((image) => (
        <div key={image.AlbumId}>
          <img
            src={image.Path}
            style={{ width: "80px" }}
            onDoubleClick={() =>
              SendMeesageTheAdmin(image.Path,image.AlbumId,image.ImageName,image.ImageId)
            }
          />
          <>
          <div style={{display: sessionStorage.getItem("UserId")==="Guest" || sessionStorage.getItem("UserId")=== "0"? "none":"block"}}>
          <label>Like?</label>
          <input type="checkbox" defaultChecked={image.IsLike ==1 ? true: false} onChange={(e) => Likes(e, image.ImageId, image.AlbumId, image.IsLike)}></input>
          <label>num likes: {image.SumLikes}</label>
          </div>
          </>
        </div>
      ))}
      <br></br>
      <label>
        Page:
        <input type="text" value={Page} onChange={HandleChangePage} />
      </label>
      <button onClick={() => ServeAlbum(Page)}>submit:</button>
      <button onClick={nextAlbum}>next</button>
      <button onClick={prevAlbum}>prev</button>
    </div>
  );
}
