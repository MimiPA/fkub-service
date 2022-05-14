//Response Message
const { errorResponse, successResponse } = require("../../helpers");

//Import Model
const { Trx_access_token } = require('../../models');

const logout = async (req, res) => {
    //Waiting for middleware api auth for make it to auth route
    //const id_user = req.user.id;

    // Temporary using logout by query string
    const id_user = req.query.id;

    const user = await Trx_access_token.findOne({
        where: {
            id_user: id_user
        }
    });

    if (!user) {
        return errorResponse(req, res, 400, 'User not found');
    }

    //Delete access token
    await Trx_access_token.destroy({
        where: {
            id_user: id_user
        }
    });

    return successResponse(req, res, 'Access token deleted');
}

module.exports = logout;