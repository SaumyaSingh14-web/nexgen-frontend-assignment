import CustomerTable from "./components/CustomerTable";
import axios from "axios";
import * as _ from "lodash";
import { useEffect, useState } from "react";
import AppContext from "./context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BidDetails from "./components/BidDetails";

function App() {
  const [customerData, setCustomerData] = useState();
  const [orderBy, setOrderBy] = useState(false);
  const [loading, setLoading] = useState(false);

  // using lodash for sorting on the basis of ascending or descending
  const sortedCustomerData = _.orderBy(
    customerData,
    [
      function (object) {
        return +object.Bid.amount;
      },
    ],
    [orderBy ? "desc" : "asc"]
  );
  console.log("Sorted Data", sortedCustomerData);

  // fetching customer details
  const customerAPICall = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://nex-g.herokuapp.com");
      console.log(response);
      console.log(response.data.Data);
      setLoading(false);
      setCustomerData(response.data.Data);
    } catch (error) {
      console.error("Customer fetch API failed");
    }
  };
  useEffect(() => {
    customerAPICall();
  }, []);
  return (

    // using context api 
    <AppContext.Provider value={{ data: sortedCustomerData, loading }}>
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <CustomerTable
                onClick={() => setOrderBy(!orderBy)}
                orderBy={orderBy}
              />
            }
          />
          <Route
            exact
            path="/customer-bid-detail/:id"
            element={
              <BidDetails/>
            }
          />
        </Routes>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
