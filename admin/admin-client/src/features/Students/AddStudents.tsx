import { ChangeEvent, useEffect, useState } from "react";
import { Dialog } from "../../Components/Dialog/Dialog";
import { InputField } from "../../Components/InputField/InputField";
import Select from "react-select";
import { containerCSS } from "react-select/dist/declarations/src/components/containers";
import { Close } from "@material-ui/icons";
import axiosInstance from "../../utils/axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { UploadStudentList } from "./UploadStudentList";

interface AddStudentsProps {
  isEdit: boolean;
}

export const AddStudents = ({ isEdit }: AddStudentsProps) => {
  const nav = useNavigate();
  const location: any = useLocation();
  let { id } = useParams();
  useEffect(() => {
    console.log("3");
    const student = async () => {
      const res = await axiosInstance.post(
        process.env.REACT_APP_SERVER_URL + "students/studentViewCard",
        { id: id }
      );
      const data = res.data.response;
      console.log(data);
      setName(data?.name);
      setuniqueid(data?.rollNumber);
      setSelectYear(data?.year);
      setSelectDepartment(data?.branch);
      setSelectSection(data?.section);
      setEmail(data?.email);
      setPhone(data?.phone);
    };
    if (isEdit) {
      student();
    }
  }, []);
  const [uniqueid, setuniqueid] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [uniqueidError, setUniqueidError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");
  const [phoneError, setPhoneError] = useState<string>("");
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [showError, setShowError] = useState<String>("");
  const [response, setResponse] = useState("");
  const [selectYear, setSelectYear] = useState("");
  const [selectDepartment, setSelectDepartment] = useState("");
  const [selectCourse, setSelectCourse] = useState(null);
  const [selectSection, setSelectSection] = useState("");

  const [courses, setCourses] = useState<any>(null);
  const [departments, setDepartments] = useState<any>(null);
  const [yearList, setYearList] = useState<any>(null);
  const [sections, setSections] = useState<any>(null);

  useEffect(() => {
    axiosInstance
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
    axiosInstance
      .get(
        `${process.env.REACT_APP_SERVER_URL}students/getBranches/${selectCourse}`
      )
      .then((branchList: any) => {
        console.log(branchList);
        setDepartments(
          branchList.data.response.map((c: any) => {
            return { value: c, label: c };
          })
        );
        return axiosInstance.get(
          `${process.env.REACT_APP_SERVER_URL}students/getTotalYears/${selectCourse}`
        );
      })
      .then((yrs: any) => {
        console.log(yrs);
        let y = [];
        for (let i = 1; i <= yrs.data.response; i++)
          y.push({ value: i, label: i });
        setYearList(y);
      });
  }, [selectCourse]);

  useEffect(() => {
    console.log(selectDepartment);
    axiosInstance
      .get(
        `${process.env.REACT_APP_SERVER_URL}students/getTotalSections/${selectCourse}/${selectDepartment}`
      )
      .then((response) => {
        console.log(response);
        const totalSections = Number(response.data.response);
        let y = [];
        let abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()"
        for (let i = 0; i < totalSections; i++) y.push({ value: abc[i], label: abc[i] });
        console.log(sections);
        setSections(y);
      });
  }, [selectDepartment]);

  const validateUniqueid = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uniqueid = e.target.value;
    setuniqueid(uniqueid);
    var rollNumber = uniqueid.toUpperCase();
    let rollRegex = new RegExp(
      /^(18|19|20|21)(p6|p5)(1|5)(a|A)(01|02|03|04|05|12|56|62|66|67|69|70)[(a-z)|(0-9)][0-9]$/i
    );
    if (rollNumber.length === 0) {
      setUniqueidError("roll number cannot be empty");
    } else if (rollNumber.length < 10) {
      setUniqueidError("roll number cannot be less than 10 characters");
    } else if (rollNumber.length > 10) {
      setUniqueidError("roll number cannot exceed 10 characters");
    } else if (!rollRegex.test(rollNumber)) {
      setUniqueidError("roll number invalid");
    } else {
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
    } else if (!phone.match(phoneno)) {
      setPhoneError("Invalid number");
    } else {
      setPhoneError("");
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

  const deleteItem = async () => {
    setShowError("");
    const res = await axiosInstance.post(
      process.env.REACT_APP_SERVER_URL + "students/deleteStudent",
      { id: id }
    );
    const data = res.data;
    if (data.status === 1) {
      setResponse("Deleted");
      setShow(true);
      nav("/Students/");
    } else {
      setResponse(data.response.message);
      setShow(true);
    }
  };

  const loginValidate = async () => {
    if (
      uniqueid.length === 0 ||
      name.length === 0 ||
      email.length === 0 ||
      selectDepartment.length === 0 ||
      selectYear.length === 0 ||
      selectSection?.length === 0 ||
      uniqueidError?.length !== 0 ||
      nameError?.length !== 0 ||
      emailError?.length !== 0 ||
      phoneError?.length !== 0
    ) {
      setShowError("Fill details appropriately");
    } else {
      if (!isEdit) {
        setShowError("");
        const res = await axiosInstance.post(
          process.env.REACT_APP_SERVER_URL + "admin/addStudent",
          {
            name: name,
            rollNumber: uniqueid,
            year: selectYear,
            branch: selectDepartment,
            section: selectSection,
            email: email,
            phone: phone,
          }
        );
        const data = res.data;
        if (data.status === 1) {
          setResponse("New Student Added");
          setShow(true);
        } else {
          setResponse(data.response.message);
          setShow(true);
        }
      } else {
        setShowError("");
        const res = await axiosInstance.put(
          process.env.REACT_APP_SERVER_URL + "students/editStudent",
          {
            id: id,
            name: name,
            rollNumber: uniqueid,
            year: selectYear,
            branch: selectDepartment,
            section: selectSection,
            email: email,
            phone: phone,
          }
        );
        const data = res.data;
        if (data.status === 1) {
          setResponse("Student Details Edited");
          setShow(true);
        } else {
          setResponse(data.response.message);
          setShow(true);
        }
      }
    }
  };

  return (
    <div className="flex flex-col grow items-center">
      <div className="mt-12 w-max">
        <div className="flex flex-wrap justify-between">
          <p className="text-center lg:text-left text-arma-title text-2xl font-medium mb-12 ml-2 ">
            {isEdit ? "EDIT STUDENT" : "ADD STUDENT"}
          </p>
          {isEdit ? (
            <button
              className="btn  bg-arma-red hover:bg-arma-red rounded-[8px] px-2 py-1 mb-12 flex"
              onClick={() => {
                setShow1(true);
              }}
            >
              Delete
            </button>
          ) : (
            <UploadStudentList />
          )}
          <Dialog
            show={show1}
            setShow={setShow1}
            title="Are you sure you want to proceed?"
          >
            <button className="outlineBtn" onClick={() => setShow1(false)}>
              Cancel
            </button>
            <button
              className="btn"
              onClick={() => {
                deleteItem();
              }}
            >
              Proceed
            </button>
          </Dialog>
        </div>

        <div className=" flex flex-col gap-y-6 mb-6  md:flex-row sm:gap-x-8">
          <InputField
            name="Name"
            type="text"
            value={name}
            error={nameError}
            onChange={(e) => {
              validateName(e);
            }}
          />
          <InputField
            name="Roll Number"
            type="text"
            value={uniqueid}
            error={uniqueidError}
            onChange={(e) => {
              validateUniqueid(e);
            }}
          />
        </div>
        <div className=" flex flex-col gap-y-6 mb-6  md:flex-row sm:gap-x-8">
          <Select
            name="Course"
            placeholder="Course"
            value={
              selectCourse
                ? { value: `${selectCourse}`, label: `${selectCourse}` }
                : "Course"
            }
            options={courses}
            onChange={(e: any) => {
              setSelectCourse(e?.value);
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
                color: "black",
              }),
            }}
            className="basic-multi-select w-full h-full"
          />
          <Select
            name="Year"
            isDisabled={selectCourse == null}
            placeholder="Year"
            options={yearList}
            value={
              selectYear
                ? { value: `${selectYear}`, label: `${selectYear}` }
                : "Year"
            }
            onChange={(e: any) => {
              setSelectYear(e?.value);
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
                color: "#black",
              }),
            }}
            className="basic-multi-select w-full h-full"
          />

          <Select
            isDisabled={selectCourse == null}
            name="Branch"
            placeholder="Branch"
            value={
              selectDepartment
                ? { value: `${selectDepartment}`, label: `${selectDepartment}` }
                : "Branch"
            }
            options={departments}
            onChange={(e: any) => {
              setSelectDepartment(e?.value);
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
                color: "black",
              }),
            }}
            className="basic-multi-select w-full h-full"
          />
        </div>
        <div className=" flex flex-col gap-y-6 mb-6  md:flex-row sm:gap-x-8">
          <Select
            isDisabled={selectDepartment == null}
            name="Section"
            placeholder="section"
            value={
              selectSection
                ? { value: `${selectSection}`, label: `${selectSection}` }
                : "section"
            }
            options={sections}
            onChange={(e: any) => {
              setSelectSection(e?.value);
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
                color: "black",
              }),
            }}
            className="basic-multi-select h-full"
          />
          <InputField
            name="Email"
            type="text"
            value={email}
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
            value={phone}
            error={phoneError}
            onChange={(e) => {
              validatePhone(e);
            }}
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
          {isEdit ? "SAVE" : "ADD"}
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
