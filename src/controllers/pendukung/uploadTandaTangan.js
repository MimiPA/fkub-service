//Response Message
const { errorResponse, successResponse } = require("../../helpers");

const uploadImage = require('../../utils/image/uploadImage');

const urlKu = "http://localhost:5000";

//Import Model
const { Trx_dokumen_pendukung } = require('../../models');

const uploadTandaTangan = async (req, res) => {
    try {
        const { id } = req.params;
        const { foto } = req.body;

        if (!foto || foto == null || foto == undefined) {
            return errorResponse(req, res, 400, 'Mohon Masukkan Tanda Tangan');
        }
        else if (!id) {
            return errorResponse(req, res, 400, 'ID Dibutuhkan Di Request Parameter');
        }

        const dataPendukung = await Trx_dokumen_pendukung.findOne({
            where: {
                id: id
            }
        });

        if (dataPendukung.tanda_tangan != "-") {
            return errorResponse(req, res, 400, 'Anda Sudah Tanda Tangan');
        }

        const gambar = uploadImage(foto, "./src/public");
        const linkGambar = `${urlKu}/${gambar}`;

        const updateDokumen = await Trx_dokumen_pendukung.update(
            { tanda_tangan: linkGambar },
            { where: { id: id } }
        );

        if (!updateDokumen) {
            return errorResponse(req, res, 400, 'Upload Tidak Berhasil. Mohon Coba Lagi');
        }

        return successResponse(req, res, 'Upload Berhasil.', updateDokumen);
    }
    catch (err) {
        console.log(err.message);
        return errorResponse(req, res, 500, `Internal Server Error. ${err.message}`);
    }
};

module.exports = uploadTandaTangan;