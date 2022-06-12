const { Op } = require('sequelize');

//Response Message
const { errorResponse, successResponse } = require("../../helpers");

//Import Model
const { Pengajuan } = require('../../models');

const checkStatusProposal = async (req, res) => {
    try {
        const id_user = req.user.nik;

        const data = await Pengajuan.findOne({
            where: {
                id_user: id_user
            },
            order: [
                ['createdAt', 'DESC']
            ]
        });

        if (!data) {
            return successResponse(req, res, 'Data Tidak Tersedia', data);
        }

        return successResponse(req, res, 'Daftar Pengajuan Proposal Berhasil Diambil', data);
    }
    catch (err) {
        console.log(err.message);
        return errorResponse(req, res, 500, `Internal Server Error. ${err.message}`);
    }
};

module.exports = checkStatusProposal;