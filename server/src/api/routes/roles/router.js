const router = require("express").Router()
const checkRolePermissions = require("../../../services/util/checkRole")
const controller = require("../../../services/roles/controller")

// ADD ROLES
// will have to add checkRolePermissions after listing out all the permissions
router.post("/addRoles",controller.addRoles)

// GET ROLES

router.get("/getRoles", controller.getRoles)

router.put("/editRoles", controller.editRole)


module.exports = router;