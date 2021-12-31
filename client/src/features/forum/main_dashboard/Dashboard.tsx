import EventCard from "./EventCard"

const Dashboard = () => {

    const eventList = [{
        name:"codeCraft 3.0",
        eventStatus: "approved"
    },{
        name:"codeCraft 3.0",
        eventStatus: "approved"
    },{
        name:"codeCraft 3.0",
        eventStatus: "approved"
    },{
        name:"codeCraft 3.0",
        eventStatus: "approved"
    },{
        name:"codeCraft 3.0",
        eventStatus: "approved"
    },{
        name:"codeCraft 3.0",
        eventStatus: "approved"
    },{
        name:"codeCraft 3.0",
        eventStatus: "approved"
    },{
        name:"codeCraft 3.0",
        eventStatus: "approved"
    },]

  return (
    <div className="">
      <div id="forumCoverSection" className="h-[300px]">
          <img src="sky.jpg" className="w-full h-full object-cover rounded-sm opacity-60" />
      </div>
      <div id="bottomSection">
        <div id="eventCardsSection" className="m-3 flex flex-wrap gap-3">
            {
                eventList.map((item)=>{
                    return <EventCard event={item} />
                })
            }
        </div>
        <div id="">
            {/* statistics and create event button */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
