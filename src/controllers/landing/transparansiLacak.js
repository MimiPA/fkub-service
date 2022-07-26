//Response Message
const { Op } = require("sequelize");
const { errorResponse, successResponse } = require("../../helpers");

//Import Model
const { Pengajuan, Trx_status_lacak, Pelacakan } = require('../../models');

const transparansiLacak = async (req, res) => {
    try {
        const status = await Trx_status_lacak.findAll({
            include: [{
                model: Pelacakan,
                attributes: ["kategori_pelacakan"]
            }, {
                model: Pengajuan,
                where: {
                    status: { [Op.or]: ["Pengajuan", "Proses", "Ditolak", "Selesai"] }
                },
            }],
            order: [
                [Pengajuan, 'createdAt', 'DESC'],
                ['createdAt', 'DESC']
            ]
        });

        if (!status) {
            return errorResponse(req, res, 404, 'Transparansi Pelacakan Pengajuan Tidak Ditemukan.');
        }

        return successResponse(req, res, 'Data Pelacakan Terkini Berhasil Diambil.', status);

    }
    catch (err) {
        console.log(err.message);
        return errorResponse(req, res, 500, `Internal Server Error. ${err.message}`);
    }
};

module.exports = transparansiLacak;