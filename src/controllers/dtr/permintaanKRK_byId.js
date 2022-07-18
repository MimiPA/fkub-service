//Response Message
const { errorResponse, successResponse } = require("../../helpers");

//Import Model
const { Pengajuan, Trx_dokumen_instansi, Pengguna } = require('../../models');

const permintaanKRKById = async (req, res) => {
    try {
        const data = await Trx_dokumen_instansi.findOne({
            where: {
                kategori_dokumen: 'Surat Pengajuan KRK',
                id: req.params.id
            },
            include: [{
                model: Pengajuan,
                attributes: ["jenis_pembangunan", "nama_tempat", "tempat_ibadah", "alamat", "status"],
                include: [{
                    model: Pengguna,
                    attributes: ["nik", "nama_depan", "nama_belakang", "agama", "telepon", "jenis_kelamin"],
                }],
            }, {
                model: Pengguna,
                attributes: ["nik", "nama_depan", "nama_belakang", "agama", "telepon"]
            }]
        });

        if (!data) {
            return successResponse(req, res, 'Tidak Ada Data Tersedia');
        }

        return successResponse(req, res, 'Rincian Daftar Permintaan KRK Berhasil Diambil', data);
    }
    catch (err) {
        console.log(err.message);
        return errorResponse(req, res, 500, `Internal Server Error. ${err.message}`);
    }
};

module.exports = permintaanKRKById;