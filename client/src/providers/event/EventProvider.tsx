/* eslint-disable no-restricted-globals */
import { createContext, useContext } from "react";
import { useLocalStorageState } from "../../hooks/useStateStorage";
import { Event } from "../../interfaces/event";

type EventDetailsPicked = Pick<Event,"name"|"description"|"hasBudget">

interface EventDetails extends EventDetailsPicked{
    budgetDoc:File;
    eventDoc:File;
    setEvent:React.Dispatch<React.SetStateAction<EventDetails>>
}   
const EventContext = createContext<EventDetails>({
  name:'',
  description:'',
  hasBudget:false,
  budgetDoc:null,
  eventDoc:null,
  setEvent:(event)=>{}
});

const useEvent = () => useContext(EventContext);

const EventProvider = ({ children }: any) => {
  const [event, setEvent] = useLocalStorageState<EventDetails | null>("creatEvent", null);
  

  return (
    <EventContext.Provider
      value={{
        ...event,
        setEvent
      }}
    >
      {children}
    </EventContext.Provider>
  );
};
export { EventProvider, useEvent };
