/* eslint-disable no-restricted-globals */
import { createContext, useContext } from "react";
import { useLocalStorageState } from "../../hooks/useStateStorage";
import { Event } from "../../interfaces/event";

type EventDetailsPicked = Pick<Event, "name" | "description" | "hasBudget">;

interface EventExtended extends EventDetailsPicked {
  budgetDoc: File;
  eventDoc: File;
}
interface EventDetails  {
  event: EventExtended | null;
  setEvent: React.Dispatch<React.SetStateAction<EventExtended>>;
}
const EventContext = createContext<EventDetails>({
  event:null,
  setEvent: (e) => {}
});

const useEvent = () => useContext(EventContext);

const EventProvider = ({ children }: any) => {
  const [event, setEvent] = useLocalStorageState<EventExtended | null>(
    "creatEvent",
    null
  );

  return (
    <EventContext.Provider
      value={{
        event:{...event},
        setEvent,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};
export { EventProvider, useEvent };
