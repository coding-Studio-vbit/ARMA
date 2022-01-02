import { Event } from "./event";

export interface Faculty {
  name: string;
  rollNumber: string;
  email: string;
  roles: Role[];
}
interface Role {
  name: string;
  permissions: string[];
}

interface ForumCoreTeamMembers {
  designation: string;
  studentID: string | Student;
}

export interface Student {
  name: string;
  rollNumber: string;
  year: number;
  branch: string;
  section: string;
  email: string;
  phone: string;
  attendedEvents: Event[];
}
export interface Forum {
  name: string;
  email:string
  roles:[]
  profileCoverPath: string;
  forumHeads: Student[];
  forumMembers: Student[];
  forumCoreTeamMembers: ForumCoreTeamMembers[];
}
