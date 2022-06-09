const errorResponse = require("../helpers/errorResponse");

exports.adminAuth = (req, res, next) => {
    if (req.user && req.user.email && req.user.role === "Admin") {
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

exports.pmptspAuth = (req, res, next) => {
    if (req.user && req.user.email && req.user.role === "PMPTSP") {
        return next();
    } else {
        errorResponse(req, res, 401, "You don't have PMPTSP access.")
    }
};

exports.kemenagAuth = (req, res, next) => {
    if (req.user && req.user.email && req.user.role === "Kemenag") {
        return next();
    } else {
        errorResponse(req, res, 401, "You don't have Kemenag access.")
    }
};

exports.fkubAuth = (req, res, next) => {
    if (req.user && req.user.email && req.user.role === "FKUB") {
        return next();
    } else {
        errorResponse(req, res, 401, "You don't have FKUB access.")
    }
};

exports.dtrAuth = (req, res, next) => {
    if (req.user && req.user.email && req.user.role === "Dinas Tata Ruang") {
        return next();
    } else {
        errorResponse(req, res, 401, "You don't have Dinas Tata Ruang access.")
    }
};