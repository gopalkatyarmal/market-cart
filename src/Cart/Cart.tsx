import CartItem from "../CartItem/CartITem";

import { CartItemType } from "../App";
import { Wrapper } from "./Cart.styles";

type Props={
    cartItems:CartItemType[];
    addToCart:(clickedItem:CartItemType)=>void;
    removeFromCart:(id:number)=>void;
};

export const Cart =({cartItems,addToCart,removeFromCart}:Props)=>{

    const calculate=((items:CartItemType[])=>
    items.reduce((ack:number,item)=>ack+item.amount*item.price,0));
    return (
<Wrapper>

    <h2>Your shopiing cart</h2>
        {cartItems.length===0?<p>No item</p>:null}
        {cartItems.map(item=>(<CartItem
        key={item.id}
         item={item}
         addToCart={addToCart}
         removeFromCart={removeFromCart} 

        />))}
       <h2>
           Total: ${calculate(cartItems).toFixed(2)}</h2> 
    
</Wrapper>

    );

}

