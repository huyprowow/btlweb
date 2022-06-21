const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid"); //import { v4 as uuidv4 } from 'uuid';
const path = require("path");
class Resize {
  constructor(folder) {
    this.folder = folder;
  }
  async resize(buffer) {
    const fileName = Resize.fileName();
    const filePath = this.filePath(fileName);
    await sharp(buffer)
      .resize(1920, 1080, {
        // resize image 300x300 mo qua nen cho thanh 1920x1080 nhu the nay
        fit: sharp.fit.inside,
        withoutEnlargement: true,
      })
      .toFile(filePath);
    return fileName;
  }

  static fileName() {
    //tao anh ten anh random
    return `${uuidv4()}.png`;
  }
  filePath(fileName) {
    return path.resolve(`${this.folder}/${fileName}`);
  }
}
module.exports = Resize;
