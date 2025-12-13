import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./BuyActionWindow.css";
import { useContext } from "react";
import { toast } from "react-toastify";


const AddFundWindow = ({isWindowOpen , setIsWidowOpen , addInFund})=>{

  let [price, setPrice] = useState(0);


    function onChangeAvailCash(e){
      setPrice(e.target.value);
    }


    function handleAdd(){
      if(Number(price) <= 0){
        toast.warn("Please enter a valid price");
        return;
      }
      addInFund(Number(price));
      setIsWidowOpen(!isWindowOpen);
     
    }

    function handleOnClick(){
      console.log("working");
      setIsWidowOpen(!isWindowOpen);
    }
 
    return (
        <div className="container" id="buy-window" draggable="true">
          <div className="regular-order">
            <div className="inputs">
              <fieldset>
                <legend>Price</legend>
                <input
                  onChange={onChangeAvailCash}
                  type="number"
                  name="price"
                  id="price"
                  step="0.05"
                  value={price}
                />
              </fieldset>
            </div>
          </div>
    
          <div className="buttons">
            <div>
              <Link className="btn btn-blue"  onClick={handleAdd}>
               Add
              </Link>
              <Link to="" className="btn btn-grey" onClick={handleOnClick}>
                Cancel
              </Link>
            </div>
          </div>
        </div>)
}

export default AddFundWindow;