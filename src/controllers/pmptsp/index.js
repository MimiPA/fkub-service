const listPengajuan = require('./listPengajuan');
const pengajuanById = require('./pengajuan_byId');
const changeStatusPengajuan = require('./changeStatusPengajuan');
const listSuratPermintaanKRK = require('./listSuratPermintaanKRK');
const permintaanKRKById = require('./permintaanKRK_byId');

module.exports = {
    listPengajuan,
    pengajuanById,
    changeStatusPengajuan,
    listSuratPermintaanKRK,
    permintaanKRKById
};