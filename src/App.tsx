import { useState } from "react";
import { useQuery } from "react-query";
import { StyledButton } from "./App.styles";
import Item from "./Item/Item";
import  Drawer  from "@material-ui/core/Drawer";
import  Grid from "@material-ui/core/Grid";
import  LinearProgress  from "@material-ui/core/LinearProgress";
import    AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import  Badge  from "@material-ui/core/Badge";
import { Wrapper } from "./Item/Item.styles";
import { Cart } from "./Cart/Cart";
//import  {Wrapper} from "./App.styles"

//types:
export type CartItemType={
  id:number;
  category:string;
  description:string;
  price:number;
  image:string;
  title:string;
  amount:number


};

const getData=async(): Promise<CartItemType[]>=>
   await( await fetch('https://fakestoreapi.com/products')).json();

const App=()=> {
  const  [open, setopen] = useState(false);
const [cartItem, setCartItem] = useState([] as CartItemType[]);
  const {data,isLoading,error}=useQuery<CartItemType[]>('products',getData);
  const getTotalItems=(bits:CartItemType[])=>

bits.reduce((ack:number,bit)=>ack+bit.amount,0);



  
  const handleAddToCart=(clickedItem:CartItemType)=>{
    setCartItem(prev=>{
        const isItemInCart=prev.find(item=>item.id===clickedItem.id);
        if(isItemInCart)
        {
          return prev.map(item=>(
            item.id===clickedItem.id?{...item,amount:item.amount+1}:item
          )
          )
        }
        return [...prev,{...clickedItem,amount:1}]

    })
  };
  const handleRemoveFromCart=(id:number)=>{
    setCartItem(prev=>
      prev.reduce((ack,item)=>{
          if( item.id===id)
          {
            if(item.amount===1){return ack;}
            return [...ack,{...item, amount:item.amount-1}]
          }
          else{
            return [...ack,item];
          }

      } ,[] as CartItemType[] ));
  };

  if(isLoading) return <div><LinearProgress />loading</div>;
  if(error) return <div>"Somehting went wrong"</div>;
  return (  
    <div className="App">
      <Wrapper>
        <Drawer anchor='right' open={open} onClose={()=>setopen(false)}>
          <Cart cartItems={cartItem} addToCart={handleAddToCart} removeFromCart={handleRemoveFromCart}/>
          </Drawer>
          <StyledButton onClick={()=>setopen(true)}>

            <Badge badgeContent={getTotalItems(cartItem)} color='error'>
              <AddShoppingCartIcon/>
             </Badge> 
          </StyledButton>
      <Grid container spacing={3}>
        {data?.map(item=>(
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart}/>
          </Grid>
        ))}
        </Grid>
      </Wrapper>    
    </div>
  );
}

export default App;
