import React, { useState , createContext} from "react";
import type { productType } from "./productDisplay";

export type CartContextType = {
  isAdded: number;
  setIsAdded: React.Dispatch<React.SetStateAction<number>>;
  addedItems: productType[];
  setAddedItems: React.Dispatch<React.SetStateAction<productType[]>>;
};
export const cartContext = createContext<CartContextType | null>(null);
export function CartContextprovider({children} : {children : any}){
    const [isAdded, setIsAdded] = useState<number>(0);
    const [addedItems, setAddedItems] = useState<productType[]>([]);


    return (
        <>
        <cartContext.Provider value={{isAdded,setIsAdded,addedItems,setAddedItems}}>
            {children}
        </cartContext.Provider>
        </>
    )
}

