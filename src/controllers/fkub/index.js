const listAllPengajuan = require('./listAllPengajuan');
const pengajuanById = require('./pengajuanById');
const detailDokumenPemohon = require('./detailDokumenPemohon');
const detailDokumenInstansi = require('./detailDokumenInstansi');
const detailDokumenPendukung = require('./detailDokumenPendukung');
const changeStatusPendukung = require('./changeStatusPendukung');

const uploadSuratRekomendasi = require('./uploadSuratRekomendasi');
const listAllSuratRekomendasi = require('./listAllSuratRekomendasi');
const suratRekomendasiById = require('./suratRekomendasi_byId');

module.exports = {
    listAllPengajuan,
    pengajuanById,
    detailDokumenPemohon,
    detailDokumenInstansi,
    detailDokumenPendukung,
    changeStatusPendukung,
    uploadSuratRekomendasi,
    listAllSuratRekomendasi,
    suratRekomendasiById,
};