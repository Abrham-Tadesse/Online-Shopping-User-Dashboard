import React, { useState,useEffect, type Dispatch, type SetStateAction } from "react";
import "./productDisplay.css";





// Static datas 

export interface productType{
    id : number;
    title : string,
    image : string,
    price : number,
  }
  export let totalPrice : number = 0 ;
  export let totalItem : number = 0;
  let filtered : productType[];

const productArray : productType[] = [{id : 1 ,title : "Watch 1" ,image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStxNO_7qy6ZbEqOkdC1_66BnhAPKK7KTDutQ&s",price : 20 }, {id : 2 , title : "shirt", image : "https://media.istockphoto.com/id/488160041/photo/mens-shirt.jpg?s=612x612&w=0&k=20&c=xVZjKAUJecIpYc_fKRz_EB8HuRmXCOOPOtZ-ST6eFvQ=", price : 50},{id : 3 ,title : "watch2" , image : "https://m.media-amazon.com/images/I/61n0aVXta7L._AC_UY1000_.jpg" , price : 40 }];




export function DisplayProduct(){
     const [isAdded, setIsAdded] = useState<number>(0);
     const [products,setproducts] = useState<productType[]>([]);
     const [query,setQuery] = useState<string>("");
     const [searchResult,setSearchResult] = useState<productType[]>([]);
     const [isLoading, setIsLoading] = useState<boolean>(false);

   // Displaying the product when the app is intially rendered  
  useEffect(function(){
    async function effected(){
      setIsLoading(true);
      const resp = await fetch("https://fakestoreapi.com/products");
      const data = await resp.json();
      setproducts(data);
      console.log(data);
      setIsLoading(false);
    }
    effected();
  },[])


  useEffect(() => {
  const filtered = products.filter(pro =>
    pro.title.toLowerCase().includes(query.trim().toLowerCase()));

  setSearchResult(filtered);
}, [query, products]);


  return(
    <>
     <Navigation setQuery={setQuery}/>
     <Products isAdded = {isAdded} onAdded = {setIsAdded} 
         products = {products} searchResult={searchResult} 
         isLoading = {isLoading}/>
        <Footer />
    </>
  )
}

export function Navigation({setQuery} : {setQuery : Dispatch<React.SetStateAction<string>>}){
             

  return(

    <>
    <div className="headers">
      <section className="title">
    <h2> Acme co.</h2>
      </section>
       <input type="text" className="searchInput" placeholder="search here" onChange={(e) => setQuery(e.target.value)}/> 
      <section className="price-num">
        <p>total item <span className="value"> {`${totalItem}`}</span></p>
        <p>total price <span className="value">{`$ ${totalPrice}.00`}</span></p>
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
        <p>total price <span className="value">{`$ ${totalPrice}.00`}</span></p>
        <p>shopping cart &copy; 2025</p>
      </section>
    </>
  )
}

export function Products({isAdded,onAdded,products,searchResult,isLoading} :
   {isAdded : number,products : productType[],searchResult:productType[],isLoading : boolean,
     onAdded : React.Dispatch<React.SetStateAction<number>>}){


  const [addedCart , setAddedCart] = useState<number[]>([]);
  const displayAllProduct : productType[] = searchResult? searchResult : products;


 // handling the add to cart button
    function handleCart(item : productType){
       onAdded(prev => prev + 1);
       totalPrice += item.price;
       totalItem = isAdded + 1;
      //  totalItem += 1;
      setAddedCart(prev => [...prev, item.id]);
    }


    return(
        <>
        {!isLoading && displayAllProduct &&  
        <div className="product-list">
       {displayAllProduct.map(item => (
        <section className="products" key={item.image}>
        <p>{item.title}</p>
        <img src= {`${item.image}`} alt=" no picture is found" />
        <p>price : ${(item.price)}</p>
        <p>{addedCart.includes(item.id) && "✅Added to the cart" }</p>
        <p><button onClick={() => handleCart(item)}>Add To cart</button></p>
        </section>
       ))} 
       </div>
       }
       {isLoading && <p className="loading">Loading...</p>} 
       {!searchResult || products && <p className="error">The product is not found !</p>}
        </>
    )


}

