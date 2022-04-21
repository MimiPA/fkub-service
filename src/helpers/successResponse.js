const successResponse = (req, res, message = "success", data = null) => {
    // create response
    let response = {
        status: "success",
        message: message,
    };

    // insert data in response if available
    if (data) {
        response.data = data
    };

    // return response
    res.status(200).json(
        response
    );
}

module.exports = successResponse;

  // Example
  // return successResponse(req, res, "Message yang mau direturn", your_data_object);
  // your_data_object is optional