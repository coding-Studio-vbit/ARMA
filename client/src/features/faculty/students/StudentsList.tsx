import { useState } from "react";
import Select from "react-select";
import Table from "../../../components/CustomTable";
import { InputField } from "../../../components/InputField/InputField";

export default function StudentsList() {
  const [roll,setRoll] = useState("")
  return (
    <div className="flex flex-col mt-16 sm:mx-24 mx-12">
      <p className="text-arma-title mb-16 text-2xl">STUDENTS</p>
      <div className="flex gap-4 mb-6 items-center   ">
        <InputField name="Roll Number  " onChange={(e) => setRoll(e.target.value)} />
        <Select
          styles={{
            control: (base) => ({
              ...base,
              minHeight: 45,
              minWidth: 145,
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
              minHeight: 45,
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
              minHeight: 45,
              minWidth: 120,
              borderRadius: "0.5rem",
              border: "2px solid rgb(200, 200, 200)",
            }),
          }}
          className="h-full"
          placeholder="Section"
        />
      </div>
      <div className="w-full min-w-max rounded-[8px] ">
        <Table
          api={`${process.env.REACT_APP_SERVER_URL + "students"}`}
          rowsPerPage={5}
          buttonsCount={3}
          filter={{rollNumber:roll}}
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
      </div>
      <button className="btn mb-4 ml-auto  mt-8">GENERATE</button>
    </div>
  );
}
