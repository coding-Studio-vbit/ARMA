import { ReactElement } from "react";

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
}: TableProps): ReactElement => {
  /**
   * This table is cool.
   */
  return (
    <div>
      <table>
        <thead>
          <tr>
            {headers.map((header) => {
              return <th>{header.displayName}</th>;
            })}
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  );
};

export default Table;
