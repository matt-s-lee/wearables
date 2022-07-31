import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react';
import GlobalStyles from "./GlobalStyles";
import Header from "./Header";
import styled from "styled-components";
import HomePage from "./HomePage";
import CategoryPage from "./CategoryPage";
import Contact from "./Contact";
import ItemsPage from "./ItemsPage";
import UserProfile from "./UserProfile";
import OrderHistory from "./OrderHistory";
import Footer from "./Footer";
import ItemBig from "./ItemBig";
import BrandPage from "./BrandPage";
import Signin from "./SignIn";
import Checkout from "./Checkout";

const App = () => {
  const [bacon, setBacon] = useState(null);

  useEffect(() => {
    fetch('/bacon')
      .then(res => res.json())
      .then(data => setBacon(data));
  }, []);

  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header />
      <Main>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/category" element={<CategoryPage />} />
          <Route exact path="/brand" element={<BrandPage />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route path="/products" element={<ItemsPage />} />
          <Route path="/user/:user" element={<UserProfile />} />
          <Route path="/order-history/:id" element={<OrderHistory />} />
          <Route path="/item/:id" element={<ItemBig />} />
          <Route exact path="/signin" element={<Signin />} />
          <Route exact path="/checkout" element={<Checkout />} />
        </Routes>
        <Footer />
      </Main>

    </BrowserRouter>
  )
}

const Main = styled.div`
  height: calc(100vh - var(--header-height));
`

export default App;
