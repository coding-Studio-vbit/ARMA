const path = require("path");
const fs = require("fs/promises");
const md5 = require("md5");
const ejs = require("ejs");
const pdf = require("html-pdf");

const generateNewReport = async (student) => {
  //generate this students report again based on their details.
 
  //delete the old report.
  const studentCurrentReportFilePath = student.reportFilePath;
  try {
    let res = await fs.unlink(studentCurrentReportFilePath);
  } catch (error) {
    console.log(error);
  }
  let temp = md5(student.name + Date.now());
  let dirPath = path.join(
    __dirname,
    "../../../../data/static/",
    temp.slice(0, 1),
    temp.slice(0, 2)
  );
  let filename =
    md5(student.name + student.year + student.section + String(Date.now())) +
    "." +
    "pdf";

  const filePath = `${dirPath}/${filename}`;
  //create the new one.
  const data = await ejs.renderFile(
    path.join(__dirname, "../../static_data/student_report.ejs"),
    { student: student },
    { async: true }
  );
  return {data, filePath};
};

module.exports = { generateNewReport };
