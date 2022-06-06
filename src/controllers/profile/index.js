//Response Message
const { errorResponse, successResponse } = require("../../helpers");

//Import Model
const { Pengguna } = require('../../models');

const profile = async (req, res) => {
    try {
        const id_user = req.user.nik;

        if (id_user == undefined) {
            return errorResponse(req, res, 400, 'Request ID Parameter');
        }

        const dataProfile = await Pengguna.findOne({
            where: { nik: id_user },
            attributes: [
                'nik',
                'role',
                'email',
                'nama_lengkap',
                'nama_depan',
                'nama_belakang',
                'jenis_kelamin',
                'agama',
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
        });

        if (dataProfile) {
            return res.send(dataProfile);
        }
    }
    catch (err) {
        console.log(err.message);
        return errorResponse(req, res, 500, `Internal Server Error. ${err.message}`);
    }
};

module.exports = profile;