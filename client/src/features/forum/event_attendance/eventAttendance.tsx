import Attendance from "./attendanceTable";
import { useEffect, useState } from "react";
import readXlsxFile from "read-excel-file";
import json2ExcelBin from "js2excel";
import { Dialog } from "../../../components/Dialog/Dialog";
import axiosInstance from "../../../utils/axios";
import { Info } from "@material-ui/icons";
import { useLocation } from "react-router-dom";

const EventAttendance = () => {
  enum branch {
    CSE = "CSE",
    CSM = "CSM",
    CSC = "CSC",
    CSB = "CSB",
    ME = "ME",
    CE = "CE",
    EEE = "EEE",
    ECE = "ECE",
    IT = "IT",
  }

  interface Student {
    name: string;
    rollNumber: string;
    year: Number;
    branch: Function | String;
    section: String;
    email: String | Function;
    phone?: Number;
    attendedEvents: [string];
  }

  let data;
  let indx: Number;
  const location: any = useLocation();
  const eventID = location.state.eventId;
  const [event, setEvent] = useState(null);
  const [eventName, setEventName] = useState("");
  const [tableData, setTableData] = useState([]);
  const [reportData, setReportData] = useState([]);
  const [tableHeader, setTableHeader] = useState([
    "Name",
    "Roll Number",
    "Branch",
    "7-1-2021",
    "8-1-2021",
    "9-1-2021",
  ]);
  const [eventDates, setEventDates] = useState([
    "1-11-2020",
    "2-11-2020",
    "3-11-2020",
  ]);
  const [show, setShow] = useState<boolean>(false);
  const [message, setMessage] = useState("");
  const [showBtns, setShowBtns] = useState(false);
  const [dataUploaded, setDataUploaded] = useState(false);
  const [studentPresence, setStudentPresence] = useState<any>({});

  const getEventInfo = async () => {
    try {
      const res = await axiosInstance.get(
        process.env.REACT_APP_SERVER_URL + "events/getEvent/" + eventID
      );
      if(res.data.response.status == -1){
        console.log(res.data.response.message);
      }else
      {
        setEvent(res.data.response);
        setEventName(res.data.response.name + " - Attendance");
      }
    } catch (error) {console.log(error)}
  };
  useEffect(() => {getEventInfo()}, []);
  useEffect(() => {
    axiosInstance
      .get(
        process.env.REACT_APP_SERVER_URL +
          "events/eventAttendance?eventID=" +
          location.state.eventId
      )
      .then((resp) => {
        if (resp.data.response.status == -1) {
          console.log(resp)
          throw new Error("Error occured");
        }
        resp.data.response.data.forEach((data: any) => {
          setStudentPresence((prevStudentPresence: any) => ({
            ...prevStudentPresence,
            [data._id._id]: data.dates,
          }));
        });
        if (resp.data.response.data.length > 0) {
          setDataUploaded(true);
          setTableData(resp.data.response.data);
        }
      });
  }, [dataUploaded]);

  function checkBranch(val: any) {
    if (Object.values(branch).includes(val.toUpperCase())) {
      return String(val);
    } else {
      throw Error;
    }
  }
  function validateEmail(email: any) {
    var validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (validRegex.test(email)) {
      return String(email);
    } else {
      throw Error;
    }
  }
  const handleFileToJson = (e: { target: { files: any } }) => {
    data = e.target.files;
    if (data != null) {
      setDataUploaded(true);
      let list: Student[] = [];
      readXlsxFile(data[0])
        .then((row: any) => {
          row.slice(1).map((item: any) => {
            indx = row.indexOf(item) + 1;
            if (item[6]) {
              let newObj: Student = {
                name: String(item[0]),
                rollNumber: String(item[1]),
                year: Number(item[2]),
                branch: checkBranch(item[3]),
                section: String(item[4]),
                email: validateEmail(item[5]),
                phone: Number(item[6]),
                attendedEvents: [eventID],
              };
              list.push(newObj);
            } else {
              let newObj: Student = {
                name: String(item[0]),
                rollNumber: String(item[1]),
                year: Number(item[2]),
                branch: checkBranch(item[3]),
                section: String(item[4]),
                email: validateEmail(item[5]),
                attendedEvents: [eventID],
              };
              list.push(newObj);
            }
          });
        })
        .then(async () => {
          await axiosInstance.post(
            process.env.REACT_APP_SERVER_URL +
              "events/uploadRegistrants?attendedEvents=" +
              eventID,
            list
          );
        })
        .catch((error: any) => {
          data = null;
          list = [];
          setDataUploaded(false);
          setShow(true);
          setMessage("Theres an error in row " + indx);
        });
    }
  };

  const handleSave = async () => {
    const res = await axiosInstance.put(
      process.env.REACT_APP_SERVER_URL + "events/postAttendance",
      { studentPresence: studentPresence, eventID: eventID }
    );
    const data = res.data;
    if (data.status == 1) {
      setMessage("Attendance successfully saved!");
    } else {
      setMessage("Attedance Update Failed");
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
        <div className="pl-10 pb-10 mt-12">
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
                "Make sure the header row order is as- Name/Rollnumber/Year/Branch\n/Section/Email/Phone"
              );
              setShow(true);
            }}
          />
        </div>
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
              <div className="flex justify-center">
                <button className="btn m-5" onClick={handleSave}>
                  Save
                </button>
                <button className="btn m-5" onClick={handleReport}>
                  Get Report
                </button>
              </div>
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
