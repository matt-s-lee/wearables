import { useContext } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { ShopContext } from "./ShopContext";

//nav bar
const Header = () => {
  const {state} = useContext(ShopContext);

  return (
    <Wrapper>
      <WrapperTop>
        <Nav to="/contact">Contect Us</Nav>
        <Logo to="/" >Logo</Logo>
        <Nav to="/signin">Sign In</Nav>
      </WrapperTop>
      <NavBar>
        <Nav to="/products">Products</Nav>
        {(state.brands !== null) && 
          <Nav to="/brands">Brands</Nav>
        }
        {(state.categories !== null) &&
          <Nav to="/categories">Categories</Nav>
        }

      </NavBar>
    </Wrapper>
  )
}

const Wrapper = styled.header`
  height: var(--header-height);
  
  font-family: var(--font);
`

const WrapperTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
`

const Nav = styled(NavLink)`
  text-decoration: none;
  cursor: pointer;
  padding: 0 var(--padding-page);
`

const Logo = styled(Nav)`
  font-family: var(--font-logo);
  font-size: 48px;
`

const NavBar = styled.div`
  padding: 10px 0;
`

export default Header;