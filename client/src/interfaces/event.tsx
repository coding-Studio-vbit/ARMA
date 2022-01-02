import { Attendance } from "./attendance";
import { Forum } from "./user";

type Status = "APPROVAL PENDING"|
                    "REQUESTED CHANGES"|
                    "APPROVED"|
                    "REJECTED"
                    

export interface Event {
    name: string
      description:string
      forumID: string | Forum
      attendanceDocID: string | Attendance
      eventStatus: Status | 'COMPLETE'
      hasBudget: boolean
      budgetStatus: Status
      eventDates: (Date)[],
      eventProposalDocPath: {
        type: String,
        required: true,
      },
      budgetDocPath:string
      reportDocPath: string
      mediaFilePaths:(string)[],
      FOComments:String,
      SACComments:String,
}