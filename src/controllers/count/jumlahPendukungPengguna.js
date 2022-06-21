const { Op } = require("sequelize");
const sequelize = require("sequelize");

//Response Message
const { errorResponse, successResponse } = require("../../helpers");

//Import Model
const { Trx_dokumen_pendukung } = require('../../models');

const jumlahPendukungPengguna = async (req, res) => {
    try {
        const data = await Trx_dokumen_pendukung.count({
            where: {
                [Op.and]: [
                    { id_pengajuan: req.params.id },
                    { sumber_dukungan: "Pengguna" }
                ],
            },
        });

        return successResponse(req, res, 'Jumlah Pendukung Pengguna Berhasil Diambil', data);
    }
    catch (err) {
        console.log(err.message);
        return errorResponse(req, res, 500, `Internal Server Error. ${err.message}`);
    }
};

module.exports = jumlahPendukungPengguna;