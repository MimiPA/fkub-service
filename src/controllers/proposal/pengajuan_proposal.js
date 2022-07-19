const cloudinary = require('cloudinary').v2;
const Datauri = require('datauri/parser');
const { nanoid } = require('nanoid');
const { Op } = require('sequelize');

//Response Message
const { errorResponse, successResponse } = require("../../helpers");

//Import Model
const { Pengajuan, Pelacakan, Trx_status_lacak } = require('../../models');

const pengajuanProposal = async (req, res) => {
    try {
        if (req.file == null || !req.file) {
            return errorResponse(req, res, 400, 'Surat Pengajuan Perlu Diisi');
        }

        if (req.body.jenis_pembangunan == 'Pilih' || req.body.jenis_pembangunan == "") {
            return errorResponse(req, res, 400, "Mohon Memilih Jenis Pembangunan");
        }
        else if (req.body.nama_tempat == null || !req.body.nama_tempat || req.body.nama_tempat == " ") {
            return errorResponse(req, res, 400, "Mohon Mengisi Nama Tempat");
        }
        else if (req.body.alamat == null || !req.body.alamat || req.body.alamat == " ") {
            return errorResponse(req, res, 400, "Mohon Mengisi Alamat");
        }
        else if (req.body.rt == null || !req.body.rt || req.body.rt == " ") {
            return errorResponse(req, res, 400, "Mohon Mengisi RT");
        }
        else if (req.body.rw == null || !req.body.rw || req.body.rw == " ") {
            return errorResponse(req, res, 400, "Mohon Mengisi RW");
        }
        else if (req.body.kelurahan == null || !req.body.kelurahan || req.body.kelurahan == "Kelurahan") {
            return errorResponse(req, res, 400, "Mohon Memilih Kelurahan");
        }
        else if (req.body.kecamatan == null || !req.body.kecamatan || req.body.kecamatan == "Kecamatan") {
            return errorResponse(req, res, 400, "Mohon Memilih Kecamatan");
        }

        if (req.file.mimetype != 'application/pdf') {
            return errorResponse(req, res, 400, 'File Anda Bukan Tipe .pdf !!! Mohon upload ulang');
        }
        else if (req.file.size > 5242880) {
            return errorResponse(req, res, 400, 'Batas Maksimal Ukuran File 5 MB');
        }

        // Generate Referral Code
        const referralCode = nanoid(8);

        if (referralCode == null) {
            return errorResponse(req, res, 400, "Referral code tidak tersedia. Mohon Coba Lagi!");
        }

        const proposal = await Pengajuan.findOne({
            where: {
                id_user: req.user.nik,
                status: { [Op.or]: ["Pengajuan", "Proses"] }
            }
        });

        if (proposal) {
            return errorResponse(req, res, 400, 'Tidak Dapat Mengajukan. Anda Masih Memiliki Pengajuan Yang Dalam Proses / Belum Selesai');
        }

        const dataPengajuan = await Pengajuan.findOne({
            where: {
                jenis_pembangunan: req.body.jenis_pembangunan,
                nama_tempat: req.body.nama_tempat,
                alamat: req.body.alamat,
                rt: req.body.rt,
                rw: req.body.rw,
            },
        });

        if (dataPengajuan) {
            return errorResponse(req, res, 400, 'Rincian Pengajuan Sudah Pernah Diajukan.');
        }

        const datauri = new Datauri().format('.pdf', req.file.buffer);
        const uploaded = await cloudinary.uploader.upload(datauri.content);

        let tempat_ibadah = "";
        if (req.user.agama == 'Buddha') {
            tempat_ibadah = "Vihara";
        }
        else if (req.user.agama == 'Hindu') {
            tempat_ibadah = "Pura";
        }
        else if (req.user.agama == 'Islam') {
            tempat_ibadah = "Masjid";
        }
        else if (req.user.agama == 'Konghucu') {
            tempat_ibadah = "Klenteng";
        }
        else {
            tempat_ibadah = "Gereja";
        }

        const createPengajuan = await Pengajuan.create({
            referral_code: referralCode,
            jenis_pembangunan: req.body.jenis_pembangunan,
            nama_tempat: req.body.nama_tempat,
            tempat_ibadah: tempat_ibadah,
            alamat: req.body.alamat,
            rt: req.body.rt,
            rw: req.body.rw,
            kelurahan: req.body.kelurahan,
            kecamatan: req.body.kecamatan,
            surat_permohonan: uploaded.secure_url,
            status: 'Pengajuan',
            idUser_create: req.user.nik,
            id_user: req.user.nik,
        });

        if (!createPengajuan) {
            return errorResponse(req, res, 400, 'Pengajuan Tidak Berhasil. Mohon Coba Lagi!');
        }

        const pelacakan = await Pelacakan.findOne({
            where: {
                kategori_pelacakan: "Pengajuan Surat Permohonan Pendirian Rumah Ibadah"
            }
        });

        const createStatus = await Trx_status_lacak.create({
            id_pengajuan: createPengajuan.id,
            id_pelacakan: pelacakan.id,
            idUser_create: req.user.nik
        });

        return successResponse(req, res, 'Pengajuan Berhasil.', { createPengajuan, createStatus });
    }
    catch (err) {
        console.log(err.message);
        return errorResponse(req, res, 500, `Internal Server Error. ${err.message}`);
    }
};

module.exports = pengajuanProposal;