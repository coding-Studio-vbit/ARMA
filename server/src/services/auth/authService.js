const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const facultyModel = require("../../models/faculty");
const forums = require("../../models/forum");
const students = require("../../models/student");
const role = require("../../models/role");
const response = require("../util/response");
const admins = require("../../models/admin");
const mongoose = require("mongoose");
const roles = require("../../models/role");

const login = async (email, password, userAgent, userType) => {
  try {
    let user;
    if (userType === "FACULTY") {
      user = await facultyModel.findOne({ email: email }).populate("role");
    } else if (userType === "FORUM") {
      user = await forums
        .findOne({ email: email })
        .populate({ path: "role" })
        .populate({ path: "facultyCoordinatorID", select: "name" });
    } else if (userType === "ADMIN") {
      //Admin
      user = await admins.findOne({ email: email });
    }

    if (!user) {
      return response("User does not exist", process.env.FAILURE_CODE);
    }
    const result = bcrypt.compareSync(password, user.password);
    if (result) {
      const token = jwt.sign(
        {
          email: email,
          _id: user._id,
          userAgent: userAgent,
          role: user.role,
          userType: userType === "FACULTY" ? user.role : userType,
        },
        process.env.JWT_SECRET_KEY
      );
      user.password = "";
      return response({ token: token, user: user }, process.env.SUCCESS_CODE);
    } else {
      return response("Invalid Credentials!", process.env.FAILURE_CODE);
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
      let { rolesF, ...newuser } = user;
      console.log(rolesF);
      const arr = [];
      for (let index = 0; index < rolesF.length; index++) {
        const element = rolesF[index];
        const rol = await roles.findById(element);
        arr.push(rol);
      }

      console.log(rolesF);
      let faculty = new facultyModel({ role: arr, ...newuser });
      faculty.password = password;
      await faculty.save();
    } else if (userType === "FORUM") {
      let { facultyCoordinatorID, forumHeads, ...newuser } = user;
      facultyCoordinatorID = facultyCoordinatorID.map((f) => {
        return mongoose.Types.ObjectId(f._id);
      });
      forumHeads = forumHeads.map((f) => {
        return mongoose.Types.ObjectId(f._id);
      });
      let forum = new forums({ facultyCoordinatorID, forumHeads, ...newuser });
      forum.password = password;
      await forum.save();
    } else if (userType === "ADMIN") {
      let admin = new admins(user);
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

const resetPasswordEmail = async (email) => {
  try {
    facultyUser = await facultyModel.findOne({ email: email }).populate("role");
    forumUser = await forums
      .findOne({ email: email })
      .populate({ path: "role" })
      .populate({ path: "facultyCoordinatorID", select: "name" });
    adminUser = await admins.findOne({ email: email });

    if (facultyUser) {
      //mail with tokenID
    }
    if (forumUser) {
      //mail with tokenID
    }
    if (adminUser) {
      //mail with tokenID
    }
    if (!facultyUser && !forumUser && !adminUser)
      response("Email does not exists.", process.env.FAILURE_CODE);
  } catch (error) {
    console.log(error);
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
    let admin = await admins.findOne({_id: id});
    res.json(response(admin, process.env.SUCCESS_CODE));
  } catch (err) {
    console.log(err);
    res.json(response(error, process.env.FAILURE_CODE));
  }
};

const deleteAdmin = async (id) => {
  try {
    let admin = await admins.deleteOne({_id:id})
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
  if (req.query.email)
    where.email = { $regex: req.query.email, $options: "i" };
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
    const total = await students.count(where);
    res.json(
      response({ data: result, total: total }, process.env.SUCCESS_CODE)
    );
  } catch (error) {
    res.json(
      response(
        { message: "admins data fetch error" },
        process.env.FAILURE_CODE
      )
    );
  }
};


module.exports = { login, register, addStudent, addRole, editAdmin, viewAdmin, deleteAdmin, getAdmins };
