const { Op } = require('sequelize');

//Response Message
const { errorResponse, successResponse } = require("../../helpers");

//Import Model
const { Trx_dokumen_instansi, Pengajuan } = require('../../models');

const listSuratPermintaanKRK = async (req, res) => {
    try {
        const id_user = req.user.nik;

        const data = await Trx_dokumen_instansi.findAll({
            where: { id_user: id_user },
            include: [{
                model: Pengajuan,
            }]
        });

        if (!data) {
            return successResponse(req, res, 'Data Tidak Tersedia');
        }

        return successResponse(req, res, 'Riwayat Surat Permintaan KRK Berhasil Diambil', data);
    }
    catch (err) {
        console.log(err.message);
        return errorResponse(req, res, 500, `Internal Server Error. ${err.message}`);
    }
};

module.exports = listSuratPermintaanKRK;