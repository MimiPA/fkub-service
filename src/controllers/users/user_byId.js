//Response Message
const { errorResponse, successResponse } = require("../../helpers");

//Import Model
const { Pengguna } = require('../../models');

const user_byId = async (req, res) => {
    try {
        const id_user = req.user.nik;

        //Validate if user exist in DB
        const admin = await Pengguna.findOne({
            where: {
                nik: id_user,
                is_active: "Enable",
                role: "FKUB"
            },
        });

        if (!admin) {
            return errorResponse(req, res, 400, 'Mohon maaf, Anda tidak dapat mengakses menu ini');
        }

        const dataProfile = await Pengguna.findOne({
            where: { nik: req.params.nik },
            attributes: [
                'nik',
                'role',
                'email',
                'is_active',
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
                'foto',
                'createdAt',
                'updatedAt'
            ],
        });

        if (!dataProfile) {
            return errorResponse(req, res, 400, 'Pengguna Tidak Ditemukan');
        }

        return successResponse(req, res, 'Data User Berhasil Diambil', dataProfile);
    }
    catch (err) {
        console.log(err.message);
        return errorResponse(req, res, 500, 'Internal Server Error');
    }
};

module.exports = user_byId;