//Response Message
const { Op } = require("sequelize");
const { errorResponse, successResponse } = require("../../helpers");

//Import Model
const { Pengajuan, Trx_status_lacak, Pelacakan } = require('../../models');

const statusNow = async (req, res) => {
    try {
        const id_user = req.user.nik;

        const status = await Trx_status_lacak.findOne({
            where: {
                status: { [Op.or]: ["Proses", "Selesai"] }
            },
            include: [{
                model: Pelacakan,
                attributes: ["kategori_pelacakan"]
            }, {
                model: Pengajuan,
                where: {
                    id_user: id_user,
                    status: { [Op.or]: ["Submit", "Proses", "Ditolak", "Selesai"] }
                },
            }],
            order: [
                [Pengajuan, 'createdAt', 'DESC'],
                ['createdAt', 'DESC']
            ]
        });

        if (!status) {
            return errorResponse(req, res, 404, 'Status Terkini Pengajuan Tidak Ditemukan. Mungkin Anda belum mengajukan');
        }

        return successResponse(req, res, 'Data Status Terkini Berhasil Diambil.', status);

    }
    catch (err) {
        console.log(err.message);
        return errorResponse(req, res, 500, `Internal Server Error. ${err.message}`);
    }
};

module.exports = statusNow;