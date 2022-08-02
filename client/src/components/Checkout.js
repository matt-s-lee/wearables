import Address from "ipaddr.js";
import { useState,useEffect, useDebugValue } from "react";
import styled from "styled-components";
import states from "../data/states";
import OrderConfirmation from "./OrderConfirmation";
import { useNavigate } from "react-router-dom";
//shopping cart
//a route
const Checkout = () => {
  const [country, setCountry] = useState(null);
  const [cartItems, setCartItems] = useState(null);
  const [cartItemsArray,setCartItemsArray] = useState([]);
  const [flag,setFlag] = useState(false);
  const [orderPlaced,setOrderPlaced] = useState(false);
  let navigate = useNavigate();

  let total =0;
  let cartItems1 = [];

  const userId = "abc12321"; // hard-coded user, until we can create new users

  //Get all the items in the cart of the user
  useEffect(() =>{
    const getCartDetails = async () => {
      const response = await   fetch(`/api/all-items-in-cart/${userId}`)
      const data = await response.json();
      setCartItems(data.data.items);
    };
    getCartDetails();
  }, []);

    //Iterate through the items in the cart of the user and fetch the 
    //item details from the items collection
    useEffect(() =>{
      if(cartItems){
        console.log(cartItems);
    Promise.all(cartItems.map(item =>
        fetch(`/api/item/${item.itemId}`).then(resp => resp.json())
    )).then(data => {
        data.forEach(function(obj){
          cartItems1.push(obj.data)
        })
        setCartItemsArray(cartItems1)
    })
  }
  },[cartItems])

  const totalCost = () =>{
      //Calculate the total price fo the order
  if(cartItemsArray.length){
    cartItems.forEach((cartItem) =>{
      cartItemsArray.forEach((item) =>{
        if(item._id === cartItem.itemId){
          total = total+cartItem.quantity*parseFloat((item.price).replace("$",''))
        }
      })
    })
  }
  return total.toFixed(2);
  }

  //Method to set the country based on the country dropdown selection
  const selectCountry = (e) => {
    if (e.target.value === "United States") {
      setCountry("USA");
    } else {
      setCountry(e.target.value);
    }
  };

  const placeyourOrder = (e) =>{
    e.preventDefault();
    fetch("/api/add-order",{
      method:"POST",
      body:JSON.stringify({
        items:cartItemsArray,
      }),
      headers:{
        "Content-Type" : "application/json",
      }
    })   .then((res) => res.json())
    .then((data) => {
      // show confirmation that it was added to the orders
      navigate(`/order-confirmation`);
    });
  }

  return (
    <>
    <Headings>
      <H1>Checkout</H1>
      <H2>Order summary</H2>
      </Headings>
      <Wrapper>
        <Form onSubmit={(e) => placeyourOrder(e)}>
          <Names>
            <FirstName>
              <Input type="text" placeholder="First Name" required />
            </FirstName>
            <LastName>
              <Input type="text" placeholder="Last Name" required />
            </LastName>
          </Names>

          <Address1>
            <Input type="text" id="address" placeholder="Street Address" required/>
          </Address1>

          <Address2>
            <Input
              type="text"
              id="address2"
              placeholder="Apartment #, Suite etc.(Optional)"
            />
          </Address2>

          <Country>
            <Select id="country" required="" onChange={(e) => selectCountry(e)} required>
              <option value="" disabled selected>
                Choose a Country
              </option>
              <option>Canada</option>
              <option>United States</option>
            </Select>
          </Country>
          <State>
            <Select id="state" required>
              <option value="" disabled selected>
                Select a Region
              </option>
              {country !== null
                ? states[country].map((state) => {
                    return (
                      <>
                        <option value={state.name}>{state.name}</option>
                      </>
                    );
                  })
                : null}
            </Select>
          </State>
          <Address2>
            <Input
              type="text"
              id="address2"
              placeholder="Apartment #, Suite etc.(Optional)"
            />
          </Address2>

          <City>
            <Input type="text" id="city" placeholder="City" required/>
          </City>

          <PostalCode>
            <Input
              type="text"
              id="postalCode"
              placeholder="Postal Code/Pin Code"
              required
            />
          </PostalCode>

          <PhoneNumber>
            <Input type="text" id="number" placeholder="Phone" required/>
          </PhoneNumber>

          <Button type="submit">PLACE YOUR ORDER</Button>
        </Form>
        <OrderSummary>
          <OrderDetails>
            {cartItemsArray !== null?
            cartItemsArray.map((item,index) =>{
             return(
               <Order>
               <Img src = {item.imageSrc}/>
               <Name>{item.name}</Name>
               {cartItems.map((cartItem) =>(
                <PriceAndQuantity>{cartItem.itemId === item._id ? <><Quantity>x{cartItem.quantity}</Quantity>
                <Price>${cartItem.quantity*parseFloat((item.price).replace("$",'')).toFixed(2)}</Price></>
                :null}</PriceAndQuantity>
               ))}
               </Order>
             )
            }):null}
          </OrderDetails>
          <Subtotal>
              <SubtotalHead>SUBTOTAL</SubtotalHead>
              <Sum>${totalCost()}</Sum>
            </Subtotal>
            <Subtotal>
              <SubtotalHead>SHIPPING</SubtotalHead>
              <Sum>$0</Sum>
            </Subtotal>
        </OrderSummary>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  font-family: var(--font);
  margin: 0 24px;
  box-sizing: border-box;
  display: flex;
`;
const H1 = styled.h1`
  font-size: 24px;
  padding: 15px 24px;
  font-family: var(--font);
  margin: 0 24px;
`;
const Form = styled.form`
  box-sizing: border-box;
  border: 1px solid #E8E8E8;
  width: 50%;
  font-family: var(--font);
  margin: 0 24px;
  height:630px;
`;

const Names = styled.div`
  display: flex;
`;
const FirstName = styled.div`
  width: 50%;
`;
const LastName = styled.div`
  width: 50%;
`;

const Input = styled.input`
  padding: 10px;
  width: calc(100% - 40px);
  margin: 10px 20px 10px 20px;
  font-family: var(--font);
   {
    word-break: break-all;
  }
`;
const Address2 = styled.div``;
const Address1 = styled.div``;
const Country = styled.div``;
const Select = styled.select`
  padding: 10px;
  width: calc(100% - 40px);
  margin: 10px 20px 10px 20px;
  font-family: var(--font);
`;
const State = styled.div``;
const City = styled.div``;
const PostalCode = styled.div``;
const PhoneNumber = styled.div``;
const Button = styled.button`
font-family: var(--font);
  padding: 10px;
  width: calc(100% - 40px);
  margin: 10px 20px 10px 20px;
  border: none;
  background: #ffa500;
  &:hover {
    color: white;
  }
`;

const OrderSummary = styled.div``;
const OrderDetails = styled.div`
border-bottom:1px solid black;
border-top:1px solid black;
margin: 10px 20px 10px 20px;
`
const Name = styled.div`
margin: 50px 0px 20px 0px;
width:400px;
`;
const Img = styled.img`
 margin: 10px 20px 20px 0px;`;
 
const Price = styled.div`
margin: 50px 0px 20px 0px;
align-items:right;
`;

const Quantity = styled.div`
margin: 50px 0px 20px 0px;
`
const Order = styled.div`
display:flex;
justify-content:space-between;
margin: 10px 20px 10px 20px;
flex-wrap:nowrap;
`
const Subtotal = styled.div`
display:flex;
margin: 10px 20px 10px 20px;
gap : 500px;
border-bottom: 1px solid #E8E8E8;
`
const SubtotalHead = styled.div`
margin: 10px 20px 10px 20px;
font-size: 20px;
`
const Sum = styled.div`
margin: 10px 20px 10px 20px;
`
const H2 = styled.h1`
  font-size: 24px;
  padding: 15px 24px;
  font-family: var(--font);
  margin: 0 24px;
`;

const Headings = styled.div`
display:flex;
gap:41%;
`
const PriceAndQuantity = styled.div`
display:flex;
gap : 20px;
`
export default Checkout;
