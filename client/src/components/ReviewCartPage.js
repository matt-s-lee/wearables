import { useEffect, useState } from "react";
import { IoRemoveOutline } from "react-icons/io5";
import styled from "styled-components";

const ReviewCartPage = () => {
  const [cartItems, setCartItems] = useState(null);
  const [cartItemsArray, setCartItemsArray] = useState([]);
  let cartItems1 = [];
  console.log("cartItemsArray", cartItemsArray);

  const userId = "abc12321"; // hard-coded user, until we can create new users

  useEffect(() => {
    const getCartDetails = async () => {
      const response = await fetch(`/api/all-items-in-cart/${userId}`);
      const data = await response.json();
      setCartItems(data.data.items);
    };
    getCartDetails();
  }, []);

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
        if (data.status === 204) console.log(data);
      });
  };
  return (
    <div>
      {cartItems && (
        <YourCart>
          Your shopping cart <span>({cartItems.length})</span>
        </YourCart>
      )}
      {cartItemsArray && (
        <Review>
          <ItemDetails>
            <ItemRow>
              <ItemHeader></ItemHeader>
              <ItemHeader>Product</ItemHeader>
              <ItemHeader>Price</ItemHeader>
            </ItemRow>
            {cartItemsArray.map((item) => {
              return (
                <ItemRow>
                  <ItemData></ItemData>
                  <ItemData>{item.name}</ItemData>
                  <ItemData>{item.price}</ItemData>
                  <ItemData>
                    <button onClick={() => handleRemove(item._id)}>
                      <IoRemoveOutline />
                    </button>
                  </ItemData>
                </ItemRow>
              );
            })}
          </ItemDetails>
          <Cost>
            <CostDetails>
              <tr>
                <CostHeader>Subtotal</CostHeader>
                <CostData>$1999</CostData>
              </tr>
              <tr>
                <CostHeader>Tax</CostHeader>
                <CostData>None</CostData>
              </tr>
              <tr>
                <CostHeader>Shipping</CostHeader>
                <CostData>None</CostData>
              </tr>
              <tr>
                <CostHeader>Total Price</CostHeader>
                <CostData>$199999</CostData>
              </tr>
            </CostDetails>
            <AddToCart>Add to cart</AddToCart>
          </Cost>
        </Review>
      )}
    </div>
  );
};

const YourCart = styled.h2``;

const Review = styled.div`
  display: flex;
`;

const ItemDetails = styled.table`
  border: 1px solid;
  margin: 30px;
`;

const ItemRow = styled.tr`
  border: 1px solid;

  margin: 0px 40px;
`;

const ItemHeader = styled.th`
  border: 1px solid;
  width: 100px;
`;

const ItemData = styled.td`
  border: 1px solid;
`;

const Cost = styled.div`
  margin: 30px;
`;

const CostHeader = styled.th`
  text-align: left;
`;

const CostData = styled.td`
  text-align: right;
`;

const CostDetails = styled.table``;
const AddToCart = styled.button``;

export default ReviewCartPage;
