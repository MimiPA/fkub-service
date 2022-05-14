//Response Message
const { errorResponse, successResponse } = require("../../helpers");

//Bcrypt Password
const bcrypt = require('bcrypt');

//Import jwt
const jwt = require('jsonwebtoken');

//Import Model
const { Master_account, Master_role, Trx_access_token } = require('../../models');

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
        const { email, password, role } = req.body;

        //Validate Login Requirement
        const checkLogin = v.validate(req.body, authValidator.login);

        //Message validate
        if (checkLogin.length) {
            return errorResponse(req, res, 400, checkLogin);
        }

        if(role == undefined){
            role = 'User';
        }

        //Check role
        const checkRole = await Master_role.findOne({
            where: {
                role: role
            },
        });

        if (!checkRole) {
            return errorResponse(req, res, 400, "Role tidak ditemukan");
        }

        //Validate if user exist in DB
        const user = await Master_account.findOne({
            where: {
                email: email,
                id_role: checkRole.id
            },
        });

        if (!user) {
            return errorResponse(req, res, 400, "Akun user tidak ditemukan di database");
        }

        //Compare bycrpt password
        const isValidPass = await bcrypt.compare(password, user.password);
        if (!isValidPass) {
            return errorResponse(req, res, 400, 'Password Salah!');
        }

        //Payload for generate token
        const dataPayload = await Master_account.findOne({
            where: { id: user.id },
            attributes: ['id', 'email', 'id_role'],
            include: [{
                model: Master_role,
                attributes: ["role"]
            }]
        });

        const data = {
            id: dataPayload.id,
            email: dataPayload.email,
            id_role: dataPayload.id_role,
            role: dataPayload.Master_role.role
        };

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
                id_user: user.id
            },
        });

        const ipAddress = ip.address();

        if (!idToken) {
            //Store data and insert to DB
            dataToken = {
                id_user: user.id,
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
                    where: { id_user: user.id }
                });
        }

        return successResponse(req, res, 'User Authentication Success', { accessToken, refreshToken, data });
    }
    catch (err) {
        console.log(err.message);
        return errorResponse(req, res, 500, 'Internal Server Error');
    }
}

module.exports = login;