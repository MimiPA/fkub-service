//Response Message
const { errorResponse, successResponse } = require("../helpers");

//Import jwt
const jwt = require('jsonwebtoken');

//Import Model
const { Pengguna } = require("../models");

const { SECRET, SECRET_EXPIRED, REFRESH_TOKEN } = process.env;

module.exports = [
    // Authentication using access token 
    async (req, res, next) => {
        try {
            // Extract access token from header
            const accessToken = req.headers["authorization"];

            // Check if token exist
            if (accessToken === undefined) {
                return errorResponse(req, res, 401, `Authorization header not found! ${accessToken}`);
            }

            // Verify access token
            const account = jwt.verify(accessToken, SECRET);

            // Destructure account data from account object
            const { nik, email, role, is_active, agama } = account.data;

            // Add account data to the request object
            req.user = { nik, email, role, is_active, agama };

            // Continue to next middleware
            return next();
        } catch (err) {
            if (!err.expiredAt) {
                return errorResponse(req, res, 401, `Invalid token. ${err}`);
            }

            // If token expired then call next middleware and
            req.isRefreshNeeded = true;
            return next();
        }
    },

    // Refreshing access token using refresh token
    async (req, res, next) => {
        // Check if request need to be refreshed
        if (!req.isRefreshNeeded) {
            // If refresh not needed then continue to next middleware
            return next();
        }

        const refreshToken = req.get('refreshToken');

        // Check if the refresh token exist inside the headers
        if (refreshToken === undefined) {
            return errorResponse(req, res, 401, "Access token expired. 'refreshToken' not found inside the headers.")
        };

        try {
            // Check if refresh token is valid
            const refreshAccount = jwt.verify(refreshToken, REFRESH_TOKEN);

            // Get the id from refresh token
            const { nik } = refreshAccount.data;
            // Retrieve the latest account data from database
            const data = await Pengguna.findOne({
                where: { nik: nik },
                attributes: ['nik', 'email', 'role', 'is_active', 'agama'],
            });

            if (!data) {
                return errorResponse(req, res, 401, "Account is no longer exist in the database.");
            }

            // Generate a new access Token
            const accessToken = jwt.sign({
                data
            }, SECRET, {
                expiresIn: SECRET_EXPIRED
            });

            // Append new access token to response headers
            res.append('accessToken', accessToken);

            // Append account data to request object
            req.user = data;

            return next();

        } catch (err) {
            // If error, send response to client
            return errorResponse(req, res, 498, "Access token expired. Refreshing access token failed.");
        }

    },
]