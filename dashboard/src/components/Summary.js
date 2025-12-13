import React from "react";
import { UserContext } from "./userContext";
import { useContext , useState , useEffect} from "react";       
import axios from "axios";  
import { PriceContext } from "./PriceProvider";

const Summary = () => {
    const { user , setUser} = useContext(UserContext);
    let [allHoldings , setAllHoldings] = useState([]);
    let {watchlist} = useContext(PriceContext);
    useEffect(()=>{
      axios.get("http://localhost:3002/allHoldings" , {withCredentials: true}).then((res)=>{
        setAllHoldings(res.data);
      })
      
    } , []);

  function calculateCurrentValue(holdings) {
  return holdings.reduce((total, stock) => {
    const live = watchlist.find((s) => s.name === stock.name);
    const livePrice = live ? live.price : stock.price; // fallback
    return total + livePrice * stock.qty;
  }, 0);
  }
    function calculateInvestment(holdings) {
       return holdings.reduce((total, stock) => {
        return total + stock.avg * stock.qty;
      }, 0);
  }

  let currValue = calculateCurrentValue(allHoldings);
  let investment = calculateInvestment(allHoldings);


  return (
    <>
      <div className="username">
        <h6>Hi, {user.username}!</h6>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Equity</p>
        </span>

        <div className="data">
          <div className="first">
            <h3>{(user?.availCash - user?.marginUsed)?.toFixed(2) || 0}</h3>
            <p>Margin available</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Margins used <span>{user?.marginUsed?.toFixed(2) || 0}</span>{" "}
            </p>
            {/* <p>
              Opening balance <span>3.74k</span>{" "}
            </p> */}
          </div>
        </div>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Holdings ({allHoldings.length})</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className="profit">
              {(currValue - investment).toFixed(2)}<small>{ (((currValue - investment) / (investment) ) * 100).toFixed(2)}%</small>{" "}
            </h3>
            <p>P&L</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Current Value <span>{currValue.toFixed(2)}</span>{" "}
            </p>
            <p>
              Investment <span>{investment.toFixed(2)}</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>
    </>
  );
};

export default Summary;
