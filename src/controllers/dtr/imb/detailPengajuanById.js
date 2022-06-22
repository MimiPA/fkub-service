//Response Message
const { errorResponse, successResponse } = require("../../../helpers");

//Import Model
const { Pengajuan, Pengguna } = require('../../../models');

const pengajuanById = async (req, res) => {
    try {
        const data = await Pengajuan.findOne({
            where: {
                id: req.params.id,
            },
            include: [{
                model: Pengguna,
                attributes: { exclude: ['role', 'password', 'is_active', 'createdAt', 'updatedAt'] }
            }]
        });

        if (!data) {
            return successResponse(req, res, 'Data Tidak Ditemukan');
        }

        return successResponse(req, res, 'Detail Pengajuan Berhasil Diambil', data);
    }
    catch (err) {
        console.log(err.message);
        return errorResponse(req, res, 500, `Internal Server Error. ${err.message}`);
    }
};

module.exports = pengajuanById;