const base64Img = require('base64-img');

function uploadImage(imageBase64, path) {
    const filePath = base64Img.imgSync(imageBase64, path, Date.now());
    const imageName = filePath.split('\\').pop().split('/').pop();
    return imageName;
};

module.exports = uploadImage;