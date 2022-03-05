import { Event } from "./event";

export interface Faculty {
  name: string;
  rollNumber: string;
  email: string;
  designation: string;
  department: string;
  phone: string;
  role: Role;
}
export interface Role {
  ADMIN: boolean;
  FO:boolean;
  FC:boolean;
  SAC:boolean;
  FACULTY:boolean
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
  role:Role;
  description:string;
  facultyCoordinatorID:{name:string};
  profileCoverPath: string;
  forumHeads: Student[];
  forumMembers: Student[];
  forumCoreTeamMembers: ForumCoreTeamMembers[];
}
