const cloudinary = require('cloudinary').v2;
const Datauri = require('datauri/parser');
const { nanoid } = require('nanoid');
const { Op } = require('sequelize');

//Response Message
const { errorResponse, successResponse } = require("../../helpers");

//Import Model
const { Master_religion, Master_applicant } = require('../../models');

const pengajuanProposal = async (req, res) => {
    try {
        if (req.file.mimetype != 'application/pdf') {
            return errorResponse(req, res, 400, 'File Anda Bukan Tipe .pdf !!! Mohon upload ulang');
        }

        // Generate Referral Code
        const referralCode = nanoid(8);

        if (referralCode == null) {
            return errorResponse(req, res, 400, "Referral code doesn't exist");
        }

        const religion = await Master_religion.findOne({
            where: {
                [Op.and]: [{ agama: req.body.agama }, { tempat_ibadah: req.body.tempat_ibadah }]
            }
        });

        if (!religion) {
            return errorResponse(req, res, 404, "Tempat Ibadah Yang Dipilih Tidak Tersedia");
        }

        const datauri = new Datauri().format('.pdf' || '.docx', req.file.buffer);
        const uploaded = await cloudinary.uploader.upload(datauri.content);

        const create = await Master_applicant.create({
            id_user: req.user.id,
            id_religion: religion.id,
            referral_code: referralCode,
            judul: req.body.judul,
            jenis_pembangunan: req.body.jenis_pembangunan,
            nama_tempat: req.body.nama_tempat,
            alamat: req.body.alamat,
            nama_file_permohonan: uploaded.secure_url,
            idUser_create: req.user.id
        });

        if (!create) {
            return errorResponse(req, res, 400, 'Submission Unsuccessfully. Please Try Again!');
        }

        return successResponse(req, res, 'Submission Successfully.', create);
    }
    catch (err) {
        console.log(err.message);
        return errorResponse(req, res, 500, 'Internal Server Error');
    }
};

module.exports = pengajuanProposal;