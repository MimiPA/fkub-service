//Response Message
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const { errorResponse, successResponse } = require("../../helpers");

//Import Model
const { Pengajuan, Trx_status_lacak, Pelacakan } = require('../../models');

const lacakPengajuanById = async (req, res) => {
    try {
        const id_pengajuan = req.params.id;

        const lacak = await Trx_status_lacak.findAll({
            where: {
                id_pengajuan: id_pengajuan,
            },
            include: [{
                model: Pelacakan,
                attributes: ["kategori_pelacakan"]
            }, {
                model: Pengajuan,
            }],
            order: [['createdAt', 'DESC']],
        });

        if (!lacak) {
            return errorResponse(req, res, 404, 'Riwayat Pengajuan Tidak Ditemukan.');
        }

        return successResponse(req, res, 'Lacak Pengajuan Berhasil Diambil.', lacak);
    }
    catch (err) {
        console.log(err.message);
        return errorResponse(req, res, 500, `Internal Server Error. ${err.message}`);
    }
};

module.exports = lacakPengajuanById;