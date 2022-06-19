//Response Message
const sequelize = require("sequelize");
const { errorResponse, successResponse } = require("../../helpers");

//Import Model
const { Pengajuan, Trx_dokumen_instansi } = require('../../models');

const jumlahPMPTSP = async (req, res) => {
    try {
        const jumlahPengajuan = await Pengajuan.count();

        const jumlahDiproses = await Pengajuan.count({
            where: {
                status: "Proses",
            },
        });

        const jumlahDitolak = await Pengajuan.count({
            where: {
                status: "Ditolak",
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

        return successResponse(req, res, 'Jumlah Untuk PMPTSP Berhasil Diambil', { jumlahPengajuan, jumlahDiproses, jumlahDitolak, jumlahSelesai, jumlahPermintaanKRK });
    }
    catch (err) {
        console.log(err.message);
        return errorResponse(req, res, 500, `Internal Server Error. ${err.message}`);
    }
};

module.exports = jumlahPMPTSP;