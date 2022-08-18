//Response Message
const { errorResponse, successResponse } = require("../../helpers");

//Google Maps
const NodeGeocoder = require('node-geocoder');
const { API_KEY_MAPS } = process.env;

//Import Model
const { Pengajuan, Pendukung, Trx_dokumen_penentang } = require('../../models');

const uploadImage = require('../../utils/image/uploadImage');

const urlKu = "http://localhost:5000";

//Import Package to pdf
var fs = require('fs');
var pdf = require('dynamic-html-pdf');
const path = require("path");
const handlebars = require('handlebars');
const moment = require('moment');

const menentang = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            nik,
            nama_lengkap,
            jenis_kelamin,
            agama,
            telepon,
            tempat_lahir,
            tanggal_lahir,
            alamat,
            zipcode,
            rt,
            rw,
            kecamatan,
            kelurahan,
            foto_ktp,
            foto_diri,
            tanda_tangan,
            alasan,
        } = req.body;

        let pattern = /(\()?(\+62|62|0)(\d{2,3})?\)?[ .-]?\d{2,4}[ .-]?\d{2,4}[ .-]?\d{2,4}/g;
        let patternzipcode = /^[0-9]+$/i;

        if (!id) {
            return errorResponse(req, res, 400, 'ID Pengajuan Dibutuhkan Di Request Parameter');
        }
        else if ((foto_diri && foto_ktp && tanda_tangan) == null || !(foto_ktp && foto_diri && tanda_tangan) || (foto_ktp && foto_diri && tanda_tangan) == undefined) {
            return errorResponse(req, res, 400, 'Mohon Foto KTP / Foto Diri / Tanda Tangan');
        }
        else if (!telepon || telepon == null || telepon == "") {
            return errorResponse(req, res, 400, 'Mohon Memasukkan Nomor Telepon');
        }
        else if (telepon.length != 12 || pattern.test(telepon) == false) {
            return errorResponse(req, res, 400, 'Mohon Memasukkan Nomor Telepon Valid');
        }
        else if (!alasan || alasan == null || alasan == "") {
            return errorResponse(req, res, 400, 'Mohon Memasukkan Alasan Menentang');
        }
        else if (zipcode == null || !zipcode || zipcode == " " || patternzipcode.test(zipcode) == false) {
            return errorResponse(req, res, 400, "Mohon Mengisi Kode Pos Valid");
        }
        else if (zipcode.substring(0, 2) != "90") {
            return errorResponse(req, res, 400, "Hanya boleh Alamat + Kode Pos di Kota Makassar");
        }

        const optionsMaps = {
            provider: 'google',
            apiKey: API_KEY_MAPS,
        };

        const geocoder = NodeGeocoder(optionsMaps);

        const resMaps = await geocoder.geocode({
            address: alamat,
            countryCode: 'ID',
            zipcode: zipcode,
        });

        if (resMaps.length == 0 || resMaps == undefined || !resMaps) {
            return errorResponse(req, res, 400, "Mohon Memasukkan Alamat Valid Sesuai GMaps");
        }

        const latitude = resMaps[0].latitude;
        const longitude = resMaps[0].longitude;

        const dataPengajuan = await Pengajuan.findOne({
            where: {
                id: id
            },
        });

        if (!dataPengajuan) {
            return errorResponse(req, res, 404, 'Data Tidak Ditemukan');
        }

        const dataPendukung = await Pendukung.findOne({
            where: {
                nik: req.body.nik,
                id_pengajuan: id,
            },
        });

        if (dataPendukung) {
            return errorResponse(req, res, 400, `NIK Sudah Pernah Mendukung/Menentang`);
        }

        const gambarKTP = uploadImage(foto_ktp, "./src/public");
        const linkGambarKTP = `${urlKu}/${gambarKTP}`;

        const gambarDiri = uploadImage(foto_diri, "./src/public");
        const linkGambarDiri = `${urlKu}/${gambarDiri}`;

        const gambarTTD = uploadImage(tanda_tangan, "./src/public");
        const linkGambarTTD = `${urlKu}/${gambarTTD}`;

        const payload = {
            nik: nik,
            nama_lengkap: nama_lengkap,
            tempat_lahir: tempat_lahir,
            tanggal_lahir: tanggal_lahir,
            jenis_kelamin: jenis_kelamin,
            agama: agama,
            telepon: telepon,
            alamat: alamat,
            rt: rt,
            rw: rw,
            kelurahan: kelurahan,
            kecamatan: kecamatan,
            jenis_pembangunan: dataPengajuan.jenis_pembangunan,
            nama_tempat: dataPengajuan.nama_tempat,
            alamatPengajuan: dataPengajuan.alamat,
            rtPengajuan: dataPengajuan.rt,
            rwPengajuan: dataPengajuan.rw,
            kelurahanPengajuan: dataPengajuan.kelurahan,
            kecamatanPengajuan: dataPengajuan.kecamatan,
            createdAt: moment().format('DD MMMM YYYY'),
            tanda_tangan: linkGambarTTD,
        };

        var templateHtml = fs.readFileSync(path.join('src/utils/template', `Menentang.html`), 'utf8');
        var template = handlebars.compile(templateHtml);
        var html = template(payload);

        const pdfName = `suratPernyataan-Menentang-${Date.now()}.pdf`;
        var pdfPath = path.join('src/public', pdfName);

        var options = {
            format: "A4",
            orientation: "portrait",
            border: "25mm"
        };

        var document = {
            type: 'file',     // 'file' or 'buffer'
            template: html,
            context: {
                payload: payload
            },
            path: pdfPath   // it is not required if type is buffer
        };

        const createPDF = await pdf.create(document, options);

        if (!createPDF) {
            return errorResponse(req, res, 400, `Internal Server Error. ${createPDF}`);
        }

        const linkPDF = `${urlKu}/${pdfName}`;

        const createPendukung = await Pendukung.create({
            nik: nik,
            nama_lengkap: nama_lengkap,
            jenis_kelamin: jenis_kelamin,
            agama: agama,
            telepon: telepon,
            tempat_lahir: tempat_lahir,
            tanggal_lahir: tanggal_lahir,
            alamat: alamat,
            rt: rt,
            rw: rw,
            kecamatan: kecamatan,
            kelurahan: kelurahan,
            latitude: latitude,
            longitude: longitude,
            zipcode: zipcode,
            status: "Submit",
            idUser_create: req.user.nik,
            idUser_update: req.user.nik,
            id_pengajuan: id
        })

        const createTentang = await Trx_dokumen_penentang.create({
            id: createPendukung.id,
            surat_pernyataan: linkPDF,
            foto_ktp: linkGambarKTP,
            foto_diri: linkGambarDiri,
            tanda_tangan: linkGambarTTD,
            alasan: alasan,
            idUser_create: req.user.nik
        });

        return successResponse(req, res, 'Menentang Pendirian Berhasil.', { createPendukung, createTentang });
    }
    catch (err) {
        console.log(err.message);
        return errorResponse(req, res, 500, `Internal Server Error. ${err.message}`);
    }
};

module.exports = menentang;