const { Op } = require('sequelize');

//Response Message
const { errorResponse, successResponse } = require("../../helpers");

//Import Model
const { Master_religion, Master_applicant } = require('../../models');

const listPengajuanProposal = async (req, res) => {
    try {
        const id_user = req.user.id;

        const { jenis_pembangunan } = req.query;

        if (!jenis_pembangunan) {
            return errorResponse(req, res, 400, 'Required jenis_pembangunan in request parameter');
        }

        const data = await Master_applicant.findAll({
            where: {
                [Op.and]: [
                    { id_user: id_user },
                    { jenis_pembangunan: jenis_pembangunan }
                ]
            },
            include: [
                {
                    model: Master_religion,
                    attributes: ['agama', 'tempat_ibadah']
                },
            ]
        });

        if (!data) {
            return successResponse(req, res, 'No data available in table');
        }

        return successResponse(req, res, 'List Proposal Submission Retrieved Successfully', data);
    }
    catch (err) {
        console.log(err.message);
        return errorResponse(req, res, 500, 'Internal Server Error');
    }
};

module.exports = listPengajuanProposal;