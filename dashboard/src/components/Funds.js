import { useState , useEffect , useContext } from "react";
import { Link } from "react-router-dom";
import AddFundWindow from "./addFundWindow";
import axios from "axios";
import { UserContext } from "./userContext";
import { toast } from "react-toastify";




const Funds = () => {

    let [isWindowOpen , setIsWidowOpen] = useState(false);

    let { user, setUser } = useContext(UserContext);
    
    function handleOnClick(){
      setIsWidowOpen(!isWindowOpen)
    }

  async function addInFund(amount) {
    console.log(user._id);
   
  try {
    const res = await axios.post(
      `http://localhost:3002/user/${user._id}/addFund`,
      { amount },{withCredentials: true}
    );

    // Update the user in context

    if(res.data.status == true){
      setUser({ ...user, availCash: res.data.availCash });
      toast.success(res.data.message);
        
    }
    else{
       toast.error(res.data.message);
    }
    
   

   
  } catch (err) {
     toast.error(err.response?.data?.message || "Something went wrong");
  }
}

  return (
    <>
      <div className="funds">
        <p>Instant, zero-cost fund transfers with UPI </p>
        <Link className="btn btn-green" onClick={handleOnClick}>Add funds</Link>
        <Link className="btn btn-blue">Withdraw</Link>
        { isWindowOpen && <AddFundWindow isWindowOpen={isWindowOpen} setIsWidowOpen={setIsWidowOpen} addInFund={addInFund}/>}
      </div>
     
      <div className="row">
        <div className="col">
          <span>
            <p>Equity</p>
          </span>

          <div className="table">
            <div className="data">
              <p>Available margin</p>
              <p className="imp colored">{(user?.availCash - user?.marginUsed)?.toFixed(2) || 0}</p>
            </div>
            <div className="data">
              <p>Used margin</p>
              <p className="imp">{user?.marginUsed?.toFixed(2) || 0}</p>
            </div>
            <div className="data">
              <p>Available cash</p>
              <p className="imp">{user?.availCash?.toFixed(2) || "0.00"}</p>
            </div>
            <hr />
            {/* <div className="data">
              <p>Opening Balance</p>
              <p>4,043.10</p>
            </div>
            <div className="data">
              <p>Payin</p>
              <p>4064.00</p>
            </div> */}
            <div className="data">
              <p>SPAN</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Delivery margin</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Exposure</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Options premium</p>
              <p>0.00</p>
            </div>
            <hr />
            <div className="data">
              <p>Collateral (Liquid funds)</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Collateral (Equity)</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Total Collateral</p>
              <p>0.00</p>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="commodity">
            <p>You don't have a commodity account</p>
            <Link className="btn btn-blue">Open Account</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Funds;
