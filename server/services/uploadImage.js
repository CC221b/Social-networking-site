const db = require("./db");
const multer = require("multer");
const fs = require("fs");
const fsExtra = require("fs-extra");

// let AlbumIdGlobaly = 1;

// async function getAlbumId(UserId) {
//   AlbumIdGlobaly = UserId;
//   const dir = `./images/${AlbumIdGlobaly}`;
//   const files = await fs.readdirSync(dir);
//   if (files.length > 50) {
//     return "false";
//   }
//   return "true";
// }

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let destination = `./images/${req.body.AlbumId}`;
    cb(null, destination);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

async function SaveImageInDB(AlbumId, ImageNmae) {
  db.query(`INSERT INTO images (Path, ImageName, AlbumId)
        VALUES ('http://localhost:1234/${AlbumId}/${ImageNmae}','${ImageNmae}',${AlbumId})`);

}

async function DeleteImage(ImageData) {
  const path = `./images/${ImageData.UserId}/${ImageData.ImageName}`;
  try {
    fs.unlinkSync(path);
  } catch (err) {
    console.error(err);
  }
  const ImageId = await db.query(
    `SELECT ImageId FROM images WHERE Path = "http://localhost:1234/${ImageData.UserId}/${ImageData.ImageName}"`
  );
  await db.query(`DELETE FROM images WHERE (ImageId = ${ImageId[0].ImageId})`);
  if (ImageData.Admin == "true") {
    await db.query(
      `INSERT INTO messages(UserId, Message) VALUES ('${ImageData.UserId}',"Message from the admin: the image ${ImageData.ImageName} is Blocked!!")`
    );
  }
}

async function DeleteAllImages(UserId) {
  const fileDir = `./images/${UserId}`;
  fsExtra.emptyDirSync(fileDir);
  await db.query(`DELETE FROM images WHERE (AlbumId = ${UserId})`);
}

module.exports = {
  storage,
  upload,
  SaveImageInDB,
  DeleteImage,
  DeleteAllImages,
};
