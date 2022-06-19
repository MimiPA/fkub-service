const sequelize = require("sequelize");
const { Op } = require("sequelize");

//Response Message
const { errorResponse, successResponse } = require("../../helpers");

//Import Model
const { Trx_dokumen_instansi, Pengajuan, Trx_dokumen_pemohon } = require('../../models');

const jumlahKEMENAG = async (req, res) => {
    try {
        const jumlahRekomendasi = await Trx_dokumen_instansi.count({
            where: {
                kategori_dokumen: "Surat Rekomendasi Kemenag"
            },
        });

        const jumlahPermintaanRekomen = await Trx_dokumen_pemohon.count({
            where: {
                kategori_dokumen: {
                    [Op.and]: ["Surat Permohonan Rekomendasi Kemenag", "SK Panitia Pembangunan"]
                },
            },
        });

        const jumlahDiproses = await Pengajuan.count({
            where: {
                status: "Proses",
            },
        });

        return successResponse(req, res, 'Jumlah Untuk Kemenag Berhasil Diambil', { jumlahRekomendasi, jumlahPermintaanRekomen, jumlahDiproses });
    }
    catch (err) {
        console.log(err.message);
        return errorResponse(req, res, 500, `Internal Server Error. ${err.message}`);
    }
};

module.exports = jumlahKEMENAG;