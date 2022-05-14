const errorResponse = require("../helpers/errorResponse");

exports.adminAuth = (req, res, next) => {
    if (req.user && req.user.email && req.user.role === "admin") {
        return next();
    } else {
        errorResponse(req, res, 401, "You don't have admin access.")
    }
};

exports.userAuth = (req, res, next) => {
    if (req.user && req.user.email && req.user.role === "User") {
        return next();
    } else {
        errorResponse(req, res, 401, "You don't have user access.")
    }
};
