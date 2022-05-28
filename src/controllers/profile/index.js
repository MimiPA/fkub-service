//Response Message
const { errorResponse, successResponse } = require("../../helpers");

//Import Model
const { Master_account, Master_user, Master_religion, Master_role, Trx_access_token } = require('../../models');

const profile = async (req, res) => {
    try {
        const id_user = req.user.id;

        const dataProfile = await Master_user.findOne({
            where: { id: id_user },
            attributes: [
                'nik',
                'nama_depan',
                'nama_belakang',
                'jenis_kelamin',
                'telepon',
                'tempat_lahir',
                'tanggal_lahir',
                'alamat',
                'rt',
                'rw',
                'kelurahan',
                'kecamatan',
                'foto'
            ],
            include: [{
                model: Master_religion,
                attributes: ["agama"]
            }, {
                model: Master_account,
                attributes: ['id', 'email'],
                include: [{
                    model: Master_role,
                    attributes: ["role"],
                    required: true,
                }]
            }]
        });

        if (dataProfile) {
            return res.send(dataProfile);
        }
    }
    catch (err) {
        console.log(err.message);
        return errorResponse(req, res, 500, 'Internal Server Error');
    }
};

module.exports = profile;