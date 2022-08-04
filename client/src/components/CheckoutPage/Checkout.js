import { useState, useEffect, useContext } from "react";
import states from "../../data/states";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../ShopContext";
import LoadingScreen from "../LoadingScreen";
import {
  Headings,
  H1,
  H2,
  Wrapper,
  Form,
  Names,
  FirstName,
  LastName,
  Input,
  Address1,
  Address2,
  Country,
  State,
  Select,
  City,
  PostalCode,
  PhoneNumber,
  Button,
  OrderSummary,
  OrderDetails,
  Order,
  Img,
  Name,
  PriceAndQuantity,
  Quantity,
  Price,
  Subtotal,
  SubtotalHead,
  Sum,
  Error
} from "./checkoutStyledComponents";

//shopping cart
//a route
const Checkout = () => {
  const [country, setCountry] = useState(null);
  const [cartItems, setCartItems] = useState(null);
  const [cartItemsArray, setCartItemsArray] = useState([]);
  const [phone,setPhone] = useState(null);
  const [phoneErr,setPhoneErr] = useState(false);
  const [clicked,setClicked] = useState(false);

  let navigate = useNavigate();

  let total = 0;
  let cartItems1 = [];

  // GET userId from ShopContext
  const { state } = useContext(ShopContext);
  const userId = state.currentUser;

  //Get all the items in the cart of the user
  useEffect(() => {
    const getCartDetails = async () => {
      const response = await fetch(`/api/all-items-in-cart/${userId._id}`);
      const data = await response.json();
      setCartItems(data.data.items);
    };
    if (userId) {
      getCartDetails();
    }
  }, []);

  //Iterate through the items in the cart of the user and fetch the
  //item details from the items collection
  useEffect(() => {
    if (cartItems) {
      Promise.all(
        cartItems.map((item) =>
          fetch(`/api/item/${item.itemId}`).then((resp) => resp.json())
        )
      ).then((data) => {
        data.forEach(function (obj) {
          cartItems1.push(obj.data);
        });
        setCartItemsArray(cartItems1);
      });
    }
  }, [cartItems]);

  const totalCost = () => {
    //Calculate the total price fo the order
    if (cartItemsArray.length) {
      cartItems.forEach((cartItem) => {
        cartItemsArray.forEach((item) => {
          if (item._id === cartItem.itemId) {
            total =
              total +
              cartItem.quantity * parseFloat(item.price.replace("$", ""));
          }
        });
      });
    }
    return total.toFixed(2);
  };

  //Method to set the country based on the country dropdown selection
  const selectCountry = (e) => {
    if (e.target.value === "United States") {
      setCountry("USA");
    } else {
      setCountry(e.target.value);
    }
  };

  const phonenum = (e) =>{
    setPhone(e.target.value);
  }
  //When place your order button is clicked, this method gets called and adds the order placed the orders db collection
  const placeyourOrder = (e) => {
    setPhoneErr(false);
    setClicked(true);
    e.preventDefault();
    //check if phone number is valid. giving regex phone number format to check if it matches with the phone number entered, if its valid continues to post the order and goes to the order confirmation
    let phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if(phone.match(phoneno))
       {
    fetch("/api/add-order", {
      method: "POST",
      body: JSON.stringify({
        items: cartItemsArray,
        userId:userId._id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // show confirmation that it was added to the orders
        navigate(`/order-confirmation`);
      });
  }
  //if the phone number doesn't match with the expected format, setPhoneErr to true
  else{
    setPhoneErr(true);
  }
}

  //If cartItemsArray is not empty, form is rendered
  //Form has input firstname, lastname,street address,apartment,country,city,pin code, phone and button to place the order
  if (cartItemsArray.length > 0) {
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
              <Input
                type="text"
                id="address"
                placeholder="Street Address"
                required
              />
            </Address1>

            <Address2>
              <Input
                type="text"
                id="address2"
                placeholder="Apartment #, Suite etc.(Optional)"
              />
            </Address2>

            <Country>
              <Select id="country" onChange={(e) => selectCountry(e)} required>
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
              <Input type="text" id="city" placeholder="City" required />
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
              <Input
                type="tel"
                id="phone"
                placeholder="Format: 123-456-7890 or 1234567890"
                onChange={(e) => phonenum(e)}
              >
              </Input>
            </PhoneNumber>
            {clicked === true && phoneErr === true?<Error>Please Enter Valid Phone Number</Error>:null}
            <Button type="submit">PLACE YOUR ORDER</Button>
          </Form>
          <OrderSummary>
            <OrderDetails>
              {cartItemsArray !== null
                ? cartItemsArray.map((item, index) => {
                    return (
                      <Order>
                        <Img src={item.imageSrc} />
                        <Name>{item.name}</Name>
                        {cartItems.map((cartItem) => (
                          <PriceAndQuantity>
                            {cartItem.itemId === item._id ? (
                              <>
                                <Quantity>x{cartItem.quantity}</Quantity>
                                <Price>
                                  $
                                  {(cartItem.quantity *
                                    parseFloat(
                                      item.price.replace("$", "")
                                    )).toFixed(2)}
                                </Price>
                              </>
                            ) : null}
                          </PriceAndQuantity>
                        ))}
                      </Order>
                    );
                  })
                : null}
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
  } else {
    return (
      <Wrapper load="true">
        <LoadingScreen />
      </Wrapper>
    );
  }
};

export default Checkout;
