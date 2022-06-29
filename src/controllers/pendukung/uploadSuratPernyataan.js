const cloudinary = require('cloudinary').v2;
const Datauri = require('datauri/parser');

//Response Message
const { errorResponse, successResponse } = require("../../helpers");

//Import Model
const { Trx_dokumen_pendukung, Trx_dokumen_penentang } = require('../../models');

const uploadSuratPernyataan = async (req, res) => {
    try {
        const { id } = req.params;
        const { jenis } = req.query;

        if (req.file == null) {
            return errorResponse(req, res, 400, 'Surat Pernyataan Perlu Diisi');
        }

        if (req.file.mimetype != 'application/pdf') {
            return errorResponse(req, res, 400, 'File Anda Bukan Tipe .pdf !!! Mohon upload ulang');
        }
        else if (req.file.size > 5242880) {
            return errorResponse(req, res, 400, 'Batas Maksimal Ukuran File 5 MB');
        }

        if (!id) {
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

            if (dataPendukung.surat_pernyataan != "-") {
                return errorResponse(req, res, 400, 'Anda Sudah Pernah Mengupload Surat Pernyataan');
            }

            const datauri = new Datauri().format('.pdf', req.file.buffer);
            const uploaded = await cloudinary.uploader.upload(datauri.content);

            const updateDokumen = await Trx_dokumen_pendukung.update(
                { surat_pernyataan: uploaded.secure_url },
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

            if (dataPenentang.surat_pernyataan != "-") {
                return errorResponse(req, res, 400, 'Anda Sudah Pernah Mengupload Surat Pernyataan');
            }

            const datauri = new Datauri().format('.pdf', req.file.buffer);
            const uploaded = await cloudinary.uploader.upload(datauri.content);

            const updateDokumen = await Trx_dokumen_penentang.update(
                { surat_pernyataan: uploaded.secure_url },
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

module.exports = uploadSuratPernyataan;