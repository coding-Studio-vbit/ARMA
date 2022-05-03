const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const facultyModel = require("../../models/faculty");
const forums = require("../../models/forum");
const response = require("../util/response");
const admins = require("../../models/admin");
const mongoose = require("mongoose");
const roles = require("../../models/role");
const mailer = require("../util/mailer");
const { forgotPasswordTemplate } = require("../../email_templates/templates");

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
      user = await admins.findOne({ email: email }).populate("role");
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

const resetPasswordMail = async (email, res) => {
  try {
    facultyUser = await facultyModel.findOne({ email: email }).populate("role");
    forumUser = await forums
      .findOne({ email: email })
      .populate({ path: "role" })
      .populate({ path: "facultyCoordinatorID", select: "name" });
    adminUser = await admins.findOne({ email: email });

    if (facultyUser) {
      //mail with tokenID
      const secret = process.env.JWT_SECRET_KEY + facultyUser.password;
      const token = jwt.sign(
        {
          email: email,
          _id: facultyUser._id,
          userType: "FORUM",
        },
        secret,
        { expiresIn: "15m" }
      );
      const link = `${process.env.FRONTEND_URL}/reset-password/${email}/${token}`;
      await mailer.sendMail(email, forgotPasswordTemplate, {
        passwordLink: link,
      });
      return response(link, process.env.SUCCESS_CODE);
    }
    if (forumUser) {
      //mail with tokenID
      const secret = process.env.JWT_SECRET_KEY + forumUser.password;
      const token = jwt.sign(
        {
          email: email,
          _id: forumUser._id,
          userType: "FORUM",
        },
        secret,
        { expiresIn: "15m" }
      );
      const link = `${process.env.FRONTEND_URL}/reset-password/${email}/${token}`;
      await mailer.sendMail(email, forgotPasswordTemplate, {
        passwordLink: link,
      });
      return response(link, process.env.SUCCESS_CODE);
    }
    if (adminUser) {
      //mail with tokenID
      const secret = process.env.JWT_SECRET_KEY + adminUser.password;
      const token = jwt.sign(
        {
          email: email,
          _id: adminUser._id,
          userType: "FORUM",
        },
        secret,
        { expiresIn: "15m" }
      );
      const link = `${process.env.FRONTEND_URL}/reset-password/${email}/${token}`;
      await mailer.sendMail(email, forgotPasswordTemplate, {
        passwordLink: link,
      });
      return response(link, process.env.SUCCESS_CODE);
    }
    if (!facultyUser && !forumUser && !adminUser)
      res.status(404).send({ error: "Email not found" });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const resetPassword = async (email, password, token, res) => {
  try {
    const salt = await bcrypt.genSalt(parseInt(process.env.SALTROUNDS));
    const encryptedPassword = await bcrypt.hash(password, salt);

    facultyUser = await facultyModel.findOne({ email: email }).populate("role");
    forumUser = await forums
      .findOne({ email: email })
      .populate({ path: "role" })
      .populate({ path: "facultyCoordinatorID", select: "name" });
    adminUser = await admins.findOne({ email: email });

    if (facultyUser) {
      const secret = process.env.JWT_SECRET_KEY + facultyUser.password;
      const payload = jwt.verify(token, secret);
      facultyUser.password = encryptedPassword;
      await facultyUser.save();
      return response("done", process.env.SUCCESS_CODE);
    }
    if (forumUser) {
      const secret = process.env.JWT_SECRET_KEY + forumUser.password;
      console.log({ token, email, password, oldpassword: forumUser.password });
      const payload = jwt.verify(token, secret);
      forumUser.password = encryptedPassword;
      await forumUser.save();
      return response("done", process.env.SUCCESS_CODE);
    }
    if (adminUser) {
      const secret = process.env.JWT_SECRET_KEY + adminUser.password;
      const payload = jwt.verify(token, secret);
      adminUser.password = encryptedPassword;
      await adminUser.save();
      return response("done", process.env.SUCCESS_CODE);
    }
    if (!facultyUser && !forumUser && !adminUser)
      res.status(404).send({ error: "Email not found" });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

module.exports = { login, register, resetPasswordMail, resetPassword };
