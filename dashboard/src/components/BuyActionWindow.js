import  { useState , useEffect } from "react";
import { Link } from "react-router-dom";
// import { watchlist } from "../data/data";
import axios from "axios";
import { UserContext } from "./userContext";
import GeneralContext from "./GeneralContext";
import { PriceContext } from "./PriceProvider";
import "./BuyActionWindow.css";
import { useContext } from "react";
import { FaceRetouchingOff, Percent } from "@mui/icons-material";
import { toast } from "react-toastify";
const BuyActionWindow = ({ uid }) => {
   
   let { user , setUser } = useContext(UserContext);
   const generalContext = useContext(GeneralContext);
   const { watchlist } = useContext(PriceContext);
        
    const [stockQty , setStockQty] = useState(1);
    const [limitPrice , setLimitPrice] = useState(0);
    const [productType, setProductType] = useState("CNC");
    const [orderType, setOrderType] = useState("Market");
    const [marginRequired, setMarginRequired] = useState(0);
    const  token = localStorage.getItem("token");
      // Get stock data and margin
      useEffect(() => {
        const stock = watchlist.find((s) => s.name === uid);
        if (stock) setMarginRequired(stock.marginRequired.MIS);
        // if (stock && orderType === "Market" && productType === "CNC") {
        //   setStockPrice(stock.price);
        // }
      }, [uid, orderType, productType]);
      
      const stock = watchlist.find((s) => s.name === uid);
    


    async function placeOrder() {
    try {
      const res = await axios.post(
        
        `https://tradenest-online-stock-trading-platform.onrender.com/order/newOrder/buy`,
        {
          name: uid,
          qty: stockQty,
          price: stock.price,    /// stock ka actual price
          mode: "BUY",
          orderType: orderType,
          productType: productType,
          limitPrice: limitPrice,   //user ne kitne pr limit order lagaya hai
        },
        { headers: { Authorization: `Bearer ${token}` }}

      );

      // update frontend user balance (optional)
      if (res.data.user) {
        setUser(res.data.user);
      }

      console.log(res.message, res.data);
      toast.success("Order placed successfully");
    

    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  }

   async function handleBuyClick() {
    const x = Number(stock.price);  // for the market order price
    const y = Number(stockQty);
    // const limitPrice = Number(limitPrice); // for the limit order price
    let availMargin = user.availCash - user.marginUsed;
    // MARKET ORDER
    if (orderType === "Market") {
      if (productType === "CNC") {
        let totalCost = x * y;

        if (totalCost > availMargin) {
          toast.warn("Insufficient funds");
          return;
        }
      } 
      else {
        // MIS market order uses margin
        let totalCost = marginRequired * y;

        if (totalCost > availMargin) {
          toast.warn("Insufficient margin"); 
          return;
        }
      }

      await placeOrder();
      generalContext.closeBuyWindow();
      return;
    }

    // LIMIT ORDER
    if (orderType === "Limit") {

      if (limitPrice <= 0) {
        toast.warn("Please enter a valid limit price");
        return;
      }

      if (productType === "CNC") {
        let totalCost = limitPrice * y;

        if (totalCost > availMargin) {
          toast.warn("Insufficient funds");
          return;
        }
      } else {
        // MIS limit also uses margin, not limitPrice
        let totalCost = marginRequired * y;

        if (totalCost > availMargin) {
          toast.warn("Insufficient margin");
          return;
        }
      }

      await placeOrder();
      generalContext.closeBuyWindow();
    }
  }


    const handleCancelClick = () => {
    generalContext.closeBuyWindow();
    };

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <div className="input-group">
              <label>Order Type:</label>
              <select value={orderType} onChange={(e) => setOrderType(e.target.value)}>
                <option value="Market">Market</option>
                <option value="Limit">Limit</option>
              </select>
            </div>
          </fieldset>
          
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              onChange={(e) => setStockQty(e.target.value)}
              value={stockQty}
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
            <select value={productType} onChange={(e) => setProductType(e.target.value)}>
              <option value="CNC">CNC</option>
              <option value="MIS">MIS</option>
            </select>
          </div>

       { productType === "MIS" && <span>Margin required ₹{marginRequired.toFixed(2)}</span> }
        <div>
          <Link className="btn btn-blue" onClick={handleBuyClick} >
            Buy
          </Link>
          <Link to="" className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;