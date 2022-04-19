import React, { ReactElement, useState, useEffect, useRef } from "react";
import {
  ArrowBackIos,
  ArrowDownward,
  ArrowForwardIos,
  ArrowUpward,
} from "@material-ui/icons";
import axiosInstance from "../utils/axios";

interface header {
  displayName: string; //Display header name
  dataPath: string; //property path
  sortable: boolean; //sortable or not
}

interface TableProps {
  api: string;
  rowsPerPage: number;
  buttonsCount: number;
  headers: Array<header>;
  filter?: any;
  onTableRowClick?: (id: string) => void;
  transformer?: (
    item: any,
    i: number,
    setUpdate: React.Dispatch<React.SetStateAction<boolean>>
  ) => any;
}

interface sortButtonProps {
  callBack: (arg0: any) => any;
}

const getValueFromPath = (object: any, path: string): any => {
  let current = object;
  path.split(".").forEach((property) => {
    if (current.hasOwnProperty(property)) {
      current = current[property];
    } else {
      throw new Error(`Property ${property} does not exist in the object!`);
    }
  });
  return current;
};

const SortButton = ({ callBack }: sortButtonProps) => {
  const [order, setOrder] = useState(false);
  return (
    <button
      onClick={() => {
        setOrder(!order);
        callBack(order);
      }}
    >
      {order ? (
        <ArrowDownward fontSize="small" />
      ) : (
        <ArrowUpward fontSize="small" />
      )}
    </button>
  );
};

const Table = React.memo(
  ({
    api,
    rowsPerPage,
    buttonsCount,
    headers,
    filter,
    onTableRowClick,
    transformer,
  }: TableProps): ReactElement => {
    const [data, setData] = useState([]);
    const [orderBy, setOrderBy] = useState<string | null>(null);
    const [order, setOrder] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = useRef(0);
    ///For forcefully updating the table
    const [update, setUpdate] = useState<boolean>(false);
    //every time some filter is changed, reset the page number.
    useEffect(() => {
      setCurrentPage(1);
    }, [filter]);

    useEffect(() => {
      //params object.
      let params = {
        page: currentPage,
        limit: rowsPerPage,
        orderBy: orderBy,
        order: order,
        filter: null,
      };

      //Adding the filter
      params = { ...params, ...filter };

      axiosInstance
        .get(api, {
          params: params,
        })
        .then((response) => {
          let newData = response.data.response.data;
          console.log(response)
          totalPages.current = Math.ceil(
            response.data.response.total / rowsPerPage
          );

          //The transformer function is called on each object of the response.
          if (transformer) {
            //console.log("Before transformer: ", newData);
            newData = newData.map((v: any, i: number) =>
              transformer(v, i, setUpdate)
            );
            //console.log("After transformer: ", newData);
          }

          setData(newData);
        })
        .catch((error) => {
          console.log(error);
        });
    }, [currentPage, rowsPerPage, order, orderBy, filter, api, update]);

    const nextPage = () => {
      if (currentPage < totalPages.current) setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
      if (currentPage !== 1) setCurrentPage(currentPage - 1);
    };
    const currentPageButtons = () => {
      if (totalPages.current === 1) return [];
      let slice = Math.ceil(currentPage / buttonsCount);
      let buttonList = [];
      for (
        let i = buttonsCount * (slice - 1) + 1;
        i <= buttonsCount * slice && i <= totalPages.current;
        i++
      )
        buttonList.push(
          <button
            key={i}
            className={`px-3 py-1 text-sm text-white rounded-full ${
              i === currentPage ? "bg-red-500" : "bg-arma-blue"
            }`}
            onClick={() => {
              setCurrentPage(i);
            }}
          >
            {i}
          </button>
        );
      return buttonList;
    };

    return (
      <>
        <div className="w-full border-2 shadow-md  rounded-[16px] overflow-x-auto ">
          <table className="w-full ">
            <thead className="bg-white border-b-2 rounded-[8px] border-black/30  ">
              <tr className="rounded-[16px]">
                {headers.map((header) => {
                  return (
                    <th
                      key={header.displayName}
                      scope="col"
                      className="px-6 py-3 text-center font-medium text-arma-dark-blue uppercase tracking-wider"
                    >
                      {header.displayName}
                      {header.sortable ? (
                        <SortButton
                          callBack={(order: boolean) => {
                            setOrderBy(header.dataPath);
                            setOrder(order ? "asc" : "desc");
                          }}
                        />
                      ) : null}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-300">
              {data?.map((item: any, index) => {
                return (
                  <tr
                    key={index}
                    className="odd:bg-white even:bg-arma-light-gray cursor-pointer hover:bg-black/[0.075]"
                    onClick={() => {
                      if (onTableRowClick) {
                        onTableRowClick(item._id);
                      }
                    }}
                  >
                    {headers.map((header) => {
                      return (
                        <td
                          key={header.displayName}
                          className=" px-6 py-4 text-center whitespace-nowrap"
                        >
                          {getValueFromPath(item, header.dataPath)}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div
          id="paginationButtonsSection"
          className=" mx-auto justify-center items-center my-8 flex gap-2  "
        >
          {currentPage > buttonsCount && (
            <ArrowBackIos
              onClick={prevPage}
              className="cursor-pointer p-2 text-arma-dark-blue bg-white !text-[2rem]"
            />
          )}
          {currentPageButtons()}
          {currentPage <=
            (Math.ceil(totalPages.current / buttonsCount) - 1) *
              buttonsCount && (
            <ArrowForwardIos
              onClick={nextPage}
              className="cursor-pointer p-2 text-arma-dark-blue !text-[2rem] "
            />
          )}
        </div>
      </>
    );
  }
);

export default Table;
