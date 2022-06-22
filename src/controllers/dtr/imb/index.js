const listAllPengajuan = require('./listAllPengajuan');
const detailPengajuanById = require('./detailPengajuanById');
const detailDokumenPemohon = require('./detailDokumenPemohon');
const detailDokumenInstansi = require('./detailDokumenInstansi');
const detailDokumenPendukung = require('./detailDokumenPendukung');

const listAllSuratIMB = require('./listAllSuratIMB');
const suratIMBById = require('./suratIMBById');
const uploadSuratIMB = require('./uploadSuratIMB');

module.exports = {
    listAllPengajuan,
    detailPengajuanById,
    detailDokumenPemohon,
    detailDokumenInstansi,
    detailDokumenPendukung,
    listAllSuratIMB,
    suratIMBById,
    uploadSuratIMB,
};