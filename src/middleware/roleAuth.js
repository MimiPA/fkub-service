const errorResponse = require("../helpers/errorResponse");

exports.adminAuth = (req, res, next) => {
    if (req.user && req.user.email && req.user.role === "Admin") {
        return next();
    } else {
        errorResponse(req, res, 401, "You dont have admin access.")
    }
};

exports.pmptspAuth = (req, res, next) => {
    if (req.user && req.user.email && req.user.role === "PMPTSP") {
        return next();
    } else {
        errorResponse(req, res, 401, "You dont have PMPTSP access.")
    }
};