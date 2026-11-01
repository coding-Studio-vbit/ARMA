import React from 'react';

interface header {
  displayName: string;
  dataPath: string;
  sortable: boolean;
}

interface TableProps {
  headers: Array<header>;
  data: any;
  onTableRowClick?: (id: string) => void;
}

export default function DataTable({ data, headers, onTableRowClick }: TableProps) {
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

  return (
    <div>
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
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data && data.length > 0 ? (
              data.map((item: any, index: number) => {
                return (
                  <tr
                    key={index}
                    className="odd:bg-white even:bg-gray-50/50 hover:bg-sky-50/40 cursor-pointer transition-colors"
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
                <td colSpan={headers.length} className="text-center py-8 text-gray-400 text-sm">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}