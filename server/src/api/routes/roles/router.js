const router = require("express").Router()
const checkRolePermissions = require("../../../services/util/checkRole")
const controller = require("../../../services/roles/controller")

// ADD ROLES

router.post("/addRoles",(req,res,next)=>{
    return checkRolePermissions(req, res, next, "ADD_ROLE")
    },
    controller.addRoles
)

// GET ROLES

router.get("/getRoles",(req,res,next)=>{
    return checkRolePermissions(req, res, next, "FETCH_ROLE")
    },
    controller.getRoles
)

module.exports = router;