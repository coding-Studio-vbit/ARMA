import { useState } from "react";
import { ChevronRightRounded, CloudUploadTwoTone } from "@material-ui/icons";
import ToggleSwitch from "../../../components/CustomToggleSwitch";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog } from "../../../components/Dialog/Dialog";
import { unstable_batchedUpdates } from "react-dom";
import { useNavigate } from "react-router-dom";

import { createEventDetails } from "../../../redux/actions";
import { useDispatch } from "react-redux";
import { createEvent } from "@testing-library/react";

const CreateEvent = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [pdf1, setPdf1] = useState<File>();
  const [pdf2, setPdf2] = useState<File>();
  const [budget, setBudget] = useState(false);
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  return (
    <div className="flex flex-col mx-6 sm:mx-8 md:mx-32 lg:mx-48 ">
      <div className="mt-8 mb-4 flex items-center">
        <h1 className=" font-poppins text-arma-dark-blue  text-2xl md:text-4xl">
          Create Event
        </h1>
      </div>

      <div className="flex flex-col md:pl-6 bg-gray-100 rounded-xl justify-center items-center w-full ">
        <div className="w-full flex flex-col my-6">
          <label
            htmlFor="eventName"
            className="form-label inline-block mb-2 text-lg md:text-xl  text-gray-600"
          >
            Event Name
          </label>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            className="
                        form-control
                        block
                        lg:w-3/4
                        shadow-md
                        h-6
                        px-4
                        py-6
                        outline-0
                        text-lg
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding
                        rounded-xl
                        transition
                        ease-in-out
                        m-0
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                        required
                    "
            id="eventName"
            placeholder="Enter event name here"
          />

          <label
            htmlFor="description"
            className="form-label mt-6 inline-block mb-2 text-lg md:text-xl  text-gray-600"
          >
            Description
          </label>
          <textarea
            onChange={(e) => setDesc(e.target.value)}
            className="
                        form-control
                        block
                        lg:w-3/4
                        h-32
                        px-4
                        shadow-md

                        py-3
                        mb-8
                        text-lg
                        outline-0
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding
                        rounded-xl
                        transition
                        ease-in-out
                        m-0
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                    "
            id="description"
            placeholder="Enter description here"
          />
          <div className="flex mt-8 sm:mt-0 items-center justify-center sm:justify-start">
            <span className="mr-4 text-lg lg:text-xl text-gray-600">
              Event Budget
            </span>
            <ToggleSwitch isEnabled={budget} toggleSwitch={setBudget} />
          </div>
          <div className="flex items-center sm:justify-start sm:items-start flex-col sm:flex-row mt-8 gap-4 md:gap-16 ">
            <div className="flex flex-col items-start gap-4  ">
              <span className="text-lg lg:text-xl text-gray-600">
                Event Description Document
              </span>
              <label className="rounded-[8px] hover:bg-slate-500/10 !cursor-pointer px-20 py-10 lg:px-24 lg:py-14  outline-dashed outline-gray-500">
                <CloudUploadTwoTone className="!w-20 !h-20 lg:!w-24 lg:!h-24 text-arma-blue justify-auto" />
                <input
                  id="file-upload"
                  accept="application/pdf"
                  onChange={(e: any) => {
                    console.log(e.target.files[0].size);

                    setPdf1(e.target.files[0]);
                  }}
                  className="hidden"
                  type="file"
                ></input>
              </label>
              {pdf1 && <p className="m-0 p-0 truncate">{pdf1.name}</p>}
            </div>

            <AnimatePresence initial={false} exitBeforeEnter>
              {budget && (
                <motion.div
                  initial={{ opacity: "0" }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.25 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="flex justify-start flex-col items-start gap-4 w-full">
                    <span className="mr-4 text-lg lg:text-xl text-gray-600">
                      Event Budget
                    </span>
                    <label className="rounded-[8px] hover:bg-slate-500/10 !cursor-pointer px-20 py-10 lg:px-24 lg:py-14 outline-dashed outline-gray-500">
                      <CloudUploadTwoTone className="!w-20 !h-20 lg:!w-24 lg:!h-24 text-arma-blue justify-center" />

                      <input
                        id="file-upload"
                        accept="application/pdf"
                        onChange={(e: any) => {
                          console.log(e.target.files[0].size);

                          setPdf2(e.target.files[0]);
                        }}
                        className="hidden"
                        type="file"
                      ></input>
                    </label>
                    {pdf2 && <p className="m-0 p-0 truncate">{pdf2.name}</p>}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <Dialog show={show} setShow={setShow} title={msg} />
      <div className="sm:w-4/4 flex sm:items-end mx-auto sm:mx-0">
        <button
          className="btn pr-2 text-xl ml-auto my-8"
          onClick={() => {
            if (name.length < 3) {
              unstable_batchedUpdates(() => {
                setShow(true);
                setMsg("Event name must be atleast 3 characters");
              });
            } else if (desc.length < 20) {
              unstable_batchedUpdates(() => {
                setShow(true);
                setMsg("Description must be atleast 20 characters");
              });
            } else if (!pdf1) {
              unstable_batchedUpdates(() => {
                setShow(true);
                setMsg("Please provide an event description document");
              });
            } else if (budget && !pdf2) {
              unstable_batchedUpdates(() => {
                setShow(true);
                setMsg("Please provide a budget document.");
              });
            } else {
              dispatch(createEventDetails({ name, desc, pdf1, pdf2, budget }));
              navigate("/forum/createEvent/venue");
            }
          }}
        >
          NEXT
          <ChevronRightRounded fontSize="large"/>
        </button>
      </div>
    </div>
  );
};

export default CreateEvent;
