import React, { ReactElement, useState, useEffect, useRef } from "react";
import {
  ArrowBackIos,
  ArrowDownward,
  ArrowForwardIos,
  ArrowUpward,
} from "@material-ui/icons";
import axios from "../utils/axios";
import deepEqual from "../utils/DeepEqual";
import { Spinner } from "./Spinner/Spinner";

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
  if (!object) return "-";
  let current = object;
  const properties = path.split(".");
  for (const property of properties) {
    if (current && typeof current === "object" && property in current) {
      current = current[property];
    } else {
      return "-";
    }
  }
  return current ?? "-";
};

const SortButton = ({ callBack }: sortButtonProps) => {
  const [order, setOrder] = useState(false);
  return (
    <button
      type="button"
      className="p-1 ml-1 rounded hover:bg-gray-200 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none active:scale-95 transition-transform motion-reduce:transition-none disabled:opacity-50"
      aria-label={`Sort ${order ? "ascending" : "descending"}`}
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
    const [data, setData] = useState<any[]>([]);
    const [orderBy, setOrderBy] = useState<string | null>(null);
    const [order, setOrder] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState<boolean>(true);
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

      axios
        .get(api, {
          params: params,
        })
        .then((response) => {
          const resPayload = response.data?.response ?? response.data;
          let rawList = [];
          let totalCount = 0;
          if (Array.isArray(resPayload)) {
            rawList = resPayload;
            totalCount = resPayload.length;
          } else if (resPayload && typeof resPayload === "object") {
            rawList = Array.isArray(resPayload.data)
              ? resPayload.data
              : Array.isArray(resPayload.events)
              ? resPayload.events
              : [];
            totalCount = resPayload.total ?? rawList.length;
          }
          let newData = [...rawList];
          totalPages.current = Math.max(1, Math.ceil(totalCount / rowsPerPage));
          //The transformer function is called on each object of the response.
          if (transformer) {
            //console.log("Before transformer: ", newData);
            newData = newData.map((v: any, i: number) =>
              transformer(v, i, setUpdate)
            );
            //console.log("After transformer: ", newData);
          }

          setData(newData);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
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
              i === currentPage ? "bg-slate-900 text-white font-semibold shadow-sm" : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
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
        <div className="w-full border border-gray-200 shadow-sm rounded-lg overflow-x-auto bg-white">
          <table className="w-full">
            <thead className="bg-gray-50/80 border-b border-gray-200">
              <tr>
                {headers.map((header) => {
                  return (
                    <th
                      key={header.displayName}
                      scope="col"
                      className="px-6 py-3.5 text-left text-xs font-semibold text-gray-700 tracking-normal"
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
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={headers.length} className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Spinner className="w-8 h-8" />
                      <span className="text-xs text-gray-400 font-medium">Loading records…</span>
                    </div>
                  </td>
                </tr>
              ) : data && data.length > 0 ? (
                data.map((item: any, index) => {
                  return (
                    <tr
                      key={index}
                      className="odd:bg-white even:bg-gray-50/50 hover:bg-sky-50/40 cursor-pointer transition-colors motion-reduce:transition-none disabled:opacity-50"
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
                            className="px-6 py-3.5 text-left text-sm text-gray-800 whitespace-nowrap"
                          >
                            {getValueFromPath(item, header.dataPath)}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={headers.length} className="px-6 py-12 text-center text-gray-400 text-sm">
                    No records found.
                  </td>
                </tr>
              )}
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
  },
  (prev, next) => {
    return deepEqual(prev, next);
  }
);

export default Table;
