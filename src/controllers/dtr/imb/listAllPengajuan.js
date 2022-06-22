//Response Message
const { Op } = require("sequelize");
const { errorResponse, successResponse } = require("../../../helpers");

//Import Model
const { Pengajuan, Pengguna, Trx_dokumen_instansi } = require('../../../models');

const listAllPengajuan = async (req, res) => {
    try {
        const data = await Pengajuan.findAll({
            include: [{
                model: Trx_dokumen_instansi,
                where: {
                    [Op.and]: {
                        kategori_dokumen: ["Surat Rekomendasi FKUB", "Surat Rekomendasi Kemenag"],
                    },
                },
            },
            {
                model: Pengguna,
                attributes: ["nik", "email", "nama_depan", "nama_belakang", "jenis_kelamin", "agama", "telepon"]
            }],
        });
        
        if (!data) {
            return successResponse(req, res, 'Data Tidak Tersedia');
        }

        return successResponse(req, res, 'Daftar Pengajuan Berhasil Diambil', data);
    }
    catch (err) {
        console.log(err.message);
        return errorResponse(req, res, 500, `Internal Server Error. ${err.message}`);
    }
};

module.exports = listAllPengajuan;