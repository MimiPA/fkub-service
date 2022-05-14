const Validator = require("fastest-validator");
const v = new Validator();

/*validator for register*/
const register = {
    email: { type: "email", empty: false },
    password: { type: "string", empty: false, min: 6, max: 25 },
    role: {
        type: "string",
        optional: true,
        items: "string",
        enum: ["Admin", "User", "PMPTSP", "FKUB", "Kemenag", "Dinas Tata Ruang"],
        default: "User",
    },
    nik: { type: "string", empty: false, min: 16, max: 16 },
    nama_depan: { type: "string", empty: false },
    nama_belakang: { type: "string", empty: false },
    telepon: { type: "string", empty: false },
    agama: {
        type: "string",
        empty: false,
        items: "string",
        enum: ["Buddha", "Hindu", "Islam", "Katolik", "Konghucu", "Kristen"],
    },
    alamat: { type: "string", empty: false },
    rt: { type: "string", empty: false },
    rw: { type: "string", empty: false },
    kelurahan: { type: "string", empty: false },
    kecamatan: { type: "string", empty: false },
    jenis_kelamin: {
        type: "string",
        optional: true,
        items: "string",
        enum: ["Perempuan", "Laki-laki"],
    },
    tempat_lahir: { type: "string", empty: false },
};

/*validator for login*/
const login = {
    email: { type: "email", empty: false },
    password: { type: "string", min: 6, empty: false },
    role: {
        type: "string",
        optional: true,
        items: "string",
        enum: ["Admin", "User", "PMPTSP", "FKUB", "Kemenag", "Dinas Tata Ruang"],
        default: "User",
    },
};

/*validator for forgot password*/
const forgot_password = {
    email: { type: "email", empty: false },
    frontend_url: { type: "url", empty: false },
};

const resend_email = {
    link_email: { type: "url", empty: false },
};

/*validator for reset password*/
const reset_password = {
    password: { type: "string", min: 6, optional: false },
    confirmpassword: { type: "equal", field: "password", optional: false },
};

module.exports = {
    login,
    register,
    forgot_password,
    reset_password,
    resend_email,
};