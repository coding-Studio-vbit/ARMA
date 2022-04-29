interface event {
  name: string;
  eventStatus: string;
}

interface EventCardProps {
  event: event;
  onClick?: any;
}

const EventCard = ({ event, onClick }: EventCardProps) => {
  let eventStatusColor: string = "";
  event.eventStatus = event.eventStatus.toUpperCase();
  switch (event.eventStatus) {
    case "COMPLETED":
    case "APPROVED":
      eventStatusColor = "text-green-600";
      break;
    case "REJECTED":
      eventStatusColor = "text-red-600";
      break;
    case "AWAITING SAC APPROVAL":
    case "AWAITING BUDGET APPROVAL":
    case "REQUESTED BUDGET CHANGES":
    case "BUDGET REJECTED":
    case "REQUESTED CHANGES BY SAC":
      eventStatusColor = "text-yellow-600";
      break;
    default:
      eventStatusColor = "text-black";
      break;
  }

  return (
    <div
      className="flex flex-col mx-0 h-44 w-52 rounded-xl bg-white drop-shadow-xl hover:bg-gray-50"
      onClick={onClick}
    >
      <div className="grow text-center py-1 align-text-middle font-bold text-lg mt-2 border border-slate-300 border-b-1 border-t-0 border-l-0 border-r-0">
        <p className="mt-10">{event.name}</p>
      </div>
      <div
        className={`p-2 text-center align-text-middle mt-auto font-medium text-md ${eventStatusColor}`}
      >
        <p className="inline-block align-middle">{event.eventStatus}</p>
      </div>
    </div>
  );
};

export default EventCard;
