const router = require("express").Router();
const students = require("../../../../models/student");
const response = require("../../../../services/util/response");

router.get("/", async (req, res) => {

  //For pagination
  let page = req.query.page ? Number(req.query.page) : 1;
  let limit = req.query.limit ? Number(req.query.limit) : 1000000;

  //For filters
  let where = {};
  if (req.query.name) where.name = req.query.name;
  if (req.query.rollNumber) where.rollNumber = req.query.rollNumber;
  if (req.query.branch) where.branch = req.query.branch;
  if (req.query.section) where.section = req.query.section;

  //For sorting
  let sort = {};
  if (req.query.orderBy && req.query.order)
    sort[req.query.orderBy] = req.query.order;
  else sort = { name: "asc" };

  try
  {
    result = await students
      .find(where)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort(sort);
    const total = await students.count(where);
    res.json(response({ data: result, total: total }, process.env.SUCCESS_CODE));
  }
  catch(error)
  {
    res.json(response({message: "Student data fetch error"}, process.env.FAILURE_CODE));
  }
});

module.exports = router;
