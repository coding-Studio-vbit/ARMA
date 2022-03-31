import { Info } from "@material-ui/icons";
import { useState } from "react";

interface SelectedHallsProps {
  SelectedHalls: string[];
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const SelectHalls = (props: SelectedHallsProps) => {
  const [halls, setHalls] = useState([
    "chetana",
    "Sumedha",
    "Nalanda",
    "Prerana",
  ]);
  const [selectedHalls, setSelectedHalls] = useState(props.SelectedHalls);
  const addHalls = (hall) => {
    var sh = selectedHalls;
    if (selectedHalls.includes(hall)) {
      var index = sh.indexOf(hall);
      sh.splice(index, 1);
    } else sh.push(hall);
    setSelectedHalls([...sh]);
    console.log(selectedHalls);
  };
  const HallsList = (halls: string[]) =>
    halls.map((hall: string) => {
      return (
        <div className="mb-4">
          <div className="w-3/4 m-auto text-center pb-1 mb-4 border-b-2 border-b-gray">
            {hall}
            <Info className="ml-2" />
          </div>
          <div className="flex">
            <button
              className={
                selectedHalls.includes("morning." + hall)
                  ? "flex px-8 mb-2 mx-2 rounded border border-[#139beb] bg-[#139beb] text-white cursor-pointer"
                  : "flex text-gray-500 px-8 mb-2 mx-2 rounded border border-[#139beb] hover:bg-[#139beb] hover:text-white cursor-pointer"
              }
              onClick={() => addHalls("morning." + hall)}
            >
              <div className="">Morning</div>
            </button>
            <button
              className={
                selectedHalls.includes("afternoon." + hall)
                  ? "flex px-8 mb-2 rounded border border-[#139beb] bg-[#139beb] text-white cursor-pointer"
                  : "flex text-gray-500 px-8 mb-2 rounded border border-[#139beb] hover:bg-[#139beb] hover:text-white cursor-pointer"
              }
              onClick={() => addHalls("afternoon." + hall)}
            >
              <div className="">Afternoon</div>
            </button>
          </div>
        </div>
      );
    });
  if (props.show)
    return (
      <div
        className="bg-black/20 fixed top-0  w-full h-full flex bottom-0 left-0 right-0 z-20 justify-center place-content-center "
        onClick={() => {
          props.setShow(false);
        }}
      >
        <div
          className="p-6 max-w-[90%] rounded-[24px] absolu w-[400px] my-auto z-[15] bg-white flex flex-col items-center"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="flex flex-col md:flex-wrap md:flex-row md:px-16">
            {halls.length === 0 ? null : HallsList(halls)}
          </div>
          <button
            style={{
              padding: "0.3rem 2rem",
            }}
            onClick={() => props.setShow(false)}
            className="outlineBtn text-arma-blue border-[1px] rounded-[8px] mt-2 mb-2 px-[25px]"
          >
            Done
          </button>
        </div>
      </div>
    );
  else return <div></div>;
};
export { SelectHalls };
