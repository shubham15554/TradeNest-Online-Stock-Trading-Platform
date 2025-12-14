import React from "react";

import {useState , useEffect} from "react";
import axios from "axios";
import { positions } from "../data/data";
import { PriceContext } from "./PriceProvider";
import { useContext } from "react";
import { UserContext } from "./userContext";
const Positions = () => {

  let [allPostiions , setAllPostions] = useState([]);
  let { watchlist } = useContext(PriceContext);
  let {user , setUser} = useContext(UserContext);
  const token = localStorage.getItem("token");
  useEffect(()=>{
      if(token){
        axios.get(`https://tradenest-online-stock-trading-platform.onrender.com/allPositions` , { headers: { Authorization: `Bearer ${token}` } } ).then((res)=>{
        setAllPostions(res.data);
      })
      }
  } , [allPostiions]);


  return (


    <>
      <h3 className="title">Positions ({allPostiions.length})</h3>

      <div className="order-table">
        <table>
          <tr>
            <th>Product</th>
            <th>Instrument</th>
            <th>Qty.</th>
            <th>Avg.</th>
            <th>LTP</th>
            <th>P&L</th>
          </tr>

          {
          allPostiions.map((stock , index)=> {
          const live = watchlist.find((s) => s.name === stock.name);
          const livePrice = live ? live.price : stock.price;
          const livePercent = live ? live.percent : stock.percent;
          const currValue = livePrice * stock.qty;
          const isProfit = currValue - stock.avg*stock.qty >= 0.0;
          const profClass = isProfit ? "profit" : "loss";
          const dayClass = stock.isLoss ? "loss" : "profit";
          

          return (
            <tr>
              <td>{stock.product}</td>
              <td>{stock.name}</td>
              <td>{stock.qty}</td>
              <td>{stock.avg.toFixed(2)}</td>
              <td>{livePrice.toFixed(2)}</td>
              <td className={profClass}>
                {(currValue - stock.avg*stock.qty).toFixed(2)}
              </td>
            </tr>
          )
          })
      }
        </table>
      </div>
    </>
  );
};

export default Positions;
