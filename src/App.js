import CustomerTable from "./components/CustomerTable";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [customerData, setCustomerData] = useState();
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
      <CustomerTable data = {customerData}/>   
    </div>
  );
}

export default App;
