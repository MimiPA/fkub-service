//Response Message
const { errorResponse, successResponse } = require("../../helpers");

const { BASE_URL } = process.env;
const uploadImage = require('../../utils/image');

//Import Model
const { Trx_dokumen_pendukung, Trx_dokumen_penentang } = require('../../models');

const uploadFotoKTP = async (req, res) => {
    try {
        const { id } = req.params;
        const { jenis } = req.query;
        const { foto } = req.body;

        if (!foto || foto == null || foto == undefined) {
            return errorResponse(req, res, 400, 'Mohon Foto KTP Anda');
        }
        else if (!id) {
            return errorResponse(req, res, 400, 'ID Dibutuhkan Di Request Parameter');
        }
        else if (!jenis) {
            return errorResponse(req, res, 400, 'Dibutuhkan Jenis Pendukung');
        }

        if (jenis == "mendukung") {
            const dataPendukung = await Trx_dokumen_pendukung.findOne({
                where: {
                    id: id
                }
            });

            if (dataPendukung.foto_ktp != "-") {
                return errorResponse(req, res, 400, 'Anda Sudah Pernah Foto KTP');
            }

            const gambar = uploadImage(foto, "./src/public");
            const linkGambar = `${BASE_URL}/${gambar}`;

            const updateDokumen = await Trx_dokumen_pendukung.update(
                { foto_ktp: linkGambar },
                { where: { id: id } }
            );

            if (!updateDokumen) {
                return errorResponse(req, res, 400, 'Upload Tidak Berhasil. Mohon Coba Lagi');
            }

            return successResponse(req, res, 'Upload Berhasil.', updateDokumen);
        }
        else if (jenis == "menentang") {
            const dataPenentang = await Trx_dokumen_penentang.findOne({
                where: {
                    id: id
                }
            });

            if (dataPenentang.foto_ktp != "-") {
                return errorResponse(req, res, 400, 'Anda Sudah Pernah Foto KTP');
            }

            const gambar = uploadImage(foto, "./src/public");
            const linkGambar = `${BASE_URL}/${gambar}`;

            const updateDokumen = await Trx_dokumen_penentang.update(
                { foto_ktp: linkGambar },
                { where: { id: id } }
            );

            if (!updateDokumen) {
                return errorResponse(req, res, 400, 'Upload Tidak Berhasil. Mohon Coba Lagi');
            }

            return successResponse(req, res, 'Upload Berhasil.', updateDokumen);
        }
    }
    catch (err) {
        console.log(err.message);
        return errorResponse(req, res, 500, `Internal Server Error. ${err.message}`);
    }
};

module.exports = uploadFotoKTP;