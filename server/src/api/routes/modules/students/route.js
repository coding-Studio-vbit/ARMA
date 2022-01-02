const router = require("express").Router();
const students = require("../../../../models/student");
const response = require("../../../../services/util/response");

router.get("/", async (req, res) => {
  let { page, limit } = req.params;
  
  const result = await students
    .findAll()
    .skip((page - 1) * limit)
    .limit(limit);
    res.json(response(result, process.env.SUCCESS_CODE));
});

module.exports = router;