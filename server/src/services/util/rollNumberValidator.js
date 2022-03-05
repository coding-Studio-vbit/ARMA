const course_structure = require("../../static_data/courses.json");

const checkStudentRollNumber = (roll) => {
  /* 2 - year - Allow last 8 years students.
   * 2 - College code - Anything
   * 1 - Type of Course - '1' or '5'
   * 1 - Course Code - A,D,E,F,R,S,T
   * 2 - Branch Code -
   * 2 - Serial Number
   */

  let year = roll.substring(0, 2);
  let allowedYears = [];
  let currentYear = newDate().getFullYear();
  for (let i = 0; i < 8; i++)
    allowedYears.push(String(currentYear - i).slice(-2));

  //Invalid Year
  if (!(year in allowedYears)) return false;

  let courseType = roll.substring(4, 5);

  //Invalid Course Type
  if (!(courseType in ["1", "5"])) return false;

  let courseCode = roll.substring(5, 6);
  let branchCode = roll.substring(6, 8);

  let branchOK = false;
  let courseOK = false;

  //Find if branch code is right.
  //First find the branches.

  for (course in course_structure) {
    if (course_structure[course].code == courseCode) {
      branchOK = true;
      let branches = course_structure[course].branches;
      for (branch in branches)
        if (branch.code == branchCode) {
          courseOK = true;
          break;
        }
      break;
    }
  }
  return branchOK && courseOK;
};

module.exports = {
  checkStudentRollNumber,
};
