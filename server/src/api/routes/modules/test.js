const test = (router) => {
    router.get("/", (req,res) => {
        res.send("Hi ARMA")
    })
}

module.exports = test

