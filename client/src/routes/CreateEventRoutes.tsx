import { Route, Routes } from "react-router-dom";
import CreateEvent from "../features/forum/create_event/createEvent";
import { EventVenue } from "../features/forum/event_venue";
import { EventProvider } from "../providers/event/EventProvider";
import { EventVenue } from "../features/forum/event_venue";

export default function CreateEventRoutes() {
  return (
    <EventProvider>
      <Routes>
        <Route path="/venue" element={<EventVenue />} />
        <Route path="/equipment" element={<CreateEvent />} />
        <Route path="/" element={<EventVenue />} />
      </Routes>
    </EventProvider>
  );
}
