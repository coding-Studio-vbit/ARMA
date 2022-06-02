const bcrypt = require("bcrypt");
const students = require("../../models/student");
const forums = require("../../models/forum");
const facultyModel = require("../../models/faculty");
const response = require("../util/response");
const admins = require("../../models/admin");
const roles = require("../../models/role");
const mongoose = require("mongoose");
const { readFileSync, writeFileSync } = require("fs");

const addStudent = async (data) => {
  try {
    let student = new students(data);
    student.rollNumber = student.rollNumber.toUpperCase();
    await student.save();
    return response("Success", process.env.SUCCESS_CODE);
  } catch (error) {
    console.log(error);
    return response("failure: " + error.message, process.env.FAILURE_CODE);
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
    console.log(admin);
    return response(admin, process.env.SUCCESS_CODE);
  } catch (err) {
    console.log(err);
    return response(error, process.env.FAILURE_CODE);
  }
};

const deleteAdmin = async (id) => {
  try {
    let admin = await admins.deleteOne({ _id: id });
    return response(admin, process.env.SUCCESS_CODE);
  } catch (err) {
    console.log(err);
    return response(error, process.env.FAILURE_CODE);
  }
};
const register = async (user, userType) => {
  try {
    const salt = await bcrypt.genSalt(parseInt(process.env.SALTROUNDS));
    const password = await bcrypt.hash(user.password, salt);
    if (userType === "FACULTY") {
      const myRole = await roles.findOne({ name: "FACULTY" });
      let { role, ...newuser } = user;
      const arr = [];
      for (let index = 0; index < role.length; index++) {
       const element = role[index];
       const rol = await roles.findById(element);
       arr.push(rol);
      }
      const singletonRoles = ["SAC", "FO", "MO", "REGISTRAR", "CFI"];
      for (let i = 0; i < singletonRoles.length; i++) {
        const roleName = singletonRoles[i];
        const currentRole = await roles.findOne({ name: roleName });
        if (!currentRole) throw new Error(`Role ${roleName} cannot be found!`);
        const currentFacultyWithRole = await facultyModel.findOne({
          role: currentRole._id,
        });
        if (
          currentFacultyWithRole &&
          role.find((x) => String(x) == String(currentRole._id))
        ) {
          currentFacultyWithRole.role = currentFacultyWithRole.role.filter(
            (v) => String(currentRole._id) !== String(v)
          );
          await currentFacultyWithRole.save();
        }
      }
      let faculty = new facultyModel({
        role: [...arr, myRole._id],
        ...newuser,
      });
      faculty.password = password;
      await faculty.save();
    } else if (userType === "FORUM") {
      const myRole = await roles.findOne({ name: "FORUM" });
      let { facultyCoordinatorID, forumHeads, ...newuser } = user;
      // facultyCoordinatorID = facultyCoordinatorID.map((f) => {
      //   return mongoose.Types.ObjectId(f._id);
      // });
      forumHeads = forumHeads.map((f) => {
        return mongoose.Types.ObjectId(f._id);
      });
      let forum = new forums({
        facultyCoordinatorID,
        forumHeads,
        ...newuser,
        role: [myRole._id],
      });
      forum.password = password;
      await forum.save();
    } else if (userType === "ADMIN") {
      const myRole = await roles.findOne({ name: "ADMIN" });
      let admin = new admins({ ...user, role: [myRole._id] });
      admin.password = password;
      await admin.save();
    }

    return response("Success", process.env.SUCCESS_CODE);
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      return response("Email Already Exists.", process.env.FAILURE_CODE);
    } else return response(error, process.env.FAILURE_CODE);
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
    const total = await admins.countDocuments(where);
    res.json(
      response({ data: result, total: total }, process.env.SUCCESS_CODE)
    );
  } catch (error) {
    res.json(
      response({ message: "admins data fetch error" }, process.env.FAILURE_CODE)
    );
  }
};

const addCourse = async (req, res) => {
  try {
    const { newCourse } = req.body;
    const dataObject = JSON.parse(
      String(readFileSync("../static_data/courses.json"))
    );
    dataObject[newCourse.name] = newCourse;
    const r = writeFileSync(
      "../static_data/courses.json",
      JSON.stringify(dataObject)
    );
    res.json(response("added course", process.env.SUCCESS_CODE));
  } catch (error) {
    console.log(error);
    res.json(response(error.message, process.env.FAILURE_CODE));
  }
};
const editCourse = async (req, res) => {
  try {
    const { courseName, newData } = req.body;
    const dataObject = JSON.parse(
      String(readFileSync("../static_data/courses.json"))
    );
    if (Object.hasOwnProperty(courseName)) {
      dataObject[courseName] = newData;
      const r = writeFileSync(
        "../static_data/courses.json",
        JSON.stringify(dataObject)
      );
      res.json(response("edited course", process.env.SUCCESS_CODE));
    } else {
      res.json(response("no such course", process.env.FAILURE_CODE));
    }
  } catch (error) {
    console.log(error);
    res.json(error.message, process.env.FAILURE_CODE);
  }
};

module.exports = {
  addStudent,
  addRole,
  editAdmin,
  viewAdmin,
  deleteAdmin,
  getAdmins,
  register,
  addCourse,
  editCourse,
};
