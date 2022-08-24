/* eslint-disable jsx-a11y/anchor-is-valid */
import { CloudDownload } from "@material-ui/icons";
import { useState, useEffect } from "react";
import { Calendar } from "react-modern-calendar-datepicker";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Event } from "../../../interfaces/event";
import { Forum } from "../../../interfaces/user";
import { fetchEventById } from "../../../services/events/event";
import { Dialog } from "../../../components/Dialog/Dialog";
import { useUser } from "../../../providers/user/UserProvider";
import axios from "../../../utils/axios";
import { Spinner } from "../../../components/Spinner/Spinner";

export default function RequestsView() {
  const actions = {
    REQUEST_CHANGES: "REQUEST_CHANGES",
    REJECT_BUDGET: "REJECT_BUDGET",
    APPROVE_BUDGET: "APPROVE_BUDGET",
    APPROVE_REQUEST: "APPROVE_REQUEST",
    REJECT_REQUEST: "REJECT_REQUEST",
    COMPLETED: "COMPLETED",
    NONE: "NONE",
  };

  const { id } = useParams();
  const {
    status,
    data: event,
    error,
  } = useQuery<Event, Error>(["eventByID", id], () => fetchEventById(id), {
    retry: false,
  });

  const [eventData, setEventData] = useState<any>(null);

  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [showSpinner, setShowSpinner] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [action, setAction] = useState<string>(actions.NONE);
  const { faculty } = useUser();
  const [loading, setLoading] = useState<boolean>(false);
  const [comments, setComments] = useState<any>(
    faculty.role.SAC ? event?.SACComments : event?.FOComments
  );

  useEffect(() => {
    getEventInfo();
  }, []);

  useEffect(() => {
    getEventInfo();
  }, [comments]);

  useEffect(() => {
    setComments(faculty.role.SAC ? event?.SACComments : event?.FOComments);
  }, [event]);

  const [eventDays, setEventDays] = useState(null);

  async function getEventInfo() {
    try {
      const res = await axios.get(
        process.env.REACT_APP_SERVER_URL + "events/getEvent/" + id
      );
      if (res.data.status === 1) {
        // console.log(res.data.response);
        setEventData(res.data.response);
        console.log("Event data is: ", res.data.response);
        let dates = res.data.response.eventDates;
        for (let i = 0; i < dates.length; i++) {
          let d = new Date(dates[i]);
          dates[i] = {
            day: d.getDate(),
            month: d.getMonth() + 1,
            year: d.getFullYear(),
          };
        }
        setEventDays(dates);
      } else {
      }
      // setError("efjhrfuruihrf")
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  const facilities = ["speakers", "mic", "projector", "chairs", "router"];

  async function approveBudget() {
    console.log(message);
    try {
      let res = await axios.post("faculty/acceptBudget", {
        eventId: eventData._id,
      });
      console.log("Approving Budget");
      console.log("Approved Budget");
      setLoading(true);
      setAction(actions.COMPLETED);
      setLoading(false);
      setMessage(res.data.response);
      setShowSpinner(false);
      setTimeout(() => {
        setShowDialog(false);
        setMessage("");
        setAction(actions.NONE);
      }, 2000);
    } catch (error) {}
  }
  async function rejectBudget() {
    console.log(message);
    try {
      let res = await axios.post("faculty/rejectBudget", {
        eventId: eventData._id,
      });
      console.log("Reject Budget");
      setLoading(true);
      setAction(actions.COMPLETED);
      setLoading(false);
      setMessage(res.data.response);
      setShowSpinner(false);
      setTimeout(() => {
        setShowDialog(false);
        setMessage("");
        setAction(actions.NONE);
      }, 2000);
    } catch (error) {}
  }
  async function approveEvent() {
    console.log(message);
    try {
      let res = await axios.post("faculty/acceptEvent", {
        eventId: eventData?._id,
      });
      console.log("Approving Event");
      console.log("Approved Event");
      setLoading(true);
      setAction(actions.COMPLETED);
      setLoading(false);
      setMessage(res.data.response);
      setShowSpinner(false);
      setTimeout(() => {
        setShowDialog(false);
        setMessage("");
        setAction(actions.NONE);
      }, 2000);
    } catch (error) {}
  }

  async function rejectEvent() {
    console.log(message);
    try {
      let res = await axios.post("faculty/rejectEvent", {
        eventId: eventData?._id,
      });

      console.log("Rejecting Event");
      console.log("Rejected Event");
      setLoading(true);
      setAction(actions.COMPLETED);
      setLoading(false);
      setMessage(res.data.response);
      setShowSpinner(false);
      setTimeout(() => {
        setShowDialog(false);
        setMessage("");
        setAction(actions.NONE);
      }, 2000);
    } catch (error) {}
  }

  async function requestChanges() {
    console.log(message);
    try {
      if (faculty.role.SAC) {
        const res = await axios.post("faculty/commentEvent", {
          SACComments: comments,
          eventId: id,
        });
        setMessage(res.data.response);
        setShowSpinner(false);
        console.log(res);
      } else if (faculty.role.FO) {
        const res = await axios.post("faculty/commentBudget", {
          FOComments: comments,
          eventId: id,
        });
        setMessage(res.data.response);
        setShowDialog(true);
        setShowSpinner(false);
      }
      setLoading(true);
      setAction(actions.COMPLETED);
      setLoading(false);
      setTimeout(() => {
        setShowDialog(false);
        setMessage("");
        setAction(actions.NONE);
      }, 2000);
    } catch (error) {
      setMessage("An error occured!");
      console.log(error);
    }
  }

  function actionNo() {
    setShowDialog(false);
    setMessage("");
  }

  function actionYes() {
    switch (action) {
      case actions.REQUEST_CHANGES:
        requestChanges();
        break;
      case actions.APPROVE_BUDGET:
        approveBudget();
        break;
      case actions.REJECT_BUDGET:
        rejectBudget();
        break;
      case actions.APPROVE_REQUEST:
        approveEvent();
        break;
      case actions.REJECT_REQUEST:
        rejectEvent();
        break;
      default:
        break;
    }
    //window.location.reload();
  }

  function makeRequest(action) {
    setAction(action);
    switch (action) {
      case actions.REQUEST_CHANGES:
        setMessage("ARE YOU SURE YOU WANT TO REQUEST CHANGES?");
        break;
      case actions.APPROVE_BUDGET:
        setMessage("ARE YOU SURE YOU WANT TO APPROVE BUDGET?");
        break;
      case actions.REJECT_BUDGET:
        setMessage("ARE YOU SURE YOU WANT TO REJECT BUDGET?");
        break;
      case actions.APPROVE_REQUEST:
        setMessage("ARE YOU SURE YOU WANT TO APPROVE REQUEST?");
        break;
      case actions.REJECT_REQUEST:
        setMessage("ARE YOU SURE YOU WANT TO REJECT REQUEST?");
        break;
      default:
        break;
    }
    setShowDialog(true);
  }

  if (status === "loading") {
    return <p>loading</p>;
  }

  if (status === "error") {
    return <p>{error.message}</p>;
  }

  return (
    <div className="lg:mx-[5rem] xl:mx-[10rem]  mx-8 mt-8 mb-8 flex flex-col gap-y-4">
      <Dialog
        show={showDialog}
        setShow={setShowDialog}
        title={""}
        loading={loading}
        children={
          <div className="h-40 flex justify-evenly items-center flex-col gap-6 px-4">
            <p className="text-center">{message}</p>
            {action !== actions.COMPLETED &&
              (showSpinner ? (
                <Spinner />
              ) : (
                <div className="flex justify-evenly gap-12">
                  <button
                    onClick={() => actionNo()}
                    className="btn bg-arma-light-gray text-teal-700 border-2 hover:text-white "
                  >
                    NO
                  </button>
                  <button
                    onClick={() => {
                      setShowSpinner(true);
                      actionYes();
                    }}
                    className="btn"
                  >
                    YES
                  </button>
                </div>
              ))}
          </div>
        }
      />
      <div className="flex flex-col w-max ">
        <div className="break-words">
          <span className="text-arma-dark-blue sm:text-4xl text-lg font-semibold w-max">
            New Event Request : {event.name}
          </span>
        </div>

        <div className="flex justify-between gap-x-3">
          <div className="text-arma-gray text-md">
            <span className="text-black">Forum -</span>{" "}
            {(event.forumID as Forum).name}
          </div>
          <div className="text-arma-gray text-md">
            <span className="text-black">Faculty Coordinator -</span>{" "}
            {(event.forumID as Forum).facultyCoordinatorID.name}
          </div>
          <div className="text-arma-gray text-md">
            <span
              className={`text-white font-bold p-1 rounded ${
                eventData?.eventStatus == "APPROVED"
                  ? "bg-green-500"
                  : eventData?.eventStatus.includes("CHANGES")
                  ? "bg-yellow-500"
                  : "bg-gray-500"
              }`}
            >
              {event.eventStatus}
            </span>
          </div>
        </div>
      </div>
      <hr className=" bg-black/10 h-[1.55px]" />
      <div className="flex flex-col lg:flex-row gap-x-24">
        <div className="flex flex-col gap-4 mb-4">
          <span className="text-arma-gray font-medium text-2xl ">
            Event Name
          </span>
          <div className="bg-white border-[1px] border-[#E5E5EA] py-3 px-6 rounded-[24px] max-w-[500px] break-words">
            <span>{event.name}</span>
          </div>
          <span className="text-arma-gray font-medium text-2xl ">
            Description
          </span>
          <div className="bg-white border-[1px] border-[#E5E5EA] py-3 px-6 rounded-[24px] max-w-[700px] break-words">
            <p>{event.description}</p>
          </div>

          <span className="text-arma-gray font-medium text-2xl ">
            Attachments
          </span>

          <div className="flex items-start flex-col gap-x-4">
            {/* {event.eventProposalDocPath} */}
            {
              <div className="flex w-80 justify-between items-center bg-white border-[1px] border-[#E5E5EA] py-3 px-6 rounded-[24px] break-words">
                <span>Event Proposal Document</span>
                <a
                  className="!cursor-pointer"
                  onClick={async function () {
                    try {
                      const result = await axios({
                        responseType: "blob",
                        method: "GET",
                        url: `${process.env.REACT_APP_SERVER_URL}events/getEventDocument/${id}`,
                      });
                      const url = window.URL.createObjectURL(
                        new Blob([result.data])
                      );
                      const link = document.createElement("a");
                      link.href = url;
                      link.setAttribute("download", "eventProposalDoc.pdf"); //or any other extension
                      document.body.appendChild(link);
                      link.click();
                    } catch (error) {
                      console.log("Failed");
                    }
                  }}
                  download
                >
                  <CloudDownload className="cursor-pointer" />
                </a>
              </div>
            }

            {/* {event.budgetDocPath} */}
            {
              eventData?.hasBudget ? (<div className="mt-6 flex w-80 justify-between items-center bg-white border-[1px] border-[#E5E5EA] py-3 px-6 rounded-[24px] break-words">
                <span>Budget Document</span>{" "}
                <a
                  className="!cursor-pointer"
                  onClick={async () => {
                    const result = await axios({
                      responseType: "blob",
                      method: "GET",
                      url: `${process.env.REACT_APP_SERVER_URL}events/getBudgetDocument/${id}`,
                    });
                    const url = window.URL.createObjectURL(
                      new Blob([result.data])
                    );
                    const link = document.createElement("a");
                    link.href = url;
                    link.setAttribute("download", "budget.pdf"); //or any other extension
                    document.body.appendChild(link);
                    link.click();
                  }}
                  download
                >
                  <CloudDownload className="cursor-pointer -mt-1" />
                </a>
              </div>) : null
            }
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <span className="text-arma-gray font-medium text-2xl ">
            Event Dates
          </span>
          {eventDays && (
            <Calendar
              value={eventDays}
              colorPrimary="#0047FF"
              onChange={(e)=>{console.log("The change is:" ,e)}}
              shouldHighlightWeekends
            />
          )}
        </div>
      </div>
      <span className="text-arma-gray font-medium text-2xl ">
        Equipment Required
      </span>
      <div className="flex flex-wrap  w-[90%] sm:w-[70%]">
        {event.equipment.map((f: any) => {
          return (
            <div
              key={f}
              className="basis-[40%] shrink mb-2 text-md font-medium flex items-center"
            >
              <div className="mr-2 bg-arma-title w-[10px] h-[10px] rounded-full"></div>
              <span
                className={
                  f.quantity > f.equipmentType.totalCount ? "text-red-500" : ""
                }
                key={f.equipmentType.name}
              >
                {f.equipmentType.name} - {f.quantity} pcs, Total Available -{" "}
                {f.equipmentType.totalCount}
              </span>
            </div>
          );
        })}
      </div>
      <hr className=" bg-black/10 h-[1.55px]" />
      <div className="flex gap-4 items-center">
        <span className="text-arma-gray font-medium text-2xl ">Comments</span>
        {(faculty?.role.ADMIN || faculty?.role.SAC || faculty?.role.FO) &&
          event.eventStatus !== "APPROVED" &&
          event.eventStatus !== "CANCELLED" &&
          event.eventStatus !== "COMPLETED" && (
            <button
              onClick={() => makeRequest(actions.REQUEST_CHANGES)}
              className="btn"
            >
              Request Changes
            </button>
          )}
      </div>
      <textarea
        disabled={
          !(faculty?.role.ADMIN || faculty?.role.SAC || faculty?.role.FO) || (event.eventStatus == "APPROVED" || event.eventStatus == "CANCELLED" || event.eventStatus == "COMPLETED")
        }
        name="comments"
        value={comments}
        placeholder="Please write your comments here"
        onChange={(e) => {
          setComments(e.target.value);
        }}
        className="outline-none sm:w-[100%] w-full border-[1px] 
      border-[#E5E5EA] p-4 md:w-[60%] rounded-[8px]"
      ></textarea>
      <div className="flex flex-wrap gap-4 xsm:justify-center mt-4 ">
        {(faculty?.role.FO || faculty?.role.ADMIN) &&
          event.eventStatus !== "APPROVED" &&
          event.eventStatus !== "CANCELLED" &&
          event.eventStatus !== "COMPLETED" && (
            <button
              onClick={() => makeRequest(actions.APPROVE_BUDGET)}
              className="btn bg-arma-title basis-full xsm:basis-auto "
            >
              Approve Budget
            </button>
          )}
        {(faculty?.role.FO || faculty?.role.ADMIN) &&
          event.eventStatus !== "APPROVED" &&
          event.eventStatus !== "CANCELLED" &&
          event.eventStatus !== "COMPLETED" && (
            <button
              onClick={() => makeRequest(actions.REJECT_BUDGET)}
              className="btn -red bg-arma-title basis-full xsm:basis-auto "
            >
              Reject Budget
            </button>
          )}
        {(faculty?.role.SAC || faculty?.role.ADMIN) &&
          event.eventStatus !== "APPROVED" &&
          event.eventStatus !== "CANCELLED" &&
          event.eventStatus !== "COMPLETED" && (
            <button
              onClick={() => makeRequest(actions.APPROVE_REQUEST)}
              className="btn-green ml-auto xsm:ml-0"
            >
              Approve
            </button>
          )}
        {(faculty?.role.SAC || faculty?.role.ADMIN) &&
          event.eventStatus !== "APPROVED" &&
          event.eventStatus !== "CANCELLED" &&
          event.eventStatus !== "COMPLETED" && (
            <button
              onClick={() => makeRequest(actions.REJECT_REQUEST)}
              className="btn-red mr-auto xsm:mr-0"
            >
              Reject
            </button>
          )}
      </div>
    </div>
  );
}
