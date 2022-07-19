//Response Message
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const moment = require("moment");

const { errorResponse, successResponse } = require("../../helpers");

//Import Model
const { Pengajuan, Trx_status_lacak, Pelacakan } = require('../../models');

const riwayatStatus = async (req, res) => {
    try {
        const id_user = req.user.nik;

        const status = await Trx_status_lacak.findOne({
            include: [{
                model: Pelacakan,
                attributes: ["kategori_pelacakan"]
            }, {
                model: Pengajuan,
                where: {
                    id_user: id_user,
                    status: { [Op.or]: ["Pengajuan", "Proses", "Ditolak", "Selesai"] }
                },
            }],
            order: [
                [Pengajuan, 'createdAt', 'DESC']
            ]
        });

        if (!status) {
            return errorResponse(req, res, 404, 'Anda belum mengajukan');
        }

        const lacak = await Trx_status_lacak.findAll({
            where: {
                id_pengajuan: status.Pengajuan.id
            },
            include: [{
                model: Pelacakan,
                attributes: ["kategori_pelacakan"]
            }],
            order: [['createdAt', 'DESC']],
            limit: 4
        });

        if (!lacak) {
            return errorResponse(req, res, 404, 'Riwayat Pengajuan Tidak Ditemukan. Mungkin Berkas Anda belum di proses');
        }

        return successResponse(req, res, 'Data Riwayat Pengajuan Berhasil Diambil.', lacak);
    }
    catch (err) {
        console.log(err.message);
        return errorResponse(req, res, 500, `Internal Server Error. ${err.message}`);
    }
};

module.exports = riwayatStatus;