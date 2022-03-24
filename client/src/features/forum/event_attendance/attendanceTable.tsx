const Attendance = (props) =>{
    
    const {tableData,studentPresence,setStudentPresence,tableHeader,eventDates} = props
    
    return(
        <div className="w-full border-2 shadow-md  rounded-[16px] overflow-x-auto ">
            <table className="w-full " id = "attendTable">
                <thead className="bg-white border-b-2 rounded-[8px] border-black/30 ">
                    <tr className="rounded-[16px]">
                    {tableHeader.map((value)=>{
                        return (
                        <th key = {value} 
                            scope="col"
                            className="px-6 py-3 text-center font-medium text-arma-dark-blue uppercase tracking-wider">
                            {value}
                        </th>
                        )
                    })}
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-300 ">
                    {tableData.map((value, index)=>{
                        return (
                        <tr key = {index} className="odd:bg-white even:bg-arma-light-gray cursor-pointer hover:bg-black/[0.075] ">
                        <td className="px-6 py-4 text-center ">{value._id.name}</td>
                        <td className="px-6 py-4 text-center ">{value._id.rollNumber}</td>
                        <td className="px-6 py-4 text-center ">{value._id.branch}</td>
                        {eventDates.map((date)=>(
                            <td 
                            className="px-6 py-4 text-center"
                            key = {date}>
                            <input type="checkbox" 
                            className="w-7 h-7 rounded-none accent-[#0B5B8A] cursor-pointer"
                            name = {value._id._id} 
                            value = {date} 
                            checked =  {studentPresence[value._id._id].indexOf(date)>-1 }
                            onChange={(e)=>{
                               let newObj = studentPresence
                               if (e.target.checked){
                                newObj[e.target.name].push(e.target.value);
                                setStudentPresence({...studentPresence,...newObj})
                               }
                               else{
                                   let index = newObj[e.target.name].indexOf(e.target.value)
                                   newObj[e.target.name].splice(index,1)
                                   setStudentPresence({...studentPresence,...newObj})
                               }
                               console.log(studentPresence)
                            }}/></td>
                            
                        ))}
                       </tr>
                    )})}
                   
                   </tbody>
            </table>
        </div>
    )


}

export default Attendance



