import React, { useState } from 'react'
import Select from "react-select";
import { Dialog } from '../../../components/Dialog/Dialog';
import { InputField } from '../../../components/InputField/InputField';

export default function AddNewCoreTeamMember() {
    const options = [
        { value: "Create ", label: "Create" },
        { value: "Edit ", label: "Edit" },
        { value: "Delete", label: "Delete" },
      ];

    const [rollNumber, setRollNumber] = useState("")
    const [name, setName] = useState("");
    const [department, setDepartment] = useState("");
    const [year, setYear] = useState("");
    const [section, setSection] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [designation, setDesignation] = useState("")
    const [show, setShow] = useState(false);
    
    const [rollNumberError, setRollNumberError] = useState<string>();
    const [nameError, setNameError] = useState<string>();
    const [departmentError, setDepartmentError] = useState<string>();
    const [yearError, setYearError] = useState<string>();
    const [sectionError, setSectionError] = useState<string>();
    const [emailError, setEmailError] = useState<string>();
    const [phoneError, setPhoneError] = useState<string>();
    const [designationError, setDesignationError] = useState<string>();
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

      const validateDesignation = (e: React.ChangeEvent<HTMLInputElement>) => {
        const designation = e.target.value;
        setDesignation(designation);
        if (designation.length === 0) {
          setDesignationError("Designation field is empty");
        } 
        else {
            setDesignationError("");
          }
        
      };

      const submitValidate = () => {
        if (
          rollNumber.length === 0 ||
          name.length === 0 ||
          department.length === 0 ||
          year.length === 0 ||
          section.length === 0 ||
          email.length === 0 ||
          phone.length === 0 ||
          designation.length === 0 ||
          rollNumberError?.length !== 0 ||
          nameError?.length !== 0 ||
          departmentError?.length !== 0 ||
          yearError?.length !== 0 ||
          sectionError?.length !== 0 ||
          phoneError?.length !== 0 ||
          designationError?.length !== 0 ||
          emailError?.length !==0           
        ) {
          setShowError("Fill details appropriately");
        } else {
          setShow(true);
          setShowError("");
        }
      };


    return (
        <div className="flex flex-col grow items-center">
            <div className="mt-12 w-max">
            <p className="text-center lg:text-left text-arma-title text-3xl font-semibold mb-12 ml-2 ">
          ADD NEW CORE TEAM MEMBER
        </p>
        <div className=" flex flex-col gap-y-6 mb-6  md:flex-row sm:gap-x-8">
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
        </div>
        <div className=" flex flex-col gap-y-6 mb-6  md:flex-row sm:gap-x-8">
        <div className="flex flex-col shrink">
        <Select
            name="Department"
            placeholder="Department"
            className="basic-single"
            classNamePrefix="select"
            // value ={{value: "Department", label: "Department"}}
            options={options}
            onChange={(e) => {validateDepartment(e)}}
            styles={{
                control: (base) => ({
                ...base,
                minHeight: 52,
                minWidth: 253,
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
         </div>
         
         <div className="flex flex-col shrink">
          <Select
            name="Year"
            placeholder="Year"
            className="basic-single"
            classNamePrefix="select"
            // value ={{value: "Year", label: "Year"}}
            options={options}
            onChange={(e) => {validateYear(e)}}
            styles={{
                control: (base) => ({
                ...base,
                minHeight: 52,
                minWidth: 253,
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
         </div>
        </div>
        <div className=" flex flex-col gap-y-6 mb-6  md:flex-row sm:gap-x-8">
        <Select
            name="Section"
            placeholder="Section"
            className="basic-single"
            classNamePrefix="select"
            // value ={{value: "Section", label: "Section"}}
            options={options}
            onChange={(e) => {validateSection(e)}}
            styles={{
                control: (base) => ({
                ...base,
                minHeight: 52,
                minWidth: 253,
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
        </div>
        <div className=" flex flex-col gap-y-6 mb-6  md:flex-row sm:gap-x-8">
          <InputField
            name="Phone"
            type="text"
            onChange={(e) => {validatePhone(e)}}
          />
          <InputField
            name="Designation"
            type="text"
            onChange={(e) => {validateDesignation(e)}}
          />
        </div>
        <Dialog show={show} setShow={setShow} title="Added">
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
