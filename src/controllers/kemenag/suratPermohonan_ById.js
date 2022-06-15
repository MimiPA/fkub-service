const { Op } = require("sequelize");

//Response Message
const { errorResponse, successResponse } = require("../../helpers");

//Import Model
const { Trx_dokumen_pemohon, Pengajuan, Pengguna } = require('../../models');

const suratPermohonanById = async (req, res) => {
    try {
        const id = req.params.id;

        const dataSurat = await Trx_dokumen_pemohon.findOne({
            where: {
                id: id,
                kategori_dokumen: "Surat Permohonan Rekomendasi Kemenag",
            },
            include: [{
                model: Pengajuan,
                include: [{
                    model: Pengguna,
                    attributes: ["nik", "email", "nama_depan", "nama_belakang", "jenis_kelamin", "agama", "telepon"]
                }]
            }]
        });

        const dataSK = await Trx_dokumen_pemohon.findOne({
            where: {
                kategori_dokumen: "SK Panitia Pembangunan",
                id_pengajuan: dataSurat.id_pengajuan
            }
        });

        const data = { dataSurat, dataSK };

        if (!dataSurat && !dataSK) {
            return successResponse(req, res, 'Data Tidak Tersedia');
        }

        return successResponse(req, res, 'Detail Surat Permohonan Rekomendasi Kemenag Berhasil Diambil', data);
    }
    catch (err) {
        console.log(err.message);
        return errorResponse(req, res, 500, `Internal Server Error. ${err.message}`);
    }
};

module.exports = suratPermohonanById;

