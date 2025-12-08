import React, { useState , createContext, type Dispatch, type SetStateAction} from "react";
import type { productType } from "./productDisplay";

export type CartContextType = {
  selectedQuantity : number[];
  setSlectedQuantity : Dispatch<React.SetStateAction<number[]>>;
  totalItem : number;
  setTotalItem : Dispatch<React.SetStateAction<number>>
  setTotalPrice : Dispatch<React.SetStateAction<number>>
  totalPrice : number;
  isAdded: number;
  setIsAdded: React.Dispatch<React.SetStateAction<number>>;
  addedItems: productType[];
  setAddedItems: React.Dispatch<React.SetStateAction<productType[]>>;
};
export const cartContext = createContext<CartContextType | null>(null);

export function CartContextprovider({children} : {children : any}){
    const[selectedQuantity,setSlectedQuantity] = useState<number[]>([]);
    const [isAdded, setIsAdded] = useState<number>(0);
    const [addedItems, setAddedItems] = useState<productType[]>([]);
    const [totalItem,setTotalItem] = useState<number>(0);
    const [totalPrice, setTotalPrice] = useState<number>(0);

    return (
        <>
        <cartContext.Provider value={{selectedQuantity,setSlectedQuantity,isAdded,setIsAdded,addedItems,setAddedItems,totalItem,setTotalItem,totalPrice, setTotalPrice}}>
            {children}
        </cartContext.Provider>
        </>
    )
}

