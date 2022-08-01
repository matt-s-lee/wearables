import Address from "ipaddr.js";
import { useState } from "react";
import styled from "styled-components";
import states from "../data/states";

//shopping cart
//a route
const Checkout = () => {
  const [country, setCountry] = useState(null);

  const selectCountry = (e) => {
    if(e.target.value === "United States"){
      setCountry("USA")
    }
    else{
    setCountry(e.target.value);
    }
  };

  return (
    <Wrapper>
      <Form>
        <Names>
          <FirstName>
            <Input
              type="text"
              class="form-control"
              id="firstName"
              placeholder="First Name"
              value=""
              required=""
            />
          </FirstName>
          <LastName>
            <Input
              type="text"
              class="form-control"
              id="lastName"
              placeholder="Last Name"
              value=""
              required=""
            />
          </LastName>
        </Names>

        <Address1>
          <Input
            type="text"
            class="form-control"
            id="address"
            placeholder="Street Address"
            required=""
          />
        </Address1>

        <Address2>
          <Input
            type="text"
            class="form-control"
            id="address2"
            placeholder="Apartment #, Suite etc.(Optional)"
          />
        </Address2>

        <Country>
          <Select
            class="custom-select"
            id="country"
            required=""
            onChange={(e) => selectCountry(e)}>
            <option value="">Choose...</option>
            <option>Canada</option>
            <option>United States</option>
          </Select>
        </Country>
        <State>
          <Select class="custom-select" id="state" required="">
            <option value="" disabled selected>
              Select a Region
            </option>
           {country !== null ? states[country].map((state) => {
              return (
                <>
                  <option value={state.name}>{state.name}</option>
                </>
              );
            }):null}
          </Select>
        </State>
        <Address2>
          <Input
            type="text"
            class="form-control"
            id="address2"
            placeholder="Apartment #, Suite etc.(Optional)"
          />
        </Address2>

        <City>
          <Input
            type="text"
            class="form-control"
            id="city"
            placeholder="City"
          />
        </City>

        <PostalCode>
          <Input
            type="text"
            class="form-control"
            id="city"
            placeholder="Postal Code/Pin Code"
          />
        </PostalCode>
        
        <PaymentMethods>
          <div class="custom-control custom-radio">
            <input
              id="credit"
              name="paymentMethod"
              type="radio"
              class="custom-control-input"
              required=""
            />  
            <label class="custom-control-label" for="credit">
              Credit card
            </label>
          </div>
          <div class="custom-control custom-radio">
            <input
              id="debit"
              name="paymentMethod"
              type="radio"
              class="custom-control-input"
              required=""
            />
            <label class="custom-control-label" for="debit">
              Debit card
            </label>
          </div>
          <div class="custom-control custom-radio">
            <input
              id="paypal"
              name="paymentMethod"
              type="radio"
              class="custom-control-input"
              required=""
            />
            <label class="custom-control-label" for="paypal">
              Paypal
            </label>
          </div>
        </PaymentMethods>
        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="cc-name">Name on card</label>
            <input
              type="text"
              class="form-control"
              id="cc-name"
              placeholder=""
              required=""
            />
    
          </div>
          <div class="col-md-6 mb-3">
            <label for="cc-number">Credit card number</label>
            <input
              type="text"
              class="form-control"
              id="cc-number"
              placeholder=""
              required=""
            />
          </div>
        </div>
        <div class="row">
          <div class="col-md-3 mb-3">
            <label for="cc-expiration">Expiration</label>
            <input
              type="text"
              class="form-control"
              id="cc-expiration"
              placeholder=""
              required=""
            />
          </div>
          <div class="col-md-3 mb-3">
            <label for="cc-expiration">CVV</label>
            <input
              type="text"
              class="form-control"
              id="cc-cvv"
              placeholder=""
              required=""
            />
          </div>
        </div>
        <button class="btn btn-primary btn-lg btn-block" type="submit">
          Continue to checkout
        </button>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  font-family: var(--font);
`;
const Form = styled.form``;
const Names = styled.div`
  display: flex;
`;
const FirstName = styled.div``;
const LastName = styled.div``;
const Input = styled.input`
  padding: 10px;
`;
const Address2 = styled.div``;
const Address1 = styled.div``;
const Country = styled.div``;
const Select = styled.select``;
const State = styled.div``;
const City = styled.div``;
const PostalCode = styled.div``;
const PaymentMethods = styled.div``;
export default Checkout;
