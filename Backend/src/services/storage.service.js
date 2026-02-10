const ImageKit = require("imagekit");
let { IMAGEKIT_PUBLIC_KEY, IMAGEKIT_PRIVATE_KEY, IMAGEKIT_URL } = require("../config/env");
const imageKit = new ImageKit({
  publicKey: IMAGEKIT_PUBLIC_KEY,
  privateKey: IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: IMAGEKIT_URL,
});

const uploadToImageKit = async (file, fileName) => {
  try {
    const result = await imageKit.upload({
      file,
      fileName,
      folder: "curaByte",
    });
    return result;
  } catch (error) {
    console.error("ImageKit Upload Error:", error.message);
    throw error;
  }
};

module.exports = uploadToImageKit;
