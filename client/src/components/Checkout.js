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
  let cartItems1 = [];

  const userId = "abc12321"; // hard-coded user, until we can create new users

  useEffect(() =>{
    fetch(`/api/all-items-in-cart/${userId}`)
    .then((res) => res.json())
    .then((json) => {
      setCartItems(json.data.items);
      console.log(cartItems)
    });
    if(cartItems){
      cartItems.map(item =>{
        console.log(item.itemId)
      })
    Promise.all(cartItems.map(item =>
        fetch(`/api/users/${item.itemId}`).then(resp => resp.json())
    )).then(data => {
      console.log(data);
        data.forEach(function(obj){
          cartItems1.push(obj)
        })
        setCartItemsArray(cartItems1)
    })
    console.log(cartItemsArray);
}
  },[])

  const selectCountry = (e) => {
    if (e.target.value === "United States") {
      setCountry("USA");
    } else {
      setCountry(e.target.value);
    }
  };

  return (
    <>
      <H1>Checkout</H1>
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
          <H1>Order summary</H1>

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
export default Checkout;
