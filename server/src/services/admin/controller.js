const bcrypt = require("bcrypt");
const students = require("../../models/student");
const role = require("../../models/role");
const response = require("../util/response");
const admins = require("../../models/admin");
const ejs = require("ejs");
const pdf = require("html-pdf");
const path = require("path")

const updateStudentReport = async () => {};

const addStudent = async (data) => {
  try {
    let student = new students(data);
    /**Generate new report file for the student
     * keep updating that file everytime this student participates in an event.
     */
    ejs
      .renderFile(path.join(__dirname,"../../static_data/student_report.ejs"), {
        details: data,
        statistics: { totalEventsParticipated: 0 },
      },(err, data) => {
        let options = {
          height: "11.25in",
          width: "8.5in",
          header: {
            height: "20mm",
          },
          footer: {
            height: "20mm",
          },
        };let temp = md5(data.name + Date.now());
        let dirPath = path.join(
          __dirname,
          "../../../../data/static/",
          temp.slice(0, 1),
          temp.slice(0, 2)
        );
        let filename =
          md5(data.name + data.year + data.section + String(Date.now())) +
          "." +
          "pdf";
    
        const filePath = `${dirPath}/${filename}`;
        student.reportFilePath = filePath;

         pdf.create(data, options).toFile(filePath, async (err, data)=>{
           if(err){
             return console.log("error occured while generating pdf", err);
           }
           else{
            console.log("created new pdf");
            await student.save();
            return response("Success", process.env.SUCCESS_CODE);
           }
         })
      })
  } catch (error) {
    console.log(error);
    return response("failure", process.env.FAILURE_CODE);
  }
};

const editAdmin = async (email, newEmail, newpassword) => {
  try {
    const admin = await admins.findOne({ email: email });
    if (admin) {
      const salt = await bcrypt.genSalt(parseInt(process.env.SALTROUNDS));
      const newPassword = await bcrypt.hash(newpassword, salt);
      admin.email = newEmail;
      admin.password = newPassword;
      await admin.save();
      return response(
        "Password changed Successfully",
        process.env.SUCCESS_CODE
      );
    } else {
      return response("Email Does not exist", process.env.FAILURE_CODE);
    }
  } catch (error) {
    console.log(error);
    return response("failure", process.env.FAILURE_CODE);
  }
};

const viewAdmin = async (id) => {
  try {
    let admin = await admins.findOne({ _id: id });
    res.json(response(admin, process.env.SUCCESS_CODE));
  } catch (err) {
    console.log(err);
    res.json(response(error, process.env.FAILURE_CODE));
  }
};

const deleteAdmin = async (id) => {
  try {
    let admin = await admins.deleteOne({ _id: id });
    res.json(response(admin, process.env.SUCCESS_CODE));
  } catch (err) {
    console.log(err);
    res.json(response(error, process.env.FAILURE_CODE));
  }
};

const addRole = async (data) => {
  try {
    let newRole = new role(data);
    await newRole.save();
    return response("Success", process.env.SUCCESS_CODE);
  } catch (error) {
    console.log(error);
    return response("failure", process.env.FAILURE_CODE);
  }
};

const getAdmins = async (req, res) => {
  //For pagination
  let page = req.query.page ? Number(req.query.page) : 1;
  let limit = req.query.limit ? Number(req.query.limit) : 1000000;
  console.log(req.user);
  //For filters
  let where = {};
  if (req.query.name) where.name = { $regex: req.query.name, $options: "i" };
  if (req.query.email) where.email = { $regex: req.query.email, $options: "i" };
  //For sorting
  let sort = {};
  if (req.query.orderBy && req.query.order)
    sort[req.query.orderBy] = req.query.order;
  else sort = { email: "asc" };

  try {
    result = await admins
      .find(where)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort(sort);
    const total = await admins.count(where);
    res.json(
      response({ data: result, total: total }, process.env.SUCCESS_CODE)
    );
  } catch (error) {
    res.json(
      response({ message: "admins data fetch error" }, process.env.FAILURE_CODE)
    );
  }
};

module.exports = {
  addStudent,
  addRole,
  editAdmin,
  viewAdmin,
  deleteAdmin,
  getAdmins,
};
