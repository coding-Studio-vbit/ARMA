import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Table from "../../../components/CustomTable";
import axiosInstance from "../../../utils/axios";
import DataTable from "../../../components/Table";
import { Spinner } from "../../../components/Spinner/Spinner";

export const Forum_View = () => {
  const { id } = useParams();
  console.log(id);
  const [roll, setRoll] = useState("");
  const [info, setInfo] = useState<{
    name: string;
    facultyCoordinatorID: { name: string };
    email: string;
    phone: number;
    events: any[];
  }>();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const forum = async () => {
      const res = await axiosInstance.post(
        process.env.REACT_APP_SERVER_URL + "forum/forumViewCard",
        { id: id }
      );
      const data = res.data.response;
      console.log(data);
      setInfo(data);
      setLoading(false);
    };
    forum();
  }, []);

  return loading ? (
    <div className="w-screen h-screen flex justify-center">
      <Spinner className="m-auto" />
    </div>
  ) : (
    <div className="flex flex-col sm:mx-6 mb-4">
      <div className="flex flex-col mt-5 sm:mx-5 mx-5 space-y-5">
        {/* View Forum Title */}

        {/* Forum Details */}
        <div className="flex flex-col mt-16 w-[90%] mx-auto max-w-[60rem]"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 border-2 shadow-md rounded-[16px] p-6">
          <div className="grid grid-cols-[0.8fr_1fr] md:grid-cols-[0.8fr_1fr] lg:grid-cols-[0.5fr_1fr] items-center">
            <span className="text-arma-gray text-xl">Forum:</span>
            <span className="text-xl">{info?.name}</span>
          </div>
          <div className="grid grid-cols-[0.8fr_1fr] lg:grid-cols-[0.3fr_1fr] items-center ">
            <span className="text-arma-gray text-xl">Email:</span>
            <span className="text-xl">executives@codingstudio.club</span>
          </div>
          <div className="grid grid-cols-[0.8fr_1fr] md:grid-cols-[0.8fr_1fr] lg:grid-cols-[0.5fr_1fr] items-center ">
            <span className="text-arma-gray text-xl">Faculty Coordinator:</span>
            <span className="text-xl">{info?.facultyCoordinatorID?.name}</span>
          </div>
          <div className="grid grid-cols-[0.8fr_1fr] lg:grid-cols-[0.3fr_1fr] items-center">
            <span className="text-arma-gray text-xl">Contact:</span>
            <span className="text-xl">{info?.phone}</span>
          </div>
        </div>

        {/* Core Team */}
        <div className="flex flex-col mt-16 w-[90%] mx-auto max-w-[60rem]">
          <p className="text-arma-title width-[90%] mb-5 mt-5 text-2xl">
            Core Team
          </p>
          <Table
            api={`${
              process.env.REACT_APP_SERVER_URL + "forum/getCoreForumMembers"
            }`}
            rowsPerPage={5}
            buttonsCount={3}
            filter={{ name: info?.name }}
            headers={[
              {
                displayName: "NAME",
                dataPath: "studentID.name",
                sortable: false,
              },
              {
                displayName: "ROLL NUMBER",
                dataPath: "studentID.rollNumber",
                sortable: false,
              },
              {
                displayName: "DEPARTMENT",
                dataPath: "studentID.branch",
                sortable: false,
              },
              {
                displayName: "YEAR",
                dataPath: "studentID.year",
                sortable: false,
              },
              {
                displayName: "SECTION",
                dataPath: "studentID.section",
                sortable: false,
              },
              { displayName: "ROLE", dataPath: "designation", sortable: false },
            ]}
          />
        </div>
        {/* Members */}
        <div className="flex flex-col mt-16 w-[90%] mx-auto max-w-[60rem]">
          <p className="text-arma-title width-[90%] mb-5 mt-5 text-2xl">
            Members
          </p>
          <Table
            api={`${
              process.env.REACT_APP_SERVER_URL + "forum/getForumMembers"
            }`}
            rowsPerPage={5}
            buttonsCount={3}
            filter={{ name: info?.name }}
            headers={[
              { displayName: "NAME", dataPath: "name", sortable: false },
              {
                displayName: "ROLL NUMBER",
                dataPath: "rollNumber",
                sortable: false,
              },
              {
                displayName: "DEPARTMENT",
                dataPath: "branch",
                sortable: false,
              },
              { displayName: "YEAR", dataPath: "year", sortable: false },
              { displayName: "SECTION", dataPath: "section", sortable: false },
            ]}
          />
        </div>

        <div className="flex flex-col mt-16 w-[90%] mx-auto max-w-[60rem]">
          <p className="text-arma-title width-[90%] mb-5 mt-5 text-2xl">
            Events Conducted
          </p>{" "}
          <DataTable
            data={info?.events}
            headers={[
              { displayName: "EVENT NAME", dataPath: "name", sortable: false },
              {
                displayName: "NO. OF PARTICIPANTS",
                dataPath: "participants",
                sortable: false,
              },
              {
                displayName: "DURATION",
                dataPath: "duration",
                sortable: false,
              },
              // { displayName: "ATTENDANCE", dataPath: "attendance", sortable: false },
            ]}
          />
        </div>
      </div>
    </div>
  );
};
