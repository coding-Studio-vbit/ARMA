const students = require("../../models/student");
const response = require("../util/response");

const getStudentsList = async (req, res) => {
  //For pagination
  let page = req.query.page ? Number(req.query.page) : 1;
  let limit = req.query.limit ? Number(req.query.limit) : 1000000;
  //For filters
  let where = {};
  if (req.query.name) where.name = {$regex: req.query.name,$options: 'i'};
  if (req.query.rollNumber) where.rollNumber = {$regex: req.query.rollNumber,$options: 'i'};
  if (req.query.branch) where.branch = req.query.branch;
  if (req.query.section) where.section = req.query.section;

  //For sorting
  let sort = {};
  if (req.query.orderBy && req.query.order)
    sort[req.query.orderBy] = req.query.order;
  else sort = { name: "asc" };

  try {
    result = await students
      .find(where)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort(sort);
    const total = await students.count(where);
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

const editStudent = async(req,res)=>{
  try {
      const {id, name, rollNumber, year, branch, section, email, phone} = req.body
      await students.findOneAndUpdate({_id: id},{$set:{name:name, rollNumber: rollNumber, year:year, branch:branch, section:section, email:email, phone:phone}}, {new:true})
      res.json(
       response("Student Details edited successfully!",process.env.SUCCESS_CODE)
   )
  } catch (error) {
   console.log(error);
   res.json(response(error,process.env.FAILURE_CODE))}
}


module.exports = {getStudentsList, editStudent}