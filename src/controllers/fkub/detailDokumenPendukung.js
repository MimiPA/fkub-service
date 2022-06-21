const { Op } = require('sequelize');

//Response Message
const { errorResponse, successResponse } = require("../../helpers");

//Import Model
const { Trx_dokumen_pendukung, Trx_dokumen_penentang, Pengguna } = require('../../models');

const detailDokumenPendukung = async (req, res) => {
    try {
        const id_pengajuan = req.params.id;

        const dataPengguna = await Trx_dokumen_pendukung.findAll({
            where: {
                id_pengajuan: id_pengajuan,
                sumber_dukungan: "Pengguna",
            },
            include: [{
                model: Pengguna,
                attributes: { exclude: ['role', 'password', 'is_active', 'createdAt', 'updatedAt'] }
            }]
        });

        const dataMasyarakat = await Trx_dokumen_pendukung.findAll({
            where: {
                id_pengajuan: id_pengajuan,
                sumber_dukungan: "Masyarakat",
            },
            include: [{
                model: Pengguna,
                attributes: { exclude: ['role', 'password', 'is_active', 'createdAt', 'updatedAt'] }
            }]
        });

        const dataPenentang = await Trx_dokumen_penentang.findAll({
            where: {
                id_pengajuan: id_pengajuan,
            },
            include: [{
                model: Pengguna,
                attributes: { exclude: ['role', 'password', 'is_active', 'createdAt', 'updatedAt'] }
            }]
        });

        if (!(dataPengguna || dataMasyarakat || dataPenentang)) {
            return successResponse(req, res, 'Data Tidak Ditemukan');
        }

        const data = {
            dataPengguna,
            dataMasyarakat,
            dataPenentang
        }

        return successResponse(req, res, 'Detail Berhasil Diambil', data);
    }
    catch (err) {
        console.log(err.message);
        return errorResponse(req, res, 500, `Internal Server Error. ${err.message}`);
    }
};

module.exports = detailDokumenPendukung;