//Response Message
const { errorResponse, successResponse } = require("../../../helpers");

//Import Model
const { Trx_dokumen_instansi, Pengajuan } = require('../../../models');

const listAllSuratIMB = async (req, res) => {
    try {
        const data = await Trx_dokumen_instansi.findAll({
            where: {
                kategori_dokumen: "IMB"
            },
            include: [{
                model: Pengajuan,
            }]
        });

        if (!data) {
            return successResponse(req, res, 'Data Tidak Tersedia');
        }

        return successResponse(req, res, 'Surat IMB Berhasil Diambil', data);
    }
    catch (err) {
        console.log(err.message);
        return errorResponse(req, res, 500, `Internal Server Error. ${err.message}`);
    }
};

module.exports = listAllSuratIMB;