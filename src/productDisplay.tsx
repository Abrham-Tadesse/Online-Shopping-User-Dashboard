import { useState,useEffect } from "react";
import "./productDisplay.css";





// Static datas 

export interface productType{
    id : number;
    name : string,
    image : string,
    price : number,
}
export let totalPrice : number = 0 ;
export let totalItem : number = 0;

const productArray : productType[] = [{id : 1 ,name : "Watch 1" ,image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStxNO_7qy6ZbEqOkdC1_66BnhAPKK7KTDutQ&s",price : 20 }, {id : 2 , name : "shirt", image : "https://media.istockphoto.com/id/488160041/photo/mens-shirt.jpg?s=612x612&w=0&k=20&c=xVZjKAUJecIpYc_fKRz_EB8HuRmXCOOPOtZ-ST6eFvQ=", price : 50},{id : 3 ,name : "watch2" , image : "https://m.media-amazon.com/images/I/61n0aVXta7L._AC_UY1000_.jpg" , price : 40 }];



export function DisplayProduct(){
     const [isAdded, setIsAdded] = useState<number>(0);
    

  return(

    <>
     <Navigation />
     <Products isAdded = {isAdded} onAdded = {setIsAdded}/>


     <Footer />
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
        <p>total item <span className="value"> {`${totalItem}`}</span></p>
        <p>total price <span className="value">{`$ ${totalPrice}`}</span></p>
        <p><button className="view">view cart</button></p>
      </section>
    </div>
    <hr style={{border : "2px black solid"}}/>
    </>
  )
}
 
export function Footer(){

  return(
    <>
      <section className="footer price-num">
        <p>total item <span className="value"> {`${totalItem}`}</span></p>
        <p>total price <span className="value">{`$ ${totalPrice}`}</span></p>
        <p>shopping cart &copy; 2025</p>
      </section>
    </>
  )
}

export function Products({isAdded,onAdded} : {isAdded : number, onAdded : React.Dispatch<React.SetStateAction<number>>}){

  const [addedCart , setAddedCart] = useState<number[]>([]);


//     useEffect(() => {
//   console.log("Updated cart:", addedCart);
// }, [addedCart]);


    function handleCart(item : productType){
       onAdded(prev => prev + 1);
       totalPrice += item.price;
       totalItem = isAdded + 1;
      //  totalItem += 1;
      setAddedCart(prev => [...prev, item.id]);
      

    }

    return(
        <>
        <div className="product-list">
       {productArray.map(item => (
        <section className="products" key={item.image}>
        <p>{item.name}</p>
        <img src= {`${item.image}`} alt=" no picture is found" />
        <p>price : {(item.price)}</p>
        <p>{addedCart.includes(item.id) && "✅Added to the cart" }</p>
        <p><button onClick={() => handleCart(item)}>Add To cart</button></p>
        </section>
       ))} 
       </div>
        </>
    )


}



