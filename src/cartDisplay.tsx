import {useState} from "react";
import { totalItem, totalPrice } from "./productDisplay";







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
        <p><button className="view">view product</button></p>
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
        <button>place order</button>
      </section>

      <section className="foot"><p>shopping cart &copy; 2025</p></section>
    </>
  )
}