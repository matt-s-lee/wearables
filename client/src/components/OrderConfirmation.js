import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import LoadingScreen from "./LoadingScreen";
import { ShopContext } from "./ShopContext";

const OrderConfirmation = () => {
  // GET userId from ShopContext
  const { state } = useContext(ShopContext);
  const userId = state.currentUser._id;
  const [orderedItems, setOrderedITems] = useState(null);

  useEffect(() => {
    const getOrderDetails = async () => {
      const response = await fetch(`/api/all-orders-by-user/${userId}`);
      const data = await response.json();
      const orderArray = data.data[data.data.length - 1];
      setOrderedITems(orderArray);
    };
    getOrderDetails();
  }, []);

  useEffect(() => {
    const deleteShoppingCart = async () => {
      await fetch(`/api/empty-cart/${userId}`, { method: "Delete" });
    };
    deleteShoppingCart();
  }, []);

  if (orderedItems) {
    console.log(orderedItems);
    return (
      <WrapAll>
        <Wrapper>
          <Messages>
            <ThankyouMessage>
              Thank you for shopping at WEARLESS!!!
            </ThankyouMessage>
            <RecievedMessage>
              We have received your order and will send you another email when
              your package ships.
            </RecievedMessage>
            <OrderDetailHead>
              Order Confirmation ID : {orderedItems.OrderId}
            </OrderDetailHead>
          </Messages>
          <ProgressBar>
            <UL>
              <Li>
                Order
                <br /> Confirmed
              </Li>
              <Li>
                Order
                <br /> Shipped
              </Li>
              <Li>
                Order
                <br /> Delivered
              </Li>
            </UL>
          </ProgressBar>
        </Wrapper>
      </WrapAll>
    );
  } else {
    return (
      <Wrapper>
        <LoadingScreen />
      </Wrapper>
    );
  }
};
const WrapAll = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 var(--padding-page);
`;

const Wrapper = styled.div`
  font-family: var(--font);
  margin: 0 24px;
  box-sizing: border-box;
  display: flex;
  border: 1px solid #e8e8e8;
  width: 50%;
  flex-direction: column;
`;
const Messages = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 10px 10px 10px;
`;
const ThankyouMessage = styled.div`
  color: #004cb9;
  margin: 10px 10px 10px 10px;
  font-size: 24px;
`;
const RecievedMessage = styled.div`
  margin: 10px 10px 10px 10px;
`;
const OrderDetailHead = styled.div`
  margin: 10px 10px 10px 10px;
`;

const ProgressBar = styled.div`
  counter-reset: step;
  margin: 0 24px;
`;
const UL = styled.ul``;
const Li = styled.li`
  list-style-type: none;
  width: 30%;
  margin: 10px 10px 10px 10px;
  float: left;
  position: relative;
  text-align: left;
  &:before {
    content: counter(step);
    counter-increment: step;
    width: 30px;
    height: 30px;
    display: block;
    text-align: center;
    border: 1px solid #e8e8e8;
    border-radius: 50px;
    margin-bottom: 10px;
    padding: 0px;
  }
  &:after {
    position: absolute;
    width: 96.5%;
    height: 5px;
    background-color: #e8e8e8;
    top: 10px;
    content: "";
    left: 0;
    z-index: -1;
  }
  &:nth-child(1):after {
    background-color: green;
    left: 30px;
  }
  &:nth-child(2):after {
    background-color: #e8e8e8;
    left: 30px;
  }
  &:nth-child(3):after {
    background-color: #e8e8e8;
    left: 30px;
  }
`;
export default OrderConfirmation;
