const base64Img = require('base64-img');
const { errorResponse, successResponse } = require('../../helpers');
const cloudinary = require('cloudinary').v2;
const Datauri = require('datauri/parser');

const { BASEURL } = process.env;

function uploadImage(imageBase64, path) {
    const filePath = base64Img.imgSync(imageBase64, path, Date.now());
    const imageName = filePath.split('\\').pop().split('/').pop();
    return imageName;
}

const cobaa = async (req, res) => {
    try {
        const gambar = uploadImage(req.body.dokumen, "./src/public");

        const linkGambar = `${BASEURL}/${gambar}`;

        return successResponse(req, res, 'Berhasil', {gambar, linkGambar});
    }
    catch (err) {
        console.log(err.message);
        return errorResponse(req, res, 500, `Internal Server Error. ${err.message}`);
    }
}

module.exports = cobaa;