import React, {useEffect, useState, type Dispatch} from "react";
import { totalItem, totalPrice } from "./productDisplay";
import "./cartDisplay.css"

export function CartDisplay(){

  const [amount ,setAmount] = useState<addeditems[]>(addedItemArray);
  const[isOrdered, setIsordered] = useState<boolean>(false);
  return(
    <>
    <Navigation amounts = {amount} onAmount = {setAmount}
                isOrdered = {isOrdered}/>
    <DisplayAddeddProducts amounts = {amount} onAmount = {setAmount} 
                            isOrdered = {isOrdered}/>

    <Footer amounts = {amount} onAmount = {setAmount}
                      isordered = {isOrdered} onOrdered = {setIsordered}
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


export function Navigation({amounts,onAmount,isOrdered} : 
  {amounts : addeditems[], 
   isOrdered : boolean,
  onAmount : Dispatch<React.SetStateAction<addeditems[]>>}){

    const totalPrice = amounts.reduce((tot,obj) => tot+(obj.price*obj.quantity),0);
    const totalItems = amounts.reduce((items,objItem) => items + (objItem.quantity),0);

  return(

    <>
    <div className="headers">
      <section className="title">
    <h2> Acme co.</h2>
      </section>
      <section className="price-num">
        <p>total item <span className="value"> {isOrdered ? 0 : totalItems}</span></p>
        <p>total price <span className="value">$ {isOrdered? "0.00" : totalPrice}</span></p>
        <p><button className="view">view product</button></p>
      </section>
    </div>
    <hr style={{border : "2px black solid"}}/>
    </>
  )
}


export function Footer({amounts,onAmount,isordered,onOrdered} : 
  {amounts : addeditems[],isordered : boolean,onOrdered : Dispatch<React.SetStateAction<boolean>>, 
  onAmount : Dispatch<React.SetStateAction<addeditems[]>>}){

    let totalPrice = amounts.reduce((tot,obj) => tot+(obj.price*obj.quantity),0);
    let totalItems = amounts.reduce((items,objItem) => items + (objItem.quantity),0);
    
   const handleOrder = function(){
      onOrdered(true);
      console.log(isordered);

    }

  return(
    <> { !isordered && (
      <div>
      <section className="footer price-num">
        <p>total item <span className="value"> {`${totalItems}`}</span></p>
        <p>total price <span className="value">{`$ ${totalPrice}`}</span></p>
        <button onClick={()=> handleOrder()}>place order</button>
      </section>
      </div>
    )
  }
  <section className="foot"><p>shopping cart &copy; 2025</p></section>
  
    </>
  )
}


export function DisplayAddeddProducts({amounts,onAmount,isOrdered} : {amounts : addeditems[],isOrdered:boolean, onAmount : Dispatch<React.SetStateAction<addeditems[]>>}){


  const handleSelect = function(id : number , quantity : number){
      onAmount(prev => prev.map(pr => (pr.id === id ? {...pr,quantity} : pr))); // Check the id of the product and if it is correct replace the quantity
      
  } 

  const handleButton = function(id: number){
       onAmount(prev => prev.filter(pr => pr.id!==id));
  }



  return(
    <>
      {!isOrdered && (
          amounts.map( item => (
         <li key={item.id}> <img src={item.image} alt="The product picture is not found" className="image"/> <span>{item.name}</span> <span>{item.price}</span> 

         <select value={item.quantity} title="camount" className="options" onChange={(e : React.ChangeEvent<HTMLSelectElement>) => handleSelect(item.id , Number((e.target.value)))}>
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

