import Attendance from "./attendanceTable";
import { useEffect, useState } from "react";
import readXlsxFile from "read-excel-file";
import json2ExcelBin from 'js2excel';
import { Dialog } from "../../../components/Dialog/Dialog";
import axiosInstance from "../../../utils/axios";

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
  const eventID   = "61da9c41ee32a8e65373fcc4"

  interface Student {
    name: string;
    rollNumber: string;
    year: Number;
    branch: Function | String;
    section: String;
    email: String | Function;
    phone?: Number;
    attendedEvents : [string];
  }


  let data;
  let indx: Number;
  let eventName = "c.S( );SoC - Attendance"
  const [tableData,setTableData] = useState([])
  const [tableHeader,setTableHeader] = useState(["Name","Roll Number", "Branch","7-1-2021","8-1-2021","9-1-2021"])
  const [eventDates,setEventDates] = useState(["1-11-2020","2-11-2020","3-11-2020"])
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [dataUploaded, setDataUploaded] = useState(false);
  const [studentPresence,setStudentPresence] = useState<any>({});

  useEffect(()=>{
    axiosInstance.get(process.env.REACT_APP_SERVER_URL +"events/eventAttendance?eventID=" + eventID)
  .then(resp=>{
    (resp.data.response.data).forEach((data:any)=>{
      setStudentPresence((prevStudentPresence:any)=>({
        ...prevStudentPresence,
        [data._id._id]:data.dates
      }));
    })
    if ((resp.data.response.data).length>0){
      setDataUploaded(true)
      setTableData(resp.data.response.data)
    }
  })
    
  },[dataUploaded])
  

  function checkBranch(val: any) {
    if (Object.values(branch).includes(val.toUpperCase())) {
      return String(val);
    } else {
      throw Error;
    }
  }
  function validateEmail(email:any){
    var validRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (validRegex.test(email)) {
        return String(email)
      }else{
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
            if(item[6]){
              let newObj: Student = {
                name: String(item[0]),
                rollNumber: String(item[1]),
                year: Number(item[2]),
                branch: checkBranch(item[3]),
                section: String(item[4]),
                email: validateEmail(item[5]),
                phone: Number(item[6]),
                attendedEvents : [eventID]
              };
              list.push(newObj);
            }
            else{
              let newObj: Student = {
                name: String(item[0]),
                rollNumber: String(item[1]),
                year: Number(item[2]),
                branch: checkBranch(item[3]),
                section: String(item[4]),
                email: validateEmail(item[5]),
                attendedEvents : [eventID]
              };
              list.push(newObj);
            }    
          });
        })
        .then(async()=>{
          await axiosInstance.post(process.env.REACT_APP_SERVER_URL+ "events/uploadRegistrants?attendedEvents=" + eventID
          ,list)
        })
        .catch((error: any) => {
          data = null
          list = []
          setDataUploaded(false);
          setShow(true);
          setMessage("Theres an error in row " + indx);
        });
    }
  };
  
  const handleSave = async() =>{
    const res = await axiosInstance.put(process.env.REACT_APP_SERVER_URL+"events/postAttendance",
    {studentPresence: studentPresence,eventID :eventID})
    const data = res.data
    if(data.status == 1){
      setMessage("Attendance successfully saved!")
    }
    else{
      setMessage("Attedance Update Failed")
    }
    setShow(true)
  }

  const handleReport = () =>{
    axiosInstance.get(process.env.REACT_APP_SERVER_URL +"events/eventAttendance?eventID=" + eventID)
    .then(res =>{
      let data = res.data.response.data
      let reportData = []
      try{
        data.forEach((value)=>{
          let newObj = {"Name" :value._id.name, 
                        "Roll Number" : value._id.rollNumber,
                        "Branch" : value._id.branch}
          eventDates.forEach((date)=>{
            if (value.dates.indexOf(date)>-1){ 
              newObj[date] = "Present"
            }
            else{ newObj[date] = "Absent" }
          })
          reportData.push(newObj)
        })
        json2ExcelBin.json2excel({data: reportData, name: eventName})
    }
      catch{ 
        console.log("biscuit")
        setMessage("Error! Report cannot be generated right now.") 
        setShow(true)  }
    })}

  return (
    <div>
      <Dialog show={show} setShow={() => setShow(!show)} title={message} />
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
            style={{ display: "none" }}
            onChange={(e) => {
              handleFileToJson(e);
            }}
          />
        </div>
      </div>
      {dataUploaded ? (
        <>
          <div className="w-full min-w-max ">
            <Attendance 
            tableData = {tableData}
            studentPresence = {studentPresence}
            setStudentPresence = {setStudentPresence}
            tableHeader = {tableHeader}
            eventDates = {eventDates}
            />
            <div>
              <div className="flex justify-center">
                <button className="btn m-5" onClick = {handleSave}>Save</button>
                <button className="btn m-5" onClick = {handleReport}>Get Report</button>
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
