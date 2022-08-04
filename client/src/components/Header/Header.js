import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../ShopContext";
import {
  List,
  ListAfter,
  ListItem,
  Wrapper,
  Logo,
  Collection,
  Nav,
  DropWrapper,
  WrapperTop,
  WrapperTopRight,
  NavBar,
  Cart,
  History,
  Contact,
  Search,
  ToolTip,
  Nav2,
  Signout,
  Button,
} from "./HeaderStyledComponents";

const Header = () => {
  const { state, actions: { handleUserLogin } } = useContext(ShopContext);
  const navigate = useNavigate()

  const handleSignOutButton = (e) => {
    e.preventDefault();
    handleUserLogin(null)
    navigate("/")
  }

  return (
    <Wrapper>
      {/* ------------------------------ */}
      {/* ----- Top Line of Header ----- */}
      {/* ------------------------------ */}
      <WrapperTop>
        <Nav2 to="/contact">
          <Contact />
          <ToolTip>Contact Us</ToolTip>
        </Nav2>
        <Logo to="/">WEARLESS</Logo>
        <WrapperTopRight>
          <Nav2 to="/search">
            <Search />
            <ToolTip>Search</ToolTip>
          </Nav2>
          <Nav2 to="/order-history">
            <History />
            <ToolTip>Order History</ToolTip>
          </Nav2>
          <Nav2 to="/review-cart">
            <Cart />
            <ToolTip>Cart</ToolTip>
          </Nav2>
          {!state.currentUser ? (
            <Nav2 to="/signin">
              <Collection>Sign In</Collection>
            </Nav2>
          ) : (
            <Nav2 to={`/user/${state.currentUser._id}`}>
              <Collection>{`Hello ${state.currentUser.firstName}`}</Collection>
              <Signout><Button onClick={handleSignOutButton}>Sign out</Button></Signout>
            </Nav2>
          )}
        </WrapperTopRight>
      </WrapperTop>
      {/* -------------------------------------------------- */}
      {/* ----- Second Line of Header (Navigation Bar) ----- */}
      {/* -------------------------------------------------- */}
      <NavBar>
        <Nav to="/products">
          <Collection>Products</Collection>
        </Nav>
        {state.brands !== null && (
          <DropWrapper>
            <Nav to="/brands">
              <Collection>Brands</Collection>
            </Nav>
            <List>
              {/* all brands for menu received from ShopContext */}
              {state.brands.sort().map((brand) => {
                return (
                  <DropWrapper key={brand}>
                    <ListItem to={`/brands/${brand}`}>
                      <ListAfter>{brand}</ListAfter>
                    </ListItem>
                  </DropWrapper>
                );
              })}
            </List>
          </DropWrapper>
        )}
        {state.categories !== null && (
          <DropWrapper>
            <Nav to="/categories">
              <Collection>Categories</Collection>
            </Nav>
            <List>
              {/* all categories for menu received from ShopContext */}
              {state.categories.sort().map((category) => {
                return (
                  <DropWrapper key={category}>
                    <ListItem to={`/categories/${category}`}>
                      <ListAfter>{category}</ListAfter>
                    </ListItem>
                  </DropWrapper>
                );
              })}
            </List>
          </DropWrapper>
        )}
        <Nav to="/new-arrivals">
          <Collection>New Arrivals</Collection>
        </Nav>
      </NavBar>
    </Wrapper>
  );
};

export default Header;
