import { useState } from "react";
import Table from "../../../components/CustomTable";
import { InputField } from "../../../components/InputField/InputField";

export default function ForumsList() {
    const [name,setName] = useState('')
  return (
    <div className="flex flex-col mt-16 sm:mx-24 mx-12">
      <p className="text-arma-title mb-16 text-2xl">FORUMS</p>
      <InputField className="mb-6" name="Forum" onChange={(e) => setName(e.target.value)} />

      <div className="w-full min-w-max ">
        <Table
          api={`${process.env.REACT_APP_SERVER_URL + "faculty/getForums"}`}
          rowsPerPage={5}
          buttonsCount={3}
          filter={{name:name}}
          headers={[
            {
              displayName: "Forum ",
              dataPath: "name",
              sortable: true,
            },
            {
              displayName: "Faculty Coordinator",
              dataPath: "name",
              sortable: false,
            },
            {
              displayName: "Point of contact",
              dataPath: "email",
              sortable: false,
            },
          ]}
        />
      </div>
    </div>
  );
}
