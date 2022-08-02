import styled from "styled-components"
import { useState,useEffect } from "react";

const OrderConfirmation = () =>{
  //Get all the items ordered by the user
  const userId = "abc12321"; // hard-coded user, until we can create new users
  const [orderedItems, setOrderedITems] = useState(null);

  useEffect(() =>{
    const getORderDetails = async () => {
      const response = await   fetch(`/api/all-items-in-cart/${userId}`)
      const data = await response.json();
      setOrderedITems(data.data.items);
    };
    getORderDetails();
  }, []);


    return(
        <Wrapper>
        <Messages>
        <ThankyouMessage>Thank you for shopping at WEARLESS!!!</ThankyouMessage>
        <RecievedMessage>We have received your order and will send you another email when your package ships. Find detailed information below.</RecievedMessage>
        </Messages>
        </Wrapper>
    )
}

const Wrapper = styled.div`
 font-family: var(--font);
  margin: 0 24px;
  box-sizing: border-box;
  display: flex;
`
const Messages = styled.div`
display:flex;
flex-direction:column;
`
const ThankyouMessage = styled.div`
`
const RecievedMessage = styled.div`
`
export default OrderConfirmation