const router = require("express").Router();
const events = require("../../../models/event");
const response = require("../../../services/util/response");

router.get("/dashboard", async (req, res) => {
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
});

module.exports = router;
