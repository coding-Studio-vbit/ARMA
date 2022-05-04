import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { Dialog } from "../../../components/Dialog/Dialog";
import { InputField } from "../../../components/InputField/InputField";
import { useUser } from "../../../providers/user/UserProvider";
import axios from "../../../utils/axios";

export default function AddNewForumMember() {
  const { forum } = useUser();
  const nav = useNavigate();
  const [courses, setCourses] = useState<any>(null);
  const [departments, setDepartments] = useState<any>(null);
  const [yearList, setYearList] = useState<any>(null);
  const [sections, setSections] = useState<any>(null);

  const [rollNumber, setRollNumber] = useState("");
  const [name, setName] = useState("");
  const [course, setCourse] = useState<{
    value: string;
    label: string;
  }>({ value: "", label: "Course" });
  const [courseError, setCourseError] = useState<string>();

  const [department, setDepartment] = useState<{
    value: string;
    label: string;
  }>({ value: "", label: "Department" });
  const [year, setYear] = useState<{ value: string; label: string }>({
    value: "",
    label: "Year",
  });
  const [section, setSection] = useState<{ value: string; label: string }>({
    value: "",
    label: "Section",
  });
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [show, setShow] = useState(false);
  const [response, setResponse] = useState("");

  const [rollNumberError, setRollNumberError] = useState<string>();
  const [nameError, setNameError] = useState<string>();
  const [departmentError, setDepartmentError] = useState<string>();
  const [yearError, setYearError] = useState<string>();
  const [sectionError, setSectionError] = useState<string>();
  const [emailError, setEmailError] = useState<string>();
  const [phoneError, setPhoneError] = useState<string>();
  const [showError, setShowError] = useState<String>("");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}students/getCourses`)
      .then((courseList: any) => {
        setCourses(
          courseList.data.response.map((c: any) => {
            return { value: c, label: c };
          })
        );
      });
  }, []);

  useEffect(() => {
    console.log(course, " is course");
    axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}students/getBranches/${course.value}`
      )
      .then((branchList: any) => {
        setDepartments(
          branchList.data.response.map((c: any) => {
            return { value: c, label: c };
          })
        );
        return axios.get(
          `${process.env.REACT_APP_SERVER_URL}students/getTotalYears/${course.value}`
        );
      })
      .then((yrs: any) => {
        console.log(yrs);
        let y = [];
        for (let i = 1; i <= yrs.data.response; i++)
          y.push({ value: i, label: i });
        setYearList(y);
      });
  }, [course]);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}students/getTotalSections/${course.value}/${department.value}`
      )
      .then((response) => {
        const totalSections = Number(response.data.response);
        let y = [];
        let abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()";
        for (let i = 0; i < totalSections; i++)
          y.push({ value: abc[i], label: abc[i] });
        setSections(y);
      });
  }, [department]);

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
  const validateCourse = (e: any) => {
    setCourse(e);
    if (e.value.length === 0) {
      setCourseError("Course field is empty");
    } else {
      setCourseError("");
    }
  };
  const validateName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setName(name);
    if (name.length === 0) {
      setNameError("Name field is empty");
    } else {
      setNameError("");
    }
  };

  const validateDepartment = (e: any) => {
    const department = e.value;
    setDepartment(e);
    if (department.length === 0) {
      setDepartmentError("Department field is empty");
    } else {
      setDepartmentError("");
    }
  };

  const validateYear = (e: any) => {
    const year = e.value;
    setYear(e);
    if (year.length === 0) {
      setYearError("Year field is empty");
    } else {
      setYearError("");
    }
  };

  const validateSection = (e: any) => {
    const section = e.value;
    setSection(e);
    if (section.length === 0) {
      setSectionError("Section field is empty");
    } else {
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
    } else if (!phone.match(phoneno)) {
      setPhoneError("Invalid number");
    } else {
      setPhoneError("");
    }
  };

  const submitValidate = async () => {
    if (
      rollNumber.length === 0 ||
      name.length === 0 ||
      department.value.length === 0 ||
      course.value.length === 0 ||
      year.value.length === 0 ||
      section.value.length === 0 ||
      email.length === 0 ||
      phone.length === 0 ||
      rollNumberError?.length !== 0 ||
      nameError?.length !== 0 ||
      departmentError?.length !== 0 ||
      yearError?.length !== 0 ||
      sectionError?.length !== 0 ||
      phoneError?.length !== 0 ||
      emailError?.length !== 0
    ) {
      setShowError("Fill details appropriately");
    } else {
      setShowError("");
      const res = await axios.post(
        process.env.REACT_APP_SERVER_URL + "forum/addNewForumMembers",
        {
          forumName: forum?.name,
          rollNumber: rollNumber,
          course: course,
          name: name,
          branch: department.value,
          year: year.value,
          section: section.value,
          email: email,
          phone: phone,
        }
      );
      const data = res.data;
      if (data.status === 1) {
        setResponse("New Forum Member Added");
        setShow(true);
      } else {
        setResponse(data.response.message);
        setShow(true);
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
            value={rollNumber}
            error={rollNumberError}
            onChange={(e) => {
              validateRollNumber(e);
            }}
          />
          <InputField
            name="Name"
            type="text"
            value={name}
            error={nameError}
            onChange={(e) => {
              validateName(e);
            }}
          />
          <Select
            name="Course"
            placeholder="Course"
            className="basic-single"
            classNamePrefix="select"
            value={course}
            options={courses}
            onChange={(e) => {
              validateCourse(e);
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
                paddingLeft: "16px",
              }),
              singleValue: (base) => ({
                ...base,
                paddingLeft: "16px",
                color: "#575757e1",
              }),
            }}
          />
          <Select
            isDisabled={course.value.length == 0}
            name="Department"
            placeholder="Department"
            className="basic-single"
            classNamePrefix="select"
            value={department}
            options={departments}
            onChange={(e) => {
              validateDepartment(e);
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
                paddingLeft: "16px",
              }),
              singleValue: (base) => ({
                ...base,
                paddingLeft: "16px",
                color: "#575757e1",
              }),
            }}
          />
          <Select
            isDisabled={course.value.length == 0}
            name="Year"
            placeholder="Year"
            className="basic-single"
            classNamePrefix="select"
            value={year}
            options={yearList}
            onChange={(e) => {
              validateYear(e);
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
                paddingLeft: "16px",
              }),
              singleValue: (base) => ({
                ...base,
                paddingLeft: "16px",
                color: "#575757e1",
              }),
            }}
          />
          <Select
            isDisabled={
              course == null ||
              department == null ||
              department?.value.length == 0
            }
            name="Section"
            placeholder="Section"
            className="basic-single"
            classNamePrefix="select"
            value={section}
            options={sections}
            onChange={(e) => {
              validateSection(e);
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
                paddingLeft: "16px",
              }),
              singleValue: (base) => ({
                ...base,
                paddingLeft: "16px",
                color: "#575757e1",
              }),
            }}
          />
          <InputField
            name="E-mail"
            value={email}
            type="text"
            onChange={(e) => {
              validateEmail(e);
            }}
          />
          <InputField
            name="Phone"
            type="text"
            value={phone}
            onChange={(e) => {
              validatePhone(e);
            }}
          />
        </div>
        <Dialog show={show} setShow={setShow} title={response}>
          <button
            className="outlineBtn"
            onClick={() => {
              setRollNumber("");
              setName("");
              setDepartment({ value: "", label: "Department" });
              setYear({ value: "", label: "Year" });
              setSection({ value: "", label: "Section" });
              setEmail("");
              setPhone("");
              setShow(false);
            }}
          >
            Add Another
          </button>
          <button
            onClick={() => {
              nav("/forum/profile", { replace: true });
            }}
            className="btn"
          >
            Okay
          </button>
        </Dialog>
        <button
          className="btn rounded-[8px] px-6 py-2 mt-12 ml-auto mr-auto flex justify-center"
          onClick={() => {
            submitValidate();
          }}
        >
          ADD
        </button>
        {showError.length !== 0 && (
          <span className="text-red-500 text-sm flex justify-center mt-2">
            {showError}
          </span>
        )}
      </div>
    </div>
  );
}
