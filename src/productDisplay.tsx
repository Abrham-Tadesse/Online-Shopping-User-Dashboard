import React, { useState,useEffect, type Dispatch, type SetStateAction, createContext, useContext } from "react";
import "./productDisplay.css";
import { cartContext } from "./contexts";




// Static datas 

export interface productType{
    id : number;
    title : string,
    image : string,
    price : number,
    quantity : number,
  }

  let filtered : productType[];

// const productArray : productType[] = [{id : 1 ,title : "Watch 1" ,image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStxNO_7qy6ZbEqOkdC1_66BnhAPKK7KTDutQ&s",price : 20 }, {id : 2 , title : "shirt", image : "https://media.istockphoto.com/id/488160041/photo/mens-shirt.jpg?s=612x612&w=0&k=20&c=xVZjKAUJecIpYc_fKRz_EB8HuRmXCOOPOtZ-ST6eFvQ=", price : 50},{id : 3 ,title : "watch2" , image : "https://m.media-amazon.com/images/I/61n0aVXta7L._AC_UY1000_.jpg" , price : 40 }];


// create context to share data that are used inside different components


export function DisplayProduct(){
     const contexts = useContext(cartContext);
     if(!contexts){
      return;
     }
    const {isAdded,totalItem,setTotalItem, setIsAdded,totalPrice, setTotalPrice,addedItems,setAddedItems} =contexts;


     const [products,setproducts] = useState<productType[]>([]);
     const [query,setQuery] = useState<string>("");
     const [searchResult,setSearchResult] = useState<productType[]>([]);
     const [isLoading, setIsLoading] = useState<boolean>(false);
     const [error,setError] = useState<string | null>("");

   // Displaying the product when the app is intially rendered  
  useEffect(function(){
    async function effected(){
      try{
        setIsLoading(true);
        setError(null);
        const resp = await fetch("https://fakestoreapi.com/products");
          if (!resp.ok) {
        throw new Error("Failed to fetch products");
          }
      let data = await resp.json();
      const productWithQuantity : productType[]= data.map((pro : any) => ({...pro,quantity : 0}));
      setproducts(productWithQuantity);
      }
      catch (err : any) {setError(err.message);

      }
      finally{ 
        setIsLoading(false);
      }
    }
    effected();
  },[])


  useEffect(() => {
  const filtered = products.filter(pro =>
    pro.title.toLowerCase().includes(query.trim().toLowerCase()));
    
    if(filtered.length ===0 && products.length !==0 ){
      setError("No product that muches to the search result");
    }else{
       setError(null);
    }


  setSearchResult(filtered);
}, [query, products]);


  return(
    <>
     <Navigation setQuery={setQuery} totalItem={totalItem} totalPrice={totalPrice}/>
     <Products onAdded = {setIsAdded} 
         products = {products} searchResult={searchResult} 
         isLoading = {isLoading} error = {error}
         addedItems = {addedItems} setAddedItems = {setAddedItems}
         setTotalItem = {setTotalItem} 
         setTotalPrice = {setTotalPrice}/>
        <Footer totalItem = {totalItem} totalPrice={totalPrice}/>
    </>
  )
}

export function Navigation({setQuery,totalItem,totalPrice} : {setQuery : Dispatch<React.SetStateAction<string>>,totalItem : number,totalPrice : number}){
             

  return(

    <>
    <div className="headers">
      <section className="title">
    <h2> Acme co.</h2>
      </section>
       <input type="text" className="searchInput" placeholder="search here" onChange={(e) => setQuery(e.target.value)}/> 
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
 
export function Footer({totalItem,totalPrice} : {totalItem : number,totalPrice : number}){

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

export function Products({onAdded,products,searchResult,isLoading,error,addedItems,setAddedItems,
  setTotalPrice,setTotalItem} :
   {products : productType[],searchResult:productType[],isLoading : boolean,error : string | null,addedItems : productType[],setAddedItems : Dispatch<React.SetStateAction<productType[]>>,
     onAdded : React.Dispatch<React.SetStateAction<number>>,
   setTotalPrice : Dispatch<React.SetStateAction<number>>,setTotalItem : Dispatch<React.SetStateAction<number>>}){

  const [addedCart , setAddedCart] = useState<number[]>([]);
  const [selected , setSelected] = useState<productType>();
  const displayAllProduct : productType[] = searchResult? searchResult : products;


   useEffect(function(){
     async function updatingStatistics() {
      onAdded(prev => prev + 1);
      setTotalItem(addedItems.reduce((items,objItem) => items + (objItem.quantity),0));
      setTotalPrice(addedItems.reduce((tot,obj) => tot+(obj.price*obj.quantity),0));
      
    } 
    if(!selected) return;
    updatingStatistics();
    
  },[addedItems]);
  


useEffect(function(){
         function updateCartandItem(item:productType){
           setAddedCart(prev => [...prev, item.id]);
           setAddedItems(prev => [...prev, item]);
         }
         if(!selected) return;
      updateCartandItem(selected);
},[selected])



  function handlingQuantity(item : productType){
    const updatedItem = ({...item,quantity : item.quantity + 1});
    setAddedItems(prev => prev.map(p => p.id === item.id ? updatedItem : p));
    setSelected(updatedItem);
 

  }


    return(
        <>
        {!isLoading && !error &&  
        <div className="product-list">
       {displayAllProduct.map(item => (
        <section className="products" key={item.image}>
        <p>{item.title}</p>
        <img src= {`${item.image}`} alt=" no picture is found" />
        <p>price : ${(item.price)}</p>
        <p>{addedCart.includes(item.id) && "✅Added to the cart" }</p>
        <p><button onClick={() => handlingQuantity(item)}>Add To cart</button></p>
        </section>
       ))} 
       </div>
       }
       {isLoading && <p className="loading">Loading...</p>} 
       {error && <p className="error">{error}</p>}
        </>
    )
}

