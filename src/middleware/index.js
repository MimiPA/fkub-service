const verifyToken = require("./verifyToken");
const { adminAuth, userAuth, pmptspAuth, kemenagAuth, fkubAuth, dtrAuth } = require("./roleAuth");

module.exports = {
    verifyToken,
    adminAuth,
    userAuth,
    pmptspAuth,
    kemenagAuth,
    fkubAuth,
    dtrAuth
};