import { useState } from "react";
import {
    CloudUploadTwoTone, Edit,
  } from "@material-ui/icons";
const UpdateEventDetails=()=>{
    const [pdf1, setPdf1] = useState<File>();
    const [isEdit, setIsedit] = useState(false);
    const [desc,setDesc]=useState("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat")
    const [comments,setComments]=useState("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat")
    return(
        <div className="bg-arma-page-background h-screen pt-12">
            <div className="pl-[10%]">
                <h1 className="text-arma-blue font-semibold text-xl md:text-4xl">
                    c.S(); SoC - Event Details
                    {!isEdit && (
                        <Edit
                        className="ml-3 text-black !text-xl cursor-pointer"
                        onClick={() => {
                          setIsedit(true);
                        }}
                      />
                    )}
                </h1>    
                <div className="mt-20">
                    <div className="mt-4 md:mt-8">
                        <div className="flex">
                            <h1 className="text-gray-500 text-md md:text-2xl">Event Description</h1>
                            <span className="material-icons text-arma-blue ml-3">help</span>
                        </div>
                        <textarea 
                            value={desc} name="desc" 
                            onChange={(e)=>{setDesc(e.target.value)}} 
                            disabled={!isEdit}
                            className="bg-white border border-solid rounded-2xl  border-white mt-3 p-5 h-36 w-5/6 no-scrollbar text-xs md:text-sm"
                        />
                    </div>
                    <div className="flex flex-col md:flex-row  ">
                        <div className="md:w-1/2 md:mr-2 mt-4 md:mt-8">
                            <div className="flex md:justify-center">
                                <h1 className="text-gray-500 text-md md:text-xl">SAC Comments</h1>
                                <span className="material-icons ml-3 text-arma-blue">feedback</span>
                            </div>
                            <textarea 
                            value={comments} name="comments" 
                            onChange={(e)=>{setComments(e.target.value)}} 
                            disabled={!isEdit}
                            className="bg-white border border-solid rounded-2xl border-white mt-3 p-5 h-36 w-5/6 no-scrollbar text-xs md:text-sm"
                            />
                        </div>
                        <div className="md:w-1/2 md:ml-2 mt-4 md:mt-8">
                            <div className="flex md:justify-center">
                                <h1 className="text-gray-500 text-md md:text-xl ">Event Proposal Document</h1>
                                <span className="material-icons text-arma-blue ml-3">library_books</span>
                            </div>
                            <div className="flex p-5  text-xs md:text-sm  justify-center">
                                <div className="flex flex-col items-center gap-4 md:w-1/3 ">                    
                                    <span className="text-xs md:text-md  text-gray-400">Upload New Document</span>
                                    <label className="rounded-[8px] hover:bg-slate-500/10 !cursor-pointer px-20 py-4 outline-dashed outline-gray-500">
                                    <CloudUploadTwoTone className="!w-16 !h-16 text-arma-blue justify-auto" />
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
                            </div>                        
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex">
                {isEdit && (
                        <button
                            className="btn  bg-arma-title rounded-[8px] px-6 py-2 m-auto"
                            onClick={() => setIsedit(false)}
                        >
                            Update
                        </button>
                    )}
            </div>
        </div>
    )
}
export default UpdateEventDetails;