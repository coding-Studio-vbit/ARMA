import { useLocation } from "react-router-dom";
import {
  AssignmentTwoTone,
  Close,
  CloudUploadTwoTone,
  ImageTwoTone,
} from "@material-ui/icons";
import { FC, useRef, useState } from "react";
///Only UI
export const ReportAndMedia = () => {
  const location = useLocation();
  const [images, setImages] = useState<{ imageUrl: string; image: File }[]>([]);
  const [pdf, setPdf] = useState<File>();
  return (
    <div className="flex flex-col mt-16 md:px-[10%] px-[5%]">
      <span className="text-arma-title mb-24 text-3xl md:text-left text-center">
        {"Report & Media"}
      </span>
      <div className="flex text-center w-[80%] flex-wrap mx-auto justify-center  gap-x-24 gap-y-12 ">
        <EventReport pdf={pdf} setPdf={setPdf} />
        <EventImages images={images} setImages={setImages} />
      </div>
      <div className="flex gap-6 md:gap-x-12 mt-12 flex-wrap  mx-auto justify-center overflow-hidden">
        {images.map((v, i) => {
          return (
            <div
              key={v.imageUrl}
              className="relative grow   rounded-[2em] shrink basis-[150px]  sm:basis-[30%] overflow-hidden   "
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
      <button className="btn mx-auto my-8 "> Upload </button>
    </div>
  );
};

const EventReport: FC<{
  pdf: File | undefined;
  setPdf: React.Dispatch<React.SetStateAction<File | undefined>>;
}> = ({ setPdf, pdf }) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex align-middle gap-1 items-center">
        <span className="text-2xl">Event Report </span>
        <AssignmentTwoTone />
      </div>
      <span>Upload new document</span>
      <label className="rounded-[8px] hover:bg-slate-500/10 !cursor-pointer px-12 py-6 outline-dashed outline-arma-dark-blue ">
        <CloudUploadTwoTone className="!w-16 !h-16 text-arma-blue" />

        <input
          id="file-upload"
          accept="application/pdf"
          onChange={(e: any) => {
            console.log(e.target.files[0].size);
            
            setPdf(e.target.files[0]);
          }}
          className="hidden"
          type="file"
        ></input>
      </label>
      {pdf && <p className="m-0 p-0 truncate	">{pdf.name}</p>}
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
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex align-middle gap-1 items-center">
        <span className="text-2xl">Event Images </span>
        <ImageTwoTone />
      </div>
      <span>Upload new Image</span>
      <label className="rounded-[8px] hover:bg-slate-500/10 !cursor-pointer px-12 py-6 outline-dashed outline-arma-dark-blue ">
        <CloudUploadTwoTone className="!w-16 !h-16 text-arma-blue" />

        <input
          id="file-upload"
          accept="image/*"
          className="file-upload hidden"
          onChange={(e: any) => {
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
    </div>
  );
};
