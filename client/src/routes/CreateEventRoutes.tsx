import { Route, Routes } from "react-router-dom";
import CreateEvent from "../features/forum/create_event/createEvent";
import EventEquip from "../features/forum/event_equipment/EventEquip";
import { EventVenue } from "../features/forum/event_venue";
import { EventProvider } from "../providers/event/EventProvider";

export default function CreateEventRoutes() {
  return (
    <EventProvider>
      <Routes>
        <Route path="/venue" element={<EventVenue />} />
        <Route path="/equipment" element={<EventEquip />} />
        <Route path="/" element={<CreateEvent />} />
      </Routes>
    </EventProvider>
  );
}
