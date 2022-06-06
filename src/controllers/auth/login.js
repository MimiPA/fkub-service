//Response Message
const { errorResponse, successResponse } = require("../../helpers");

//Bcrypt Password
const bcrypt = require('bcrypt');

//Import jwt
const jwt = require('jsonwebtoken');

//Import Model
const { Pengguna, Trx_access_token } = require('../../models');

//Validator
const Validator = require('fastest-validator');
const v = new Validator();
const authValidator = require('./validator/auth.validator');

//IP Address
const ip = require('ip');

//Variable for token
const {
    SECRET,
    SECRET_EXPIRED,
    REFRESH_TOKEN,
    REFRESH_TOKEN_EXPIRED
} = process.env;

const login = async (req, res) => {
    try {
        const { nik, password, role } = req.body;

        //Validate Login Requirement
        const checkLogin = v.validate(req.body, authValidator.login);

        //Message validate
        if (checkLogin.length) {
            return errorResponse(req, res, 400, checkLogin);
        }

        if (role == undefined) {
            role = 'User';
        }

        //Validate if user exist in DB
        const user = await Pengguna.findOne({
            where: {
                nik: nik,
                role: role,
            },
        });

        if (!user) {
            return errorResponse(req, res, 404, "Akun Pengguna Tidak Ditemukan");
        }

        //Compare bycrpt password
        const isValidPass = await bcrypt.compare(password, user.password);
        if (!isValidPass) {
            return errorResponse(req, res, 400, 'Password Anda Salah!');
        }

        if (user.is_active == "Disable") {
            return errorResponse(req, res, 400, 'Mohon maaf, akun Anda tidak aktif. Silahkan menghubungi admin untuk mengaktifkannya.');
        }

        //Payload for generate token
        const data = await Pengguna.findOne({
            where: { nik: user.nik },
            attributes: ['nik', 'email', 'role', 'is_active', 'agama'],
        });

        //Generate Token
        const accessToken = jwt.sign({
            data
        }, SECRET, {
            expiresIn: SECRET_EXPIRED
        });

        //Refresh Token
        const refreshToken = jwt.sign({
            data
        }, REFRESH_TOKEN, {
            expiresIn: REFRESH_TOKEN_EXPIRED
        });

        //Find id user in table token
        const idToken = await Trx_access_token.findOne({
            where: {
                id_user: user.nik
            },
        });

        const ipAddress = ip.address();

        if (!idToken) {
            //Store data and insert to DB
            dataToken = {
                id_user: user.nik,
                accessToken: refreshToken,
                ip_address: ipAddress
            }
            await Trx_access_token.create(dataToken);
        }
        else {
            await Trx_access_token.update(
                {
                    access_token: refreshToken,
                    ip_address: ipAddress
                },
                {
                    where: { id_user: user.nik }
                });
        }

        return successResponse(req, res, 'Autentikasi Pengguna Berhasil.', { accessToken, refreshToken, data });
    }
    catch (err) {
        console.log(err.message);
        return errorResponse(req, res, 500, `Internal Server Error. ${err.message}`);
    }
}

module.exports = login;