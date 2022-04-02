export default function StudentReport() {
  return (
    <div className="h-[3508px] w-[2480px] p-[5rem]">
      <div className="border-4 border-black w-full h-full flex flex-col">
        <div className="flex  border-black w-full  ">
          <div className="flex flex-col w-[70%]">
            <div className="text-[4rem] border-b-4 border-black  py-[1rem]  w-full   pl-[3.5rem]">
              Student Details
            </div>
            <div className="flex  text-[3.5rem]  py-[2rem]   pl-[3.5rem] gap-[10rem] w-full border-b-4 border-black">
              <div className="flex flex-col">
                <span>Roll Number</span>
                <span>Full Name</span>
                <span>Department</span>
                <span>Year</span>
                <span>Contact</span>
              </div>
              <div className="flex flex-col">
                <span>18P61A0512</span>
                <span>Revanth Ark</span>
                <span>CSE A</span>
                <span>3-2</span>
                <span>97054146767</span>
              </div>
            </div>
          </div>
          <div className="flex border-b-4 grow border-l-4 border-black justify-center items-center flex-col text-[4rem]">
            <span className="p">Events Participated</span>
            <span className="text-[4rem]">3</span>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-[4rem] border-b-4 border-black  py-[1rem]  w-full   pl-[3.5rem]" >Memberships</div>
        </div>
        <table className="text-[4rem] " >
          <thead className="border-b-2 border-black" >
            <th className="p-4 border-r-2 border-black"  >S.No</th>
            <th className="p-4 border-r-2 border-black" >Forum Name</th>
            <th className="p-4 border-black">Role</th>

          </thead>
          <tr className="border-b-2 border-black" >
            <td className="text-center py-[2rem] border-r-2 border-black" >1</td>
            <td className="text-center py-[2rem] border-r-2 border-black"  >Coding Studio</td>
            <td className="text-center py-[2rem] border-black" >SDE#3</td>

          </tr>

        </table>
      </div>
    </div>
  );
}
