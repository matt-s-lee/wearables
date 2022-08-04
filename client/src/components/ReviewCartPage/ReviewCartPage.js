import { useEffect, useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { ShopContext } from "../ShopContext";
import { IoAddSharp, IoRemoveOutline } from "react-icons/io5";
import SnackbarComponent from "../SnackbarComponent";

import {
  YourCart,
  ItemsNum,
  EmptyCart,
  Review,
  ItemDetails,
  ItemRow,
  ItemHeader,
  ItemData,
  ItemName,
  ItemPrice,
  ItemPic,
  ChangeQuantity,
  Cost,
  CostDetails,
  CostRow,
  CostTotal,
  CostHeader,
  CostData,
  AddToCart,
  LoadWrapper,
} from "./reviewCartStyledComponents";
import LoadingScreen from "../LoadingScreen";

// ------------------------------------------------

const ReviewCartPage = () => {
  let navigate = useNavigate();

  const [snackbarOpen, setSnackbarOpen] = useState(false); // state to open Snackbar

  const [cartItems, setCartItems] = useState(null); // array of item ID #s
  const [cartItemsArray, setCartItemsArray] = useState([]); // array of item data
  let cartItems1 = []; // empty array of items to be pushed into

  let [outOfStock, setOutOfStock] = useState(false); // state to track if item out of stock
  let total = 0;

  const { state } = useContext(ShopContext); // brands
  let currentUser = state.currentUser;

  // ------------------------------------------------
  // ----------------- HELPERS ----------------------
  // ------------------------------------------------

  // ---------------------------------------------------
  // GET ID #s of all items in the user's cart, on mount
  // ---------------------------------------------------
  const getCartDetails = async () => {
    if (currentUser) {
      // const response = await fetch(`/api/all-items-in-cart/${userId}`);
      const response = await fetch(`/api/all-items-in-cart/${currentUser._id}`);
      const data = await response.json();
      setCartItems(data.data.items);
    }
  };
  useEffect(() => {
    getCartDetails();
  }, []);

  // --------------------------------------------------------------------
  // GET data for each item in the cart (using item ID #s received above)
  // --------------------------------------------------------------------
  useEffect(() => {
    if (cartItems) {
      Promise.all(
        cartItems.map((item) =>
          fetch(`/api/item/${item.itemId}`).then((resp) => resp.json())
        )
      ).then((data) => {
        data.forEach((item) => {
          cartItems1.push(item.data);
        });
        setCartItemsArray(cartItems1);
      });
    }
  }, [cartItems]);

  // -------------------------
  // DELETE item from the cart
  // -------------------------
  const handleRemove = (_id) => {
    setOutOfStock(false);
    if (currentUser) {
      fetch("/api/delete-item-in-cart", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // user: userId,
          user: currentUser._id,
          item: _id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            setSnackbarOpen(true);
            getCartDetails();
          }
        });
    }
  };

  // -----------------
  // ADD item to cart
  // -----------------
  const handleAdd = (_id) => {
    setOutOfStock(false);
    if (currentUser) {
      cartItems.forEach((cartItem) => {
        cartItemsArray.forEach((item) => {
          if (item.numInStock <= cartItem.quantity) {
            setOutOfStock(true);
          }
        });
      });
    }
    if (outOfStock === false) {
      fetch(`/api/add-item-in-cart/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // user: userId,
          user: currentUser._id,
          item: _id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 201) {
            setSnackbarOpen(true);
            getCartDetails();
          }
        })
        .catch((err) => {});
    }
  };

  // --------------------------------------
  // Calculate the total price of the order
  // --------------------------------------
  const totalCost = () => {
    if (cartItemsArray.length) {
      cartItems.forEach((cartItem) => {
        cartItemsArray.forEach((item) => {
          if (item._id === cartItem.itemId) {
            total =
              total +
              cartItem.quantity * parseFloat(item.price.replace("$", ""));
          }
        });
      });
    }
    return total.toFixed(2);
  };

  // ------------------------------------------------
  // ------------------ COMPONENTS ------------------
  // ------------------------------------------------
  if (currentUser && cartItems) {
    return (
      <div>
        <SnackbarComponent
          message="Cart modified"
          snackbarOpen={snackbarOpen}
          setSnackbarOpen={setSnackbarOpen}
        />
        {cartItems && (
          <YourCart>
            Your Shopping Cart <ItemsNum>({cartItems.length})</ItemsNum>
          </YourCart>
        )}
        {cartItems && (
          <Review>
            {/* ---------------------------- */}
            {/* ---- Item Details table ---- */}
            {/* ---------------------------- */}
            {cartItems.length === 0 ? (
              <EmptyCart>There is nothing in your cart</EmptyCart>
            ) : (
              <ItemDetails>
                <tbody>
                  <ItemRow>
                    <ItemHeader></ItemHeader>
                    <ItemHeader>PRODUCT</ItemHeader>
                    <ItemHeader>PRICE</ItemHeader>
                    <ItemHeader></ItemHeader>
                    <ItemHeader>QUANTITY</ItemHeader>
                    <ItemHeader></ItemHeader>
                  </ItemRow>
                  {cartItemsArray.map((item, index) => {
                    return (
                      <ItemRow key={item._id}>
                        <ItemData>
                          <ItemPic src={item.imageSrc} alt={item.name} />
                        </ItemData>
                        <ItemName>{item.name}</ItemName>
                        <ItemPrice>{item.price}</ItemPrice>
                        <ItemData>
                          <ChangeQuantity
                            onClick={() => handleRemove(item._id)}
                          >
                            <IoRemoveOutline />
                          </ChangeQuantity>
                        </ItemData>
                        {cartItems.length === cartItemsArray.length && (
                          <ItemData>{cartItems[index].quantity}</ItemData>
                        )}
                        <ItemData>
                          <ChangeQuantity
                            onClick={() => handleAdd(item._id)}
                            disabled={outOfStock}
                          >
                            <IoAddSharp />
                          </ChangeQuantity>
                        </ItemData>
                      </ItemRow>
                    );
                  })}
                </tbody>
              </ItemDetails>
            )}
            {/* ---------------------------- */}
            {/* ------ Subtotal Table ------ */}
            {/* ---------------------------- */}
            {cartItems.length === 0 ? (
              <div></div>
            ) : (
              <Cost>
                <CostDetails>
                  <tbody>
                    <CostRow>
                      <CostHeader>SUBTOTAL</CostHeader>
                      <CostData>${(total = totalCost())}</CostData>
                    </CostRow>
                    <CostRow>
                      <CostHeader>Tax</CostHeader>
                      <CostData>None</CostData>
                    </CostRow>
                    <CostRow>
                      <CostHeader>Shipping</CostHeader>
                      <CostData>None</CostData>
                    </CostRow>
                    <CostTotal>
                      <CostHeader>TOTAL PRICE</CostHeader>
                      <CostData>${total}</CostData>
                    </CostTotal>
                  </tbody>
                </CostDetails>
                <AddToCart
                  onClick={() => {
                    navigate("/checkout");
                  }}
                >
                  Proceed to Checkout
                </AddToCart>
              </Cost>
            )}
          </Review>
        )}
      </div>
    );
  } else if (currentUser && cartItems) {
    return (
      <LoadWrapper>
        <LoadingScreen />
      </LoadWrapper>
    );
  } else {
    return (
      <LoadWrapper>
        <span>Please&nbsp;</span>
        <NavLink to="/signin">log-in</NavLink>
        <span>&nbsp;to see cart!</span>
      </LoadWrapper>
    );
  }
};

export default ReviewCartPage;
