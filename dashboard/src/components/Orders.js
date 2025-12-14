import React from "react";
import { useState , useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "./userContext";
const Orders = () => {
    
    let {user , setUser} = useContext(UserContext);

    let [order , setOrder] = useState([]);

    const token = localStorage.getItem("token");
    useEffect(()=>{
        if(token){
          axios.get(`http://localhost:3002/order/allOrders` ,  { headers: { Authorization: `Bearer ${token}` }} ).then((res)=>{
          setOrder(res.data);
        })
        }
    } , order);
  


  return (
    <div className="orders">
       <h3 className="title">Orders ({order.length})</h3>
 
      {/* <div className="no-orders">
        <p>You haven't placed any orders today</p>

        <Link to={"/"} className="btn">
          Get started
        </Link>
      </div> */}
      <div className="order-table">
        <table>
          <tr>
            <th>Name</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Mode</th>
            <th>Product Type</th>
            <th>OrderType</th>
            <th>Block Margin</th>
            <th>Limit Price</th>
            <th>Status</th>
          </tr>

          {
          order.map((stock , index)=> {

          return (
            <tr>
              <td>{stock.name}</td>
              <td>{stock.qty}</td>
              <td>{stock.price}</td>
              <td>{stock.mode}</td>
              <td>{stock.productType}</td>
              <td>{stock.orderType}</td>
              <td>{stock?.blockedMargin}</td>
              <td>{stock.limitPrice}</td>
              <td>{stock.statusType}</td>
            </tr>
          )
          })
      }
        </table>
      </div>
    </div>
  );
};

export default Orders;
