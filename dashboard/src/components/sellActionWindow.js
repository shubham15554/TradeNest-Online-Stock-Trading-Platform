import  { useState , useEffect } from "react";
import { Link } from "react-router-dom";
// import { watchlist } from "../data/data";
import axios from "axios";
import { UserContext } from "./userContext";
import { PriceContext } from "./PriceProvider";
import "./BuyActionWindow.css";
import { useContext } from "react";
import { FaceRetouchingOff, Percent } from "@mui/icons-material";
import SellContext from "./SellContext";
import { toast } from "react-toastify";
const SellActionWindow = ({ uid }) => {
   
    let { user , setUser } = useContext(UserContext);
    const sellContext = useContext(SellContext);
    const { watchlist } = useContext(PriceContext);
    
    let [stockQty , setStockQty] = useState(1);
    let [limitPrice , setLimitPrice] = useState(0);
    let [productType, setProductType] = useState("CNC");
    let [orderType, setOrderType] = useState("Market");
    let [marginRequired, setMarginRequired] = useState(0);


    const handleCancelClick = () => {
    sellContext.closeSellWindow();
    };


    const placeOrder = async () => {
       try{
            const res = await axios.post(`http://localhost:3002/order/newOrder/sell` , {
                name: uid,
                qty: stockQty,
                price: stock.price,    /// stock ka actual price
                mode: "SELL",
                orderType: orderType,
                productType: productType,
                limitPrice: limitPrice,   //user ne kitne pr limit order lagaya hai
            },{withCredentials: true});

            setUser(res.data.user);
            console.log(res.data);
            toast.success("Sell order placed successfully");


       }catch(err){
            
            toast.error(err.response?.data?.message || "Something went wrong")

       }
      
    }

    const stock = watchlist.find((s) => s.name === uid);

    const handleSellClick = async () => {
        try{
          
          if(orderType === "Market"){
            if(productType === "CNC"){
                const res  = await axios.get(`http://localhost:3002/allHoldings` , {withCredentials: true});
                const allHoldings = res.data;
                const holding = allHoldings.find((h) => h.name === uid);
                if(!holding || holding.qty < stockQty){
                    toast.warn("Not enough holdings to sell");
                    console.error("Not enough holdings to sell");
                    return;
                }
                else{
                    // proceed with sell order
                    placeOrder();
                }
            }
            else{
                // MIS sell order logic 
                const res  = await axios.get(`http://localhost:3002/allPositions` , {withCredentials: true});
                const allPositions = res.data;
                const position = allPositions.find((p) => p.name === uid);
                if(!position || position.qty < stockQty){
                    toast.warn("Not enough holdings to sell in positions");
                    console.error("Not enough holdings to sell in positions");
                    return;
                }
                else{
                    // proceed with sell order
                    placeOrder();
                }
            }
          }
          else{
            // Limit order logic can be added here
            if(limitPrice <= 0){
                toast.warn("Please enter a valid limit price");
                return;
            }
            if(productType === "CNC"){
                const res  = await axios.get(`http://localhost:3002/allHoldings` , {withCredentials: true});
                const allHoldings = res.data;
                const holding = allHoldings.find((h) => h.name === uid);
                if(!holding || holding.qty < stockQty){
                    toast.warn("Not enough holdings to sell");
                    console.error("Not enough holdings to sell");
                    return;
                }else{
                    // proceed with sell order
                    placeOrder();
                }
            }
            else{
                // MIS sell order logic 
                const res  = await axios.get(`http://localhost:3002/allPositions` , {withCredentials: true});
                const allPositions = res.data;
                const position = allPositions.find((p) => p.name === uid); 
                if(!position || position.qty < stockQty){
                    toast.warn("Not enough holdings to sell in positions");
                    console.error("Not enough holdings to sell in positions");
                    return;
                }else{
                    // proceed with sell order
                    placeOrder();
                }     
            }
          }
        }catch(error){
            console.error("Error placing sell order:", error);
            toast.error("Order failed");
        }


        sellContext.closeSellWindow();
    }

  return (
    <div className="container" id="sell-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <div className="input-group">
              <label>Order Type:</label>
              <select onChange={(e) => setOrderType(e.target.value)} value={orderType}>
                <option value="Market">Market</option>
                <option value="Limit">Limit</option>
              </select>
            </div>
          </fieldset>
          
          <fieldset>
            <legend>Qty.</legend>
            <input
              onChange={(e) => setStockQty(e.target.value)}
              value={stockQty}
              type="number"
              name="qty"
              id="qty"
              required
            />
          </fieldset>
         { orderType === "Limit" && <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              onChange={(e) => setLimitPrice(e.target.value)}
              value={limitPrice}
              required
            />
          </fieldset>}
        </div>
      </div>

      <div className="buttons">

         <div className="input-group">
            <label>Product Type: </label>
            <select onChange={(e) => setProductType(e.target.value)} value={productType}>
              <option value="CNC">CNC</option>
              <option value="MIS">MIS</option>
            </select>
          </div>

        <span>Margin required</span> 
        <div>
          <Link className="btn btn-blue" onClick={handleSellClick}>
            Sell
          </Link>
          <Link to="" className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SellActionWindow;