import Address from "ipaddr.js";
import { useState,useEffect } from "react";
import styled from "styled-components";
import states from "../data/states";

//shopping cart
//a route
const Checkout = () => {
  const [country, setCountry] = useState(null);

  const [cartItems, setCartItems] = useState(null);
  const [cartItemsArray,setCartItemsArray] = useState([]);
  const [flag,setFlag] = useState(false);
  let total = 0;
  let [finalSum,setFinalSum] = useState(0);
  let price = 0;
  let count = 0;
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
    Promise.all(cartItems.map(item =>
        fetch(`/api/item/${item.itemId}`).then(resp => resp.json())
    )).then(data => {
        data.forEach(function(obj){
          cartItems1.push(obj)
        })
        setCartItemsArray(cartItems1)
    })
  }

  //Calculate the total price fo the order
  if(cartItemsArray){
    cartItemsArray.forEach((item =>{
       price = parseFloat((item.data.price).replace("$",''));
       total = total+price;
       setFinalSum(total);
      count ++;
    }))
    if(count === cartItemsArray.length){
     setFinalSum(total);
    }
  }
  },[cartItems])

  //Method to set the country based on the country dropdown selection
  const selectCountry = (e) => {
    if (e.target.value === "United States") {
      setCountry("USA");
    } else {
      setCountry(e.target.value);
    }
  };

  return (
    <>
    <Headings>
      <H1>Checkout</H1>
      <H2>Order summary</H2>
      </Headings>
      <Wrapper>
        <Form>
          <Names>
            <FirstName>
              <Input type="text" placeholder="First Name" required="" />
            </FirstName>
            <LastName>
              <Input type="text" placeholder="Last Name" required="" />
            </LastName>
          </Names>

          <Address1>
            <Input type="text" id="address" placeholder="Street Address" />
          </Address1>

          <Address2>
            <Input
              type="text"
              id="address2"
              placeholder="Apartment #, Suite etc.(Optional)"
            />
          </Address2>

          <Country>
            <Select id="country" required="" onChange={(e) => selectCountry(e)}>
              <option value="" disabled selected>
                Choose a Country
              </option>
              <option>Canada</option>
              <option>United States</option>
            </Select>
          </Country>
          <State>
            <Select id="state" required="">
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
            <Input type="text" id="city" placeholder="City" />
          </City>

          <PostalCode>
            <Input
              type="text"
              id="postalCode"
              placeholder="Postal Code/Pin Code"
            />
          </PostalCode>

          <PhoneNumber>
            <Input type="text" id="number" placeholder="Phone" />
          </PhoneNumber>

          <Button type="submit">NEXT: PAYMENT</Button>
        </Form>
        <OrderSummary>
          <OrderDetails>
            {cartItemsArray !== null?
            cartItemsArray.map((item,index) =>{
             return(
               <Order>
               <Img src = {item.data.imageSrc}/>
               <Name>{item.data.name}</Name>
               <Price>{item.data.price}</Price>
               </Order>
             )
            }):null}
          </OrderDetails>
          <Subtotal>
              <SubtotalHead>SUBTOTAL</SubtotalHead>
              {finalSum !==0?<Sum>${finalSum}</Sum>:null}
            </Subtotal>
            <Subtotal>
              <SubtotalHead>SHIPPING</SubtotalHead>
              {finalSum !==0?<Sum>$0</Sum>:null}
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
margin: 50px 20px 20px 20px;
`;
const Img = styled.img`
 margin: 10px 20px 20px 0px;`;
 
const Price = styled.div`
margin: 50px 20px 20px 20px;
align-items:right;
`;
const Order = styled.div`
display:flex;
justify-content:space-between;
margin: 10px 20px 10px 20px;
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

export default Checkout;
