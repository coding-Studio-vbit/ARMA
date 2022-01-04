const router = require("express").Router();
const events = require("../../../models/event");
const checkRolePermissions = require("../../../services/util/checkRole");

router.get("/", checkRole(req, res, next, 'GET_EVENTS') ,(req, res) => {
  //For pagination
  let page = req.query.page ? Number(req.query.page) : 1;
  let limit = req.query.limit ? Number(req.query.limit) : 1000000;

  //For filters
  let where = {};
  if (req.query.forumID) where.forumID = req.query.forumID;
  if (req.query.eventStatus) where.eventStatus = req.query.eventStatus;

  //For sorting
  let sort = {};
  if (req.query.orderBy && req.query.order)
    sort[req.query.orderBy] = req.query.order;
  else sort = { name: "asc" };

  try {
    result = await events
      .find(where)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort(sort);
    const total = await events.count(where);
    res.json(
      response({ data: result, total: total }, process.env.SUCCESS_CODE)
    );
  } catch (error) {
    console.log(error);
    res.json(
      response(
        { message: "event data fetch error" },
        process.env.FAILURE_CODE
      )
    );
  }
});

module.exports = router;
