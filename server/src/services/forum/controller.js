const {welcomeTemplate} = require("../../email_templates/templates");
const events = require("../../models/event");
const response = require("../../services/util/response");
const forums = require('../../models/forum')
const dashboard = async (req, res) => {
    try {
        let myEvents = await events.find({ forumID: req.user._id });
        let statistics = { engagement: 4, total: myEvents.length };
        console.log(myEvents);
        res.json(
          response(
            { events: myEvents, statistics: statistics },
            process.env.SUCCESS_CODE
          )
        );
      } catch (err) {
        console.log(err);
        res.json(response(error, process.env.FAILURE_CODE));
      }
}

const updateBudget = async (req, res) => {
  //update the budget here.
  console.log(req.files);
  res.json(response("hi", process.env.SUCCESS_CODE));
}

const getForumsList = async (req, res) => {
  //For pagination
  let page = req.query.page ? Number(req.query.page) : 1;
  let limit = req.query.limit ? Number(req.query.limit) : 1000000;

  //For filters
  let where = {};
  if (req.query.name) where.name = {$regex: req.query.name,$options: 'i'};

  //For sorting
  let sort = {};
  if (req.query.orderBy && req.query.order)
    sort[req.query.orderBy] = req.query.order;
  else sort = { name: "asc" };

  try {
    result = await forums
      .find(where)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort(sort).select('-password');
    const total = await forums.count(where);
    res.json(
      response({ data: result, total: total }, process.env.SUCCESS_CODE)
    );
  } catch (error) {
    res.json(
      response(
        { message: "Student data fetch error" },
        process.env.FAILURE_CODE
      )
    );
  }
};

module.exports = {dashboard,getForumsList,updateBudget}
