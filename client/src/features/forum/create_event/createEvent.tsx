import Navbar from "../../../components/CustomNavbar";
import { useState } from "react";
import {
    CloudUploadTwoTone,
  } from "@material-ui/icons";
import ToggleSwitch from "../../../components/CustomToggleSwitch";
const CreateEvent =()=>{
    const [pdf1, setPdf1] = useState<File>();
    const [pdf2, setPdf2] = useState<File>();
    const [budget,setBudget]=useState(false);
    return(
        <div className="mb-10">
            <Navbar navItems={[]}  />
            <div>
                <span className="material-icons mt-10 ml-2 md:ml-6 justify-between">chevron_left</span>
                <h1 className="font-sans justify-between text-arma-dark-blue font-semibold text-2xl md:text-4xl inline-block ml-4 md:ml-24">Create Event</h1>    
            </div>
            <div className="ml-12 md:ml-36 mt-2">
                <form action="post">
                    <label htmlFor="eventName" className="form-label inline-block mb-2 text-lg md:text-xl text-gray-600 mt-4">Event Name</label>
                    <input
                    type="text"
                    className="
                        form-control
                        block
                        w-3/4
                        h-6
                        px-3
                        py-1.5
                        text-sm
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding
                        border border-solid border-gray-500
                        rounded-full
                        transition
                        ease-in-out
                        m-0
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                        required
                    "
                    id="eventName"
                    placeholder="Code Craft 3.0"
                    />
                    <label htmlFor="description" className="form-label inline-block mb-2 text-lg md:text-xl text-gray-600 mt-4">Description</label>
                    <textarea
                    className="
                        form-control
                        block
                        w-3/4
                        h-32
                        px-3
                        py-1.5
                        text-sm
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding
                        border border-solid border-gray-500
                        rounded
                        transition
                        ease-in-out
                        m-0
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                    "
                    id="description"
                    placeholder="codeCraft is the flagship event conducted by coding.Studio( ); every year that aims to rmote competitive programming culture in our college. "
                    />
                    <div className="md:flex mt-5 justify-center">
                        <div className="flex flex-col items-start gap-4 md:w-1/3">                    
                            <span className="text-lg md:text-xl text-gray-600">Event Description Document</span>
                            <label className="rounded-[8px] hover:bg-slate-500/10 !cursor-pointer px-12 py-6 outline-dashed outline-gray-500">
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
                        <div className="flex flex-col items-start gap-4 md:w-1/3">
                            <div className="flex mt-5 md:mt-0">  
                                <ToggleSwitch isEnabled={budget} toggleSwitch={setBudget}  />
                                <span className="text-lg md:text-xl text-gray-600">Event Budget</span>

                            </div>
                            {budget && <label className="md:ml-12 rounded-[8px] hover:bg-slate-500/10 !cursor-pointer px-12 py-6 outline-dashed outline-gray-500">
                            <CloudUploadTwoTone className="!w-16 !h-16 text-arma-blue justify-center" />

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
                            }
                            {pdf2 && <p className="m-0 p-0 truncate">{pdf2.name}</p>}
                        </div>
                    </div>
                    <div className=" flex space-x-2 justify-center mt-10"><button className="btn">Create</button></div>
                </form>
            </div>
        </div>
    )
}
            
export default CreateEvent;