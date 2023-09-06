const db = require("./db");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./ProfilePicture");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

async function DeleteProfilePicture(ImageName) {
  const path = `./ProfilePicture/${ImageName}`;
  try {
    fs.unlinkSync(path);
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  upload,
  storage,
  DeleteProfilePicture,
};
