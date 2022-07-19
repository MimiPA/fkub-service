const cloudinary = require('cloudinary').v2;
const Datauri = require('datauri/parser');

//Response Message
const { errorResponse, successResponse } = require("../../helpers");

//Import Model
const { Pengajuan, Trx_dokumen_instansi, Pelacakan, Trx_status_lacak } = require('../../models');

const uploadSuratRekomendasi = async (req, res) => {
    try {
        const { id_pengajuan, kategori_dokumen, role } = req.body;

        if (req.file == null) {
            return errorResponse(req, res, 400, 'Surat Rekomendasi Perlu Diisi');
        }

        if (!(id_pengajuan && kategori_dokumen && role)) {
            return errorResponse(req, res, 400, 'Diperlukan 3 value pada body parameter request.');
        }

        if (req.file.mimetype != 'application/pdf') {
            return errorResponse(req, res, 400, 'File Anda Bukan Tipe .pdf !!! Mohon upload ulang');
        }
        else if (req.file.size > 5242880) {
            return errorResponse(req, res, 400, 'Batas Maksimal Ukuran File 5 MB');
        }

        const dataRekomen = await Trx_dokumen_instansi.findOne({
            where: {
                kategori_dokumen: "Surat Rekomendasi FKUB",
                id_pengajuan: id_pengajuan
            }
        });

        if (dataRekomen) {
            return errorResponse(req, res, 400, 'Anda Sudah Pernah Memberikan Surat Rekomendasi dengan Detail Permintaan Tersebut.');
        }

        const datauri = new Datauri().format('.pdf', req.file.buffer);
        const uploaded = await cloudinary.uploader.upload(datauri.content);

        const createDokumen = await Trx_dokumen_instansi.create({
            dokumen: uploaded.secure_url,
            kategori_dokumen: kategori_dokumen,
            role: role,
            idUser_create: req.user.nik,
            id_pengajuan: id_pengajuan,
            id_user: req.user.nik
        });

        if (!createDokumen) {
            return errorResponse(req, res, 400, 'Surat Rekomendasi Tidak Berhasil Diupload. Mohon Coba Lagi!');
        }

        const pelacakan = await Pelacakan.findOne({
            where: {
                kategori_pelacakan: "Penerbitan Rekomendasi Tertulis FKUB"
            }
        });

        const createStatus = await Trx_status_lacak.create({
            id_pengajuan: id_pengajuan,
            id_pelacakan: pelacakan.id,
            idUser_create: req.user.nik
        });

        return successResponse(req, res, `Berhasil Memberikan Surat Rekomendasi FKUB`, { createDokumen, createStatus });
    }
    catch (err) {
        console.log(err.message);
        return errorResponse(req, res, 500, `Internal Server Error. ${err.message}`);
    }
};

module.exports = uploadSuratRekomendasi;