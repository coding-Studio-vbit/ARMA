import React from "react";

interface header {
  displayName: string; //Display header name
  dataPath: string; //property path
  sortable: boolean; //sortable or not
}
interface TableProps {
  headers: Array<header>;
  data: any;
  onTableRowClick?: (id: string) => void;
}
export default function DataTable({
  data,
  headers,
  onTableRowClick,
}: TableProps) {
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
  return (
    <div>
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
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-300">
            {data &&
              (data.length > 0 ? (
                data.map((item: any, index: number) => {
                  return (
                    <tr
                      key={index}
                      className="odd:bg-white even:bg-arma-light-gray"
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
                })
              ) : (
                <p className="text-center p-4">Nothing here :)</p>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
