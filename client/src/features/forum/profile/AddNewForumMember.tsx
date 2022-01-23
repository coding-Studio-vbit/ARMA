import React, { useState } from 'react'
import Select from "react-select";
import { Dialog } from '../../../components/Dialog/Dialog';
import { InputField } from '../../../components/InputField/InputField';
import { useUser } from '../../../providers/user/UserProvider';
import axiosInstance from '../../../utils/axios';

export default function AddNewForumMember() {
  const {forum} = useUser()
    const departmentoptions = [
        { value: "CSE ", label: "CSE" },
        { value: "ECE ", label: "ECE" },
        { value: "IT", label: "IT" },
      ];
      const yearoptions = [
        { value: "1 ", label: "1" },
        { value: "2 ", label: "2" },
        { value: "3", label: "3" },
      ];
      const sectionoptions = [
        { value: "A ", label: "A" },
        { value: "B ", label: "B" },
        { value: "C", label: "C" },
      ];
    
    const [rollNumber, setRollNumber] = useState("")
    const [name, setName] = useState("");
    const [department, setDepartment] = useState("");
    const [year, setYear] = useState("");
    const [section, setSection] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [show, setShow] = useState(false);
    const [response, setResponse] = useState("")

    
    const [rollNumberError, setRollNumberError] = useState<string>();
    const [nameError, setNameError] = useState<string>();
    const [departmentError, setDepartmentError] = useState<string>();
    const [yearError, setYearError] = useState<string>();
    const [sectionError, setSectionError] = useState<string>();
    const [emailError, setEmailError] = useState<string>();
    const [phoneError, setPhoneError] = useState<string>();
    const [showError, setShowError] = useState<String>("");

    
    const validateRollNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rollNumber = e.target.value;
        setRollNumber(rollNumber);
        if (rollNumber.length === 0) {
          setRollNumberError("Roll Number field is empty");
        } //Add Roll no validation
        else {
            setRollNumberError("");
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
     
      const validateDepartment = (e: any) => {
        const department = e.value;
        setDepartment(department);
        if (department.length === 0) {
          setDepartmentError("Department field is empty");
        } 
        else {
            setDepartmentError("");
          }
        
      };

      const validateYear = (e: any) => {
        const year = e.value;
        setYear(year);
        if (year.length === 0) {
          setYearError("Year field is empty");
        } 
        else {
            setYearError("");
          }
        
      };

      const validateSection = (e: any) => {
        const section = e.value;
        setSection(section);
        if (section.length === 0) {
          setSectionError("Section field is empty");
        } 
        else {
            setSectionError("");
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

      
      const submitValidate = async() => {
        if (
          rollNumber.length === 0 ||
          name.length === 0 ||
          department.length === 0 ||
          year.length === 0 ||
          section.length === 0 ||
          email.length === 0 ||
          phone.length === 0 ||
          rollNumberError?.length !== 0 ||
          nameError?.length !== 0 ||
          departmentError?.length !== 0 ||
          yearError?.length !== 0 ||
          sectionError?.length !== 0 ||
          phoneError?.length !== 0 ||
          emailError?.length !==0           
        ) {
          setShowError("Fill details appropriately");
        } else {
          setShowError("");
          const res = await axiosInstance.post(process.env.REACT_APP_SERVER_URL + "forum/addNewForumMembers", {forumName:forum?.name, rollNumber:rollNumber, name:name, department:department, year:year, section:section, email:email,phone:phone})
          const data = res.data
          if (data.status === 1) {
            setResponse("New Forum Member Added")
            setShow(true)
          } else {
              setResponse(data.response)
              setShow(true)             
          }   
        }
      };


    return (
        <div className="flex flex-col items-center">
            <div className="mt-12 ">
            <p className="text-center lg:text-left text-arma-title text-2xl font-medium mb-12 ml-2 ">
          ADD NEW FORUM MEMBER
        </p>
        <div className=" grid grid-cols-1 sm:grid-cols-2 gap-6 ">
          <InputField
            name="Roll Number"
            type="text"
            error={rollNumberError}
            onChange={(e) => {validateRollNumber(e)}}
          />
          <InputField
            name="Name"
            type="text"
            error={nameError}
            onChange={(e) => {validateName(e)}}
          />
       
        <Select
            name="Department"
            placeholder="Department"
            className="basic-single"
            classNamePrefix="select"
            // value ={{value: "Department", label: "Department"}}
            options={departmentoptions}
            onChange={(e) => {validateDepartment(e)}}
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
                    color: '#575757e1'
                }) 
            }}           
          /> 
          <Select
            name="Year"
            placeholder="Year"
            className="basic-single"
            classNamePrefix="select"
            // value ={{value: "Year", label: "Year"}}
            options={yearoptions}
            onChange={(e) => {validateYear(e)}}
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
                    color: '#575757e1'
                }) 
            }}  
          /> 
        <Select
            name="Section"
            placeholder="Section"
            className="basic-single"
            classNamePrefix="select"
            // value ={{value: "Section", label: "Section"}}
            options={sectionoptions}
            onChange={(e) => {validateSection(e)}}
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
                    color: '#575757e1'
                }) 
            }}  
          /> 
          <InputField
            name="E-mail"
            type="text"
            onChange={(e) => {validateEmail(e)}}
          />
          <InputField
            name="Phone"
            type="text"
            onChange={(e) => {validatePhone(e)}}
          />
        </div>
        <Dialog show={show} setShow={setShow} title={response}>
          {" "}
        </Dialog>
        <button
          className="btn rounded-[8px] px-6 py-2 mt-12 ml-auto mr-auto flex justify-center"
          onClick={() => {
            submitValidate();
          }}>
          ADD
        </button>
        {showError.length !== 0 && (
          <span className="text-red-500 text-sm flex justify-center mt-2">
            {showError}
          </span>
        )}
        </div>
        </div>
    )
}
