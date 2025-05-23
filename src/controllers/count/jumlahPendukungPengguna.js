const { Op } = require("sequelize");
const sequelize = require("sequelize");

//Response Message
const { errorResponse, successResponse } = require("../../helpers");

//Import Model
const { Trx_dokumen_pendukung, Pendukung } = require('../../models');

const jumlahPendukungPengguna = async (req, res) => {
    try {
        const jumlahPendukungPengguna = await Trx_dokumen_pendukung.count({
            where: {
                sumber_dukungan: "Jemaat"
            },
            include: [{
                model: Pendukung,
                where: {
                    id_pengajuan: req.params.id,
                }
            }]
        });

        const jumlahPendukungPenggunaTerima = await Trx_dokumen_pendukung.count({
            where: {
                sumber_dukungan: "Jemaat"
            },
            include: [{
                model: Pendukung,
                where: {
                    id_pengajuan: req.params.id,
                    status: "Diterima",
                }
            }]
        });

        return successResponse(req, res, 'Jumlah Pendukung Pengguna Berhasil Diambil', {jumlahPendukungPengguna, jumlahPendukungPenggunaTerima});
    }
    catch (err) {
        console.log(err.message);
        return errorResponse(req, res, 500, `Internal Server Error. ${err.message}`);
    }
};

module.exports = jumlahPendukungPengguna;