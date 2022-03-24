const events = require("../../models/event");
const response = require("../util/response");
const attendance = require("../../models/attendance");
const roles = require("../../models/role");
const mailer = require("../util/mailer");
const { budgetDocUpdateTemplate } = require("../../email_templates/templates");
const students = require("../../models/student");
const equipments = require("../../models/equipment");
const halls = require("../../models/hall");
const Bookings = require("../../models/bookings");

const getEvents = async (req, res) => {
  //For pagination
  let page = req.query.page ? Number(req.query.page) : 1;
  let limit = req.query.limit ? Number(req.query.limit) : 1000000;

  //For filters
  let where = {};
  if (req.query.forumID) where.forumID = req.query.forumID;
  if (req.query.hasBudget)
  {
    where.hasBudget = req.query.hasBudget;
    where.eventStatus = ["AWAITING BUDGET APPROVAL","REQUESTED BUDGET CHANGES","BUDGET CHANGES UPDATED","BUDGET REJECTED"]
  }
  if (req.query.eventStatus) where.eventStatus = req.query.eventStatus;

  console.log(where);


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
      .sort(sort)
      .populate({path:'forumID', select:'name facultyCoordinatorID',model:'forums',
    populate:{
      path:'facultyCoordinatorID',
      select:'name',
      model:'faculty'
    }
    })
    if(req.query.forumName){
      result = result.filter((e)=>{
        if(e.forumID.name.includes(req.query.forumName)){
          return e;
        }
      })
    }
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
  try {
    let newAttendanceDoc = new attendance();
    let equipment = []
    for (let i = 0; i < req.body.equipment.length; i++) {
      const {name,totalCount} = req.body.equipment[i];
      const eq = await equipments.findOne({name:name})
      equipment.push(eq)
    }
    // hall :[  
    //   {
    //     date:Date,
    //     hallID:HallID,
    //     timeSlot:enum
    //   }
    // ]
    ///Halls
    const { hall } = req.body
    const hallsNew = hall.map(async (hallItem)=>{
      const h = await halls.findById(hallItem.hallID)
      return {
        hall:h,
        date:hallItem.date,
        timeSlot:hallItem.timeSlot
      }
    })
    let newEvent = new events({
      forumID: req.user._id,
      name: req.body.name,
      description: req.body.description,
      eventProposalDocPath: req.files.eventDocument[0].path,
      budgetDocPath: req.files.budgetDocument[0].path,
      hasBudget: req.files.budgetDocument !== null,
      equipment:equipment,
      halls:hallsNew
    });
    const booking = new Bookings({
        halls:hallsNew,
        eventID:newEvent._id,
        status:'ONHOLD'
    })
    newAttendanceDoc.eventID = String(newEvent._id);
    newEvent.attendanceDocID = String(newAttendanceDoc._id);
    newEvent.eventStatus = req.files.budgetDocument !== null?"AWAITING BUDGET APPROVAL":"AWAITING SAC APPROVAL"
    await newAttendanceDoc.save();
    await newEvent.save();
    await booking.save()
    res.json(
      response({ message: "new event created" }, process.env.SUCCESS_CODE)
    );

  } catch (e) {
    console.log(e);
    res.json(response({ message: "error" }, process.env.FAILURE_CODE));
  }
}
const updateBudgetDoc = async (req, res) => {
  //update the budget here.
  console.log(req.files);
  try {
    let event = await events.findById(req.body.eventID);
    event.budgetDocPath = req.files.budgetDocument[0].path;
    await event.save();
    //send notif to FO.
    const FORoleID = await roles.findOne().where('name').in(['FO']);
    const FO = faculty.findOne({ role: [FORoleID._id] });
    await mailer.sendMail(element.email, budgetDocUpdateTemplate, {
      FOName: FO,
      forumName: req.user.name,
      eventName: event.name,
    });
    res.json(response("updated budget document", process.env.SUCCESS_CODE));
  } catch (e) {
    console.log(e);
    res.json(
      response("updated budget document failed", process.env.FAILURE_CODE)
    );
  }
};

