import Attendance from "./attendanceTable";
import { useEffect, useState } from "react";
import readXlsxFile from "read-excel-file";
import json2ExcelBin from "js2excel";
import { Dialog } from "../../../components/Dialog/Dialog";
import axiosInstance from "../../../utils/axios";
import { Info } from "@material-ui/icons";
import { useLocation } from "react-router-dom";

const EventAttendance = () => {
  interface Student {
    name: string;
    rollNumber: string;
    year: Number;
    course: Function | String;
    branch: Function | String;
    section: String;
    email: String | Function;
    phone?: Number;
  }

  let data;
  let indx: Number;
  const section = ["A", "B", "C", "D"];
  const year = [1, 2, 3, 4];
  const location: any = useLocation();
  const eventID = location.state.eventId;
  const [event, setEvent] = useState(null);
  const [courses, setCourses] = useState(null);
  const [branches, setBranches] = useState(null);
  const [eventName, setEventName] = useState("");
  const [tableData, setTableData] = useState([]);
  const [reportData, setReportData] = useState([]);
  const [tableHeader, setTableHeader] = useState([
    "Name",
    "Roll Number",
    "Branch",
  ]);
  const [eventDates, setEventDates] = useState([]);
  const [show, setShow] = useState<boolean>(false);
  const [message, setMessage] = useState("");
  const [showBtns, setShowBtns] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dataUploaded, setDataUploaded] = useState(false);
  const [studentPresence, setStudentPresence] = useState<any>({});

  const getEventInfo = async () => {
    try {
      const res = await axiosInstance.get(
        process.env.REACT_APP_SERVER_URL + "events/getEvent/" + eventID
      );
      if (res.data.status == -1) {
        console.log(res.data.response.message);
      } else {
        console.log(res.data.response);
        setEvent(res.data.response);
        setEventName(res.data.response.name + " - Attendance");
        let eventD = res.data.response.eventDates;
        setEventDates((eventDates) => [...eventD]);
        setTableHeader((tableHeader) => [...tableHeader, ...eventD]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCourseInfo = async () => {
    try {
      const res = await axiosInstance.get(
        `${process.env.REACT_APP_SERVER_URL}students/getCourses`
      );
      if (res.data.status == -1) {
        console.log("Failed to fetch courses", res.data.response.message);
      } else {
        setCourses(res.data.response);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getBranchInfo = async () => {
    try {
      const res = await axiosInstance.get(
        `${process.env.REACT_APP_SERVER_URL}students/getBranches/B.Tech`
      );
      if (res.data.status == -1) {
        console.log("Failed to fetch courses", res.data.response.message);
      } else {
        setBranches(res.data.response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEventInfo();
    getCourseInfo();
    getBranchInfo();
  }, []);
  useEffect(() => {
    axiosInstance
      .get(
        process.env.REACT_APP_SERVER_URL +
          "events/eventAttendance?eventID=" +
          location.state.eventId
      )
      .then((resp) => {
        if (resp.data.response.status == -1) {
          setDataUploaded(false);
          setMessage("Student upload failed");
          setShow(true);
        } else if (resp.data.response.data.length == 0) {
          setDataUploaded(false);
        }
        resp.data.response.data.forEach((data: any) => {
          setStudentPresence((prevStudentPresence: any) => ({
            ...prevStudentPresence,
            [data?._id?._id]: data.dates,
          }));
        });
        if (resp.data.response.data.length > 0) {
          setDataUploaded(true);
          setTableData(resp.data.response.data);
          setLoading(false);
        }
      });
  }, [dataUploaded]);

  //Excel sheet valdation functions here
  const validateName = (val: any) => {
    const name = val;
    if (name.length === 0) {
      setMessage("Name required in row " + indx);
      setShow(true);
      throw new Error("Name required in row " + indx);
    } else {
      return name;
    }
  };
  const validateUniqueid = (val: any) => {
    const uniqueid = val;
    var rollNumber = uniqueid.toUpperCase();
    let rollRegex = new RegExp(
      /^(18|19|20|21)(p6|p5)(1|5)(a|A)(01|02|03|04|05|12|56|62|66|67|69|70)[(a-z)|(0-9)][0-9]$/i
    );
    if (rollNumber.length === 0) {
      setMessage("Roll Number is required in row " + indx);
      setShow(true);
      throw Error;
    } else if (rollNumber.length < 10 || rollNumber.length > 10) {
      setMessage("Invalid Roll Number in row " + indx);
      setShow(true);
      throw Error;
    } else if (!rollRegex.test(rollNumber)) {
      setMessage("Invalid Roll Number in row " + indx);
      setShow(true);
      throw Error;
    } else {
      return uniqueid.toUpperCase();
    }
  };

  const validateYear = (val: any) => {
    if (year.includes(val)) {
      return val;
    } else {
      setMessage("Invalid Year in row " + indx);
      setShow(true);
      throw new Error("Invalid Year in row " + indx);
    }
  };

  const validateCourse = (course: any) => {
    if (courses.includes(course)) {
      return String(course);
    } else {
      throw Error;
    }
  };

  function validateBranch(val: any) {
    if (branches.includes(val.toUpperCase())) {
      return String(val);
    } else {
      throw Error;
    }
  }

  const validateSection = (val: any) => {
    if (typeof val == "number") {
      setMessage("Number can't be a section! Error in row  " + indx);
      setShow(true);
      throw Error;
    } else if (Object.values(section).includes(val.toUpperCase())) {
      return val.toUpperCase();
    } else {
      setMessage("Invalid Section in row " + indx);
      setShow(true);
      throw Error;
    }
  };

  function validateEmail(email: any) {
    var validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (validRegex.test(email)) {
      return String(email);
    } else {
      throw Error;
    }
  }

  const validatePhone = (val: any) => {
    const phone = val;
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (phone.length === 0) {
      return phone;
    } else if (!phone.match(phoneno)) {
      setMessage("Invalid Phone number in row " + indx);
      setShow(true);
      throw new Error("Invalid Phone number in row " + indx);
    } else {
      return phone;
    }
  };

  const handleFileToJson = (e: { target: { files: any } }) => {
    data = e.target.files;
    if (data != null) {
      setDataUploaded(true);
      let list: Student[] = [];
      readXlsxFile(data[0])
        .then((row: any) => {
          row.slice(1).map((item: any) => {
            indx = row.indexOf(item) + 1;
            if (item[7]) {
              let newObj: Student = {
                name: validateName(item[0]),
                rollNumber: validateUniqueid(item[1]),
                year: validateYear(item[2]),
                course: validateCourse(item[3]),
                branch: validateBranch(item[4]),
                section: validateSection(item[5]),
                email: validateEmail(item[6]),
                phone: validatePhone(item[7]),
              };
              list.push(newObj);
            } else {
              let newObj: Student = {
                name: validateName(item[0]),
                rollNumber: validateUniqueid(item[1]),
                year: validateYear(item[2]),
                course: validateCourse(item[3]),
                branch: validateBranch(item[4]),
                section: validateSection(item[5]),
                email: validateEmail(item[6]),
              };
              list.push(newObj);
            }
          });
        })
        .then(async () => {
          const res = await axiosInstance.post(
            process.env.REACT_APP_SERVER_URL +
              "events/uploadRegistrants?attendedEvents=" +
              eventID,
            list
          );
          setMessage(res.data.response.message);
          setShow(true);
          location.reload();
        })

        .catch((error: any) => {
          data = null;
          list = [];
          setDataUploaded(false);
        });
    }
  };

  const handleSave = async () => {
    const res = await axiosInstance.put(
      process.env.REACT_APP_SERVER_URL + "events/postAttendance",
      { studentPresence: studentPresence, eventID: eventID }
    );
    const data = res.data;
    if (data.status === 1) {
      setMessage("Attendance successfully saved!");
    } else {
      setMessage("Attedance Update Failed: " + data.response);
    }
    setShow(true);
  };

  const handleReport = async () => {
    axiosInstance
      .get(
        process.env.REACT_APP_SERVER_URL +
          "events/eventAttendance?eventID=" +
          eventID
      )
      .then((res) => {
        let data = res.data.response.data;
        let tempReportData = [];
        try {
          data.forEach((value) => {
            let newObj = {
              Name: value._id.name,
              "Roll Number": value._id.rollNumber,
              Branch: value._id.branch,
            };
            eventDates.forEach((date) => {
              if (value.dates.indexOf(date) > -1) {
                newObj[date] = "Present";
              } else {
                newObj[date] = "Absent";
              }
            });
            tempReportData.push(newObj);
          });
          setReportData(tempReportData);
          setMessage("Is attendance saved?");
          setShowBtns(true);
          setShow(true);
        } catch {
          console.log("biscuit");
          setMessage("Error! Report cannot be generated right now.");
          setShow(true);
        }
      });
  };

  return (
    <div>
      <Dialog
        show={show}
        setShow={() => setShow(!show)}
        title={message}
        loading={loading}
        children={
          showBtns && (
            <div>
              <button
                className="outlineBtn m-2"
                onClick={() => {
                  setShow(!show);
                  setShowBtns(false);
                }}
              >
                No
              </button>
              <button
                className="btn m-2"
                onClick={() => {
                  json2ExcelBin.json2excel({
                    data: reportData,
                    name: eventName,
                  });
                  setShowBtns(false);
                  setShow(false);
                }}
              >
                Yes
              </button>
            </div>
          )
        }
      />
      <div className="flex flex-wrap">
        <div>
          <h1 className="text-arma-dark-blue pl-10 pt-10 pb-5 text-3xl font-bold">
            {eventName}
          </h1>
        </div>
        {event?.eventStatus == "APPROVED" && <div className="pl-10 pb-10 mt-12">
          <label htmlFor="upload" className="btn cursor-pointer">
            Upload New Students list
          </label>
          <input
            type="file"
            id="upload"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            onChange={(e) => {
              handleFileToJson(e);
            }}
          />
          <Info
            className="text-arma-blue m-3 cursor-pointer"
            onClick={() => {
              setMessage(
                "Make sure the header row order is as- Name/Rollnumber/Year/Course\n/Branch\n/Section/Email/Phone"
              );
              setShow(true);
            }}
          />
        </div>}
      </div>
      {dataUploaded ? (
        <>
          <div className="w-full min-w-max ">
            <Attendance
              tableData={tableData}
              studentPresence={studentPresence}
              setStudentPresence={setStudentPresence}
              tableHeader={tableHeader}
              eventDates={eventDates}
            />
            <div>
              {event?.eventStatus == "APPROVED" && (
                <div className="flex justify-center">
                  <button className="btn m-5" onClick={handleSave}>
                    Save
                  </button>
                  <button className="btn m-5" onClick={handleReport}>
                    Get Report
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default EventAttendance;
