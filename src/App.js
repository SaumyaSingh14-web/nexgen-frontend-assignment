import CustomerTable from "./components/CustomerTable";
import axios from "axios";
import * as _ from "lodash";
import { useEffect, useState } from "react";

function App() {
  const [customerData, setCustomerData] = useState();
  const [orderBy, setOrderBy] = useState(false);
  const sortedCustomerData = _.orderBy(customerData, [
    function (object) {
      return +object.Bid.amount;
    },
  ], [orderBy ? 'desc' : 'asc']);
  console.log("Sorted Data", sortedCustomerData);
  const customerAPICall = async () => {
    try {
      const response = await axios.get("https://nex-g.herokuapp.com");
      console.log(response);
      console.log(response.data.Data);
      setCustomerData(response.data.Data);
    } catch (error) {
      console.error("Customer fetch API failed");
    }
  };
  useEffect(() => {
    customerAPICall();
  }, []);
  return (
    <div>
      <CustomerTable data = {sortedCustomerData} onClick={() => setOrderBy(!orderBy)}/>   
    </div>
  );
}

export default App;
