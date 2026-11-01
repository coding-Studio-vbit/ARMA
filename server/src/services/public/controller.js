const events = require("../../models/event");
const response = require("../util/response");

const getEvents = async (req, res) => {
  try {
    let result;
    result = await events
      .find({
        eventStatus: {
          $nin: ["REJECTED BY SAC", "REJECTED BY FO", "CANCELLED"],
        },
      })
      .populate("forumID", "name email description")
      .limit(100);
    res.json(response(result, process.env.SUCCESS_CODE));
  } catch (error) {
    console.log(error);
    res.json(
      response("Unable to Load the Dashboard", process.env.FAILURE_CODE)
    );
  }
};

module.exports = {
  getEvents,
};
