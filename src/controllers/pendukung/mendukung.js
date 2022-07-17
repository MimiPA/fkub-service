//Response Message
const { errorResponse, successResponse } = require("../../helpers");

//Import Model
const { Pengajuan, Pendukung, Trx_dokumen_pendukung } = require('../../models');

const uploadImage = require('../../utils/image/uploadImage');

const urlKu = "http://localhost:5000";

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
            kelurahan,
            foto_ktp,
            foto_diri,
            tanda_tangan
        } = req.body;

        if (!id) {
            return errorResponse(req, res, 400, 'ID Pengajuan Dibutuhkan Di Request Parameter');
        }
        else if (!sumber_dukungan || sumber_dukungan == "") {
            return errorResponse(req, res, 400, 'Mohon Memilih Sumber Dukungan');
        }
        else if ((foto_diri && foto_ktp && tanda_tangan) == null || !(foto_ktp && foto_diri && tanda_tangan) || (foto_ktp && foto_diri && tanda_tangan) == undefined) {
            return errorResponse(req, res, 400, 'Mohon Foto KTP / Foto Diri / Tanda Tangan');
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
            return errorResponse(req, res, 400, `NIK Sudah Pernah Mendukung`);
        }

        const gambarKTP = uploadImage(foto_ktp, "./src/public");
        const linkGambarKTP = `${urlKu}/${gambarKTP}`;

        const gambarDiri = uploadImage(foto_diri, "./src/public");
        const linkGambarDiri = `${urlKu}/${gambarDiri}`;

        const gambarTTD = uploadImage(tanda_tangan, "./src/public");
        const linkGambarTTD = `${urlKu}/${gambarTTD}`;

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
            idUser_update: req.user.nik,
            id_pengajuan: id
        })

        const createDukung = await Trx_dokumen_pendukung.create({
            id: createPendukung.id,
            sumber_dukungan: sumber_dukungan,
            surat_pernyataan: "-",
            foto_ktp: linkGambarKTP,
            foto_diri: linkGambarDiri,
            tanda_tangan: linkGambarTTD,
            idUser_create: req.user.nik
        });

        return successResponse(req, res, 'Mendukung Berhasil.', { createPendukung, createDukung });
    }
    catch (err) {
        console.log(err.message);
        return errorResponse(req, res, 500, `Internal Server Error. ${err.message}`);
    }
};

module.exports = mendukung;