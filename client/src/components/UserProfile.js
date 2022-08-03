import { useContext } from "react";
import styled from "styled-components";
import { ShopContext } from "./ShopContext";


const UserProfile = () => {

  const {state} = useContext(ShopContext)

  return (
    <Wrapper>
      UserProfile
    </Wrapper>
  )
}

const Wrapper = styled.div`

`

export default UserProfile;

