import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import Table from "../../../components/CustomTable";
import { InputField } from "../../../components/InputField/InputField";

export default function StudentsList() {
  const nav = useNavigate()
  const [roll,setRoll] = useState("")
  return (
    <div className="flex flex-col mt-16 w-[90%] mx-auto max-w-[60rem]">
      <p className="text-arma-title mb-16 text-2xl">STUDENTS</p>
      <div className="flex flex-wrap gap-4 mb-6 items-center   ">
        <div className="w-full grow shrink basis-[250px]" >
          <InputField className=" w-full" name="Roll Number  " onChange={(e) => setRoll(e.target.value)} />
        </div>
        <Select
          styles={{
            control: (base) => ({
              ...base,
              minHeight: 52,
              minWidth: 152,
              borderRadius: "0.5rem",
              border: "2px solid rgb(200, 200, 200)",
            }),
          }}
          className="min-h-min"
          placeholder="Department"
        />
        <Select
          styles={{
            control: (base) => ({
              ...base,
              minHeight: 52,
              minWidth: 100,
              borderRadius: "0.5rem",
              border: "2px solid rgb(200, 200, 200)",
            }),
          }}
          className="h-full"
          placeholder="Year"
        />
        <Select
          styles={{
            control: (base) => ({
              ...base,
              minHeight: 52,
              minWidth: 120,
              borderRadius: "0.5rem",
              border: "2px solid rgb(200, 200, 200)",
            }),
          }}
          className="h-full"
          placeholder="Section"
        />
      </div>
        <Table
          api={`${process.env.REACT_APP_SERVER_URL + "students"}`}
          rowsPerPage={5}
          buttonsCount={5}
          filter={{rollNumber:roll}} 
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

