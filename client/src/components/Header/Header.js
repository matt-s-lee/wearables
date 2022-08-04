import { useContext } from "react";
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
} from "./HeaderStyledComponents";

const Header = () => {
  const { state } = useContext(ShopContext);

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
            <Nav to="/signin">
              <Collection>Sign In</Collection>
            </Nav>
          ) : (
            <Nav to={`/user/${state.currentUser._id}`}>
              <Collection>{`Hello ${state.currentUser.firstName}`}</Collection>
            </Nav>
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
