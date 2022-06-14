const { Op } = require('sequelize');

//Response Message
const { errorResponse, successResponse } = require("../../helpers");

//Import Model
const { Pengguna, Pengajuan, Trx_dokumen_pemohon, Trx_dokumen_instansi, Trx_dokumen_pendukung } = require('../../models');

const detailDokumenInstansi = async (req, res) => {
    try {
        const id_pengajuan = req.params.id;

        const data = await Trx_dokumen_instansi.findAll({
            where: {
                id_pengajuan: id_pengajuan,
                kategori_dokumen: {
                    [Op.or]: ['KRK', 'Surat Rekomendasi Kemenag', 'Surat Rekomendasi FKUB', 'Surat Survey Lapangan', 'IMB']
                }
            }
        });

        if (!data) {
            return successResponse(req, res, 'Data Tidak Ditemukan');
        }

        return successResponse(req, res, 'Detail Dokumen Instansi Berhasil Diambil', data);
    }
    catch (err) {
        console.log(err.message);
        return errorResponse(req, res, 500, `Internal Server Error. ${err.message}`);
    }
};

module.exports = detailDokumenInstansi;