import React, { useState, useEffect} from "react";
import helper from "./helper";
import UploadImagePage from "./UploadImage/UploadImagePage";

export default function UserAlbum(props) {
  const [Album, setAlbum] = useState([{ key: 0, value: { Path: "", UserId: 0 } },]);
  const [ViewAlbum, setViewAlbum] = useState([{ Path: "", UserId: 0 } ]);
  const [Page, setPage] = useState(1);

  useEffect(() => {
    ServeAlbum();
  }, []);

  const ServeAlbum = async (page = 1) => {
    let AlbumAlreadyImported = false;
    await setPage(page);
    Album.map(async (album) => {
      if (album.key === page) {
        AlbumAlreadyImported = true;
        await setViewAlbum(album.value);
      }
    });
    if (!AlbumAlreadyImported) {
      let CurrentAlbum = await helper.ServeAlbumWithUserId(page, sessionStorage.getItem('UserId'));
      console.log(CurrentAlbum);
      await setViewAlbum(CurrentAlbum);
      setAlbum([...Album, { key: page, value: CurrentAlbum }]);
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

  const DeleteAllImages = async () => {
    const resDeleteAllImages = await fetch(
      `http://localhost:1234/api/uploadImage/DeleteAllImages/${sessionStorage.getItem("UserId")}`
    );
    if (resDeleteAllImages.statusText == "OK") ServeAlbum();
  };

  return (
    <div>
      {ViewAlbum.map((image) => (
        <div key={image.UserId}>
          <button onClick={() => helper.DeleteImage(image.ImageName, image.AlbumId, "false")}>delete image</button>
          <img src={image.Path} style={{ width: "80px" }} />
          <label>{image.UserName}</label>
          <label>Likes: {image.SumLikes == null ? 0: image.SumLikes}</label>
        </div>
      ))}
      <br></br>
      <label>
          Page:
          <input type="text" value={Page} onChange={HandleChangePage} />
      </label>
      <button onClick={()=> ServeAlbum(Page)}>submit:</button>
      <button onClick={nextAlbum}>next</button>
      <button onClick={prevAlbum}>prev</button>
      <button onClick={DeleteAllImages}>delete all image</button>
      <UploadImagePage ServeAlbum={ServeAlbum} Followers={props.Followers}/>
    </div>
  );
}
