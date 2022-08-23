import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as _ from "lodash";
import AppContext from "../context";
import { AiOutlineLoading } from "react-icons/ai";

function BidDetails() {
  const { id } = useParams();
  const { data, loading } = useContext(AppContext);
  const [currentBidDetail, setCurrentBidDetail] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const detail = _.find(data, function (object) {
      return object.Customer.id === id;
    });
    setCurrentBidDetail(detail);
  });

  if (loading) {
    return (
      <div className="h-screen flex flex-row items-center justify-center">
        <AiOutlineLoading className="animate-spin h-14 w-14" />
      </div>
    );
  }

  return (
    <div class="flex justify-center mt-5">
      <div class="rounded-lg shadow-lg text-white bg-gray-500 w-80 text-center">
        <div class="py-3 px-6 border-gray-300 font-semibold text-xl">
          {currentBidDetail?.Bid?.carTitle}
        </div>
        <div class="p-6 ">
          <h5 class="text-white text-xl font-medium mb-2">
            {currentBidDetail?.Customer?.firstname +
              " " +
              currentBidDetail?.Customer?.lastname}
          </h5>
          <p class="mb-4 text-sm text-white">
            {currentBidDetail?.Customer?.email}
          </p>
          <button
            onClick={() => {
              navigate("/");
            }}
            type="button"
            class="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            Go Back
          </button>
        </div>
        <div class="py-3 px-6 border-t border-gray-300 font-bold text-red-200">
          Amount: {currentBidDetail?.Bid?.amount}
        </div>
      </div>
    </div>
  );
}
export default BidDetails;
