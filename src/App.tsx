
import {DisplayProduct} from "./productDisplay" 
import { CartDisplay } from "./cartDisplay"
import { CartContextprovider } from "./contexts"
import { BrowserRouter,Routes,Route } from "react-router-dom"

 export function AllDisplay(){
       

  return(

    <>
    <BrowserRouter>
    <CartContextprovider >
    <Routes>
     < Route path="/" element = {<DisplayProduct />} />
    <Route path= "/productDisplay" element = {<DisplayProduct />}  />
    <Route path="/cartDisplay" element = {<CartDisplay />}/>
    </Routes>
    </CartContextprovider>
    </BrowserRouter>
    </>
  )
 }