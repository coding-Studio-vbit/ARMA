const api = require("../api/api")

const expressLoader = (app) =>{
app.use("/api" , api())

}

module.exports = expressLoader