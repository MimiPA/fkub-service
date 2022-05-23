//Response Message
const { errorResponse, successResponse } = require("../../helpers");

//Import Model
const { Master_account, Master_user, Master_religion, Master_role, Trx_access_token } = require('../../models');

const sequelize = require('sequelize');
const Op = sequelize.Op;

const allUsers = async (req, res) => {
    try {
        const id_user = req.user.id;

        //Validate if user exist in DB
        const admin = await Master_account.findOne({
            where: {
                id: id_user,
                is_active: "Enable"
            },
            include: [{
                model: Master_role,
                attributes: ["role"],
                where: { role: "Admin" },
            }]
        });

        if (!admin) {
            return errorResponse(req, res, 400, 'Mohon maaf, Anda tidak dapat mengakses menu ini');
        }

        const dataProfile = await Master_user.findAll({
            attributes: [
                'id',
                'nik',
                'nama_depan',
                'nama_belakang',
                'nama_lengkap',
                'jenis_kelamin',
                'telepon',
                'tempat_lahir',
                'tanggal_lahir',
                'alamat',
                'rt',
                'rw',
                'kelurahan',
                'kecamatan',
                'foto',
                'idUser_create',
                'idUser_update',
                'createdAt',
                'updatedAt'
            ],
            include: [{
                model: Master_religion,
                attributes: ["agama"]
            }, {
                model: Master_account,
                attributes: ['id', 'email', 'is_active'],
                include: [{
                    model: Master_role,
                    attributes: ["role"]
                }]
            }],
            order:[
                ['id']
            ]
        });

        if (dataProfile) {
            return successResponse(req, res, 'All users retrieved successfully', dataProfile);
        }
    }
    catch (err) {
        console.log(err.message);
        return errorResponse(req, res, 500, 'Internal Server Error');
    }
};

module.exports = allUsers;