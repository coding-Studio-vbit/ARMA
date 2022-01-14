import Navbar from "../../../components/CustomNavbar";
import { useState } from "react";
import {
    CloudUploadTwoTone,
  } from "@material-ui/icons";
const UpdateEventDetails=()=>{
    const [pdf1, setPdf1] = useState<File>();
    const [desc,setDesc]=useState("codeCraft is the flagship event conducted by coding.Studio( ); every year that aims to rmote competitive programming culture in our college. ")
    return(
        <div className="bg-gray-400 h-full mb-10">
            <Navbar navItems={[]}  />
            <h1 className="mt-28 text-arma-dark-blue font-semibold text-xl md:text-4xl inline-block ml-4 md:ml-28 ">c.S(); SoC - Event Details</h1>    
            <div className="mx-4 md:mx-28 mt-4 md:mt-8">
                <div>
                    <div className="flex">
                        <h1 className="text-gray-500 text-md md:text-xl">Event Description</h1>
                        <span className="material-icons text-arma-blue ml-3">help</span>
                    </div>
                    <div className="bg-white border border-solid rounded-2xl border-white mt-3 p-5 w-5/6 text-xs md:text-sm">
                        {/* <p className="text-justify">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos doloribus corrupti quod nostrum eius distinctio consequuntur, et inventore tenetur cum ipsum accusantium sapiente dolor magni voluptates excepturi non impedit nihil.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis voluptates at perspiciatis aperiam alias consectetur ex? Eos culpa rem ipsa ducimus accusamus mollitia laudantium. Quibusdam corrupti ullam omnis cupiditate maiores.
                        </p> */}
                        <textarea value={desc} onChange={(e)=>{setDesc(e.target.value)}} className="" />
                    </div>
                </div>
                <div className="md:flex md:flex-col-2 justify-evenly ">
                    <div className="md:w-1/2 md:mr-2  mt-6 md:mt-12">
                        <div className="flex md:justify-center">
                            <h1 className="text-gray-500 text-md md:text-xl">SAC Comments</h1>
                            <span className="material-icons ml-3 text-arma-blue">feedback</span>
                        </div>
                        <div className="bg-white border border-solid rounded-2xl border-white mt-3 p-5 h-fit text-xs md:text-sm">
                            <p className="text-justify">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis voluptates at perspiciatis aperiam alias consectetur ex? Eos culpa rem ipsa ducimus accusamus mollitia laudantium. Quibusdam corrupti ullam omnis cupiditate maiores.
                            </p>
                        </div>
                    </div>
                    <div className="md:w-1/2 md:ml-2  mt-6 md:mt-12">
                        <div className="flex md:justify-center">
                            <h1 className="text-gray-500 text-md md:text-xl ">Event Proposal Document</h1>
                            <span className="material-icons text-arma-blue ml-3">library_books</span>
                        </div>
                        <div className="flex p-5 h-fit text-xs md:text-sm  justify-center">
                            <div className="flex flex-col items-start gap-4 md:w-1/3 ">                    
                                <span className="text-xs md:text-md  text-gray-400">Upload New Document</span>
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
                        </div>                        
                    </div>
                </div>
                <div className=" flex space-x-2 justify-center mt-10 text-sm md:text-md "><button className="btn" onClick={()=>{console.log(desc)}}>Update</button></div>
            </div>
        </div>
    )
}
export default UpdateEventDetails;