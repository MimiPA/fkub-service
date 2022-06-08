const { Op } = require('sequelize');

//Response Message
const { errorResponse, successResponse } = require("../../helpers");

//Import Model
const { Pengajuan } = require('../../models');

const listPengajuanProposal = async (req, res) => {
    try {
        const id_user = req.user.nik;

        const { jenis_pembangunan } = req.query;

        if (!jenis_pembangunan) {
            return errorResponse(req, res, 400, 'Required jenis_pembangunan in request parameter');
        }

        const data = await Pengajuan.findAll({
            where: {
                [Op.and]: [
                    { id_user: id_user },
                    { jenis_pembangunan: jenis_pembangunan }
                ]
            },
        });

        if (data == null) {
            return successResponse(req, res, 'Tidak Ada Data Tersedia');
        }

        return successResponse(req, res, 'Daftar Pengajuan Proposal Berhasil Diambil', data);
    }
    catch (err) {
        console.log(err.message);
        return errorResponse(req, res, 500, `Internal Server Error. ${err.message}`);
    }
};

module.exports = listPengajuanProposal;