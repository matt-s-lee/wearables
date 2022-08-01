import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import ItemsPage from "./ItemsPage";

// PAGE COMPONENT for each individual item
//individual page for each item
//a route
const ItemBig = () => {
  // ****** code here to change to useReducer logic
  const [item, setItem] = useState();

  // GET item ID # from URL
  const { id } = useParams();

  // get userId from localstorage
  // const userId = localStorage.getItem("userId");
  const userId = "abc12321";
  // FETCH details about the individual item
  useEffect(() => {
    fetch(`/api/item/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setItem(data.data);
      });

    // CHECK that the user is logged in; if so, GET user ID to POST to
    // the back-end, when they add an item to the cart. If no user logged-in,
    // userID = "none" ?
  }, []);

  // POST item to cart, when button is clicked
  // ******** useReducer?
  const addToCart = (ev) => {
    ev.preventDefault();

    fetch(`/api/add-item-in-cart/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // userID, // note the capital
        user: userId,
        item: id
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // show confirmation that it was added to the cart: MUI?
        console.log(data);
      });
      // .catch((err) => {
      //   console.log(err);
      // });
  };

  return (
    <>{item &&
      <>
        <Wrapper>
          <img alt="Item" src={item.imageSrc}/>
          <Details>
            <Link to={"/api/items-by-brand/"}>
              <CompanyId>{item.companyId}</CompanyId>
            </Link>
            <ItemName>{item.name}</ItemName>
            <ItemPrice>{item.price}</ItemPrice>
            <AddToCartButton onClick={addToCart}>Add to Cart</AddToCartButton>
            <div></div>
            {/* with dropdown capabilities? */}
          </Details>
        </Wrapper>
        <YouMayAlsoLike>
          <ImageDiv></ImageDiv>
          <ImageDiv></ImageDiv>
          <ImageDiv></ImageDiv>
        </YouMayAlsoLike>
      </>
      }

    </>
  );
};

const Wrapper = styled.div`
  display: flex;
`;

const Details = styled.div`
`;

const CompanyId = styled.div`
`;

const ItemName = styled.div`
`;

const ItemPrice = styled.div`
`;

const AddToCartButton = styled.button`
`;

const YouMayAlsoLike = styled.div`
`;

const ImageDiv = styled.div``;


export default ItemBig;

