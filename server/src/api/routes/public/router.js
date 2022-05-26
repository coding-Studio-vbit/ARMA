const router = require("express").Router();
const publicController =  require("../../../services/public/controller");

router.get('/eventCalendar',publicController.getEvents)
module.exports = router;
