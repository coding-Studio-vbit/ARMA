import { InfoOutlined } from "@material-ui/icons";
import { useEffect, useState } from "react";
import axios from "../../../utils/axios";

//redux imports
import { useDispatch, useSelector } from "react-redux";
import { UpdateDatesState } from "../../../redux/actions";
import { RootState } from "../../../redux/reducers";

interface SelectedHallsProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  hallsData: string[];
}

const SelectHalls = (props: SelectedHallsProps) => {
  //redux
  const eventDates = useSelector((state: RootState) => state.eventDates);
  const dispatch = useDispatch();

  const halls = props.hallsData;
  const key = useSelector((state: RootState) => state.selectedDate);
  const reservedDate = useSelector((state: RootState) => state.reservations);
  const reservations =
    useSelector((state: RootState) => state.reservations) || {};
  const eventHalls =
    Object.keys(eventDates).length === 0 ? [] : eventDates[key].halls;
  console.log(reservations);
  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}halls/getSlots`, {
        date: reservedDate,
      })
      .then(async (response) => {
        console.log(response);
      });
  }, [reservedDate]);

  const addHalls = (hall) => {
    var arr = eventHalls;
    if (eventHalls.includes(hall)) {
      var index = arr.indexOf(hall);
      arr.splice(index, 1);
    } else arr.push(hall);
    console.log(arr);
    if (arr.length === 0) {
      dispatch(UpdateDatesState(key, []));
    } else {
      dispatch(UpdateDatesState(key, [...arr]));
    }
  };

  const HallsList = (halls: string[]) =>
    halls.map((hall: string) => {
      return (
        <div className="mb-4">
          <div className="w-3/4 m-auto text-center pb-1 mb-4 border-b-2 border-b-gray">
            {hall}
            <InfoOutlined className="ml-2" />
          </div>
          <div className="flex">
            <button
              className={
                reservations[hall.toUpperCase()] &&
                reservations[hall.toUpperCase()].includes("morning")
                  ? "flex text-gray-100 px-8 mb-2 mx-2 rounded border border-gray cursor-default"
                  : eventHalls.includes("morning." + hall)
                  ? "flex px-8 mb-2 mx-2 rounded border border-[#139beb] bg-[#139beb] text-white cursor-pointer"
                  : "flex text-gray-500 px-8 mb-2 mx-2 rounded border border-[#139beb] hover:bg-[#139beb] hover:text-white cursor-pointer"
              }
              onClick={() => {
                if (
                  reservations[hall.toUpperCase()] &&
                  !reservations[hall.toUpperCase()].includes("morning")
                )
                  addHalls("morning." + hall);
              }}
            >
              <div className="">Morning</div>
            </button>
            <button
              className={
                reservations[hall.toUpperCase()] &&
                reservations[hall.toUpperCase()].includes("afternoon")
                  ? "flex text-gray-100 px-8 mb-2 mx-2 rounded border border-gray cursor-default"
                  : eventHalls.includes("afternoon." + hall)
                  ? "flex px-8 mb-2 mx-2 rounded border border-[#139beb] bg-[#139beb] text-white cursor-pointer"
                  : "flex text-gray-500 px-8 mb-2 mx-2 rounded border border-[#139beb] hover:bg-[#139beb] hover:text-white cursor-pointer"
              }
              onClick={() => {
                if (
                  reservations[hall.toUpperCase()] &&
                  !reservations[hall.toUpperCase()].includes("afternoon")
                )
                  addHalls("afternoon." + hall);
              }}
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
            onClick={() => {
              props.setShow(false);
            }}
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
