//Response Message
const { errorResponse, successResponse } = require("../../helpers");

//Import Model
const { Master_account, Master_user, Master_religion, Master_role, Trx_access_token } = require('../../models');

const changeStatusAccount = async (req, res) => {
    try {
        const id = req.params.id;
        let { status } = req.query;

        if (!id) {
            return errorResponse(req, res, 400, 'Required user ID in request parameter.');
        }
        if (!status) {
            return errorResponse(req, res, 400, 'Required user STATUS in request parameter.');
        }

        const id_user = req.user.id;
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

        const userAccount = await Master_account.findOne({
            where: {
                id: id
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

        const update = await Master_account.update({ is_active: status }, { where: { id: id } });
        if (!update) {
            return errorResponse(req, res, 400, 'Gagal Mengubah Status Akun. Mohon Coba Lagi.');
        }

        return successResponse(req, res, `Successfully Changed Account Status`, status);
    }
    catch (err) {
        console.log(err.message);
        return errorResponse(req, res, 500, 'Internal Server Error');
    }
};

module.exports = changeStatusAccount;