import { useState } from "react";
import "./productDisplay.css";






// Static datas 

interface productType{
    name : string,
    image : string,
    price : number,
}

const productArray : productType[] = [{name : "Watch 1" ,image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStxNO_7qy6ZbEqOkdC1_66BnhAPKK7KTDutQ&s",price : 20 }, {name : "shirt", image : "https://media.istockphoto.com/id/488160041/photo/mens-shirt.jpg?s=612x612&w=0&k=20&c=xVZjKAUJecIpYc_fKRz_EB8HuRmXCOOPOtZ-ST6eFvQ=", price : 50}];



export function DisplayProduct(){
     const [isAdded, setIsAdded] = useState<number>(0);
       

  return(

    <>
     <Navigation />
     <Products isAdded = {isAdded} onAdded = {setIsAdded}/>
    </>
  )
}

export function Navigation(){


  return(

    <>
    <div className="headers">
      <section className="title">
    <h2> Acme co.</h2>
      </section>
      <section className="price-num">
        <p>total item <span className="value"> {`${20}`}</span></p>
        <p>total price <span className="value">{`$ ${40}`}</span></p>
        <p><button className="view">view cart</button></p>
      </section>
    </div>
    </>
  )
}

export function Products({isAdded,onAdded} : {isAdded : number, onAdded : React.Dispatch<React.SetStateAction<number>>}){


    function handleCart(){
        productArray.map(item => (onAdded(item.price)));
        console.log(isAdded);
       
    }

    return(
        <>
        <div className="product-list">
       {productArray.map(item => (
        <section className="products" key={item.image}>
        <p>{item.name}</p>
        <img src= {`${item.image}`} alt=" no picture is found" />
        <p>price : {isAdded? item.price + 10 : item.price  }</p>
        <p><button onClick={handleCart}>Add To cart</button></p>
        </section>
       ))} 
       </div>
        </>
    )
}