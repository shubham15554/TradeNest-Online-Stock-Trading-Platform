import React from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useState , useEffect } from "react";
import { VerticalGraph } from "./VerticalChart";
import { SubwaySharp } from "@mui/icons-material";
import { holdings } from "../data/data";
import { PriceContext } from "./PriceProvider";
import { useContext } from "react";
import { UserContext } from "./userContext";
const Holdings = () => {
  
  let [allHoldings , setAllHoldings] = useState([]);
  let { watchlist } = useContext(PriceContext);
  let {user , setUser} = useContext(UserContext);

  useEffect(()=>{
    axios.get(`http://localhost:3002/allHoldings` , {withCredentials: true}).then((res)=>{
      setAllHoldings(res.data);
    })
    
  } , [allHoldings]);

  
  
  const labels = allHoldings.map((subarray)=> subarray["name"]);
  
   const data = {
    labels,
    datasets: [
      {
        label: 'Stock Price',
        data: allHoldings.map((stock) => stock.price),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };


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
      <h3 className="title">Holdings ({allHoldings.length})</h3>

      <div className="order-table">
        <table>
          <tr>
            <th>Instrument</th>
            <th>Qty.</th>
            <th>Avg. cost</th>
            <th>LTP</th>
            <th>Cur. val</th>
            <th>P&L</th>
            <th>Net chg.</th>
           
          </tr>


          {
             allHoldings.map((stock , index)=> {
              const live = watchlist.find((s) => s.name === stock.name);
        
              const livePrice = live ? live.price : stock.price;
              const livePercent = live ? live.percent : stock.percent;
              const currValue = livePrice * stock.qty;
              const isProfit = currValue - stock.avg*stock.qty >= 0.0;
              const profClass = isProfit ? "profit" : "loss";
              const dayClass = stock.isLoss ? "loss" : "profit";
              

              return (
                <tr>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.avg.toFixed(2)}</td>
                  <td>{livePrice.toFixed(2)}</td>
                  <td>{currValue.toFixed(2)}</td>
                  <td className={profClass}>
                    {(currValue - stock.avg*stock.qty).toFixed(2)}
                  </td>
                  <td className={profClass}>{livePercent}</td>
               </tr>
             )
             })
          }
        </table>
      </div>

      <div className="row">
        <div className="col">
          <h5>
            {investment.toFixed(2)}
          </h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>
            {currValue.toFixed(2)}
          </h5>
          <p>Current value</p>
        </div>

        <div className="col">
          <h5>{(currValue - investment).toFixed(2)} ({(((currValue - investment) / investment) * 100).toFixed(2)}%)</h5>
          <p>P&L</p>
        </div>


      </div>
      
      <VerticalGraph data={data} />



    </>
  );
};

export default Holdings;
