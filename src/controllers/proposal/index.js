const pengajuanProposal = require('./pengajuan_proposal');
const listPengajuanProposal = require('./list_pengajuan_proposal');
const checkStatusProposal = require('./checkStatusProposal');
const detailPengajuanById = require('./detailPengajuanById');
const detailDokumenInstansi = require('./detailDokumenInstansi');
const detailDokumenPemohon = require('./detailDokumenPemohon');
const detailDokumenPendukung = require('./detailDokumenPendukung');

module.exports = {
    pengajuanProposal,
    listPengajuanProposal,
    checkStatusProposal,
    detailPengajuanById,
    detailDokumenInstansi,
    detailDokumenPemohon,
    detailDokumenPendukung
};