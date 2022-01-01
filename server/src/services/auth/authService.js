const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const facultyModel = require("../../models/faculty");
const forums = require("../../models/forum");
const response = require("../util/response");
const login = async (email, password, userAgent, userType) => {
  try {
    let user;
    if (userType === "FACULTY") {
      user = await facultyModel.findOne({ email: email });
    } else if (userType === "FORUM") {
      user = await forums.findOne({ email: email });
    }
    if (!user) {
      return response("User does not exist", process.env.FAILURE_CODE);
    }
    console.log(user);
    const result = bcrypt.compareSync(password, user.password);
    if (result) {
      const token = jwt.sign(
        { email: email, password: password, userAgent: userAgent },
        process.env.JWT_SECRET_KEY
      );
      user.password = ''
      return response({token:token,user:user}, process.env.SUCCESS_CODE);
    }
  } catch (error) {
    console.log(error);
    return response(error);
  }
};

// const register = async (user, userType) => {
//   try {
//     const salt = await bcrypt.genSalt(parseInt(process.env.SALTROUNDS));
//     const password = await bcrypt.hash(user.password, salt);
//     if (userType === "FACULTY") {
//       let faculty = new facultyModel(user);
//       faculty.password = password
//       await faculty.save();
//     } else if (userType === "FORUM") {
//       let forum = new forums(user);
//       forum.password = password;
//       await forum.save();
//     }
    
//     return response("Success", process.env.SUCCESS_CODE);
//   } catch (error) {
//     console.log(error);
//     return response("failure", process.env.FAILURE_CODE);
//   }
// };

module.exports = { login };
