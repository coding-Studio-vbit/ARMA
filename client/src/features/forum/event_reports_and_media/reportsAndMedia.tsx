import { useLocation, useNavigate } from "react-router-dom";
import {
  Assignment,
  Close,
  CloudUploadTwoTone,
  Image,
} from "@material-ui/icons";
import { FC, useState } from "react";
import { uploadReportAndMedia } from "../../../services/events/event";
import { Spinner } from "../../../components/Spinner/Spinner";
import { Dialog } from "../../../components/Dialog/Dialog";
///Only UI
export const ReportAndMedia = () => {
  const location: any = useLocation();
  const eventID: any = location.state.eventId ?? "61da9c41ee32a8e65373fcc4";
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [images, setImages] = useState<{ imageUrl: string; image: File }[]>([]);
  const [pdf, setPdf] = useState<File>();
  return (
    <div className="flex flex-col mt-8 md:px-[10%] px-[5%]">
      <span className="text-arma-title mb-12 text-3xl md:text-left text-center">
        {"Report & Media"}
      </span>
      <div className="text-gray-400 text-xs mx-auto w-max mb-4">
        *The event report and media can be sent only once the event is
        completed. <br/>These attachments will be used to write about your event in the VBIT website.{" "}
      </div>
      <div className="flex text-center w-[80%] flex-wrap mx-auto justify-center  gap-x-24 gap-y-12 ">
        <EventReport pdf={pdf} setPdf={setPdf} />
        <EventImages images={images} setImages={setImages} />
      </div>
      <div className="flex gap-6 md:gap-x-12 mt-12 flex-wrap  mx-auto justify-center overflow-hidden">
        {images.map((v, i) => {
          return (
            <div
              key={v.imageUrl}
              className="relative grow max-h-[300px]   rounded-[2em] shrink basis-[150px]  sm:basis-[30%] overflow-hidden   "
            >
              <img
                className="w-full h-full rounded-[2em] object-cover transition-all hover:scale-110 	"
                src={v.imageUrl}
                alt="Event images"
              />
              <Close
                className="absolute cursor-pointer hover:bg-red-500  !text-3xl p-1 bg-red-400 rounded-full right-[0.3em] top-[0.3em]"
                onClick={() => {
                  let l = [...images];
                  l.splice(i, 1);
                  setImages(l);
                }}
              />
            </div>
          );
        })}
      </div>
      <Dialog show={show} setShow={setShow} title={error}>
        <button
          className="btn"
          onClick={() => {
            navigate(-1);
          }}
        >
          Okay
        </button>
      </Dialog>
      <span className={`mt-8 text-center mb-2 h-6 text-red-600  `}>
        {" "}
        {error}
      </span>
      {loading ? (
        <Spinner className="mx-auto mb-8 " />
      ) : (
        <button
          onClick={async () => {
            if (!pdf || images.length === 0) {
              setError("Please upload files");
            } else {
              setError("");
              setLoading(true);
              const res = await uploadReportAndMedia(eventID, pdf, images);
              if (res.status === 1) {
                setError("Files uploaded successfully");
              } else {
                setError(res.response);
              }
              setShow(true);

              setLoading(false);
            }
          }}
          className="btn mx-auto mb-8 "
        >
          {" "}
          Upload{" "}
        </button>
      )}
    </div>
  );
};

const EventReport: FC<{
  pdf: File | undefined;
  setPdf: React.Dispatch<React.SetStateAction<File | undefined>>;
}> = ({ setPdf, pdf }) => {
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);

  return (
    <div className="flex flex-col items-center gap-4">
      <Dialog show={show} setShow={setShow} title={error} />
      <div className="flex align-middle gap-1 items-center">
        <span className="text-2xl">Event Report </span>
        <Assignment className="text-black" />
      </div>
      <span>Upload new document</span>
      <label className="rounded-[8px] hover:bg-slate-500/10 !cursor-pointer px-20 py-6 outline-dashed outline-arma-dark-blue ">
        <CloudUploadTwoTone className="!w-16 !h-16 text-arma-blue" />

        <input
          id="file-upload"
          accept="application/pdf"
          onChange={(e: any) => {
            if (e.target.files[0].size > Math.pow(10, 6) * 10) {
              setError(
                "File size of event document cannot be greater than 10 MB"
              );
              setShow(true);
              setPdf(null);
            } else setPdf(e.target.files[0]);
          }}
          className="hidden"
          type="file"
        ></input>
      </label>
      <p className="m-0 p-0 truncate text-arma-gray text-[14px]">
        {pdf?.name ?? "You can select one document"}
      </p>
    </div>
  );
};

const EventImages: FC<{
  images: { imageUrl: string; image: File }[];
  setImages: React.Dispatch<
    React.SetStateAction<
      {
        imageUrl: string;
        image: File;
      }[]
    >
  >;
}> = ({ images, setImages }) => {
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  return (
    <div className="flex flex-col items-center gap-4">
      <Dialog show={show} setShow={setShow} title={error} />
      <div className="flex align-middle gap-1 items-center">
        <span className="text-2xl">Event Images </span>
        <Image />
      </div>
      <span>Upload new Image</span>
      <label className="rounded-[8px] hover:bg-slate-500/10 !cursor-pointer px-20 py-6 outline-dashed outline-arma-dark-blue ">
        <CloudUploadTwoTone className="!w-16 !h-16 text-arma-blue" />

        <input
          id="file-upload"
          accept="image/*"
          className="file-upload hidden"
          onChange={(e: any) => {
            console.log(e.target.files[0]);
            if (e.target.files[0].type.substring(0, 5) !== "image") {
              setError("You can only upload images.");
              setShow(true);
            } else if (images.length < 10)
              setImages([
                ...images,
                {
                  imageUrl: URL.createObjectURL(e.target.files[0]),
                  image: e.target.files[0],
                },
              ]);
          }}
          type="file"
        ></input>
      </label>
      <p className="m-0 p-0 truncate text-arma-gray text-[14px] ">
        You can add upto 10 images only
      </p>
    </div>
  );
};
