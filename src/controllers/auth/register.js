//Response Message
const { errorResponse, successResponse } = require('../../helpers');

//Import module
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Import model
const { Pengguna } = require('../../models');
const { Op } = require('sequelize');

//Validator
const Validator = require("fastest-validator");
const v = new Validator();
const authValidator = require('./validator/auth.validator');

const register = async (req, res) => {
    try {
        let {
            nik,
            role,
            email,
            password,
            nama_depan,
            nama_belakang,
            jenis_kelamin,
            agama,
            telepon,
            tempat_lahir,
            tanggal_lahir,
            alamat,
            rt,
            rw,
            kecamatan,
            kelurahan,
            foto
        } = req.body;

        let is_active = "Disable";

        if (agama == 'Agama') {
            return errorResponse(req, res, 400, "Mohon Memilih Agama Anda");
        }
        else if (kecamatan == "Kecamatan") {
            return errorResponse(req, res, 400, "Mohon Memilih Kecamatan Anda");
        }
        else if (kelurahan == "Kelurahan") {
            return errorResponse(req, res, 400, "Mohon Memilih Kelurahan Anda");
        }

        //Validate Register Requirement
        const checkRegister = v.validate(req.body, authValidator.register);
        if (checkRegister.length) {
            return res.status(400).json({
                status: 'error',
                message: checkRegister
            });
        }

        //Check NIK or EMAIL
        const user = await Pengguna.findOne({
            where: {
                [Op.or]: [
                    { nik: nik },
                    { email: email }
                ]
            },
        });

        if (user) {
            if (user.nik == nik) {
                return errorResponse(req, res, 400, "NIK sudah terdaftar. Silahkan Login");
            }
            else if (user.email == email) {
                return errorResponse(req, res, 400, "Email sudah terdaftar.");
            }
        }

        //Hash Password
        const passHash = await bcrypt.hash(password, 10);

        if (jenis_kelamin == 'Laki-laki') {
            foto = 'https://thumbs.dreamstime.com/z/smart-boy-character-cartoon-illustration-looking-49704212.jpg';
        }
        else if (jenis_kelamin == 'Perempuan') {
            foto = 'https://thumbs.dreamstime.com/z/hand-drawn-beautiful-young-woman-sunglasses-stylish-girl-bow-her-head-fashion-look-sketch-vector-illustration-152344263.jpg';
        }

        if (role == "User") {
            is_active = "Enable";
        }

        //Pengguna Payload
        const data = {
            nik: nik,
            role: role,
            email: email,
            password: passHash,
            is_active: is_active,
            nama_depan: nama_depan,
            nama_belakang: nama_belakang,
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
            foto: foto,
        };

        const createUser = await Pengguna.create(data);
        if (!createUser) {
            return errorResponse(req, res, 400, "Registrasi Gagal. Mohon Coba Lagi!");
        }

        return successResponse(req, res, "Registrasi Berhasil. Silahkan Login!");

    } catch (err) {
        console.log(err.message);
        return errorResponse(req, res, 500, `Internal Server Error ${err.message}`);
    }
};

module.exports = register;