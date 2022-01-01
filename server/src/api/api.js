const express = require("express");
const test = require("./routes/modules/test")
const faculty = require("./routes/modules/faculty/faculty");
const auth = require("./routes/modules/auth/auth");
const tokenAuth = require("./middleware/tokenAuth");

const api = () => {

    const router = express.Router()
    auth(router)
    //router.use(tokenAuth)
    faculty(router)
    test(router)
    return router
}

module.exports = api

