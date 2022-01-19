import Table from "../../../components/CustomTable";
import Navbar from "../../../components/CustomNavbar";
import { useState } from "react";
import readXlsxFile from "read-excel-file";
import { Dialog } from "../../../components/Dialog/Dialog";

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
    Name: string;
    RollNumber: string;
    Year: Number;
    Branch: Function | String;
    section: String;
    email: String | undefined;
    phone: Number | null;
  }

  let data;
  let indx: Number;
  let NumberOfDays: number = 5;
  let dayWiseAttendance: any = {};
  let header = [
    {
      displayName: "Name",
      dataPath: "name",
      sortable: false,
    },
    {
      displayName: "Roll Number",
      dataPath: "rollNumber",
      sortable: false,
    },
    {
      displayName: "Branch",
      dataPath: "branch",
      sortable: false,
    },
  ];

  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [dataUploaded, setDataUploaded] = useState(false);

  function checkBranch(val: any, indx: Number) {
    console.log(val);
    if (Object.values(branch).includes(val.toUpperCase())) {
      return String(val);
    } else {
      throw Error;
    }
  }
  const handelFileToJson = (e: { target: { files: any } }) => {
    data = e.target.files;
    // console.log(data)
    if (data != null) {
      setDataUploaded(true);
      let list: Student[] = [];
      readXlsxFile(data[0])
        .then((row: any) => {
          row.slice(1).map((item: any) => {
            indx = row.indexOf(item) + 1;
            let newObj: Student = {
              Name: String(item[0]),
              RollNumber: String(item[1]),
              Year: Number(item[2]),
              Branch: checkBranch(item[3], indx),
              section: String(item[4]),
              email: String(item[5]),
              phone: Number(item[6]),
            };
            list.push(newObj);
            console.log("data ",list);
          });
        })
        .catch((e: any) => {
          setShow(true);
          setErrorMessage("Theres an error in row " + indx);
        });
    }
  };

  const handelAttendance = (e: { target: any }) => {
    if (e.target.checked) {
      dayWiseAttendance[e.target.name].push(e.target.value);
    } else {
      dayWiseAttendance[e.target.name] = dayWiseAttendance[
        e.target.name
      ].filter((val: any) => val !== e.target.value);
    }
    console.log(dayWiseAttendance);
  };

  const handelCheckbox = (item: any, indx: number) => {
    let displayName = `Day-${indx}`;
    let dataPath = `day-${indx}`;
    dayWiseAttendance[item.name] = [];
    item[dataPath] = (
      <input
        className="w-7 h-7 rounded-none accent-[#0B5B8A] cursor-pointer"
        type="checkbox"
        name={item.name}
        value={displayName}
        onChange={(e) => handelAttendance(e)}
      ></input>
    );
    if (header.length !== 3 + NumberOfDays) {
      header.push({
        displayName: displayName,
        dataPath: dataPath,
        sortable: false,
      });
    }
  };

  return (
    <div>
      <Dialog show={show} setShow={() => setShow(!show)} title={errorMessage} />
      {/* <Navbar navItems={[]} userName={"coding.Studio();"} /> */}
      <div className="flex flex-wrap">
        <div>
          <h1 className="text-arma-dark-blue pl-10 pt-10 pb-5 text-3xl font-bold">
            c.S( );SoC - Attendance
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
              handelFileToJson(e);
            }}
          />
        </div>
      </div>
      {dataUploaded ? (
        <>
          <div className="w-full min-w-max ">
            <Table
              api={`${process.env.REACT_APP_SERVER_URL + "students"}`}
              rowsPerPage={12}
              buttonsCount={2}
              headers={header}
              transformer={(item: any) => {
                for (let i = 0; i < NumberOfDays; i++) {
                  handelCheckbox(item, i + 1);
                }
              }}
            />
            <div>
              <div className="flex justify-center">
                {/* have to add functionality to buttons */}
                <button className="btn m-5">Save</button>
                <button className="btn m-5">Get Report</button>
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
