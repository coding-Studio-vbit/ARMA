import { ReactElement, useState, useEffect, EffectCallback } from "react";
import axios from "axios";
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";

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
  transformer?: (item: any) => any;
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

const Table = ({
  api,
  rowsPerPage,
  buttonsCount,
  headers,
  transformer,
}: TableProps): ReactElement => {
  /**
   * This table is cool.
   */

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    axios
      .get(api, { params: { page: currentPage, limit: rowsPerPage } })
      .then((response) => {
        let newData = response.data.response.data;
        setTotalPages(Math.ceil(response.data.response.total / rowsPerPage));
        if (transformer) {
          newData = newData.map(transformer);
        }
        setData(newData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currentPage, totalPages, rowsPerPage]);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };
  const currentPageButtons = () => {
      let slice = Math.ceil(currentPage / buttonsCount);
      let buttonList = [];
      for(let i = (buttonsCount * (slice - 1) + 1); i<=(buttonsCount * slice) && i<=(totalPages);i++)
          buttonList.push(<button className={`btn ${i == currentPage ? "bg-arma-dark-blue" : "bg-arma-blue"}`} onClick={()=>{setCurrentPage(i)}}>{i}</button>)
      return buttonList;
  };

  return (
    <div className="w-full">
      <table className="w-full">
        <thead className="bg-white border border-2 rounded ">
          <tr>
            {headers.map((header) => {
              return (
                <th
                  scope="col"
                  className="px-6 py-3 text-center font-medium text-arma-dark-blue uppercase tracking-wider"
                >
                  {header.displayName}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item, index) => {
            return (
              <tr key={index} className="odd:bg-white even:bg-arma-light-gray">
                {headers.map((header) => {
                  return (
                    <td className=" px-6 py-4 text-center whitespace-nowrap">
                      {getValueFromPath(item, header.dataPath)}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div id="paginationButtonsSection" className="w-max mx-auto ">
          {
              (currentPage > buttonsCount) ? (<button onClick={prevPage} className="p-2 text-arma-dark-blue bg-white "><ArrowBackIos/></button>) : null
          }
          {
              currentPageButtons()
          }
          {
               (currentPage <= (Math.ceil(totalPages/buttonsCount)-1)*buttonsCount) ? (<button onClick={nextPage} className=" p-2 text-arma-dark-blue bg-white "><ArrowForwardIos/></button>) : null
          }
      </div>
    </div>
  );
};

export default Table;
