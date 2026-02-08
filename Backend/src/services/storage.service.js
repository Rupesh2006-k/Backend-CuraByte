const ImageKit = require("imagekit");

const imageKit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL,
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
