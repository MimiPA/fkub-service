//Response Message
const { errorResponse, successResponse } = require("../../helpers");

//Import Model
const { Master_account, Master_user, Master_religion, Master_role, Trx_access_token } = require('../../models');

const sequelize = require('sequelize');
const Op = sequelize.Op;

const user_byId = async (req, res) => {
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

        const dataProfile = await Master_user.findOne({
            where: { id: req.params.id },
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
                    attributes: ["role"],
                    required: true,
                }]
            }]
        });

        if (!dataProfile) {
            return errorResponse(req, res, 400, 'User Not Found');
        }

        return successResponse(req, res, 'User retrieved successfully', dataProfile);
    }
    catch (err) {
        console.log(err.message);
        return errorResponse(req, res, 500, 'Internal Server Error');
    }
};

module.exports = user_byId;