require("dotenv").config()

function ErrorHandler(error, req, res, next) {
    // res.json({
    //     error: true,
    //     message: error.message,
    //     // stack: process.env.DEPLOY == "dev" ? error.stack : "no"
    //     stack: error.stack,
    // })
    res.render("error", {
        error: true,
        message: error.message,
        // stack: process.env.DEPLOY == "dev" ? error.stack : "no"
        stack: error.stack,
    })
}

module.exports = {
    ErrorHandler,
}
