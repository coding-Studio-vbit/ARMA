const router = require("express").Router()
const checkRolePermissions = require("../../../services/util/checkRole");
const controller = require("../../../services/halls/controller");

//GET HALLS

router.get("/getHalls",(req,res,next)=>{
    checkRolePermissions(req,res,next,"GET_HALLS")
        },
    controller.getHalls)

// ADD HALLS

router.post("/addHall",(req,res,next)=>{
    checkRolePermissions(req,res,next,"GET_HALLS")
    },
    controller.addHall)

module.exports = router
