import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { IoRemoveOutline } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";
import Snackbar from "@mui/material/Snackbar";
import styled from "styled-components";

import ItemSmall from "./ItemSmall";

// ------------------------------------------------

const ReviewCartPage = () => {
  let navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false); // for Snackbar

  const [cartItems, setCartItems] = useState(null); // Array of item ID #s
  const [cartItemsArray, setCartItemsArray] = useState([]); // Array of item data
  let cartItems1 = []; // empty array of items to be pushed into
  console.log(cartItems);

  const userId = "abc12321"; // hard-coded user, until we can create new users

  // GET item ID #s of all items in the user's cart
  useEffect(() => {
    const getCartDetails = async () => {
      const response = await fetch(`/api/all-items-in-cart/${userId}`);
      const data = await response.json();
      setCartItems(data.data.items);
    };
    getCartDetails();
  }, []);

  // GET data for each item in the cart (using item ID #s received above)
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

  // DELETE item from the cart
  const handleRemove = (_id) => {
    fetch("/api/delete-item-in-cart", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: userId,
        item: _id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === 200) {
          setSnackbarOpen(true);
        }
      });
  };

  // CLOSE snackbar
  const handleCloseSnackbar = (ev, reason) => {
    setSnackbarOpen(false);
  };
  const action = (
    <>
      <Button onClick={handleCloseSnackbar}>
        <IoIosClose fontSize="20px" color="white" />
      </Button>
    </>
  );

  // ------------------------------------------------

  return (
    <div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2500}
        message="Item removed from cart"
        onClose={handleCloseSnackbar}
        action={action}
      />
      {cartItems && (
        <YourCart>
          Your Shopping Cart <ItemsNum>({cartItems.length})</ItemsNum>
        </YourCart>
      )}
      {cartItemsArray && (
        <Review>
          <ItemDetails>
            <tbody>
              <ItemRow>
                <ItemHeader></ItemHeader>
                <ItemHeader>PRODUCT</ItemHeader>
                <PriceHeader>PRICE</PriceHeader>
                <PriceHeader>QUANTITY</PriceHeader>
                <ItemHeader></ItemHeader>
              </ItemRow>
              {cartItemsArray.map((item) => {
                return (
                  <ItemRow key={item._id}>
                    <ItemData>
                      <ItemPic src={item.imageSrc} alt={item.name} />
                    </ItemData>
                    <ItemName>{item.name}</ItemName>
                    <ItemPrice>{item.price}</ItemPrice>
                    <PriceHeader>Quantity</PriceHeader>
                    <ItemData>
                      <DeleteButton onClick={() => handleRemove(item._id)}>
                        <IoRemoveOutline />
                      </DeleteButton>
                    </ItemData>
                  </ItemRow>
                );
              })}
            </tbody>
          </ItemDetails>
          <Cost>
            <CostDetails>
              <tbody>
                <CostRow>
                  <CostHeader>SUBTOTAL</CostHeader>
                  <CostData>$1999</CostData>
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
                  <CostData>$199999</CostData>
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
        </Review>
      )}
    </div>
  );
};

// ------------------------------------------------
// Header
const YourCart = styled.h2`
  font-size: 25px;
  margin: 0 30px;
  text-shadow: 3px;
  /* background: lightgrey; */
  border-bottom: 1px solid;
  height: 40px;
  line-height: 40px;
`;
const ItemsNum = styled.span`
  color: grey;
`;

// ------------------------------------------------
// Products Table
const Review = styled.div`
  display: flex;
`;
const ItemDetails = styled.table`
  margin: 30px;
  width: 600px;
`;
const ItemRow = styled.tr`
  margin: 0px 40px;
`;
const ItemHeader = styled.th`
  border-bottom: 1px solid #e8e8e8;
  padding-bottom: 10px;
  width: 30%;
`;
const PriceHeader = styled(ItemHeader)`
  text-align: right;
`;
const ItemData = styled.td`
  padding: 10px;
  vertical-align: top;
  text-align: center;
`;
const ItemName = styled(ItemData)`
  width: 50%;
  text-align: left;
`;
const ItemPrice = styled(ItemData)`
  text-align: right;
`;
const ItemPic = styled.img`
  width: 100px;
`;
const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;
// ------------------------------------------------
// Subtotal Table
const Cost = styled.div`
  height: 40%;
  width: 30%;
  margin: 30px;
  padding: 30px;
  border: 1px solid grey;
`;
const CostDetails = styled.table`
  width: 100%;
`;
const CostRow = styled.tr`
  margin: 30px 0px;
`;
const CostTotal = styled(CostRow)`
  border-top: 1px solid #e8e8e8;
`;
const CostHeader = styled.th`
  padding: 30px 0px;
  text-align: left;
  vertical-align: center;
`;
const CostData = styled.td`
  text-align: right;
  vertical-align: center;
`;
const AddToCart = styled.button`
  width: 100%;
  margin: 25px 0;
  padding: 20px;
  border: 1px solid;
  border-radius: none;
  cursor: pointer;
  transition: all 500ms ease-in;

  &:hover {
    color: white;
    background: green;
    border: none;
  }
`;
// ------------------------------------------------
// Snackbar
const Button = styled.button`
  background: none;
  border: none;
`;

export default ReviewCartPage;
