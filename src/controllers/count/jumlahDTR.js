//Response Message
const sequelize = require("sequelize");
const { errorResponse, successResponse } = require("../../helpers");

//Import Model
const { Trx_dokumen_instansi, Pengajuan } = require('../../models');

const jumlahDTR = async (req, res) => {
    try {
        const jumlahKRK = await Trx_dokumen_instansi.count({
            where: {
                kategori_dokumen: "KRK"
            },
        });

        const jumlahIMB = await Trx_dokumen_instansi.count({
            where: {
                kategori_dokumen: "IMB"
            },
        });

        const jumlahDiproses = await Pengajuan.count({
            where: {
                status: "Proses",
            },
        });

        const jumlahSelesai = await Pengajuan.count({
            where: {
                status: "Selesai",
            },
        });

        const jumlahPermintaanKRK = await Trx_dokumen_instansi.count({
            where: {
                kategori_dokumen: "Surat Pengajuan KRK"
            }
        });

        return successResponse(req, res, 'Jumlah Untuk Dinas Tata Ruang Berhasil Diambil', { jumlahDiproses, jumlahPermintaanKRK, jumlahKRK, jumlahIMB, jumlahSelesai });
    }
    catch (err) {
        console.log(err.message);
        return errorResponse(req, res, 500, `Internal Server Error. ${err.message}`);
    }
};

module.exports = jumlahDTR;