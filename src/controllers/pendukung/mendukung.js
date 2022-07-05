//Response Message
const { errorResponse, successResponse } = require("../../helpers");

//Import Model
const { Pengajuan, Pendukung, Trx_dokumen_pendukung } = require('../../models');

const mendukung = async (req, res) => {
    try {
        const { id } = req.params;
        const { sumber_dukungan } = req.query;

        const {
            nik,
            nama_lengkap,
            jenis_kelamin,
            agama,
            telepon,
            tempat_lahir,
            tanggal_lahir,
            alamat,
            rt,
            rw,
            kecamatan,
            kelurahan
        } = req.body;

        if (!id) {
            return errorResponse(req, res, 400, 'ID Pengajuan Dibutuhkan Di Request Parameter');
        }
        else if (!sumber_dukungan || sumber_dukungan == "") {
            return errorResponse(req, res, 400, 'Mohon Memilih Sumber Dukungan');
        }

        const dataPengajuan = await Pengajuan.findOne({
            where: {
                id: id
            },
        });

        if (!dataPengajuan) {
            return errorResponse(req, res, 404, 'Data Tidak Ditemukan');
        }

        const dataPendukung = await Pendukung.findOne({
            where: {
                nik: req.body.nik,
                id_pengajuan: id,
            },
        });

        if (dataPendukung) {
            return errorResponse(req, res, 400, `NIK tersebut Sudah Pernah Mendukung`);
        }

        const createPendukung = await Pendukung.create({
            nik: nik,
            nama_lengkap: nama_lengkap,
            jenis_kelamin: jenis_kelamin,
            agama: agama,
            telepon: telepon,
            tempat_lahir: tempat_lahir,
            tanggal_lahir: tanggal_lahir,
            alamat: alamat,
            rt: rt,
            rw: rw,
            kecamatan: kecamatan,
            kelurahan: kelurahan,
            status: "Submit",
            idUser_create: req.user.nik,
            id_pengajuan: id
        })

        const createDukung = await Trx_dokumen_pendukung.create({
            id: createPendukung.id,
            sumber_dukungan: sumber_dukungan,
            surat_pernyataan: "-",
            foto_ktp: "-",
            foto_diri: "-",
            tanda_tangan: "-",
            idUser_create: req.user.nik
        });

        return successResponse(req, res, 'Mendukung Berhasil. Mohon Melengkapi Berkas', { createPendukung, createDukung });
    }
    catch (err) {
        console.log(err.message);
        return errorResponse(req, res, 500, `Internal Server Error. ${err.message}`);
    }
};

module.exports = mendukung;