const reportAndMedia = async (req, res) => {
  try {
    let event = await events.findById(req.body.eventID);
    event.reportDocPath = req.files.eventReport[0].path;
    let temp = [];
    for (let p = 0; p < req.files.eventImages.length; p++) {
      temp.push(req.files.eventImages[p].path);
    }
    event.mediaFilePaths = temp;
    event.eventStatus = "COMPLETED";
    await event.save();
    res.json(
      response("updated Event Report and Media files", process.env.SUCCESS_CODE)
    );
  } catch (error) {
    res.json(
      response(
        "updated Event Report and Media failed",
        process.env.FAILURE_CODE
      )
    );
  }
};


const uploadRegistrantsList = async(req,res)=>{
  let attendedEvents = req.query.attendedEvents;
  try{
    for ( let i = 0; i<req.body.length;i++){
      let data = req.body[i];
      let value = await students.findOne({rollNumber:data.rollNumber})
      if(!value){
        console.log(data)
        let newStudent = students(data)
        await newStudent.save()
      }
      else {
        await students.findOneAndUpdate({rollNumber:data.rollNumber},{$addToSet:{attendedEvents:[data.attendedEvents]}});
      }
      console.log(data.attendedEvents);
      
    }
    let attendanceDoc = await attendance.findOne({eventID:attendedEvents})
    let studentData= await students.find({attendedEvents:attendedEvents})
    attendanceDoc.registrantsList  = studentData;
    attendanceDoc.presence = studentData;
    await attendanceDoc.save()
    res.json(response({message:"Students added successfully"},process.env.SUCCESS_CODE))

  }
  catch(error){
    console.log(error);
    res.json(
      response({message:"Upload of Registrants failed"},process.env.FAILURE_CODE)
    )
  }
}


const eventAttendance = async(req,res) => {
  let page = req.query.page ? Number(req.query.page) : 1;
  let limit = req.query.limit ? Number(req.query.limit) : 1000000;

  //For filters
  let where = {};
  if (req.query.eventID) where.eventID = req.query.eventID
  console.log(req.query.eventID)

  try {
    result = await attendance
      .findOne(where)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate(
        { path: "presence._id",
        model:"students"})
      .exec()
    const total = await attendance.count(where);
    res.json(
      response({ data: result.presence, total: total }, process.env.SUCCESS_CODE)
    );
  } catch (error) {
    console.log(error);
    res.json(
      response({ message: "event data fetch error" }, process.env.FAILURE_CODE)
    );
  }
}



const postAttendance = async(req,res)=>{
  try{
    console.log(req.body)
    let attendanceDoc = await attendance.findOne({eventID : req.body.eventID});
    attendanceDoc.presence.forEach(element=> {
      element.dates = req.body.studentPresence[element._id]
      console.log(element)
    })
    await attendanceDoc.save()
    res.json(
      response({message:"Attendance Updated"},process.env.SUCCESS_CODE)
    );

  }catch(error){
    console.log(error);
    res.json(response({message:"Update Attendance Failed"},process.env.FAILURE_CODE))
  }


}

const getRequests = async (req,res) =>{
  console.log(req.query.isFO);
  try {
    let result
    if(req.query.isFO==="true"){
      console.log("htfkuyf,lig");
      result = await events
      .find({eventStatus:["AWAITING BUDGET APPROVAL","REQUESTED BUDGET CHANGES","BUDGET CHANGES UPDATED"] }).populate("forumID");
    }else{
      result = await events
      .find({eventStatus:{ $nin:["COMPLETED","REJECTED"]} }).populate("forumID");
    }
     
    res.json(
      response(result,process.env.SUCCESS_CODE)
    );
    //console.log("Get",result);
  } catch (error) {
    console.log(error);
    res.json(
      response("Unable to Load the Dashboard",process.env.FAILURE_CODE)
    );    
  }
}


const getActiveEvents = async (req,res) =>{
  try {
    const result = await events
      .find({eventStatus:"APPROVED" });
    res.json(
      response(result,process.env.SUCCESS_CODE)
    );
  } catch (error) {
    //console.log(error);
    res.json(
      response("Unable to Load the Dashboard",process.env.FAILURE_CODE)
    );    
  }
}




module.exports = { getEvents, createEvent, updateBudgetDoc, reportAndMedia , getRequests,getActiveEvents,uploadRegistrantsList, eventAttendance 
  ,postAttendance,};

