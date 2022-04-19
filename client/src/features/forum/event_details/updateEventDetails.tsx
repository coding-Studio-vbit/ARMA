import { useState } from "react";
import { CloudUploadTwoTone, Edit } from "@material-ui/icons";
const UpdateEventDetails = () => {
  const [pdf1, setPdf1] = useState<File>();
  const [isEdit, setIsEdit] = useState(false);
  const [desc, setDesc] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
  );
  return (
    <div className="my-8 ">
      <h1 className="font-sans text-arma-dark-blue font-semibold text-xl md:text-4xl inline-block ml-4 md:ml-28 mt-2">
        c.S(); SoC - Event Details
        {!isEdit && (
          <Edit
            className="ml-3 text-black !text-xl md:!text-3xl cursor-pointer"
            onClick={() => {
              setIsEdit(true);
            }}
          />
        )}
      </h1>
      <div className="mx-auto mt-12 w-[85%] sm:w-[70%] flex flex-col ">
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
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-24 w-full justify-items-center items-center">
          <div className=" ">
            <div className="flex items-center w-full  ">
              <h1 className="text-gray-500 text-md md:text-xl">SAC Comments</h1>
              <span className="material-icons ml-3 text-arma-blue">
                feedback
              </span>
            </div>
            <div className="bg-white border shadow-xl border-solid rounded-2xl pointer-events-none border-white mt-3 p-6 h-fit text-xs md:text-sm">
              <p className="w-full text-justify">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Officiis voluptates at perspiciatis aperiam alias consectetur
                ex? Eos culpa rem ipsa ducimus accusamus mollitia laudantium.
                Quibusdam corrupti ullam omnis cupiditate maiores.
              </p>
            </div>
          </div>
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
              <div className="flex p-5  text-xs md:text-sm  justify-center">
                <div className="flex flex-col items-center gap-4 ">
                  <span className="text-xs md:text-md  text-gray-400">
                    Upload New Document
                  </span>
                  <label
                    className={`rounded-[8px] hover:bg-slate-500/10 !cursor-pointer px-20 py-4 outline-dashed outline-gray-500 ${
                      isEdit ? "cursor-pointer" : "pointer-events-none"
                    }`}
                  >
                    <CloudUploadTwoTone className="!w-16 !h-16 text-arma-blue justify-auto" />
                    <input
                      id="file-upload"
                      accept="application/pdf"
                      disabled={!isEdit}
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
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex">
        {isEdit && (
          <button
            className="btn  bg-arma-title rounded-[8px] px-6 py-2 m-auto"
            onClick={() => setIsEdit(false)}
          >
            Update
          </button>
        )}
      </div>
    </div>
  );
};
export default UpdateEventDetails;
