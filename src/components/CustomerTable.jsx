import { useState } from "react";
import avatar from "../images/avatar.webp";
import TableData from "./TableData";
import TableHead from "./TableHead";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import * as _ from "lodash";

function CustomerTable({ data, onClick, orderBy }) {
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(5);
  const [toggleBidding, setToggleBidding] = useState(false);

  const handleNextPage = () => {
    setStart(start + 5);
    setEnd(end + 5);
  };
  const handlePreviousPage = () => {
    setStart(start - 5);
    setEnd(end - 5);
  };
  return (
    <div>
      <table className="min-w-full text-center">
        <thead className="border-b bg-gray-800">
          <tr>
            <TableHead title="Name" onClick={onClick}>
              {orderBy ? (
                <AiOutlineArrowDown className="text-white text-xl mt-4 mr-8" />
              ) : (
                <AiOutlineArrowUp className="text-white text-xl mt-4 mr-8" />
              )}
            </TableHead>
            <TableHead title="Bid" />
            <TableHead title="Email" />
            <TableHead title="Phone" />
            <TableHead title="Premium" />
            <TableHead
              title={`${toggleBidding ? "Min" : "Max"} Bid`}
              onClick={() => setToggleBidding(!toggleBidding)}
            >
              {toggleBidding ? (
                <AiOutlineArrowDown className="text-white text-xl mt-4 mr-8" />
              ) : (
                <AiOutlineArrowUp className="text-white text-xl mt-4 mr-8" />
              )}
            </TableHead>
          </tr>
        </thead>
        <tbody>
          {data?.slice(start, end)?.map((customer, index) => (
            <tr key={index} className="bg-white border-b">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                <img
                  className="h-6 w-6 m-auto"
                  src={customer?.Customer?.avatarUrl}
                  alt="avatar"
                  onError={(event) => (event.target.src = avatar)}
                />
                {customer?.Customer?.firstname +
                  " " +
                  customer?.Customer?.lastname}
              </td>
              <TableData data={customer?.Bid?.amount} />
              <TableData data={customer?.Customer?.email} />
              <TableData data={customer?.Customer?.phone} />
              <TableData data={customer?.Customer?.hasPremium ? "Yes" : "No"} />
              <TableData
                data={
                  toggleBidding
                    ? Math.min(...customer?.Customer?.bids)
                    : Math.max(...customer?.Customer?.bids)
                }
              />
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex mt-4 justify-center">
        {start > 0 && (
          <p
            onClick={handlePreviousPage}
            className="bg-black cursor-pointer text-white p-4 font-bold rounded-2xl text-xl"
          >
            &lt;
          </p>
        )}
        {data?.length > end && (
          <p
            onClick={handleNextPage}
            className="bg-black text-white p-4 cursor-pointer font-bold rounded-2xl ml-2 text-xl"
          >
            &gt;
          </p>
        )}
      </div>
    </div>
  );
}

export default CustomerTable;
