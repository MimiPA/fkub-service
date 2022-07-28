const { Op } = require('sequelize');

//Response Message
const { errorResponse, successResponse } = require("../../helpers");

//Import Model
const { Pengajuan } = require('../../models');

const checkStatusProposal = async (req, res) => {
    try {
        const id_user = req.user.nik;

        const dataPengajuan = await Pengajuan.findOne({
            where: {
                id_user: id_user
            },
            order: [
                ['createdAt', 'DESC']
            ]
        });

        return successResponse(req, res, 'Daftar Pengajuan Proposal Berhasil Diambil', { dataPengajuan });
    }
    catch (err) {
        console.log(err.message);
        return errorResponse(req, res, 500, `Internal Server Error. ${err.message}`);
    }
};

module.exports = checkStatusProposal;