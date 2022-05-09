//Response Message
const { errorResponse, successResponse } = require('../../helpers');

//Import module
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Import model
const { Master_role, Master_account, Master_user, Master_religion } = require('../../models');

//Validator
const Validator = require("fastest-validator");
const v = new Validator();
const authValidator = require('./validator/auth.validator');

const register = async (req, res) => {
    try {
        const {
            email,
            password,
            nik,
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
            foto,
            role
        } = req.body;

        //Validate Register Requirement
        const checkRegister = v.validate(req.body, authValidator.register);

        if (agama == 'Agama') {
            return errorResponse(req, res, 400, "Mohon Memilih Agama Anda");
        }
        else if (kecamatan == "Kecamatan") {
            return errorResponse(req, res, 400, "Mohon Memilih Kecamatan Anda");
        }
        else if (kelurahan == "Kelurahan") {
            return errorResponse(req, res, 400, "Mohon Memilih Kelurahan Anda");
        }

        if (checkRegister.length) {
            return errorResponse(req, res, 400, checkRegister);
        }

        //Check NIK
        const id_nik = await Master_user.findOne({
            where: {
                nik: nik
            },
        });

        if (id_nik) {
            return errorResponse(req, res, 400, "NIK sudah terdaftar");
        }

        //Check Religion
        const religion = await Master_religion.findOne({
            where: {
                agama: agama
            },
        });

        if (!religion) {
            return errorResponse(req, res, 400, "Agama tidak terdaftar");
        }

        //Check Email
        const account = await Master_account.findOne({
            where: {
                email: email
            },
        });

        if (account) {
            return errorResponse(req, res, 400, "Email sudah terdaftar");
        }

        //Hash Password
        const passHash = await bcrypt.hash(password, 10);

        //Check Role
        const checkRole = await Master_role.findOne({
            where: {
                role: role
            },
        });

        if (checkRole) {
            //Account payload
            const dataAccount = {
                email: email,
                password: passHash,
                idUser_create: 1,
                id_role: checkRole.id,
            };

            if (role == "User") {
                dataAccount.is_active = "Enable";
            }

            //Insert Account to DB
            const insert = await Master_account.create(dataAccount);
            await Master_account.update({ idUser_create: insert.id }, { where: { id: insert.id } });

            //User Payload
            const dataUser = {
                id: insert.id,
                id_religion: religion.id,
                nik: nik,
                nama_depan: nama_depan,
                nama_belakang: nama_belakang,
                telepon: telepon,
                alamat: alamat,
                rt: rt,
                rw: rw,
                kelurahan: kelurahan,
                kecamatan: kecamatan,
                jenis_kelamin: jenis_kelamin,
                tempat_lahir: tempat_lahir,
                tanggal_lahir: tanggal_lahir,
                foto: foto,
                idUser_create: insert.id
            };

            const createUser = await Master_user.create(dataUser);
            if (!createUser) {
                return errorResponse(req, res, 400, "Register Unsuccessfully. Please Try Again!");
            }
            return successResponse(req, res, "Register Successfully");
        } else {
            return errorResponse(req, res, 400, "Role doesn't Exist!")
        }
    } catch (err) {
        console.log(err.message);
        return errorResponse(req, res, 500, "Internal Server Error");
    }
};

module.exports = register;