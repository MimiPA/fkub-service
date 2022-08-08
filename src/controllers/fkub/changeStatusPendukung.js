const { Op } = require('sequelize');

//Response Message
const { errorResponse, successResponse } = require("../../helpers");

//Import Model
const { Pendukung, Pelacakan, Trx_status_lacak, Trx_alasan_penolakan } = require('../../models');

const changeStatusPendukung = async (req, res) => {
    try {
        const id = req.params.id;
        const { status } = req.query;

        if (!id) {
            return errorResponse(req, res, 400, 'Diperlukan ID Pendukung pada parameter request.');
        }
        if (!status) {
            return errorResponse(req, res, 400, 'Diperlukan Perubahan Status Pendukung pada parameter request.');
        }

        const dataPendukung = await Pendukung.findOne({
            where: {
                id: id,
            },
        });

        if (!dataPendukung) {
            return errorResponse(req, res, 400, 'Data Tidak Ditemukan.');
        }

        if (status == "Ditolak") {
            const { alasan } = req.body;

            if (!alasan || alasan == null || alasan == "") {
                return errorResponse(req, res, 400, 'Mohon Memasukkan Alasan Menolak');
            }

            const createAlasan = await Trx_alasan_penolakan.create({
                alasan: alasan,
                idUser_create: req.user.nik,
                id_pendukung: dataPendukung.id
            });
        }

        const update = await Pendukung.update({ status: status }, { where: { id: id } });

        const pelacakan = await Pelacakan.findOne({
            where: {
                kategori_pelacakan: "Penelitian Berkas Administrasi oleh Komisi Pendirian Rumah Ibadah"
            }
        });

        const checkStatus = await Trx_status_lacak.findOne({
            where: {
                id_pengajuan: dataPendukung.id_pengajuan,
                id_pelacakan: pelacakan.id
            }
        });

        let createStatus;

        if (!checkStatus) {
            createStatus = await Trx_status_lacak.create({
                id_pengajuan: dataPendukung.id_pengajuan,
                id_pelacakan: pelacakan.id,
                idUser_create: req.user.nik
            });
        }
        else {
            createStatus = checkStatus;
        }

        return successResponse(req, res, `Berhasil Mengubah Status Pendukung`, { update, createStatus });

    }
    catch (err) {
        console.log(err.message);
        return errorResponse(req, res, 500, `Internal Server Error. ${err.message}`);
    }
};

module.exports = changeStatusPendukung;