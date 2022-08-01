import { useContext } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { ShopContext } from "./ShopContext";
import { underline, underlineTransition } from "./underline";

//nav bar
const Header = () => {
  const { state } = useContext(ShopContext);

  return (
    <Wrapper>
      <WrapperTop>
        <Nav to="/contact">
          <Collection>Contact Us</Collection>
        </Nav>
        <Logo to="/" >Logo</Logo>
        <Nav to="/signin">
          <Collection>Sign In</Collection>
        </Nav>
      </WrapperTop>
      <NavBar>
        <Nav to="/products">
          <Collection>Products</Collection>
        </Nav>
        {(state.brands !== null) &&
          <DropWrapper>
            <Nav to="/brands">
              <Collection>Brands</Collection>
            </Nav>
            <List>
              {state.brands.map(brand => {
                return (
                  <DropWrapper>
                    <ListItem>
                      <ListAfter>
                        {brand}
                      </ListAfter>
                    </ListItem>
                  </DropWrapper>
                )
              })}
            </List>
          </DropWrapper>
        }
        {(state.categories !== null) &&
          <DropWrapper>
            <Nav to="/categories">
              <Collection>Categories</Collection>
            </Nav>
            <List>
              {state.categories.map(category => {
                return (
                  <DropWrapper>
                    <ListItem>
                      <ListAfter>
                        {category}
                      </ListAfter>
                    </ListItem>
                  </DropWrapper>
                )
              })}
            </List>
          </DropWrapper>
        }
        <Nav to="/new-arrivals">
          <Collection>New Arrivals</Collection>
        </Nav>
      </NavBar>
    </Wrapper>
  )
}



const List = styled.ul`
  max-height: 555px;
  visibility: hidden;
  position: absolute;
  text-decoration: none;
  overflow: auto;
  background-color: rgb(211, 211, 211);
  left: 10%;
  white-space: nowrap;
  padding: 0 10px 5px 0;
  z-index: 10;
  &:hover {
    visibility: visible;
  }
`

const ListAfter = styled.div`
  position: relative;
  &:after {
    ${underline}
  }
`

const ListItem = styled.li`
  padding: 12px 24px;
  font-size: 18px;
  width: fit-content;
  cursor: pointer;
  &:hover ${ListAfter}:after{
    ${underlineTransition}
  } 
`

const DropWrapper = styled.div`
  position: relative;
`

const Wrapper = styled.header`
  height: var(--header-height);
  
  font-family: var(--font);
`

const Logo = styled(NavLink)`
  text-decoration: none;
  cursor: pointer;
  font-family: var(--font-logo);
  font-size: 48px;
  color: black;
`

const Collection = styled.div`
  position: relative;
  &:after{
    ${underline}
    background-color: white;
  }
`

const Nav = styled(NavLink)`
  text-decoration: none;
  cursor: pointer;

  padding: 15px 24px;
  font-size: 24px;
  color: white;
  display: inline-flex;
  justify-content: center;
  align-items: center;

  &:hover ${Collection}:after{
    ${underlineTransition}
  } 
  &:hover + ${List} {
    visibility: visible;
  }
`

const WrapperTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  & ${Collection}:after {
    background: black;
  }
  & ${Nav} {
    color: black;
    background-color: white;
    margin: 0 24px;
  }
`

const NavBar = styled.div`
  display: flex;
  justify-content: space-evenly;
  height: fit-content;
  width: 100%;
  background-color: black;
`

export default Header;