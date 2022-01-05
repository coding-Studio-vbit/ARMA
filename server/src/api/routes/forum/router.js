const router = require("express").Router();
const events = require("../../../models/event");
const response = require("../../../services/util/response");
const {welcomeTemplate} = require("../../../email_templates/templates");
const mailer = require("../../../services/util/mailer");

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

// router.get('/test', async (req, res)=>{
//   mailer.sendMail("bsaikiran618@gmail.com", welcomeTemplate, {userName: "Sai Kiran"})
//   .then(response=>{
//     res.json("Kewl kewl sent");
//   })
//   .catch(error=>{
//     res.json("boo boo");
//   })
// })

module.exports = router;