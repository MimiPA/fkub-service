const cloudinary = require('cloudinary').v2;
const Datauri = require('datauri/parser');
const { Op } = require('sequelize');

//Response Message
const { errorResponse, successResponse } = require("../../helpers");

//Import Model
const { Pengajuan, Trx_dokumen_instansi, Pelacakan, Trx_status_lacak } = require('../../models');

const changeStatusPengajuan = async (req, res) => {
    try {
        const id = req.params.id;
        const { status } = req.query;

        if (!id) {
            return errorResponse(req, res, 400, 'Diperlukan ID Pengajuan pada parameter request.');
        }
        if (!status) {
            return errorResponse(req, res, 400, 'Diperlukan Perubahan Status Pengajuan pada parameter request.');
        }

        const dataPengajuan = await Pengajuan.findOne({
            where: {
                id: id,
            },
        });

        if (!dataPengajuan) {
            return errorResponse(req, res, 400, 'Data Pengajuan Proposal Tidak Ditemukan.');
        }

        if (dataPengajuan.status == "Selesai" || dataPengajuan.status == "Proses") {
            return errorResponse(req, res, 400, 'Anda Tidak Bisa Mengubah Status Proposal');
        }

        if (status == "Ditolak") {
            const pelacakan = await Pelacakan.findOne({
                where: {
                    kategori_pelacakan: "Permohonan Pembangunan Rumah Ibadah Anda Ditolak"
                }
            });

            const createStatus = await Trx_status_lacak.create({
                id_pengajuan: id,
                id_pelacakan: pelacakan.id,
                status: "Selesai",
                idUser_create: req.user.nik
            });

            const updatePengajuan = await Pengajuan.update({ status: status }, { where: { id: id } });

            return successResponse(req, res, `Berhasil Menolak Pengajuan Pembangunan Rumah Ibadah`, { createStatus, updatePengajuan });
        }
        else {
            if (req.file == null) {
                return errorResponse(req, res, 400, 'Surat Permintaan KRK Perlu Diisi');
            }

            if (req.file.mimetype != 'application/pdf') {
                return errorResponse(req, res, 400, 'File Anda Bukan Tipe .pdf !!! Mohon upload ulang');
            }
            else if (req.file.size > 5242880) {
                return errorResponse(req, res, 400, 'Batas Maksimal Ukuran File 5 MB');
            }

            const datauri = new Datauri().format('.pdf', req.file.buffer);
            const uploaded = await cloudinary.uploader.upload(datauri.content);

            const createDokumen = await Trx_dokumen_instansi.create({
                dokumen: uploaded.secure_url,
                kategori_dokumen: req.body.kategori_dokumen,
                role: req.user.role,
                idUser_create: req.user.nik,
                id_pengajuan: id,
                id_user: req.user.nik
            });

            if (!createDokumen) {
                return errorResponse(req, res, 400, 'Permintaan KRK Tidak Berhasil. Mohon Coba Lagi!');
            }

            const pelacakan = await Pelacakan.findOne({
                where: {
                    kategori_pelacakan: "PMPTSP menyampaikan ke Dinas Tata Ruang untuk mendapatkan KRK"
                }
            });

            const createStatus = await Trx_status_lacak.create({
                id_pengajuan: id,
                id_pelacakan: pelacakan.id,
                idUser_create: req.user.nik
            });

            const updatePengajuan = await Pengajuan.update({ status: status }, { where: { id: id } });

            return successResponse(req, res, `Berhasil Menyetujui Permohonan dan Meminta KRK`, { createDokumen, createStatus, updatePengajuan });
        }
    }
    catch (err) {
        console.log(err.message);
        return errorResponse(req, res, 500, `Internal Server Error. ${err.message}`);
    }
};

module.exports = changeStatusPengajuan;