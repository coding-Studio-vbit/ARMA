import React from 'react'
import Table from '../../../components/CustomTable'

export default function Test() {
    return (
        <div>
            <Table
          api={`${process.env.REACT_APP_SERVER_URL + "forum/getCoreForumMembers"}`}
          rowsPerPage={2}
          buttonsCount={1}
          filter={{name:"coding.Studio();"}}
          headers={[
            {
              displayName: "Roll Number",
              dataPath: "studentID.rollNumber",
              sortable: true,
            },
            { displayName: "Name", dataPath: "studentID.name", sortable: false },
            { displayName: "Department", dataPath: "studentID.branch", sortable: true },
            { displayName: "Year", dataPath: "studentID.year", sortable: true },
            { displayName: "Section", dataPath: "studentID.section", sortable: false },
          ]}
        />
            
        </div>
    )
}
