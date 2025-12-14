// PriceContext.js
import React, { createContext, useState, useEffect } from "react";
import { watchlist as initialWatchlist } from "../data/data";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "./userContext";
import { toast } from "react-toastify";

export const PriceContext = createContext();


export const PriceProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState(
    initialWatchlist.map(stock => ({ ...stock, prevPrice: stock.price }))
  );
 
  let {user , setUser} = useContext(UserContext);
  
  const token = localStorage.getItem("token");

  useEffect( () => {
    if(token){
     const interval = setInterval(async () => {
     let res = await axios.get(`http://localhost:3002/order/allOrders`, { headers: { Authorization: `Bearer ${token}` } });
     const orders = res.data;
     console.log("Fetched all orders for price update check:" , orders);
      setWatchlist(prev =>
        prev.map(stock => {
          const randomFactor = (Math.random() - 0.5) / 50;
          const newPrice = +(stock.price * (1 + randomFactor)).toFixed(2);
          const percentChange = (((newPrice - stock.prevPrice) / stock.prevPrice) * 100).toFixed(2);


          for(let order of orders){
            if(order.name === stock.name && order.statusType === "pending" && order.mode === "BUY" && order.limitPrice >= newPrice){
              // execute buy pending  orders
                try{
                  const excute = async ()=>{
                  let res = await axios.post(`http://localhost:3002/order/buyPendingOrder/${order._id}` , {currPrice : newPrice} , { headers: { Authorization: `Bearer ${token}` } });
                  console.log("Executed pending buy order:" , res.data);
                  toast.success("Executed pending buy order");
                  setUser(res.data.user);
                  }


                  excute();
                }

                catch(err){
                    toast.error(err.response?.data?.message || "Something went wrong");
                }

              

            }
            if(order.name === stock.name && order.statusType === "pending" && order.mode === "SELL" && order.limitPrice <= newPrice){
              // execute sell pending orders
              try{
                 const excute = async ()=>{
                  let res = await axios.post(`http://localhost:3002/order/sellPendingOrder/${order._id}` , {currPrice : newPrice} , { headers: { Authorization: `Bearer ${token}` } });
                  console.log("Executed pending buy order:" , res.data);
                  toast.success("Executed pending sell order");
                }

                excute();

              }
              catch(err){
                 toast.error(err.response?.data?.message || "Something went wrong");
              }
             
              
            }
          }
          return {
            ...stock,
            prevPrice: stock.price,
            price: newPrice,
            percent: `${percentChange}%`,
            isDown: percentChange < 0
          };

        })

      );
    }, 3000);

    return () => clearInterval(interval);

    }
    
  }, [token]);

  return (
    <PriceContext.Provider value={{ watchlist }}>
      {children}
    </PriceContext.Provider>
  );
};



