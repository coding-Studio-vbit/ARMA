import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import Table from "../../../components/CustomTable";
import { InputField } from "../../../components/InputField/InputField";
import axios from "../../../utils/axios";

export default function StudentsList() {
  const nav = useNavigate();
  const [roll, setRoll] = useState("");
  const [name, setName] = useState("");
  const [selectYear, setSelectYear] = useState(null);
  const [selectDepartment, setSelectDepartment] = useState(null);
  const [selectSection, setSelectSection] = useState(null);
  const [selectCourse, setSelectCourse] = useState(null);
  const [nameError, setNameError] = useState<string>();
  const [courses, setCourses] = useState<any>([{ value: null, label: "Any" }]);
  const [departments, setDepartments] = useState<any>([
    { value: null, label: "Any" },
  ]);
  const [yearList, setYearList] = useState<any>([
    { value: null, label: "Any" },
  ]);
  const [sections, setSections] = useState<any>([
    { value: null, label: "Any" },
  ]);

  const validateName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setName(name);
    if (name.length === 0) {
      setNameError("Name field is empty");
    } else {
      setNameError("");
    }
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}students/getCourses`)
      .then((resp: any) => {
        setCourses(
          [
            ...courses,
            resp.data.response.map((c: any) => {
              return { value: c, label: c };
            }),
          ].flat()
        );
      });
  }, []);
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}students/getBranches/${selectCourse}`
      )
      .then((resp: any) => {
        console.log(resp);
        setDepartments(
          [
            ...departments,
            resp.data.response.map((c: any) => {
              return { value: c, label: c };
            }),
          ].flat()
        );
        return axios.get(
          `${process.env.REACT_APP_SERVER_URL}students/getTotalYears/${selectCourse}`
        );
      })
      .then((yrs: any) => {
        console.log(yrs);
        const y = [];
        for (let i = 1; i <= yrs.data.response; i++)
          y.push({ value: i, label: i });
        setYearList([{ value: null, label: "Any" }, ...y]);
      });
  }, [selectCourse]);
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}students/getTotalSections/${selectCourse}/${selectDepartment}`
      )
      .then((response) => {
        const totalSections = Number(response.data.response);
        let y = [];
        let abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()";
        for (let i = 0; i < totalSections; i++)
          y.push({ value: abc[i], label: abc[i] });
        setSections([{ value: null, label: "Any" }, ...y]);
      });
  }, [selectDepartment]);

  useEffect(()=>{
    if(selectCourse == null)
    {
      setSelectYear(null);
      setSelectDepartment(null);
      setSelectSection(null);
    }
  }, [selectCourse])

  return (
    <div className="flex flex-col mt-16 w-[90%] mx-auto max-w-[75rem]">
      <p className="text-arma-title mb-16 text-2xl">STUDENTS</p>

      <div className="flex flex-wrap gap-4 mb-6 items-center ">
        <div className="w-56">
          <InputField
            name="Search by name"
            type="text"
            onChange={(e) => {
              setName(name);
            }}
          />
        </div>
        <div className="w-56">
          <InputField
            name="Search by roll number"
            type="text"
            onChange={(e) => {
              setRoll(e.target.value);
            }}
          />
        </div>
        <Select
          name="Course"
          placeholder="Course"
          options={courses}
          onChange={(e: any) => {
            setSelectCourse(e?.value);
          }}
          styles={{
            control: (base) => ({
              ...base,
              minHeight: 52,
              minWidth: 150,
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
          className="basic-multi-select"
        />
        <Select
          isDisabled={selectCourse == null}
          name="Year"
          placeholder="Year"
          options={yearList}
          onChange={(e: any) => {
            setSelectYear(e?.value);
          }}
          styles={{
            control: (base) => ({
              ...base,
              minHeight: 52,
              minWidth: 150,
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
          className="basic-multi-select"
        />
        <Select
          isDisabled={selectCourse == null}
          name="Branch"
          placeholder="Branch"
          options={departments}
          onChange={(e: any) => {
            setSelectDepartment(e?.value);
          }}
          styles={{
            control: (base) => ({
              ...base,
              minHeight: 52,
              minWidth: 150,
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
          className="basic-multi-select"
        />
        <Select
          isDisabled={selectCourse == null || selectDepartment == null}
          name="Section"
          placeholder="Section"
          options={sections}
          onChange={(e: any) => {
            setSelectSection(e?.value);
          }}
          styles={{
            control: (base) => ({
              ...base,
              minHeight: 52,
              minWidth: 150,
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
          className="basic-multi-select"
        />
      </div>
      <Table
        api={`${process.env.REACT_APP_SERVER_URL + "students"}`}
        rowsPerPage={5}
        buttonsCount={5}
        filter={{
          rollNumber: roll,
          name: name,
          branch: selectDepartment,
          course: selectCourse,
          year: selectYear,
          section: selectSection
        }}
        onTableRowClick={(id) => nav(`/faculty/students/${id}`)}
        headers={[
          {
            displayName: "Roll Number",
            dataPath: "rollNumber",
            sortable: true,
          },
          { displayName: "Name", dataPath: "name", sortable: false },
          { displayName: "Department", dataPath: "branch", sortable: true },
          { displayName: "Year", dataPath: "year", sortable: true },
          { displayName: "Section", dataPath: "section", sortable: false },
        ]}
      />
      {/* <button className="btn mb-4 ml-auto  mt-8">GENERATE</button> */}
    </div>
  );
}
