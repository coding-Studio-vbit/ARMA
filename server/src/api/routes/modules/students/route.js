const router = require("express").Router();
const students = require("../../../../models/student");
const response = require("../../../../services/util/response");

router.get("/", async (req, res) => {
  let { page, limit } = req.query;
  page = Number(page);
  limit = Number(limit);
  const result = await students
    .find()
    .skip((page - 1) * limit)
    .limit(limit);
  const total = await students.count({});
  res.json(response({ data: result, total: total }, process.env.SUCCESS_CODE));
});

module.exports = router;
