import { ChangeEvent, useState } from "react";
import { Dialog } from "../../Components/Dialog/Dialog";
import { InputField } from "../../Components/InputField/InputField";
import Select from "react-select";
import { containerCSS } from "react-select/dist/declarations/src/components/containers";
import { Close } from "@material-ui/icons";
import axiosInstance from "../../utils/axios";
import { useLocation, useParams } from "react-router-dom";

interface AddStudentsProps
{
  isEdit: boolean,
}

export const AddStudents = ({isEdit}:AddStudentsProps) => {
  const location:any = useLocation()
  const [uniqueid, setuniqueid] = useState(location.state?.rollNumber ?? "");
  const [email, setEmail] = useState(location.state?.email ?? "");
  const [name, setName] = useState(location.state?.name ?? "");
  const [phone, setPhone] = useState(location.state?.phone ?? "");
  const [uniqueidError, setUniqueidError] = useState<string>();
  const [emailError, setEmailError] = useState<string>();
  const [nameError, setNameError] = useState<string>();
  const [phoneError, setPhoneError] = useState<string>();
  const [show, setShow] = useState(false);
  const [showError, setShowError] = useState<String>("");
  const [response, setResponse] = useState("")
  const [selectYear, setSelectYear] = useState(location.state?.year ?? null);
  const [selectDepartment, setSelectDepartment] = useState(location.state?.branch ?? "");
  const [selectSection, setSelectSection] = useState(location.state?.section ?? "");
  let {id} = useParams()
  
  const department = [
    { value: "CSE ", label: "CSE" },
    { value: "ECE ", label: "ECE" },
    { value: "IT", label: "IT" },
  ];

  
  const year = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },

  ];

  
  const sections = [
    { value: "A", label: "A" },
    { value: "B", label: "B" },
    { value: "C", label: "C" },
  ];

  const validateUniqueid = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uniqueid = e.target.value;
    setuniqueid(uniqueid);
    var rollNumber = uniqueid.toUpperCase();
    let rollRegex = new RegExp(/^(18|19|20|21)(p6|p5)(1|5)(a|A)(01|02|03|04|05|12|56|62|66|67|69|70)[(a-z)|(0-9)][0-9]$/i);
    if(rollNumber.length === 0){
        setUniqueidError("roll number cannot be empty");
    }
    else if(rollNumber.length < 10){
        setUniqueidError("roll number cannot be less than 10 characters");
    }
    else if(rollNumber.length>10){
        setUniqueidError("roll number cannot exceed 10 characters");
    }
    else if(!rollRegex.test(rollNumber)){
        setUniqueidError("roll number invalid");  
    } else{
      setUniqueidError("");
    }
    
  };

  const validateEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setEmail(email);
    if (email.length === 0) {
      setEmailError("Email field is empty");
    } else {
      var validRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (!validRegex.test(email)) {
        setEmailError("Enter valid Email!");
      } else {
        setEmailError("");
      }
    }
  };

  const validatePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phone = e.target.value;
    setPhone(phone);
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (phone.length === 0) {
      setPhoneError("Phone field is empty");
    } else if(!phone.match(phoneno)){
      setPhoneError("Invalid number");
    }
    else {
        setPhoneError("");
      }  
  };

  const validateName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setName(name);
    if (name.length === 0) {
      setNameError("Name field is empty");
    } 
    else {
        setNameError("");
      }
    
  };



  const loginValidate = async() => {
    if (
      uniqueid.length === 0 ||
      name.length === 0 ||
      email.length === 0 ||
      selectDepartment.length === 0 ||
      selectYear.length === 0 ||
      selectSection.length === 0 ||
      uniqueidError?.length !== 0 ||
      nameError?.length !== 0 ||
      emailError?.length !==0  
      
    ) {
      setShowError("Fill details appropriately");
    }
    else
    {
      if(!isEdit)
    {
        setShowError("");
        const res = await axiosInstance.post(process.env.REACT_APP_SERVER_URL + "admin/addStudent", {name:name, rollNumber:uniqueid, year:selectYear, branch:selectDepartment, section:selectSection,email:email,phone:phone,})
        const data = res.data
        if (data.status === 1) {
          setResponse("New Student Added")
          setShow(true)
        } else {
            setResponse(data.response)
            setShow(true)             
        }   
    }
    else{
      setShowError("");
        const res = await axiosInstance.post(process.env.REACT_APP_SERVER_URL + "students/editStudent", {id:id, name:name, rollNumber:uniqueid, year:selectYear, branch:selectDepartment, section:selectSection,email:email,phone:phone,})
        const data = res.data
        if (data.status === 1) {
          setResponse("Student Details Edited")
          setShow(true)
        } else {
            setResponse(data.response)
            setShow(true)             
        }   
    }
    }
  
    
  };

  return (
    <div className="flex flex-col grow items-center">
      <div className="mt-12 w-max">
        <p className="text-center lg:text-left text-arma-title text-2xl font-medium mb-12 ml-2 ">
          {isEdit? "EDIT STUDENT" : "ADD STUDENT"}
        </p>

        <div className=" flex flex-col gap-y-6 mb-6  md:flex-row sm:gap-x-8">
          <InputField
            name="Name"
            type="text"
            error={nameError}
            onChange={(e) => {
              validateName(e);
            }}
          />
          <InputField
            name="Roll Number"
            type="text"
            error={uniqueidError}
            onChange={(e) => {
              validateUniqueid(e);
            }}
          />
        </div>
        <div className=" flex flex-col gap-y-6 mb-6  md:flex-row sm:gap-x-8">
        <Select
            name="Year"
            placeholder="Year"
            options={year}
            onChange={(e:any) => {
              setSelectYear(e?.value)
          }}
            styles={{
                control: (base) => ({
                ...base,
                minHeight: 52,
                minWidth: 270,
                borderRadius: "0.5rem",
                border: "2px solid rgb(200, 200, 200)",
                }),

                placeholder: (base) => ({
                  ...base,
                  paddingLeft: '16px'
                }),
                singleValue: (base) => ({
                    ...base,
                    paddingLeft: '16px',
                    color: '#black'
                }) 
            }}
            
            className="basic-multi-select w-full h-full"
           
          /> 
          <Select
            name="Branch"
            placeholder="Branch"
            options={department}
            onChange={(e:any) => {
              setSelectDepartment(e?.value)
          }}
            styles={{
                control: (base) => ({
                ...base,
                minHeight: 52,
                minWidth: 270,
                borderRadius: "0.5rem",
                border: "2px solid rgb(200, 200, 200)",
                }),

                placeholder: (base) => ({
                  ...base,
                  paddingLeft: '16px'
                }),
                singleValue: (base) => ({
                    ...base,
                    paddingLeft: '16px',
                    color: 'black'
                }) 
            }}
            
            className="basic-multi-select w-full h-full"
           
          /> 
        </div>
        <div className=" flex flex-col gap-y-6 mb-6  md:flex-row sm:gap-x-8">
        <Select
            name="Section"
            placeholder="Section"
            options={sections}
            onChange={(e:any) => {
              setSelectSection(e?.value)
          }}
            styles={{
                control: (base) => ({
                ...base,
                minHeight: 52,
                minWidth: 270,
                borderRadius: "0.5rem",
                border: "2px solid rgb(200, 200, 200)",
                }),

                placeholder: (base) => ({
                  ...base,
                  paddingLeft: '16px'
                }),
                singleValue: (base) => ({
                    ...base,
                    paddingLeft: '16px',
                    color: 'black'
                }) 
            }}
            
            className="basic-multi-select"
           
          /> 
          <InputField
            name="Email"
            type="text"
            error={emailError}
            onChange={(e) => {
              validateEmail(e);
            }}
          />
        </div>
        <div className=" flex flex-col gap-y-6 mb-6  md:flex-row sm:gap-x-8">
        <InputField 
            name="Phone"
            type="text"
            error={phoneError}
            onChange={(e) =>{validatePhone(e)}}
            />
        </div>
        <Dialog show={show} setShow={setShow} title={response}>
          {" "}
        </Dialog>

        <button
          className="btn  bg-arma-title rounded-[8px] px-6 py-2 mt-12 ml-auto mr-auto flex justify-center"
          onClick={() => {
            loginValidate();
          }}
        >
          {isEdit? "SAVE" : "ADD"}
        </button>
        {showError.length !== 0 && (
          <span className="text-red-500 text-sm flex justify-center mt-2">
            {showError}
          </span>
        )}
      </div>
    </div>
  );
};

