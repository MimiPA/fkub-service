const sequelize = require("sequelize");
const { Op } = require("sequelize");

//Response Message
const { errorResponse, successResponse } = require("../../helpers");

//Import Model
const { Trx_dokumen_instansi, Pengajuan, Trx_dokumen_pemohon } = require('../../models');

const jumlahFKUB = async (req, res) => {
    try {
        const jumlahRekomendasi = await Trx_dokumen_instansi.count({
            where: {
                kategori_dokumen: "Surat Rekomendasi FKUB"
            },
        });

        const jumlahPermintaanRekomen = await Trx_dokumen_pemohon.count({
            where: {
                kategori_dokumen: "Surat Permohonan Rekomendasi FKUB",
            },
        });

        const jumlahSelesai = await Pengajuan.count({
            where: {
                status: "Selesai",
            },
        });

        return successResponse(req, res, 'Jumlah Untuk FKUB Berhasil Diambil', { jumlahRekomendasi, jumlahPermintaanRekomen, jumlahSelesai });
    }
    catch (err) {
        console.log(err.message);
        return errorResponse(req, res, 500, `Internal Server Error. ${err.message}`);
    }
};

module.exports = jumlahFKUB;