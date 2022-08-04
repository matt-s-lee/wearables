import { useContext } from "react";
import styled from "styled-components";
import { ShopContext } from "./ShopContext";
import { AiOutlineArrowRight } from "react-icons/ai";

const UserProfile = () => {
  const {state} = useContext(ShopContext);

  return (
    <Wrapper>
      <UserWrapper>
        <Text>{`Name: ${state.currentUser.firstName} ${state.currentUser.lastName}`}</Text>
        <Text>{`Email: ${state.currentUser.email}`}</Text>
        <Text>{`Password: `}<AiOutlineArrowRight/><Password>Don't come crying to me when you're hacked. </Password></Text>
      </UserWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  font-family: var(--font);
  
`

const UserWrapper = styled.div`
  padding: 10px 20px;
  outline: 1px solid black;
`

const Text = styled.div`
  padding: 5px 0;
`

const Password = styled.span`
  color: white;
`

export default UserProfile;

