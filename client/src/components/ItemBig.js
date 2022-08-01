//

<<<<<<< HEAD
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

// PAGE COMPONENT for each individual item
=======
//individual page for each item
//a route
>>>>>>> master
const ItemBig = () => {
  // ****** code here to change to useReducer logic
  const [item, setItem] = useState();

  // GET item ID # from URL
  const { itemId } = useParams();

  // FETCH details about the individual item
  useEffect(() => {
    fetch(`/api/item/${itemId}`)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        // setItem("something")
      });

    // CHECK that the user is logged in; if so, GET user ID to POST to
    // the back-end, when they add an item to the cart. If no user logged-in,
    // userID = "none"
  }, []);

  // POST item to cart, when button is clicked
  // ******** useReducer?
  const addToCart = (ev) => {
    ev.preventDefault();

    fetch(`/api/item/${itemId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // userID, // note the capital
        itemId,
        quantity: 1,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        // show confirmation that it was added to the cart: MUI?
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Wrapper>
        <img alt="Item" />
        <Details>
          <div>Link to brand</div>
          <div>Item Name</div>
          <div>Price</div>
          <button onClick={addToCart}>Add to Cart</button>
          <div>Description</div>
          {/* with dropdown capabilities? */}
        </Details>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
`;

const Details = styled.div``;

export default ItemBig;
