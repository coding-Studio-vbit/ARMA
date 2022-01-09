const events = require("../../models/event");
const response = require("../util/response");

const getEvents = async (req, res) => {
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
      response({ message: "event data fetch error" }, process.env.FAILURE_CODE)
    );
  }
};

const createEvent = async (req, res) => {
  try
  {
    let newEvent = new events({forumID: req.user._id, name: req.body.name, description: req.body.description});
    await newEvent.save();
    res.json(response({message: "new event created"}, process.env.SUCCESS_CODE))
  }
  catch(e)
  {
    res.json(response({message: "error"}, process.env.FAILURE_CODE))
  }
}

module.exports = { getEvents, createEvent };
