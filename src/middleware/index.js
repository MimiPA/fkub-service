const verifyToken = require("./verifyToken");
const { adminAuth, pmptspAuth } = require("./roleAuth");

module.exports = {
    verifyToken,
    adminAuth,
};