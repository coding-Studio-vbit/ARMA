import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Table from "../../../components/CustomTable";
import DataTable from "../../../components/Table";
import axios from "../../../utils/axios";

export const Students_View = () => {
  const { id } = useParams();
  console.log(id);

  const [roll, setRoll] = useState("");
  const [info, setInfo] = useState<{
    name: string;
    email: string;
    year: number;
    section: string;
    rollNumber: string;
    branch: string;
    phone: number;
    forumCoreTeamMemberships: any[];
    forumNonCoreTeamMemberships: any[];
    forumMemberships: any[];
    eventsParticipated: any[];
    eventsOrganized: any[];
  }>();
  useEffect(() => {
    const student = async () => {
      const res = await axios.post(
        process.env.REACT_APP_SERVER_URL + "students/studentViewCard",
        { id: id }
      );
      const data = res.data.response;
      console.log(data);
      setInfo(data);
    };
    student();
  }, []);
  return (
    <div className="flex flex-col sm:mx-6">
      <div className="flex flex-col mt-5 sm:mx-5 mx-5 space-y-5">
        {/* View Students Title */}
        {/* <p className="text-arma-title mb-5 text-4xl">View Student</p> */}
        {/* Personal Details */}
        <div className="flex flex-col mt-16 w-[90%] mx-auto max-w-[60rem]">
          <p className="text-arma-title mb-1 text-2xl">Personal Details</p>
          <div className="grid grid-cols-1 lg:grid-cols-2  gap-5 border-2 shadow-md rounded-[16px] p-6">
            <div className="grid grid-cols-[0.5fr_1fr] lg:grid-cols-[0.3fr_1fr] items-center">
              <span className="text-arma-gray text-xl">Name:</span>
              <span className="text-xl ml-4">{info?.name}</span>
            </div>
            <div className="grid grid-cols-[0.5fr_1fr] lg:grid-cols-[0.3fr_1fr]  items-center">
              <span className="text-arma-gray text-xl">Roll Number:</span>
              <span className="text-xl ml-4">{info?.rollNumber ?? " "}</span>
            </div>
            <div className="grid grid-cols-[0.5fr_1fr] lg:grid-cols-[0.3fr_1fr]  items-center">
              <span className="text-arma-gray text-xl">Email:</span>
              <span className="text-xl ml-4">{info?.email ?? " "}</span>
            </div>
            <div className="grid grid-cols-[0.5fr_1fr] lg:grid-cols-[0.3fr_1fr] items-center">
              <span className="text-arma-gray text-xl">Year:</span>
              <span className="text-xl ml-4">{info?.year}</span>
            </div>
            <div className="grid grid-cols-[0.5fr_1fr] lg:grid-cols-[0.3fr_1fr] items-center">
              <span className="text-arma-gray text-xl">Department:</span>
              <span className="text-xl ml-4">{info?.branch}</span>
            </div>
            <div className="grid grid-cols-[0.5fr_1fr] lg:grid-cols-[0.3fr_1fr] items-center">
              <span className="text-arma-gray text-xl">Section:</span>
              <span className="text-xl ml-4">{info?.section}</span>
            </div>
            <div className="grid grid-cols-[0.5fr_1fr] lg:grid-cols-[0.3fr_1fr] items-center">
              <span className="text-arma-gray text-xl">Contact:</span>
              <span className="text-xl ml-4">{info?.phone}</span>
            </div>
          </div>
        </div>

        {/* <p className="text mb-5 mt-5 text-2xl">Core Team Member</p>
        <div className="flex flex-wrap ml-8 gap-4 w-[95%]">
          {
         (info?.coreTeamMember?.length !== 0)?
          info?.coreTeamMember?.map((i: any) => {
            return (
              <div key ={i.forumID} className="shadow-xl border-2 flex flex-col p-4 w-max rounded-[16px]">
                <span>Forum Name: {i.forumID.name} </span>
                <span>Designation: {i.designation}</span>
              </div>
            );
          }):
          <p>Not a core member of any forum.</p>
          }
        </div> */}

        <div className="flex flex-col mt-16 w-[90%] mx-auto max-w-[60rem]">
          <p className="text-arma-title width-[90%] mb-5 mt-5 text-2xl">
           Core Team Memberships
          </p>
          {info?.forumCoreTeamMemberships?.length !== 0 ? (
            info?.forumCoreTeamMemberships?.map((i: any) => {
              return (
                <div
                  key={i.forumId}
                  className="shadow-xl border-2 flex flex-col p-4 w-max rounded-[16px]"
                >
                  <span>
                    {i.designation}, {i.forumId.name}
                  </span>
                </div>
              );
            })
          ) : (
            <p>No core team memberships taken.</p>
          )}
        </div>
        <div className="flex flex-col mt-16 w-[90%] mx-auto max-w-[60rem]">
          <p className="text-arma-title width-[90%] mb-5 mt-5 text-2xl">
           Non-Core Team Memberships
          </p>
          {info?.forumNonCoreTeamMemberships?.length !== 0 ? (
            info?.forumNonCoreTeamMemberships?.map((i: any) => {
              return (
                <div
                  key={i._id}
                  className="shadow-xl border-2 flex flex-col p-4 w-max rounded-[16px]"
                >
                  <span>
                   {i.forumId.name}
                  </span>
                </div>
              );
            })
          ) : (
            <p>No non-core team memberships taken.</p>
          )}
        </div>

        {/* Events Organized */}

        <div className="flex flex-col   mt-16 w-[90%] mx-auto max-w-[60rem]">
          <p className="text-arma-title width-[90%] mb-5 mt-5 text-2xl">
            Events Organized
          </p>

          <div className="flex flex-wrap gap-4 mb-6 items-center">
            <div className="w-full grow shrink basis-[250px]">
              <DataTable
                data={info}
                headers={[
                  {
                    displayName: "FORUM",
                    dataPath: "forumCoreTeamMemberships.forumId.name",
                    sortable: false,
                  },
                  {
                    displayName: "ROLE",
                    dataPath: "forumCoreTeamMemberships.designation",
                    sortable: false,
                  },
                  // {
                  //   displayName: "EVENT NAME",
                  //   dataPath: "eventname",
                  //   sortable: false,
                  // },
                  // { displayName: "DURATION", dataPath: "duration", sortable: false },
                ]}
              />
            </div>
          </div>
        </div>

        {/* Events Participated */}

        <div className="flex flex-col mt-16 w-[90%] mx-auto max-w-[60rem]">
          <p className="text-arma-title mb-5 mt-5 text-2xl">
            Events Participated
          </p>
          <div className="flex flex-wrap gap-4 mb-6 items-center">
            <div className="w-full grow shrink basis-[250px]">
              <DataTable
                data={info?.eventsParticipated}
                headers={[
                  {
                    displayName: "FORUM",
                    dataPath: "forumID.name",
                    sortable: false,
                  },
                  {
                    displayName: "EVENT NAME",
                    dataPath: "name",
                    sortable: false,
                  },
                  // {
                  //   displayName: "DURATION",
                  //   dataPath: "duration",
                  //   sortable: false,
                  // },
                ]}
              />
            </div>
          </div>
        </div>

        <div className="ml-auto mt-8">
          <a
            onClick={async () => {
              const result = await axios({
                responseType: "blob",
                method: "POST",
                url: `${process.env.REACT_APP_SERVER_URL}students/newReport`,
                data: { studentId: id },
              });
              const url = window.URL.createObjectURL(new Blob([result.data]));
              const link = document.createElement("a");
              link.href = url;
              link.setAttribute("download", info.rollNumber + ".pdf"); //or any other extension
              document.body.appendChild(link);
              link.click();
            }}
            download
          >
            <button className="btn mb-8 ml-auto mt-8">GENERATE</button>
          </a>
        </div>
      </div>
    </div>
  );
};
