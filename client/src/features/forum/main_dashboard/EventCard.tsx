interface event {
  name: string;
  eventStatus: string;
}

interface EventCardProps {
  event: event;
}

const EventCard = ({ event }: EventCardProps) => {
  return (
    <div className="h-48 w-52 border border-2 border-slate-300 rounded-xl bg-white">
      <div className="text-center align-text-middle font-bold text-lg mt-2 border border-slate-300 border-b-1 border-t-0 border-l-0 border-r-0">
        {event.name}
      </div>
      <div className="text-center align-text-middle font-medium text-md mt-2">
        {event.eventStatus}
      </div>
    </div>
  );
};

export default EventCard;
