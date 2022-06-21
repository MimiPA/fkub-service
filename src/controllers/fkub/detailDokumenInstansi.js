const { Op } = require('sequelize');

//Response Message
const { errorResponse, successResponse } = require("../../helpers");

//Import Model
const { Trx_dokumen_instansi } = require('../../models');

const detailDokumenInstansi = async (req, res) => {
    try {
        const id_pengajuan = req.params.id;

        const data = await Trx_dokumen_instansi.findAll({
            where: {
                id_pengajuan: id_pengajuan,
                kategori_dokumen: {
                    [Op.or]: ["Surat Rekomendasi Kemenag", "KRK", "Surat Survey Lapangan", "Surat Rekomendasi FKUB"]
                }
            },
        });

        if (!data) {
            return successResponse(req, res, 'Data Tidak Ditemukan');
        }

        return successResponse(req, res, 'Detail Berhasil Diambil', data);
    }
    catch (err) {
        console.log(err.message);
        return errorResponse(req, res, 500, `Internal Server Error. ${err.message}`);
    }
};

module.exports = detailDokumenInstansi;