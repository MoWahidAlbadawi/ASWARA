// import { GetMetalPrices } from "@/hooks/home/useHome";
import React, { createContext , useMemo } from "react";

interface GoldPrices {
    goldPrices : {karat : number, price : number}[]
}

interface Props {
    children : React.ReactNode;
}

export const GoldPricesContext = createContext<GoldPrices>({
    goldPrices : []
})

export const GoldPricesContextProvider = ({children} : Props) => {
      // Get metal prices for (gold , silver) from metal price api
    //   const {data : metalPrices} = GetMetalPrices();
      // Gold prices
      const metalPrices : {metals : {gold : number}}= {
        metals : {
            gold : 3452.4885
        }
      }
      const goldPrices = useMemo(() => {
        const prices : {karat : number, price : number}[]= [];
        if(metalPrices?.metals?.gold) {
          const karat24Price = metalPrices?.metals?.gold / 31.1035;
          const karat21Price = karat24Price * (87.5 / 100);
          const karat18Price = karat24Price * (75 / 100);
          prices.push({karat : 24 , price : karat24Price || 0});
          prices.push({karat : 21 , price : karat21Price || 0});
          prices.push({karat : 18 , price : karat18Price || 0});
          return prices;
        }
        return [];
      },[metalPrices])
    return <GoldPricesContext.Provider value={{
        goldPrices
    }}>
        { children }
    </GoldPricesContext.Provider>
}
