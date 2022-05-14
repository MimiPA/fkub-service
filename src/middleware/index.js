const verifyToken = require("./verifyToken");
const { adminAuth, userAuth, pmptspAuth } = require("./roleAuth");

module.exports = {
    verifyToken,
    adminAuth,
    userAuth,
};