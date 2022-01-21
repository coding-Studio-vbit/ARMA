const {welcomeTemplate} = require("../../email_templates/templates");
const events = require("../../models/event");
const forums = require('../../models/forum')
const response = require("../util/response");
const students = require('../../models/student')
const equipments =require('../../models/equipment');
const facultyModel = require("../../models/faculty");

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
const getEquipments = async (req, res) => {
  try {
    let myEquip= await equipments.find({});
    res.json(
      response(
        myEquip,
        process.env.SUCCESS_CODE
      )
    );
      
    } catch (err) {
      console.log(err);
      res.json(response(error, process.env.FAILURE_CODE));
    }
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

const addNewForumMembers = async (req, res) => {
  try {
      const {forumName, ...stuser} = req.body;
      let stu = await students.findOne({ rollNumber: stuser.rollNumber });
      if(stu){
        await forums.findOneAndUpdate({name: forumName}, {"$push":{"forumMembers": stu}})
      }else{
      let student = new students(stuser);
      await student.save()
      await forums.findOneAndUpdate({name: forumName}, {"$push":{"forumMembers": student}})
      }
      res.json(
        response("New Forum Member Added", process.env.SUCCESS_CODE)
      );
    } catch (err) {
      console.log(err);
      res.json(
        response("New Forum Member could not be added" , process.env.FAILURE_CODE)
      );
    }
}

const addNewCoreForumMember = async (req, res) => {
  try {
      const {forumName,designation, ...stuser} = req.body;
      let stu = await students.findOne({ rollNumber: stuser.rollNumber });
      if(stu){
        await forums.findOneAndUpdate({name: forumName}, {"$push":{"forumCoreTeamMembers": {designation: designation, studentID: stu}}})
      }else{
      let student = new students(stuser);
      await student.save()
      await forums.findOneAndUpdate({name: forumName}, {"$push":{"forumCoreTeamMembers": {designation: designation, studentID: student}}})
      }
      res.json(
        response("New Core Forum Member Added", process.env.SUCCESS_CODE)
      );
    } catch (err) {
      console.log(err);
      res.json(
        response("New Forum Member could not be added",process.env.FAILURE_CODE)
      );
    }
}

const getCoreForumMembers = async (req, res) => {
  //For pagination
  let page = req.query.page ? Number(req.query.page) : 1;
  let limit = req.query.limit ? Number(req.query.limit) : 1000000;

  //For filters
  let where = {};
  if (req.query.name) where.name = req.query.name

  //For sorting
  let sort = {};
  if (req.query.orderBy && req.query.order)
    sort[req.query.orderBy] = req.query.order;
  else sort = { name: "asc" };
  try {
    result = await forums
      .findOne({name:req.query.name})
      .skip((page - 1) * limit)
      .limit(limit)
      .sort(sort).select('-password')
      .populate({path: 'forumCoreTeamMembers.studentID'})
    res.json(
      response({ data: result.forumCoreTeamMembers, total: result.forumCoreTeamMembers.length }, process.env.SUCCESS_CODE)
    );
  } catch (error) {
    console.log(error);
    res.json(
      response(
        { message: "Forum Core Team Members data fetch error" },
        process.env.FAILURE_CODE
      )
    );
  }
};

const getForumMembers = async (req, res) => {
  //For pagination
  let page = req.query.page ? Number(req.query.page) : 1;
  let limit = req.query.limit ? Number(req.query.limit) : 1000000;

  //For filters
  let where = {};
  console.log(req.query.name);
  if (req.query.name) where.name = req.query.name

  //For sorting
  let sort = {};
  if (req.query.orderBy && req.query.order)
    sort[req.query.orderBy] = req.query.order;
  else sort = { name: "asc" };
  try {
    result = await forums
      .findOne({name:req.query.name})
      .skip((page - 1) * limit)
      .limit(limit)
      .sort(sort).select('-password')
      .populate({path: 'forumMembers'})
    res.json(
      response({ data: result.forumMembers, total: result.forumMembers.length }, process.env.SUCCESS_CODE)
    );
  } catch (error) {
    console.log(error);
    res.json(
      response(
        { message: "Forum Team Members data fetch error" },
        process.env.FAILURE_CODE
      )
    );
  }
};

const editForum = async(req,res)=>{
  try {
      const {id, name, phone, forumHeads, facultyID} = req.body
      const faculty = await facultyModel.findById(facultyID)
      await forums.findOneAndUpdate({_id: id},{$set:{name:name, facultyCoordinatorID:faculty, forumHeads:forumHeads, phone:phone}}, {new:true})
      res.json(
       response("Forum Details edited successfully!",process.env.SUCCESS_CODE)
   )
  } catch (error) {
   console.log(error);
   res.json(response(error,process.env.FAILURE_CODE))}
}


module.exports = {dashboard,getForumsList, addNewForumMembers, addNewCoreForumMember, getCoreForumMembers, getForumMembers, getEquipments,editForum}
