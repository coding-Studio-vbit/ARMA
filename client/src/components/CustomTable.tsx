import { ReactElement, useState, useEffect } from "react";
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
  transformer?: (item: any) => any;
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

const Table = ({
  api,
  rowsPerPage,
  buttonsCount,
  headers,
  filter,
  transformer,
}: TableProps): ReactElement => {

  const [data, setData] = useState([]);
  const [orderBy, setOrderBy] = useState<string | null>(null);
  const [order, setOrder] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  
  //every time some filter is changed, reset the page number.
  useEffect(()=>{
    setCurrentPage(1);
  }, [filter])

  useEffect(() => {

    //params object.
    let params = {
      page: currentPage,
      limit: rowsPerPage,
      orderBy: orderBy,
      order: order,
      filter:null
    };

    //Adding the filter
    params = {...params, ...filter};
    
    
    axiosInstance
      .get(api, {
        params: params
      })
      .then((response) => {
        let newData = response.data.response.data;
        setTotalPages(Math.ceil(response.data.response.total / rowsPerPage));

        //The transformer function is called on each object of the response.
        if (transformer) {
          newData = newData.map(transformer);
        }
        console.log(response.data);
        
        setData(newData);
      })
      .catch((error) => {
        console.log(error);
        
        console.log(error.response.message);
      });
  }, [currentPage, totalPages, rowsPerPage, order, orderBy,filter]);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };
  const currentPageButtons = () => {
    let slice = Math.ceil(currentPage / buttonsCount);
    let buttonList = [];
    for (
      let i = buttonsCount * (slice - 1) + 1;
      i <= buttonsCount * slice && i <= totalPages;
      i++
    )
      buttonList.push(
        <button
          key={i}
          className={`btn px-4 text-white rounded-full ${
            i === currentPage ? "bg-arma-dark-blue" : "bg-arma-blue"
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
          <tr className="rounded-[16px]" >
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
          {data.map((item, index) => {
            return (
              <tr key={index} className="odd:bg-white even:bg-arma-light-gray">
                {headers.map((header) => {
                  return (
                    <td key={header.displayName} className=" px-6 py-4 text-center whitespace-nowrap">
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
    <div id="paginationButtonsSection" className="w-max mx-auto mt-8 flex gap-2  ">
        {currentPage > buttonsCount ? (
          <button
            onClick={prevPage}
            className="p-2 text-arma-dark-blue bg-white "
          >
            <ArrowBackIos />
          </button>
        ) : null}
        {currentPageButtons()}
        {currentPage <=
        (Math.ceil(totalPages / buttonsCount) - 1) * buttonsCount ? (
          <button
            onClick={nextPage}
            className=" p-2 text-arma-dark-blue "
          >
            <ArrowForwardIos />
          </button>
        ) : null}
      </div>
    </>

  );
};

export default Table;
