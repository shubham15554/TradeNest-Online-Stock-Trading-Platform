import {React , useContext} from "react";
import { useState } from "react";
import {BarChartOutlined, Flare, KeyboardArrowDown , KeyboardArrowUp, MoreHoriz} from "@mui/icons-material";
import {Tooltip , Grow} from "@mui/material";
import GeneralContext from "./GeneralContext";
import {DoughnouttChart} from "./DoughnoutChart";
import { PriceContext } from "./PriceProvider";
import SellContext from "./SellContext";

const WatchList = () => {
    
  const {watchlist} = useContext(PriceContext);
   const data = {
      labels: watchlist.map((stock)=> stock.name),
      datasets: [
        {
          label: 'Price',
          data: watchlist.map((stock)=> stock.price),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
    



  return (
    <div className="watchlist-container">
      <div className="search-container">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search eg:infy, bse, nifty fut weekly, gold mcx"
          className="search"
        />
        <span className="counts"> {watchlist.length }/ 50</span>
      </div>

      <ul className="list">

       {watchlist.map((stock , index)=>{
           
          return (<WatchlistItem stock={stock} key={index}/>)
       })}


      </ul>
    <DoughnouttChart data={data}/>
    </div>
  );
};


const WatchlistItem = ({stock})=>{

    const [showWatchAction , setShowWatchAction] = useState(false);

    function handlMouseEnter(e){
      setShowWatchAction(true);
    }
    function handlMouseLeave(e){
      setShowWatchAction(false);
    }
  return (
    <li onMouseEnter={handlMouseEnter} onMouseLeave={handlMouseLeave}>
      <div className="item">
       <p className={stock.isDown ? "down" : "up"}>{stock.name}</p>
       <div className="item-info">
        <span className="percent">{stock.percent}</span>
        {
          stock.isDown ? (
            <KeyboardArrowDown className="down" />
          ) : (
            <KeyboardArrowUp  className="up"/>
          )
        }
        <span className="price">{stock.price}</span>
       </div>
       {showWatchAction && <WatchListActions uid={stock.name}/>}


     </div>
     
    </li>




  )


}


const WatchListActions = ({uid}) => {

  const generalContext = useContext(GeneralContext);
  const sellContext = useContext(SellContext);

  const handleBuyClick = (uid)=>{
    console.log(uid);
    generalContext.openBuyWindow(uid);
  }

  const handleSellClick = (uid)=>{
    console.log(uid);
    sellContext.openSellWindow(uid);
  }

  return (
      <span>
          <span>
          
          <div style={{display:"flex" , alignItems:"center"}}>
            <Tooltip title="buy (B)" placement="top" arrow TransitionComponent={Grow}>
                <button className="buy" onClick={()=>{handleBuyClick(uid)}}>Buy</button>
           </Tooltip>
            <Tooltip title="sell (Sell)" placement="top" arrow TransitionComponent={Grow}>
                <button className="sell" onClick={()=>{handleSellClick(uid)}}>Sell</button>
           </Tooltip>
           
           <Tooltip title="Analytics (A)" placement="top" arrow TransitionComponent={Grow}>
                <button className="action"><BarChartOutlined className="icon"/></button>
           </Tooltip>

            <Tooltip title="more" placement="top" arrow TransitionComponent={Grow}>
                <button className="action"><MoreHoriz className="icon"/></button>
           </Tooltip>
          </div>
           


          </span>






      </span>
  )
}




export default WatchList;



