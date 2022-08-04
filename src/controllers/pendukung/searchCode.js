//Response Message
const { errorResponse, successResponse } = require("../../helpers");

//Import Model
const { Pengajuan } = require('../../models');

const searchCode = async (req, res) => {
    try {
        const { referral_code } = req.params;

        if (!referral_code || referral_code == null || referral_code == "" || referral_code == "searchCode") {
            return errorResponse(req, res, 400, `Mohon memasukkan Referral Code`);
        }

        const data = await Pengajuan.findOne({
            where: {
                referral_code: referral_code,
                status: "Proses"
            },
        });

        if (!data) {
            return errorResponse(req, res, 400, `Data Tidak Ditemukan`);
        }

        return successResponse(req, res, 'Detail Pengajuan Berhasil Diambil', data);
    }
    catch (err) {
        console.log(err.message);
        return errorResponse(req, res, 500, `Internal Server Error. ${err.message}`);
    }
};

module.exports = searchCode;