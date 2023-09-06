function createFolderToUserImage(nameFolder) {
  const fs = require("fs");
  const path = `./images/${nameFolder}`;

  fs.access(path, (error) => {
    if (error) {
      fs.mkdir(path, (error) => {
        if (error) {
          console.log(error);
        } else {
          console.log("New Directory created successfully !!");
        }
      });
    } else {
      console.log("Given Directory already exists !!");
    }
  });
}

function getOffset(currentPage = 1, listPerPage) {
  return (currentPage - 1) * [listPerPage];
}

function emptyOrRows(rows) {
  if (!rows) {
    return [];
  }
  return rows;
}


module.exports = {
  createFolderToUserImage,
  getOffset,
  emptyOrRows
}