const { Op } = require('sequelize');

//Response Message
const { errorResponse, successResponse } = require("../../helpers");

//Import Model
const { Pengajuan, Trx_dokumen_instansi } = require('../../models');

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

        let dataRekomen;

        if (dataPengajuan) {
            dataRekomen = await Trx_dokumen_instansi.findOne({
                where: {
                    id_pengajuan: dataPengajuan.id,
                    kategori_dokumen: "Surat Rekomendasi Kemenag",
                },
            });
        }
        else {
            dataRekomen = null;
        }

        return successResponse(req, res, 'Daftar Pengajuan Proposal Berhasil Diambil', { dataPengajuan, dataRekomen });
    }
    catch (err) {
        console.log(err.message);
        return errorResponse(req, res, 500, `Internal Server Error. ${err.message}`);
    }
};

module.exports = checkStatusProposal;