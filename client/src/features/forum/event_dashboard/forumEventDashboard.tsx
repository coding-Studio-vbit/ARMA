import { useEffect, useState } from "react";
import { Spinner } from "../../../components/Spinner/Spinner";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../../../utils/axios";
import { useDispatch } from "react-redux";
import { createDatesState } from "../../../redux/actions";
import { Dialog } from "../../../components/Dialog/Dialog";

interface EventInfo {
  name: string;
  route: string;
}

const eventInfoList: EventInfo[] = [
  { name: "Event Details", route: "eventInfo" },
  { name: "Event Venue", route: "dashboardUpdateVenue" },
  { name: "Budget", route: "budget" },
  { name: "Equipment", route: "dashboardUpdateEquipment" },
  { name: "Attendance", route: "eventAttendance" },
  { name: "Report & Media", route: "reportAndMedia" },
];

function ForumEventDashboard() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { state }: { state: any } = useLocation();
  const [loading, setLoading] = useState<boolean>(true);
  const [loadCancel, setLoadCancel] = useState<boolean>(false);
  const [loadComplete, setLoadComplete] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [dialogMessage, setDialogMessage] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [event, setEvent] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [eventObject, setEventObject] = useState<any>(null);
  const [error, setError] = useState(null);

  const getEventObject = async () => {
    const response = await axios.get(`events/getEvent/${state._id}`);
    if (response.data.response.status == -1) {
      console.log(response.data);
      setDialogMessage("An error occured!");
      setShowDialog(true);
    } else {
      setEventObject(response.data.response);
      setEvent(response.data.response.name);
      setStatus(response.data.response.eventStatus);
    }
  };
  useEffect(() => {
    getEventObject();
  }, []);

  async function getEventDetails() {
    if (state) {
      console.log(state._id);
      setUsername(JSON.parse(localStorage.getItem("forum")).name);
      setEvent(eventObject?.name);
      setStatus(eventObject?.eventStatus);
      try {
        const res = await axios.post("faculty/fetchFaculty");
        //get forum Name
      } catch (error) {
        setError(error.toString());
      }
      setLoading(false);
    } else {
      setLoading(false);
    }
  }

  const getEventDates = () => {
    axios.get(`events/getEventReservations/${state._id}`).then((response) => {
      var res = response.data.response;
      var obj = {};
      Object.keys(response.data.response).map((d) => {
        var x = d.split("-");
        const dateString = new Date(
          parseInt(x[2]),
          parseInt(x[1]) - 1,
          parseInt(x[0])
        );
        obj[dateString.toDateString()] = {
          dateObject: {
            day: parseInt(x[0]),
            month: parseInt(x[1]),
            year: parseInt(x[2]),
          },
          eventDate: dateString,
          halls: res[d].halls,
        };
      });
      dispatch(createDatesState(obj));
    });
  };
  useEffect(() => {
    getEventDetails();
    getEventDates();
  }, []);

  const cancelEvent = async () => {
    setLoadCancel(true);
    const response = await axios.get(`events/cancelEvent/${state._id}`);
    setDialogMessage(response.data.response);
    setShowDialog(true);
    setTimeout(() => {
      setShowDialog(false);
      window.location.reload();
    }, 2000);
    setLoadCancel(false);
  };
  const completeEvent = async () => {
    setLoadComplete(true);
    const response = await axios.get(`events/completeEvent/${state._id}`);
    setDialogMessage(response.data.response);
    setShowDialog(true);
    setTimeout(() => {
      setShowDialog(false);
      window.location.reload();
    }, 2000);
    setLoadComplete(false);
  };

  return !loading ? (
    !error ? (
      <div id="forumEventPage">
        <Dialog
          show={showDialog}
          setShow={setShowDialog}
          title={dialogMessage}
        />
        <div id="forumEventPageContent" className="mx-auto my-5">
          <div className="mx-auto w-11/12 md:w-5/6 mt-8 md:mt-16 mb-12">
            <div className="flex flex-col justify-start items-start sm:flex-row sm:justify-start sm:items-center">
              {/* <span className="material-icons md:scale-150 mr-4 ">chevron_left</span> */}
              <span className="ml-4 sm:ml-0 font-normal sm:font-medium  md:font-semibold text-arma-dark-blue text-xl md:text-4xl ">
                {username + " " + event}
              </span>
              <span className="sm:mt-0 mt-4 ml-auto mr-4 sm:mr-0 sm:ml-4 btn-green">
                {status}
              </span>
            </div>

            <div className="mt-6 mb-10 border-t-2 w-full mx-auto border-slate-500"></div>

            <div
              className="flex flex-row flex-wrap 
                            sm:flex-wrap md:flex-nowrap justify-center items-center gap-5 xl:w-5/6 my-5 mx-auto w-5/6 md:w-full"
            >
              {eventInfoList
                .slice(0, eventObject?.hasBudget ? 3 : 2)
                .map((eventInfo, index) => {
                  return (
                    <div
                      key={index}
                      className="w-full sm:w-3/4 md:w-1/3 px-6 py-6 lg:py-8 lg:p-10 m-0 
                                            arma-card-gradient text-white  text-lg sm:text-xl lg:text-2xl
                                            shadow-2xl rounded-2xl min-h-max h-40 lg:h-60"
                      onClick={() =>
                        navigate(`../${eventInfo.route}`, {
                          state: { eventId: state._id },
                        })
                      }
                    >
                      <div className=" flex flex-wrap justify-between items-center">
                        <span>{eventInfo.name}</span>
                        {((eventInfo.name == "Budget" &&
                          eventObject.hasBudget &&
                          (eventObject.eventStatus == "AWAITING FO APPROVAL" ||
                            eventObject.eventStatus ==
                              "BUDGET REJECTED BY FO")) ||
                          (eventInfo.name == "Event Details" &&
                            state.eventStatus ==
                              "CHANGES REQUESTED BY SAC")) && (
                          <span className="material-icons text-right text-yellow-400   lg:scale-125">
                            info
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>

            <div
              className="flex flex-row flex-wrap 
                            sm:flex-wrap md:flex-nowrap justify-center  items-center gap-5 xl:w-5/6 my-5 mx-auto w-5/6 md:w-full"
            >
              {eventInfoList
                .slice(3, status === "APPROVED" ? 6 : 4)
                .map((eventInfo, index) => {
                  return (
                    <div
                      key={index}
                      className="w-full sm:w-3/4 md:w-1/3 p-6 lg:py-8 lg:p-10 m-0 
                                        arma-card-gradient text-white text-lg sm:text-xl lg:text-2xl
                                        shadow-2xl rounded-2xl min-h-max h-40 lg:h-60"
                      onClick={() =>
                        navigate(`../${eventInfo.route}`, {
                          state: { eventId: state._id },
                        })
                      }
                    >
                      <div className=" flex flex-wrap justify-between items-center">
                        <span>{eventInfo.name}</span>
                        {/* <span className="material-icons text-right  lg:scale-125">
                                                info
                                                </span> */}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <div className="flex m-2">
          {loadCancel ? (
            <Spinner className="mx-auto" />
          ) : [
              "COMPLETED",
              "CANCELLED",
              "REJECTED BY FO",
              "REJECTED BY SAC",
            ].includes(eventObject?.eventStatus) ? null : (
            <button className="btn-red mx-auto" onClick={cancelEvent}>
              cancel event
            </button>
          )}
          {loadComplete ? (
            <Spinner className="mx-auto" />
          ) : [
              "COMPLETED",
              "CANCELLED",
              "REJECTED BY FO",
              "REJECTED BY SAC",
            ].includes(eventObject?.eventStatus) ? null : (
            <button
              className="btn bg-[#666666] mx-auto"
              onClick={completeEvent}
            >
              finish event
            </button>
          )}
        </div>
      </div>
    ) : (
      <div>{error}</div>
    )
  ) : (
    <div className="flex h-screen justify-center items-center">
      <Spinner className="" />
    </div>
  );
}

export default ForumEventDashboard;
