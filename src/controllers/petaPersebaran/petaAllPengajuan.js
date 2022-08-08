//Response Message
const { errorResponse, successResponse } = require("../../helpers");

//Import Model
const { Pengajuan, Pengguna } = require('../../models');

const petaAllPengajuan = async (req, res) => {
    try {
        const data = await Pengajuan.findAll({
            attributes: {
                exclude: [
                    'surat_permohonan',
                    'idUser_update',
                    'updatedAt',
                ],
            },
            include: [{
                model: Pengguna,
                attributes: { exclude: ['role', 'password', 'is_active', 'createdAt', 'updatedAt'] }
            }],
        });

        if (!data) {
            return successResponse(req, res, 'Data Tidak Ditemukan');
        }

        return successResponse(req, res, 'List All Pengajuan Berhasil Diambil', data);
    }
    catch (err) {
        console.log(err.message);
        return errorResponse(req, res, 500, `Internal Server Error. ${err.message}`);
    }
};

module.exports = petaAllPengajuan;