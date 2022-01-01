interface event {
  name: string;
  eventStatus: string;
}

interface EventCardProps {
  event: event;
}

const EventCard = ({ event }: EventCardProps) => {

  let eventStatusColor:string = '';

  switch(event.eventStatus)
  {
    case 'completed':
    case 'approved': eventStatusColor = 'text-green-600';break;
    case 'rejected': eventStatusColor = 'text-red-600';break;
    case 'approval pending':
    case 'requested changes': eventStatusColor = 'text-yellow-600';break;
  }

  return (
    <div className="mx-auto sm:mx-4 h-48 w-52 rounded-xl bg-white drop-shadow-xl">
      <div className="text-center align-text-middle font-bold text-lg mt-2 border border-slate-300 border-b-1 border-t-0 border-l-0 border-r-0">
        {event.name}
      </div>
      {console.log(eventStatusColor)}
      <div className={`text-center align-text-middle font-medium text-md mt-2 ${eventStatusColor}`}>
        {event.eventStatus}
      </div>
    </div>
  );
};

export default EventCard;
