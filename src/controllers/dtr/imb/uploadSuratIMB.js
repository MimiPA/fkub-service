const cloudinary = require('cloudinary').v2;
const Datauri = require('datauri/parser');

//Response Message
const { errorResponse, successResponse } = require("../../../helpers");

//Import Model
const { Pengajuan, Trx_dokumen_instansi, Pelacakan, Trx_status_lacak } = require('../../../models');

const uploadSuratIMB = async (req, res) => {
    try {
        const { id_pengajuan, kategori_dokumen, role } = req.body;

        if (!req.body) {
            return errorResponse(req, res, 400, 'Diperlukan 3 value pada body parameter request.');
        }

        if (req.file == null) {
            return errorResponse(req, res, 400, 'Surat IMB Perlu Diisi');
        }

        if (req.file.mimetype != 'application/pdf') {
            return errorResponse(req, res, 400, 'File Anda Bukan Tipe .pdf !!! Mohon upload ulang');
        }
        else if (req.file.size > 5242880) {
            return errorResponse(req, res, 400, 'Batas Maksimal Ukuran File 5 MB');
        }

        const dataIMB = await Trx_dokumen_instansi.findOne({
            where: {
                kategori_dokumen: "IMB",
                id_pengajuan: id_pengajuan
            }
        });

        if (dataIMB) {
            return errorResponse(req, res, 400, 'Anda Sudah Pernah Memberikan Surat IMB dengan Detail Permintaan Tersebut.');
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
            return errorResponse(req, res, 400, 'Surat IMB Tidak Berhasil Diupload. Mohon Coba Lagi!');
        }

        const pelacakan = await Pelacakan.findOne({
            where: {
                kategori_pelacakan: "Penerbitan IMB / PBG"
            }
        });

        const createStatus = await Trx_status_lacak.create({
            id_pengajuan: id_pengajuan,
            id_pelacakan: pelacakan.id,
            status: "Selesai",
            idUser_create: req.user.nik
        });

        const updatePengajuan = await Pengajuan.update({ status: "Selesai" }, { where: { id: id_pengajuan } });

        return successResponse(req, res, `Berhasil Memberikan Surat IMB`, { createDokumen, createStatus, updatePengajuan });

    }
    catch (err) {
        console.log(err.message);
        return errorResponse(req, res, 500, `Internal Server Error. ${err.message}`);
    }
};

module.exports = uploadSuratIMB;