//Response Message
const { errorResponse, successResponse } = require("../../helpers");

//Import Model
const { Pengajuan, Pengguna, Pendukung, Trx_dokumen_pendukung, Trx_dokumen_penentang } = require('../../models');

const petaAllPendukung = async (req, res) => {
    try {
        const id = req.params.id;

        const dataPengajuan = await Pengajuan.findOne({
            where: {
                id: id
            },
            attributes: {
                exclude: [
                    'surat_permohonan',
                    'idUser_update',
                    'updatedAt',
                ],
            },
            include: [{
                model: Pengguna,
                attributes: { exclude: ['role', 'password', 'is_active', 'createdAt', 'updatedAt'] }
            }],
        });

        const dataJemaat = await Pendukung.findAll({
            where: {
                id_pengajuan: id
            },
            attributes: {
                exclude: [
                    'idUser_update',
                    'updatedAt',
                ],
            },
            include: [{
                model: Trx_dokumen_pendukung,
                where: {
                    sumber_dukungan: "Jemaat",
                },
                attributes: {
                    exclude: [
                        'idUser_update',
                        'updatedAt',
                    ]
                }
            }],
        });

        const dataMasyarakat = await Pendukung.findAll({
            where: {
                id_pengajuan: id
            },
            attributes: {
                exclude: [
                    'idUser_update',
                    'updatedAt',
                ],
            },
            include: [{
                model: Trx_dokumen_pendukung,
                where: {
                    sumber_dukungan: "Masyarakat",
                },
                attributes: {
                    exclude: [
                        'idUser_update',
                        'updatedAt',
                    ]
                }
            }],
        });

        const dataPenentang = await Trx_dokumen_penentang.findAll({
            attributes: {
                exclude: [
                    'idUser_update',
                    'updatedAt',
                ],
            },
            include: [{
                model: Pendukung,
                where: {
                    id_pengajuan: id
                },
                attributes: {
                    exclude: [
                        'idUser_update',
                        'updatedAt',
                    ]
                }
            }],
        });

        if (!(dataPengajuan && dataJemaat && dataMasyarakat && dataPenentang)) {
            return successResponse(req, res, 'Data Tidak Ditemukan');
        }

        const data = {
            dataPengajuan: [dataPengajuan],
            dataJemaat,
            dataMasyarakat,
            dataPenentang
        };

        return successResponse(req, res, 'Pengajuan By ID, List Pendukung, List Penentang Berhasil Diambil', data);
    }
    catch (err) {
        console.log(err.message);
        return errorResponse(req, res, 500, `Internal Server Error. ${err.message}`);
    }
};

module.exports = petaAllPendukung;