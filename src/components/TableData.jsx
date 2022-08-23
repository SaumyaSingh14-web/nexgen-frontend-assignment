import React from "react";

function TableData(props) {
  return (
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
      {props.data}
    </td>
  );
}
export default TableData;
