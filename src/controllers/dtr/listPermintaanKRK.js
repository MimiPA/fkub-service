//Response Message
const { errorResponse, successResponse } = require("../../helpers");

//Import Model
const { Pengajuan, Trx_dokumen_instansi } = require('../../models');

const listPermintaanKRK = async (req, res) => {
    try {
        const data = await Trx_dokumen_instansi.findAll({
            where: {
                kategori_dokumen: 'Surat Pengajuan KRK',
            },
            include: [{
                model: Pengajuan,
                attributes: ["jenis_pembangunan", "nama_tempat", "tempat_ibadah", "alamat"]
            }]
        });

        if (!data) {
            return successResponse(req, res, 'Tidak Ada Data Tersedia');
        }

        return successResponse(req, res, 'Daftar Permintaan KRK Berhasil Diambil', data);
    }
    catch (err) {
        console.log(err.message);
        return errorResponse(req, res, 500, `Internal Server Error. ${err.message}`);
    }
};

module.exports = listPermintaanKRK;