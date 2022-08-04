import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext, useEffect } from "react";
import GlobalStyles from "./GlobalStyles";
import Header from "./Header/Header";
import styled from "styled-components";
import HomePage from "./HomePage";
import CategoryPage from "./CategoryPage";
import NewArrivals from "./NewArrivals";
import Contact from "./Contact";
import ItemsPage from "./ItemsPage";
import UserProfile from "./UserProfile";
import OrderHistory from "./OrderHistory";
import Footer from "./Footer";
import ItemBig from "./ItemBig/ItemBig";
import BrandPage from "./BrandPage";
import Signin from "./SignIn";
import Checkout from "./CheckoutPage/Checkout";
import { ShopContext } from "./ShopContext";
import LoadingScreen from "./LoadingScreen";
import BrandsAllPage from "./BrandsAllPage";
import CategoriesAllPage from "./CategoriesAllPage";
import ReviewCartPage from "./ReviewCartPage";
import OrderConfirmation from "./OrderConfirmation";
import SearchPage from "./SearchPage";

const App = () => {
  const {
    state,
    actions: { handleCategoryAndBrandLoad, handleUserLogin },
  } = useContext(ShopContext);

  //fetch category and brands for header
  useEffect(() => {
    Promise.all([
      fetch("/api/all-categories").then((res) => res.json()),
      fetch("/api/all-brands").then((res) => res.json()),
    ]).then((data) => {
      handleCategoryAndBrandLoad(data);
    });
    // eslint-disable-next-line
  }, []);

  //get user id from local storage and fetch user data
  useEffect(() => {
    const savedUserId = JSON.parse(window.localStorage.getItem("userId"));
    if (savedUserId) {
      fetch(`/api/user?userId=${savedUserId}`)
        .then((res) => res.json())
        .then((data) => {
          handleUserLogin(data.data);
        });
    }
    // eslint-disable-next-line
  }, []);

  //save user id in local storage when user is signed in
  useEffect(() => {
    if (state.currentUser) {
      window.localStorage.setItem(
        "userId",
        JSON.stringify(state.currentUser._id)
      );
    }
    // eslint-disable-next-line
  }, [state.currentUser]);

  //conditional render based on load from fetch
  if (state.load) {
    return (
      <BrowserRouter>
        <GlobalStyles />
        <Header />
        <Main>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/categories" element={<CategoriesAllPage />} />
            <Route path="/categories/:category" element={<CategoryPage />} />
            <Route exact path="/brands" element={<BrandsAllPage />} />
            <Route path="/brands/:brand" element={<BrandPage />} />
            <Route path="/new-arrivals" element={<NewArrivals />} />
            <Route exact path="/contact" element={<Contact />} />
            <Route path="/products" element={<ItemsPage />} />
            <Route path="/user/:user" element={<UserProfile />} />
            <Route path="/order-history" element={<OrderHistory />} />
            <Route path="/item/:id" element={<ItemBig />} />
            <Route exact path="/signin" element={<Signin />} />
            <Route exact path="/checkout" element={<Checkout />} />
            <Route exact path="/review-cart" element={<ReviewCartPage />} />
            <Route
              exact
              path="/order-confirmation"
              element={<OrderConfirmation />}
            />
            <Route exact path="/reviewcard" element={<ReviewCartPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="">404: Oops!</Route>
          </Routes>
        </Main>
        <Footer />
      </BrowserRouter>
    );
  } else {
    return (
      <Wrapper>
        <LoadingScreen />
      </Wrapper>
    );
  }
};

const Main = styled.div`
  font-family: var(--font);
  min-height: calc(100vh - var(--header-height) - 220px);
`;

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default App;
