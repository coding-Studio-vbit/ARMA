/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from "react";
import {
  CloudDownloadOutlined,
  CloudUploadTwoTone,
  Edit,
} from "@material-ui/icons";
import axios from "../../../utils/axios";
import { useLocation } from "react-router-dom";
import { Dialog } from "../../../components/Dialog/Dialog";
import { Spinner } from "../../../components/Spinner/Spinner";

const UpdateEventDetails = () => {
  const { state }: { state: any } = useLocation();

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  const [pdf1, setPdf1] = useState<File>();
  const [forumName, setForumName] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [desc, setDesc] = useState("");
  const [sacComments, setSacComments] = useState("");
  const [fileName, setfileName] = useState("");

  const [eventName, seteventName] = useState("");

  // const [eventProposalDocPath, seteventProposalDocPath] = useState("");

  async function getEventInfo() {
    try {
      const res = await axios.get(
        process.env.REACT_APP_SERVER_URL + "events/getEvent/" + state.eventId
      );
      if (res.data.status === 1) {
        // console.log(res.data.response);
        // seteventProposalDocPath(res.data.response.eventProposalDocPath);
        seteventName(res.data.response.name);
        setError(null);
        setDesc(res.data.response.description);
        setSacComments(res.data.response.SACComments);
      } else {
        setError("Unable to load event details");
      }
      // setError("efjhrfuruihrf")
    } catch (error) {
      setError(error.toString());
      console.log(error);
      setIsEdit(false);
    }
    setLoading(false);
  }

  useEffect(() => {
    setForumName(JSON.parse(localStorage.getItem("forum")).name);
    getEventInfo();
  }, []);

  async function updateEventDetails() {
    let formData = new FormData();
    formData.append("eventDocument", pdf1);
    formData.append("eventId", state.eventId);
    formData.append("name", eventName);
    formData.append("description", desc);

    try {
      const res = await axios.post(
        process.env.REACT_APP_SERVER_URL + "events/updateEventDetails",
        formData
      );
      setDialogMessage(res.data.response);
      setShowDialog(true);
      if (res.data.status === 1) {
        setTimeout(() => {
          location.reload();
        }, 3000);
      }
    } catch (error) {
      setIsEdit(false);
    }
  }

  return loading ? (
    <div className="flex justify-center items-center">
      <Spinner />
    </div>
  ) : error == null ? (
    <div className="my-8 w-11/12 md:w-4/5 lg:w-3/5 mx-auto">
      <Dialog
        show={showDialog}
        setShow={setShowDialog}
        title={"Alert"}
        children={
          <div className="flex justify-center items-center">
            <p>{dialogMessage}</p>
          </div>
        }
      />
      {/* Header */}
      <h1 className="font-sans text-arma-dark-blue font-semibold text-xl md:text-4xl inline-block  mt-2">
        {eventName} - Event Details
        {!isEdit && (
          <Edit
            className="ml-3 text-black !text-xl md:!text-3xl cursor-pointer"
            onClick={() => {
              setIsEdit(true);
            }}
          />
        )}
      </h1>

      <div className="mx-auto mt-12 flex flex-col ">
        {/* First Row */}
        <div className="mb-8">
          <div className="flex items-center">
            <h1 className="text-gray-500 text-md md:text-xl">
              Event Description
            </h1>
            <span className="material-icons text-arma-blue ml-3">help</span>
          </div>

          <textarea
            className="bg-white border border-solid shadow-xl w-full min-h-max outline-none rounded-2xl border-white mt-3 p-6 h-fit text-xs md:text-sm"
            rows={5}
            value={desc}
            disabled={!isEdit}
            onChange={(e: any) => {
              setDesc(e.target.value);
            }}
          ></textarea>
        </div>

        {/* Second Row */}
        <div className="flex flex-col lg:flex-row gap-8 w-full justify-start items-start">
          {/* -1- */}

          <div className="w-full">
            <div className="flex items-center w-full">
              <h1 className="text-gray-500 text-md md:text-xl">SAC Comments</h1>
              <span className="material-icons ml-3 text-arma-blue">
                feedback
              </span>
            </div>

            <div className="bg-white border shadow-xl border-solid rounded-2xl pointer-events-none border-white mt-3 p-6 h-fit text-xs md:text-sm">
              {sacComments.length > 0 ? (
                <p className="w-full text-justify">{sacComments}</p>
              ) : (
                <p className="w-full text-justify text-teal-600">No Comments</p>
              )}
            </div>
          </div>

          {/* -2- */}
          <div className="flex flex-col md:flex-row  w-full  justify-center">
            <div className="">
              <div className="flex w-max">
                <h1 className="text-gray-500 text-md md:text-xl ">
                  Event Proposal Document
                </h1>
                <span className="material-icons text-arma-blue ml-3">
                  library_books
                </span>
              </div>

              <div className="flex p-5  text-xs md:text-sm  justify-start">
                <div className="flex flex-col items-start gap-4 ">
                  <span className="text-xs md:text-md  text-gray-400">
                    {isEdit ? "upload New Document" : "download the document"}
                  </span>
                  {isEdit ? (
                    <label
                      className={`rounded-[8px] hover:bg-slate-500/10 !cursor-pointer px-20 py-4 outline-dashed outline-gray-500 ${
                        isEdit ? "cursor-pointer" : "pointer-events-none"
                      }`}
                    >
                      <CloudUploadTwoTone className="!w-16 !h-16 text-arma-blue justify-auto" />
                      <input
                        id="file-upload"
                        accept="application/pdf"
                        value={fileName}
                        disabled={!isEdit}
                        onChange={(e: any) => {
                          // console.log(e.target.files[0].size);
                          setPdf1(e.target.files[0]);
                        }}
                        className="hidden"
                        type="file"
                      ></input>
                    </label>
                  ) : (
                    <a
                      className="flex flex-col 
                    rounded-[8px] hover:bg-slate-500/10 
                    !cursor-pointer px-20 py-4 outline-dashed outline-gray-500"
                      onClick={async function () {
                        let result;
                        try {
                          result = await axios({
                            responseType: "blob",
                            method: "GET",
                            url: `${process.env.REACT_APP_SERVER_URL}events/getEventDocument/${state.eventId}`,
                          });
                        } catch (error) {
                          console.log("Failed");
                        }
                        console.log(result);
                        const url = window.URL.createObjectURL(
                          new Blob([result.data])
                        );
                        const link = document.createElement("a");
                        link.href = url;
                        link.setAttribute("download", "eventProposalDoc.pdf"); //or any other extension
                        document.body.appendChild(link);
                        link.click();
                      }}
                      download
                    >
                      <CloudDownloadOutlined className="!w-16 !h-16 text-arma-blue justify-auto" />
                    </a>
                  )}
                  {pdf1 && <p className="m-0 p-0 truncate">{pdf1.name}</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Button */}
      <div className="flex mt-10">
        {isEdit && (
          <button
            className="btn text-lg border-lg  bg-arma-title rounded-[8px] px-6 py-2 m-auto"
            onClick={() => updateEventDetails()}
          >
            UPDATE
          </button>
        )}
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center">{error}</div>
  );
};
export default UpdateEventDetails;
