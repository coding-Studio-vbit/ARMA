import { Route, Routes } from "react-router-dom";
import CreateEvent from "../features/forum/create_event/createEvent";
import { EventProvider } from "../providers/event/EventProvider";

export default function CreateEventRoutes() {
  return (
    <EventProvider>
      <Routes>
        <Route path="/venue" element={<CreateEvent />} />
        <Route path="/equipment" element={<CreateEvent />} />
        <Route path="/" element={<CreateEvent />} />
      </Routes>
    </EventProvider>
  );
}
