const express = require("express");
const test = require("./routes/modules/test")
const faculty = require("./routes/modules/faculty/faculty")

const api = () => {
    const router = express.Router()
    faculty(router)
    test(router)
    return router
}

module.exports = api

