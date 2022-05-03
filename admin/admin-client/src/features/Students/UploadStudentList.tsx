import readXlsxFile from "read-excel-file";
import { Dialog } from "../../Components/Dialog/Dialog";
import {Info} from "@material-ui/icons";
import { useState } from "react";
import axiosInstance from "../../utils/axios";
import { useNavigate} from "react-router-dom";

export const UploadStudentList = () =>{
    const nav = useNavigate()
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
      };
    const section = ["A","B","C","D"];
    const year = [1,2,3,4];
      interface Student {
        name: Function | string;
        rollNumber: Function | string;
        year: Function | Number;
        branch: Function | String;
        section: Function | String;
        email: String | Function;
        phone?: Function | Number;
      };

      let data;
      let indx: Number;
      const [dataUploaded,setDataUploaded] = useState(false);
      const [show,setShow] = useState(false);
      const [ dialogTitle, setDialogTitle ] = useState("");

      const validateBranch = (val: any) => {
        if (Object.values(branch).includes(val.toUpperCase())) {
            return String(val.toUpperCase());
        } else {
            console.log("error")
            setDialogTitle("Invalid Branch in row "+ indx);
            setShow(true);
            throw Error;
        }
      }
      ;
      const validateSection = (val :any) =>{
          console.log("secOK")  
          if(typeof(val) == "number"){
            setDialogTitle("Number can't be a section! Error in row  "+ indx);
            setShow(true);
            throw Error;

          }
          else if (Object.values(section).includes(val.toUpperCase())){
              return val.toUpperCase();
          }
          else {
            setDialogTitle("Invalid Section in row "+ indx);
            setShow(true);
            throw Error;   
          }
      };
      const validateUniqueid = (val:any) => {
        const uniqueid = val
        var rollNumber = uniqueid.toUpperCase();
        let rollRegex = new RegExp(/^(18|19|20|21)(p6|p5)(1|5)(a|A)(01|02|03|04|05|12|56|62|66|67|69|70)[(a-z)|(0-9)][0-9]$/i);
        if(rollNumber.length === 0){
            setDialogTitle("Roll Number is required in row "+ indx);
            setShow(true);
            throw Error;
        }
        else if(rollNumber.length < 10 || rollNumber.length>10 ) {
            setDialogTitle("Invalid Roll Number in row "+ indx);
            setShow(true);
            throw Error;
        }
        else if(!rollRegex.test(rollNumber)){
            setDialogTitle("Invalid Roll Number in row "+ indx);
            setShow(true);
            throw Error;
        } else{
          return uniqueid.toUpperCase();
        }
      };

      const validateName = (val : any) =>{
        const name = val;
        if (name.length === 0) {
            setDialogTitle("Name required in row "+ indx);
            setShow(true);
            throw Error;
        } 
        else {
            return name;
          }
      }

      const validateEmail = (val:any) =>{
        const email = val;
        if (email === null) {
          setDialogTitle("Email ID is required in row "+ indx);
          setShow(true);
          throw Error;
        } else {
          var validRegex =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
          if (!validRegex.test(email)) {
            setDialogTitle(" Invalid Email ID in row "+ indx);
            setShow(true);
            throw Error
          } else {
            return email;
          }
        }
      };

      const validatePhone = (val : any) => {
        const phone = val;
        var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if ( phone.length===0){
            return phone
        }
        else if(!phone.match(phoneno)){
            setDialogTitle("Invalid Phone number in row "+ indx);
            setShow(true);
            throw Error
        }
        else {
            return phone;
          }  
      };
      
      const validateYear = (val:any) =>{
        if (year.includes(val)) {
            return val;
          } else {
            setDialogTitle("Invalid Year in row " + indx);
            setShow(true);
            throw Error;
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
                if(item[6]){
                  let newObj: Student = {
                    name: validateName(item[0]),
                    rollNumber: validateUniqueid(item[1]),
                    year: validateYear(item[2]),
                    branch: validateBranch(item[3]),
                    section: validateSection(item[4]),
                    email: validateEmail(item[5]),
                    phone: validatePhone(item[6]),
                  };
                  list.push(newObj);
                }
                else{
                  let newObj: Student = {
                    name: validateName(item[0]),
                    rollNumber: validateUniqueid(item[1]),
                    year: validateYear(item[2]),
                    branch: validateBranch(item[3]),
                    section: validateSection(item[4]),
                    email: validateEmail(item[5]),
                  };
                  list.push(newObj);
                }    
              });
            })
            .then(async()=>{
              let res = await axiosInstance.post(process.env.REACT_APP_SERVER_URL+ "students/uploadStudentsList"
              ,list)
                setDialogTitle(res.data.response.message);
                setShow(true);
            })
            .catch((error: any) => {
              data = null
              list = []
              setDataUploaded(false);  
            });
        }
      };

      return (
        <div>
        <Dialog show={show} setShow={() => setShow(!show)} title={dialogTitle} />
        <div className="pl-10 pb-10 ">
          <label htmlFor="upload" className="btn cursor-pointer">
            Upload New Students list
          </label>
          <input 
            type="file"
            id="upload"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            hidden = {true}
            onChange={(e) => {
              handleFileToJson(e);
            }}
          />
          <Info className = "text-arma-blue m-3 cursor-pointer" onClick= {()=>{
            setDialogTitle("Make sure the header row order in excel sheet is as- Name/Rollnumber/Year/Branch\n/Section/Email/Phone")
            setShow(true)
          }} />
        </div>
        </div>
      )
}