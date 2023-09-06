import React, { useState } from "react";
import helper from "./helper";

export default function AdminAlbum() {
  const [Album, setAlbum] = useState([{ key: 0, value: { Path: "", UserId: 0 } },]);
  const [ViewAlbum, setViewAlbum] = useState([{ Path: "", UserId: 0 } ]);
  const [Page, setPage] = useState(1);
  const [Display, setDisplay] = useState("none");

  const ServeAllImageAlbum = async (page = 1) => {
    let AlbumAlreadyImported = false;
    await setPage(page);
    Album.map(async (album) => {
      if (album.key === page) {
        AlbumAlreadyImported = true;
        await setViewAlbum(album.value);
      }
    });
    if (!AlbumAlreadyImported) {
      let CurrentAlbum = await helper.ServeAllImageAlbum(page);
      await setViewAlbum(CurrentAlbum);
      setAlbum([...Album, { key: page, value: CurrentAlbum }]);
    }
    setDisplay("block");
  };

  const prevAlbum = async () => {
    ServeAllImageAlbum(Page - 1);
  };

  const nextAlbum = async () => {
    ServeAllImageAlbum(Page + 1);
  };

  const HandleChangePage = (event) => {
    setPage(JSON.parse(event.target.value));
  };

  return (
    <div>
      {ViewAlbum.map((image) => (
        <div style={{ display: Display }} key={image.UserId}>
          <button
            onClick={() => helper.DeleteImage(image.ImageName, image.AlbumId, "true")}
          >
            delete image
          </button>
          <img src={image.Path} style={{ width: "80px" }} />
          <label>{image.UserName}</label>
        </div>
      ))}
      <br></br>
      <button onClick={(e) => ServeAllImageAlbum(Page)}>
        bring all the images:
      </button>
        <label>
          Page:
          <input type="text" value={Page} onChange={HandleChangePage} />
        </label>
       <button onClick={()=> ServeAllImageAlbum(Page)}>submit:</button>
      <button style={{ display: Display }} onClick={nextAlbum}>
        next
      </button>
      <button style={{ display: Display }} onClick={prevAlbum}>
        prev
      </button>
    </div>
  );
}
