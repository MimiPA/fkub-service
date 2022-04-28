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

const register = async(req, res) => {
    try {
        const {
            email,
            password,
            role,
            nik,
            nama_depan,
            nama_belakang,
            telepon,
            agama,
            alamat,
            rt,
            rw,
            kelurahan,
            kecamatan,
            jenis_kelamin,
            tempat_lahir,
            tanggal_lahir,
            foto
        } = req.body;

        //Validate Register Requirement
        const checkRegister = v.validate(req.body, authValidator.register);

        if (checkRegister.length) {
            return errorResponse(req, res, 400, checkRegister);
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

        if (role == "User" || checkRole) {
            //Account payload
            const dataAccount = {
                email: email,
                password: passHash,
                idUser_create: 1,
            };

            if (role == "User") {
                dataAccount.id_role = 2;
            } else {
                dataAccount.id_role = checkRole.id;
            }

            //Insert Account to DB
            const insert = await Master_account.create(dataAccount);
            await Master_account.update({ idUser_create: insert.id }, { where: { id: insert.id } });

            //User Payload
            const dataUser = {
                id: insert.id,
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