import React, { useState } from "react";

import SellActionWindow from "./sellActionWindow";

const SellContext = React.createContext({
  openSellWindow: (uid) => {},
  closeSellWindow: () => {},
});

export const SellContextProvider = (props) => {
  const [isSellWindowOpen, setIsSellWindowOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState("");

  const handleOpenSellWindow = (uid) => {
    setIsSellWindowOpen(true);
    setSelectedStockUID(uid);
  };

  const handleCloseSellWindow = () => {
    setIsSellWindowOpen(false);
    setSelectedStockUID("");
  };

  return (
    <SellContext.Provider
      value={{
        openSellWindow: handleOpenSellWindow,
        closeSellWindow: handleCloseSellWindow,
      }}
    >
      {props.children}
      {isSellWindowOpen && <SellActionWindow uid={selectedStockUID}  />}
    </SellContext.Provider>
  );
};

export default SellContext;