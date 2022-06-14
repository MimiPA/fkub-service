//Response Message
const { errorResponse, successResponse } = require("../../helpers");

//Import Model
const { Trx_dokumen_pemohon, Pengajuan, Pengguna } = require('../../models');

const listSuratPermohonan = async (req, res) => {
    try {
        const data = await Trx_dokumen_pemohon.findAll({
            where: {
                kategori_dokumen: "Surat Permohonan Rekomendasi Kemenag"
            },
            include: [{
                model: Pengajuan,
                include: [{
                    model: Pengguna,
                    attributes: ["nik", "email", "nama_depan", "nama_belakang", "jenis_kelamin", "agama", "telepon"]
                }]
            }]
        });

        if (!data) {
            return successResponse(req, res, 'Data Tidak Tersedia');
        }

        return successResponse(req, res, 'Daftar Surat Permohonan Rekomendasi Kemenag Berhasil Diambil', data);
    }
    catch (err) {
        console.log(err.message);
        return errorResponse(req, res, 500, `Internal Server Error. ${err.message}`);
    }
};

module.exports = listSuratPermohonan;

