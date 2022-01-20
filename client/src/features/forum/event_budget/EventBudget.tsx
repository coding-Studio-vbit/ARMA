import {  CloudUploadTwoTone, Feedback } from "@material-ui/icons";

export default function EventBudget() {
  return (
    <div className="flex flex-col ">
      <h1 className="sm:text-2xl text-xl font-semibold mx-auto text-arma-dark-blue mb-8">
        Event Name - Budget
      </h1>
      <div className="flex flex-col items-center  sm:mx-auto ">
        <div className="flex flex-col max-w-[80%] w-[600px]">
          <div className="flex">
            <span>FO Comments</span>
            <Feedback />
          </div>
          <div className="p-2 rounded-xl shadow-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
            odio repellendus quidem? Odit totam optio recusandae cupiditate ea
            distinctio iste, dolorum placeat voluptates adipisci repudiandae
            esse velit nobis itaque architecto!
          </div>
        </div>
        <div className="flex   mt-8  flex-col  gap-4">
          <span className=" text-lg lg:text-xl text-gray-600">
            Event Budget
          </span>
          <label className="rounded-[8px] flex justify-center hover:bg-slate-500/10 !cursor-pointer  px-20 py-10  lg:px-24 lg:py-14 outline-dashed outline-gray-500">
            <CloudUploadTwoTone className="!w-20  !h-20 mx-auto  text-arma-blue " />

            <input
              id="file-upload"
              accept="application/pdf"
              onChange={(e: any) => {
                console.log(e.target.files[0].size);

                //   setPdf2(e.target.files[0]);
              }}
              className="hidden"
              type="file"
            ></input>
          </label>
          {/* {pdf2 && <p className="m-0 p-0 truncate">{pdf2.name}</p>} */}
        </div>
      </div>
    </div>
  );
}
