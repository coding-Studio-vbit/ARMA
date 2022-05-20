import { Attendance } from "./attendance";
import { Faculty, Forum } from "./user";

type Status =
  | "AWAITING SAC APPROVAL"
  | "CHANGES REQUESTED BY SAC"
  | "AWAITING FO APPROVAL"
  | "CHANGES REQUESTED BY FO"
  | "SAC CHANGES UPDATED"
  | "APPROVED"
  | "REJECTED BY SAC"
  | "REJECTED BY FO"
  | "CANCELLED"
  | "COMPLETED";

export interface Equipment {
  name: string;
  totalCount: number;
  facultyIncharge: Faculty;
}

export interface Hall {
  name: string;
  block: string;
  hallInfo: string;
  capacity: number;
}

type TimeSlot = "Morning" | "Afternoon";
interface EventHalls {
  date: Date;
  timeSlot: TimeSlot;
  hall: Hall;
}
export interface Event {
  name: string;
  description: string;
  forumID: string | Forum;
  attendanceDocID?: string | Attendance;
  eventStatus: Status | "COMPLETE";
  hasBudget?: boolean;
  budgetStatus?: Status;
  eventDates?: Date[];
  eventProposalDocPath?: {
    type: String;
    required: true;
  };
  equipment: Equipment[];
  halls: EventHalls[];
  budgetDocPath?: string;
  reportDocPath?: string;
  mediaFilePaths?: string[];
  FOComments?: String;
  SACComments?: String;
}
