import styled from "styled-components";

// ------------------------------------------------
// Main div
export const Wrapper = styled.div`
  font-family: var(--font);
  margin: 0 24px;
  box-sizing: border-box;
  display: flex;

`;
// ------------------------------------------------
// Header
export const H1 = styled.h1`
  font-size: 24px;
  padding: 15px 24px;
  font-family: var(--font);
  margin: 0 24px;
`;
// ------------------------------------------------
// Form
export const Form = styled.form`
  box-sizing: border-box;
  border: 1px solid #E8E8E8;
  width: 50%;
  font-family: var(--font);
  margin: 0 24px;
  height:650px;
`;

export const Names = styled.div`
  display: flex;
`;
export const FirstName = styled.div`
  width: 50%;
`;
export const LastName = styled.div`
  width: 50%;
`;

export const Input = styled.input`
  padding: 10px;
  width: calc(100% - 40px);
  margin: 10px 20px 10px 20px;
  font-family: var(--font);
`;
export const Address2 = styled.div`
`;
export const Address1 = styled.div``;
export const Country = styled.div``;
export const Select = styled.select`
  padding: 10px;
  width: calc(100% - 40px);
  margin: 10px 20px 10px 20px;
  font-family: var(--font);
`;
export const State = styled.div``;
export const City = styled.div``;
export const PostalCode = styled.div``;
export const PhoneNumber = styled.div``;
export const Button = styled.button`
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

export const OrderSummary = styled.div``;
export const OrderDetails = styled.div`
border-bottom:1px solid black;
border-top:1px solid black;
margin: 10px 20px 10px 20px;
`
export const Name = styled.div`
margin: 50px 0px 20px 0px;
width:400px;
`;
export const Img = styled.img`
  margin: 10px 20px 20px 0px;`;

export const Price = styled.div`
margin: 50px 0px 20px 0px;
align-items:right;
`;

export const Quantity = styled.div`
margin: 50px 0px 20px 0px;
`
export const Order = styled.div`
display:flex;
justify-content:space-between;
margin: 10px 20px 10px 20px;
flex-wrap:nowrap;
`
export const Subtotal = styled.div`
display:flex;
margin: 10px 20px 10px 20px;
gap : 500px;
border-bottom: 1px solid #E8E8E8;
`
export const SubtotalHead = styled.div`
margin: 10px 20px 10px 20px;
font-size: 20px;
`
export const Sum = styled.div`
margin: 10px 20px 10px 20px;
`
export const H2 = styled.h1`
  font-size: 24px;
  padding: 15px 24px;
  font-family: var(--font);
  margin: 0 24px;
`;

export const Headings = styled.div`
display:flex;
gap:41%;
`
export const PriceAndQuantity = styled.div`
display:flex;
gap : 20px;
`
export const Error = styled.div`
color:red;
margin: 0 24px;
`