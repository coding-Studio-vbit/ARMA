import { Add } from "@material-ui/icons";
import EventCard from "./EventCard";
import StatisticsCard from "./StatisticsCard";

const Dashboard = () => {
  const eventList = [
    {
      name: "codeCraft 3.0",
      eventStatus: "completed",
      isActive: true,
    },
    {
      name: "codeCraft 3.0",
      eventStatus: "approved",
      isActive: true,
    },
    {
      name: "codeCraft 3.0",
      eventStatus: "rejected",
      isActive: true,
    },
    {
      name: "codeCraft 3.0",
      eventStatus: "approval pending",
      isActive: false,
    },
    {
      name: "codeCraft 3.0",
      eventStatus: "approval pending",
      isActive: false,
    },
    {
      name: "codeCraft 3.0",
      eventStatus: "rejected",
      isActive: false,
    },
  ];

  return (
    <div className="bg-arma-page-background">
      <div id="forumCoverSection" className="h-[300px]">
        <img
          src="sky.jpg"
          className="w-full h-full object-cover rounded-sm opacity-60"
        />
      </div>
      <div id="bottomSection" className=" sm:flex sm:flex-row-reverse">
        <div
          id="sideSection"
          className="pb-6 w-max mx-auto sm:w-1/5 my-3 border border-2 border-gray-200 border-t-0 sm:border-t-0 border-l-0 sm:border-l-2 border-r-0 sm:border-r-0  sm:pl-4  sm:border-b-0 "
        >
          {/* statistics and create event button */}
          <div className="w-max mx-auto mt-6">
            <button className="btn w-30 text-sm px-3">
              <Add /> Create New Event
            </button>
          </div>
          <div className="mt-3 mx-auto w-max">
            <StatisticsCard numberOfEvents={3} engagement={10} />
          </div>
          <div className="mt-3 mx-auto w-60 bg-gray-200 rounded-md p-3 drop-shadow-xl border border-2">
            <h2 className="text-arma-blue pl-2">Active Events</h2>
            <ul className="pl-8 list-disc">
              {eventList.map((item) => {
                if (item.isActive) return <li>{item.name}</li>;
              })}
            </ul>
          </div>
        </div>
        <div
          id="eventCardsSection"
          className="sm:relative -top-20 mx-auto mt-4 mb-4 sm:ml-32 sm:w-2/3 sm:flex sm:flex-wrap "
        >
          {eventList.map((item) => {
            return <EventCard event={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
