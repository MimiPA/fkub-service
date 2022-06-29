const { Op } = require('sequelize');

//Response Message
const { errorResponse, successResponse } = require("../../helpers");

//Import Model
const { Pengajuan, Trx_dokumen_pendukung, Trx_dokumen_penentang } = require('../../models');

const jenisDukungan = async (req, res) => {
    try {
        const { id_pengajuan } = req.params;
        const { jenis, sumber_dukungan } = req.query;

        if (!id_pengajuan) {
            return errorResponse(req, res, 400, 'ID Pengajuan Dibutuhkan Di Request Parameter');
        }
        else if (!jenis) {
            return errorResponse(req, res, 400, 'Mohon Memilih Apakah Anda Mendukung / Menentang');
        }

        const dataPengajuan = await Pengajuan.findOne({
            where: {
                id: id_pengajuan
            },
        });

        if (!dataPengajuan) {
            return errorResponse(req, res, 404, 'Data Pengajuan Tidak Ditemukan');
        }

        const dataPendukung = await Trx_dokumen_pendukung.findOne({
            where: {
                id_pengajuan: id_pengajuan,
                id_user: req.user.nik
            },
        });

        if (dataPendukung) {
            return errorResponse(req, res, 400, `Anda Sudah Pernah Mendukung Sebagai ${dataPendukung.sumber_dukungan}`);
        }

        const dataPenentang = await Trx_dokumen_penentang.findOne({
            where: {
                id_pengajuan: id_pengajuan,
                id_user: req.user.nik
            },
        });

        if (dataPenentang) {
            return errorResponse(req, res, 400, 'Anda Sudah Pernah Menentang');
        }

        if (jenis == "mendukung") {
            const createDukung = await Trx_dokumen_pendukung.create({
                sumber_dukungan: sumber_dukungan,
                surat_pernyataan: "-",
                foto_ktp: "-",
                foto_diri: "-",
                status: "Submit",
                idUser_create: req.user.nik,
                id_pengajuan: id_pengajuan,
                id_user: req.user.nik,
            });

            return successResponse(req, res, 'Mendukung Berhasil. Mohon Melengkapi Berkas', createDukung);
        }
        else if (jenis == "menentang") {
            const createTentang = await Trx_dokumen_penentang.create({
                surat_pernyataan: "-",
                foto_ktp: "-",
                foto_diri: "-",
                alasan: "-",
                status: "Submit",
                idUser_create: req.user.nik,
                id_pengajuan: id_pengajuan,
                id_user: req.user.nik,
            });

            return successResponse(req, res, 'Menentang Berhasil. Mohon Melengkapi Berkas', createTentang);
        }
        else {
            return errorResponse(req, res, 400, 'Gagal Mendukung / Menentang. Mohon Coba Lagi!');
        }
    }
    catch (err) {
        console.log(err.message);
        return errorResponse(req, res, 500, `Internal Server Error. ${err.message}`);
    }
};

module.exports = jenisDukungan;