
import {DisplayProduct} from "./productDisplay" 
import { CartDisplay } from "./cartDisplay"
import { CartContextprovider } from "./contexts"

 export function AllDisplay(){
       

  return(

    <>
    <CartContextprovider >
     <DisplayProduct />
    {/* <CartDisplay /> */}
    </CartContextprovider>
    </>
  )
 }