//Response Message
const { errorResponse, successResponse } = require("../../helpers");

//Import Model
const { Pengajuan, Pengguna } = require('../../models');

const listAllPengajuan = async (req, res) => {
    try {
        const data = await Pengajuan.findAll({
            where: {
                status: 'Proses',
            },
            include: [{
                model: Pengguna,
                attributes: { exclude: ['role', 'password', 'is_active', 'createdAt', 'updatedAt'] }
            }]
        });

        if (!data) {
            return successResponse(req, res, 'Data Tidak Ditemukan');
        }

        return successResponse(req, res, 'Daftar Pengajuan Pemohon Berhasil Diambil', data);
    }
    catch (err) {
        console.log(err.message);
        return errorResponse(req, res, 500, `Internal Server Error. ${err.message}`);
    }
};

module.exports = listAllPengajuan;