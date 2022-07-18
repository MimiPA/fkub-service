const { Op } = require("sequelize");
const sequelize = require("sequelize");

//Response Message
const { errorResponse, successResponse } = require("../../helpers");

//Import Model
const { Trx_dokumen_pendukung, Pendukung } = require('../../models');

const jumlahPendukungMasyarakat = async (req, res) => {
    try {
        const jumlahPendukungMasyarakat = await Trx_dokumen_pendukung.count({
            where: {
                sumber_dukungan: "Masyarakat"
            },
            include: [{
                model: Pendukung,
                where: {
                    id_pengajuan: req.params.id,
                }
            }]
        });

        const jumlahPendukungMasyarakatTerima = await Trx_dokumen_pendukung.count({
            where: {
                sumber_dukungan: "Masyarakat"
            },
            include: [{
                model: Pendukung,
                where: {
                    id_pengajuan: req.params.id,
                    status:"Diterima",
                }
            }]
        });

        return successResponse(req, res, 'Jumlah Pendukung Masyarakat Berhasil Diambil', {jumlahPendukungMasyarakat, jumlahPendukungMasyarakatTerima});
    }
    catch (err) {
        console.log(err.message);
        return errorResponse(req, res, 500, `Internal Server Error. ${err.message}`);
    }
};

module.exports = jumlahPendukungMasyarakat;