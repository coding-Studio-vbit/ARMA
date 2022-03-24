import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Table from "../../../components/CustomTable";
import DataTable from "../../../components/Table";
import axiosInstance from "../../../utils/axios";

export const Students_View = () => {
  const { id } = useParams();
  console.log(id);

  const [roll, setRoll] = useState("");
  const [info, setInfo] = useState<{
    name: string;
    email: string;
    year: number;
    section: string;
    branch: string;
    phone: number;
    coreTeamMember: any[];
    forumMemberships: any[];
    attendedEvents: any[];
  }>();
  useEffect(() => {
    const student = async () => {
      const res = await axiosInstance.post(
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
            Memberships
          </p>
          {info?.forumMemberships?.length !== 0 ? (
            info?.forumMemberships?.map((i: any) => {
              return (
                <div
                  key={i.forumID}
                  className="shadow-xl border-2 flex flex-col p-4 w-max rounded-[16px]"
                >
                  <span>Forum Name:{i.name}</span>
                </div>
              );
            })
          ) : (
            <p>No memberships taken.</p>
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
                    dataPath: "coreTeamMember.forumID.name",
                    sortable: false,
                  },
                  {
                    displayName: "ROLE",
                    dataPath: "coreTeamMember.role",
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
                data={info?.attendedEvents}
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
                  {
                    displayName: "DURATION",
                    dataPath: "duration",
                    sortable: false,
                  },
                ]}
              />
            </div>
          </div>
        </div>

        <div className="ml-auto mt-8">
          <button className="btn mb-8 ml-auto mt-8">GENERATE</button>
        </div>
      </div>
    </div>
  );
};
