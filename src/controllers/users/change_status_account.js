//Response Message
const { errorResponse, successResponse } = require("../../helpers");

//Import Model
const { Pengguna } = require('../../models');

const changeStatusAccount = async (req, res) => {
    try {
        const nik = req.params.nik;
        let { status } = req.query;

        if (!nik) {
            return errorResponse(req, res, 400, 'Diperlukan ID Akun pada parameter request.');
        }
        if (!status) {
            return errorResponse(req, res, 400, 'Diperlukan Status Akun pada parameter request.');
        }

        const id_user = req.user.nik;
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

        const userAccount = await Pengguna.findOne({
            where: {
                nik: nik
            }
        });

        if (!userAccount) {
            return errorResponse(req, res, 400, 'Akun user tidak ditemukan di database');
        }

        if (status == "Disable") {
            status = "Enable";
        }
        else if (status == "Enable") {
            status = "Disable";
        }

        const update = await Pengguna.update({ is_active: status }, { where: { nik: nik } });
        if (!update) {
            return errorResponse(req, res, 400, 'Gagal Mengubah Status Akun. Mohon Coba Lagi!');
        }

        return successResponse(req, res, `Berhasil Mengubah Status Akun`, status);
    }
    catch (err) {
        console.log(err.message);
        return errorResponse(req, res, 500, 'Internal Server Error');
    }
};

module.exports = changeStatusAccount;