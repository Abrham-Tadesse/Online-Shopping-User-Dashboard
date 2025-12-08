import React, {useContext, useEffect, useState, type Dispatch} from "react";
import "./cartDisplay.css"
import { cartContext } from "./contexts";


export interface productType{
    id : number;
    title : string,
    image : string,
    price : number,
    quantity : number,
  }

export function CartDisplay(){
 


  const [amount ,setAmount] = useState<addeditems[]>(addedItemArray);
  const[isOrdered, setIsordered] = useState<boolean>(false);
  const contexts = useContext(cartContext);
  if(!contexts) return;
 const {isAdded,totalItem,setTotalItem, setIsAdded,totalPrice, setTotalPrice,addedItems,setAddedItems} =contexts;

  return(
    <>
    <Navigation addedItems = {addedItems}
                isOrdered = {isOrdered} totalItem = {totalItem} setTotalItem = {setTotalItem}
                totalPrice = {totalPrice} setTotalPrice = {setTotalPrice} />
    <DisplayAddeddProducts addedItems = {addedItems} setAddedItems = {setAddedItems} 
                            isOrdered = {isOrdered}/>

    <Footer addedItems = {addedItems}
             setAddedItems={setAddedItems} onOrdered={setIsordered}
                isOrdered = {isOrdered} totalItem = {totalItem} setTotalItem = {setTotalItem}
                totalPrice = {totalPrice} setTotalPrice = {setTotalPrice}
    />
    </>
  )
}


//Sattic data

interface addeditems{
    id : number;
    name : string,
    image : string,
    price : number,
    quantity : number,
}

const addedItemArray : addeditems[] = [{id : 1 ,name : "Watch 1" ,image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStxNO_7qy6ZbEqOkdC1_66BnhAPKK7KTDutQ&s",price : 20 , quantity :1}, {id : 2 , name : "shirt", image : "https://media.istockphoto.com/id/488160041/photo/mens-shirt.jpg?s=612x612&w=0&k=20&c=xVZjKAUJecIpYc_fKRz_EB8HuRmXCOOPOtZ-ST6eFvQ=", price : 50 , quantity :1},{id : 3 ,name : "watch2" , image : "https://m.media-amazon.com/images/I/61n0aVXta7L._AC_UY1000_.jpg" , price : 40 ,quantity :1}];


export function Navigation({addedItems,isOrdered,totalItem,setTotalItem,totalPrice,setTotalPrice} : 
  {addedItems : productType[], 
   isOrdered : boolean,
   totalItem : number,
   setTotalItem : Dispatch<React.SetStateAction<number>>
   totalPrice : number,
   setTotalPrice : Dispatch<React.SetStateAction<number>>
 }){

    // const totalPrice = addedItems.reduce((tot,obj) => tot+(obj.price*obj.quantity),0);
    // const totalItems = addedItems.reduce((items,objItem) => items + (objItem.quantity),0);

  return(

    <>
    <div className="headers">
      <section className="title">
    <h2> Acme co.</h2>
      </section>
      <section className="price-num">
        <p>total item <span className="value"> {isOrdered ? 0 : totalItem}</span></p>
        <p>total price <span className="value">$ {isOrdered? "0.00" : totalPrice.toFixed(3)}</span></p>
        <p><button className="view">view product</button></p>
      </section>
    </div>
    <hr style={{border : "2px black solid"}}/>
    </>
  )
}


export function Footer({addedItems,setAddedItems,isOrdered,onOrdered,totalItem,setTotalItem,totalPrice,setTotalPrice} : 
  {addedItems : productType[],
    isOrdered : boolean,
    onOrdered : Dispatch<React.SetStateAction<boolean>>, 
    setAddedItems : Dispatch<React.SetStateAction<productType[]>>,
    totalItem : number,
    setTotalItem : Dispatch<React.SetStateAction<number>>
    totalPrice : number,
    setTotalPrice : Dispatch<React.SetStateAction<number>>
  }){

    // let totalPrice = addedItems.reduce((tot,obj) => tot+(obj.price*obj.quantity),0);
    // let totalItem = addedItems.reduce((items,objItem) => items + (objItem.quantity),0);
    
   const handleOrder = function(){
      onOrdered(true);
      console.log(isOrdered);
    }

  return(
    <> { !isOrdered && (
      <div>
      <section className="footer price-num">
        <p>total item <span className="value"> {`${totalItem}`}</span></p>
        <p>total price <span className="value">{`$ ${totalPrice.toFixed(3)}`}</span></p>
        <button onClick={()=> handleOrder()}>place order</button>
      </section>
      </div>
    )
  }
  <section className="foot"><p>shopping cart &copy; 2025</p></section>
  
    </>
  )
}


export function DisplayAddeddProducts({addedItems,setAddedItems,isOrdered} : 
  {addedItems : productType[],isOrdered:boolean, setAddedItems : Dispatch<React.SetStateAction<productType[]>>}){


  const handleSelect = function(id : number , quantity : number){
      setAddedItems(prev => prev.map(pr => (pr.id === id ? {...pr,quantity : quantity} : pr))); // Check the id of the product and if it is correct replace the quantity
      //use short hand representation if the variable name that receives the argument and the object name are the same
       
      //  setAddedItems(prev => prev.map(pr => (pr.id === id ? {...pr,quantity} : pr)));
  } 

  const handleButton = function(id: number){
       setAddedItems(prev => prev.filter(pr => pr.id!==id));
  }
console.log(addedItems);


  return(
    <>
      {!isOrdered && (
          addedItems.map( item => (
         <li key={item.id}> <img src={item.image} alt="The product picture is not found" className="image"/> <span>{item.title}</span> <span>{item.price}</span> 

         <select value={item.quantity} title="caddedItems" className="options" onChange={(e : React.ChangeEvent<HTMLSelectElement>) => handleSelect(item.id , Number((e.target.value)))}>
              {Array.from({ length: 15 }, (_, i) => (
              <option key={i + 1} value={i+1}>
                   {i + 1}
              </option>
             ))}
        </select> 
        <span>{item.price * item.quantity}</span>
         <button className="remove" onClick={() => handleButton(item.id)}> &times; </button></li>
      ))
      )}
      {
      isOrdered && (
        <h3>Thank you for your order !!! </h3>
      )
    }
    </>
  )
}
