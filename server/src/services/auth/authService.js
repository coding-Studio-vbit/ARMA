const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const facultyModel = require("../../models/faculty");
const forums = require("../../models/forum");
const students = require("../../models/student");
const role = require("../../models/role");
const response = require("../util/response");
const admins = require('../../models/admin')
const login = async (email, password, userAgent, userType) => {
  try {
    let user;
    if (userType === "FACULTY") {
      user = await facultyModel.findOne({ email: email }).populate('roles');
    } else if (userType === "FORUM") {
      user = await forums.findOne({ email: email });
    } else { //Admin
      user = await admins.findOne({email:email})
    }

    if (!user) {
      return response("User does not exist", process.env.FAILURE_CODE);
    }
    const result = bcrypt.compareSync(password, user.password);
    if (result) {
      const token = jwt.sign(
        { email: email, _id: user._id, userAgent: userAgent },
        process.env.JWT_SECRET_KEY
      );
      user.password = "";
      return response({ token: token, user: user }, process.env.SUCCESS_CODE);
    }
  } catch (error) {
    console.log(error);
    return response(error);
  }
};

const register = async (user, userType) => {
  try {
    const salt = await bcrypt.genSalt(parseInt(process.env.SALTROUNDS));
    const password = await bcrypt.hash(user.password, salt);
    if (userType === "FACULTY") {
      let faculty = new facultyModel(user);
      faculty.password = password;
      await faculty.save();
    } else if (userType === "FORUM") {
      let forum = new forums(user);
      forum.password = password;
      await forum.save();
    }else if(userType === "ADMIN") {
      let admin = new admins(user)
      admin.password = password
      await admin.save()
    }

    return response("Success", process.env.SUCCESS_CODE);
  } catch (error) {
    console.log(error);
    if(error.code === 11000){
     return response("Email Already Exists.",  process.env.FAILURE_CODE)
    }else
    return response(error, process.env.FAILURE_CODE);
  }
};

const addStudent = async (data) => {
  try {
    let student = new students(data);
    await student.save();
    return response("Success", process.env.SUCCESS_CODE);
  } catch (error) {
    console.log(error);
    return response("failure", process.env.FAILURE_CODE);
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

module.exports = { login, register, addStudent, addRole };
