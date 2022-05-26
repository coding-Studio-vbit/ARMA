const events = require("../../models/event");
const response = require("../util/response");

const getEvents = async (req, res) => {
    try {
      let result;
      result = await events
      .find({ eventStatus: { $nin: ["REJECTED","CANCELLED"] } })
      .populate("forumID");
      res.json(response(result, process.env.SUCCESS_CODE));
    } catch (error) {
      console.log(error);
      res.json(
        response("Unable to Load the Dashboard", process.env.FAILURE_CODE)
      );
    }
};

module.exports = {
    getEvents
}


  