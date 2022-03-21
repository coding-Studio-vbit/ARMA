import { CloudDownload } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { Calendar } from "react-modern-calendar-datepicker";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Event } from "../../../interfaces/event";
import { Forum } from "../../../interfaces/user";
import { fetchEventById } from "../../../services/events/event";

export default function RequestsView() {
  const {id} = useParams()
  const {status,data:event,error} = useQuery<Event,Error>(['eventByID',id],()=>fetchEventById(id),{retry:false})
  
  if(status === 'loading'){
    return <p>loading</p>
  }
  if(status === 'error'){
    return <p>{error.message}</p>
  }

  
  const preselectedDays = [
    {
      year: 2019,
      month: 10,
      day: 2,
    },
    {
      year: 2019,
      month: 10,
      day: 15,
    },
    {
      year: 2019,
      month: 10,
      day: 30,
    },
  ];
  const facilities = ['speakers', 'mic', 'projector', 'chairs', 'router']
  return (
    <div className="lg:mx-[5rem] xl:mx-[10rem]  mx-8 mt-8 mb-8 flex flex-col gap-y-4">
      <div className="flex flex-col w-max ">
        <div className="break-words">
        <span className="text-arma-title sm:text-2xl text-lg font-semibold w-max">
          REQUEST TO CONDUCT : {event.name}
        </span>
        </div>
        <div className="flex justify-between">
          <span className="text-arma-gray text-md">{(event.forumID as Forum).name}</span>
          <span className="text-arma-gray text-md">{(event.forumID as Forum).facultyCoordinatorID.name}</span>
        </div>
      </div>
      <hr className=" bg-black/10 h-[1.55px]" />
      <div className="flex flex-col lg:flex-row gap-x-24">
        <div className="flex flex-col gap-4 mb-4" >

      <span className="text-arma-gray font-medium text-2xl ">Event Name</span>
      <div className="bg-white border-[1px] border-[#E5E5EA] py-3 px-6 rounded-[24px] max-w-[500px] break-words">
        <span>{event.name}</span>
      </div>
      <span className="text-arma-gray font-medium text-2xl ">Description</span>
      <div className="bg-white border-[1px] border-[#E5E5EA] py-3 px-6 rounded-[24px] max-w-[700px] break-words">
        <p >
          {event.description}
        </p>
      </div>

      <span className="text-arma-gray font-medium text-2xl ">Attachments</span>
      <div className="flex items-center gap-x-4">
        <div className="bg-white border-[1px] border-[#E5E5EA] py-3 px-6 rounded-[24px] max-w-[500px] break-words">
          <span>{event.eventProposalDocPath}</span>
          <span>{event.budgetDocPath}</span>

        </div>
        <CloudDownload className="cursor-pointer" />
      </div>
      </div>
            <div className="flex flex-col gap-8" >
            <span className="text-arma-gray font-medium text-2xl ">Event Dates</span>
      <Calendar value={preselectedDays} colorPrimary="#0047FF" shouldHighlightWeekends />
            </div>
      </div>
     

      <span className="text-arma-gray font-medium text-2xl ">Facilities</span>
      <div className="flex flex-wrap  w-[90%] sm:w-[70%]"> 
          {
              facilities.map((f)=>{  
                  return(
                 <div key={f} className="basis-[40%] shrink mb-2 text-md font-medium flex items-center">
                 <div className="mr-2 bg-arma-title w-[10px] h-[10px] rounded-full"></div>
                 <span key={f} >{f}</span>
                 </div>
                  ) 
              }) 
          }
      </div>
      <hr className=" bg-black/10 h-[1.55px]" />
      <div className ='flex gap-4 items-center'>
      <span className="text-arma-gray font-medium text-2xl ">Comments</span>
      <button className="btn">Request Changes</button>
      </div>
      <textarea name="comments" placeholder="Please write your comments here" className="outline-none sm:w-[100%] w-full border-[1px] border-[#E5E5EA] p-4 md:w-[60%] rounded-[8px] "></textarea>
      <div className="flex flex-wrap gap-4 xsm:justify-center mt-4 ">
          <button className="btn bg-arma-title basis-full xsm:basis-auto ">Approve Budget</button>
          <button className="btn-green ml-auto xsm:ml-0">Approve</button>
          <button className="btn-red mr-auto xsm:mr-0">Reject</button> 
      </div>  
    </div>
    
    
  );
}
