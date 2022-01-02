import { Event } from "./event";
import { Student } from "./user";

interface Presence {
    studentID : Student | string
    dates :(Date) []
}

export interface Attendance {
    eventID: string | Event
      registrantsList: (Student)[]
      presence: (Presence)[],
}