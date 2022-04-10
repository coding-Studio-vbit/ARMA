import { Add } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EventCard from "./EventCard";
import axios from "../../../utils/axios";
import ForumCover from "./forumCover";

const Dashboard = () => {
  const navigate = useNavigate();
  const [eventList, setEventList] = useState([]);

  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_SERVER_URL}forum/dashboard`)
    .then(response=>{
      console.log(response.data.response)
      setEventList(response?.data.response.events)
    })
    .catch(err=>{
      console.log(err);
    })
  },[])

  const [profileObj, setprofileObj] = useState(null);

  const [url, setUrl] = useState("");

  return (
    <div>
      {/* Forum Cover */}
      <div
        id="forumCoverSection"
        className="relative hover:opacity-90 hidden sm:block h-[300px] -mt-5 mx-0 px-0"
      >
        <ForumCover profileObj={profileObj} url={url} setUrl={setUrl} setprofileObj={setprofileObj} />
      </div>

      <div
        id="bottomSection"
        className="mx-0 px-0 sm:flex sm:flex-row-reverse "
      >
        <div
          id="sideSection"
          className="pb-6 w-max my-3 sm:px-4 mx-auto sm:ml-auto sm:mt-8 justify-self-end
          border-0 border-gray-200 border-t-0 sm:border-t-0 border-l-0 sm:border-l-2 border-r-0 sm:border-r-0 sm:border-b-0 "
        >
          <div
            className="w-max"
            onClick={() => {
              navigate("createEvent");
            }}
          >
            <button className="btn text-sm px-6 py-auto ">
              <Add fontSize="small" />
              Create New Event
            </button>
          </div>

          <div className="mt-3 sm:mt-4 h-44 w-48 mx-auto bg-gray-200 rounded-md p-3 drop-shadow-xl border-2">
            <h2 className="text-arma-blue mx-auto">Active Events</h2>
            <ul className="pl-8 list-disc list-outside">
              {eventList.map((item) => {
                if (item.isActive) return <li>{item.name}</li>;
                return <></>;
              })}
            </ul>
          </div>
        </div>

        <div
          id="eventCardsSection"
          className="sm:relative -top-16 mb-4 w-full sm:w-3/5 md:w-2/3 lg:w-5/6 flex flex-wrap justify-center lg:justify-start lg:ml-4"
        >
          {eventList.map((item) => {
            return (
              <div className="mx-2 my-4 sm:m-4">
                <EventCard event={item} onClick={()=>{
                  navigate('eventDashboard', {state:item})
                }}/>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;




// const eventList = [
  //   {
  //     name: "codeCraft 3.0",
  //     eventStatus: "completed",
  //     isActive: true,
  //   },
  //   {
  //     name: "codeCraft 3.0",
  //     eventStatus: "approved",
  //     isActive: true,
  //   },
  //   {
  //     name: "codeCraft 3.0",
  //     eventStatus: "rejected",
  //     isActive: true,
  //   },
  //   {
  //     name: "codeCraft 3.0",
  //     eventStatus: "AWAITING SAC APPROVAL",
  //     isActive: false,
  //   },
  //   {
  //     name: "codeCraft 3.0",
  //     eventStatus: "AWAITING BUDGET APPROVAL",
  //     isActive: false,
  //   },
  //   {
  //     name: "codeCraft 3.0",
  //     eventStatus: "rejected",
  //     isActive: false,
  //   },
  // ];
