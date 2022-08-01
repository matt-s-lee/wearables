import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext, useEffect } from 'react';
import GlobalStyles from "./GlobalStyles";
import Header from "./Header";
import styled from "styled-components";
import HomePage from "./HomePage";
import CategoryPage from "./CategoryPage";
import NewArrivals from "./NewArrivals";
import Contact from "./Contact";
import ItemsPage from "./ItemsPage";
import UserProfile from "./UserProfile";
import OrderHistory from "./OrderHistory";
import Footer from "./Footer";
import ItemBig from "./ItemBig";
import BrandPage from "./BrandPage";
import Signin from "./SignIn";
import Checkout from "./Checkout";
import { ShopContext } from "./ShopContext";
import LoadingScreen from "./LoadingScreen";

const App = () => {
  const { state, actions: { handleCategoryAndBrandLoad } } = useContext(ShopContext);

  //fetch category and brands for header
  useEffect(() => {
    Promise.all([
      fetch("/api/all-categories").then(res => res.json()),
      fetch("/api/all-brands").then(res => res.json()),
    ]).then(data => {
      // console.log(data)
      handleCategoryAndBrandLoad(data)
    })
    // eslint-disable-next-line
  }, [])

  if (state.load) {
    return (
      <BrowserRouter>
        <GlobalStyles />
        <Header />
        <Main>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/categories" element={<CategoryPage />} />
            <Route exact path="/brands" element={<BrandPage />} />
            <Route path="/new-arrivals" element={<NewArrivals />} />
            <Route exact path="/contact" element={<Contact />} />
            <Route path="/products" element={<ItemsPage />} />
            <Route path="/user/:user" element={<UserProfile />} />
            <Route path="/order-history/:id" element={<OrderHistory />} />
            <Route path="/item/:id" element={<ItemBig />} />
            <Route exact path="/signin" element={<Signin />} />
            <Route exact path="/checkout" element={<Checkout />} />
            <Route path="">404: Oops!</Route>
          </Routes>
          <Footer />
        </Main>
      </BrowserRouter>
    );
  }
  else {
    return (
      <Wrapper>
        <LoadingScreen />
      </Wrapper>
    )
  }

};

const Main = styled.div`
  height: calc(100vh - var(--header-height));
`;

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default App;
