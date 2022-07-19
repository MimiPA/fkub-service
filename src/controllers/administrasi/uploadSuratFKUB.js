const cloudinary = require('cloudinary').v2;
const Datauri = require('datauri/parser');

//Response Message
const { errorResponse, successResponse } = require("../../helpers");

//Import Model
const { Pelacakan, Trx_status_lacak, Trx_dokumen_pemohon } = require('../../models');

const uploadSuratFKUB = async (req, res) => {
    try {
        if (req.file == null) {
            return errorResponse(req, res, 400, 'Surat Permohonan Rekomendasi FKUB Perlu Diisi');
        }

        if (req.file.mimetype != 'application/pdf') {
            return errorResponse(req, res, 400, 'File Anda Bukan Tipe .pdf !!! Mohon upload ulang');
        }
        else if (req.file.size > 5242880) {
            return errorResponse(req, res, 400, 'Batas Maksimal Ukuran File 5 MB');
        }

        const surat = await Trx_dokumen_pemohon.findOne({
            where: {
                id_pengajuan: req.body.id_pengajuan,
                kategori_dokumen: "Surat Permohonan Rekomendasi FKUB"
            }
        });

        if (surat) {
            return errorResponse(req, res, 400, 'Tidak Dapat Mengupload. Anda Sudah Pernah Mengisinya');
        }

        const datauri = new Datauri().format('.pdf', req.file.buffer);
        const uploaded = await cloudinary.uploader.upload(datauri.content);

        const createDokumen = await Trx_dokumen_pemohon.create({
            dokumen: uploaded.secure_url,
            kategori_dokumen:"Surat Permohonan Rekomendasi FKUB",
            idUser_create: req.user.nik,
            id_pengajuan: req.body.id_pengajuan,
        });

        if (!createDokumen) {
            return errorResponse(req, res, 400, 'Upload Tidak Berhasil. Mohon Coba Lagi!');
        }

        const pelacakan = await Pelacakan.findOne({
            where: {
                kategori_pelacakan: "Pengajuan permohonan Rekomendasi Tertulis ke FKUB"
            }
        });

        const createStatus = await Trx_status_lacak.create({
            id_pengajuan: req.body.id_pengajuan,
            id_pelacakan: pelacakan.id,
            idUser_create: req.user.nik
        });

        return successResponse(req, res, 'Upload Berhasil.', { createDokumen, createStatus });
    }
    catch (err) {
        console.log(err.message);
        return errorResponse(req, res, 500, `Internal Server Error. ${err.message}`);
    }
};

module.exports = uploadSuratFKUB;