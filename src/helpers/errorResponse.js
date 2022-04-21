const errorResponse = (req, res, code = 500, message = "Something went wrong", error) => res.status(code).json({
    status: "error",
    message,
    error
});

module.exports = errorResponse;

  // Contoh pemakaian
  // return errorResponse(req, res, httpCode, "Message yang mau direturn");