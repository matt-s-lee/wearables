import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { ShopContext } from "./ShopContext";
import YouMayAlsoLike from "./YouMayAlsoLike";
// PAGE COMPONENT for each individual item
//individual page for each item
//a route
const ItemBig = () => {
  // ****** code here to change to useReducer logic
  const [item, setItem] = useState();

  //useState for brandName
  const [brandName, steBrandName] = useState();

  //useState for outOfStock
  const [outOfStock, setOutOfStock] = useState(false);

  // GET item ID # from URL
  const { id } = useParams();

  // get userId from ShopContext
  // const userId = localStorage.getItem("userId");
  const {state} = useContext(ShopContext);

  const userId = state.currentUser._id;

  // FETCH details about the individual item
  useEffect(() => {
    fetch(`/api/item/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setItem(data.data);
        if (data.data.numInStock < 1){
          setOutOfStock(true);
        } else {
          setOutOfStock(false);
        }
      });

    // CHECK that the user is logged in; if so, GET user ID to POST to
    // the back-end, when they add an item to the cart. If no user logged-in,
    // userID = "none" ?
  }, [id]);

  useEffect(() => {
    if (item) {
      fetch(`/api/get-brand-name/${item.companyId}`)
      .then((res)=> res.json())
      .then((data) => {
        console.log(data);
        steBrandName(data.data);
      });

      fetch(`/api/all-items-in-cart/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        data.data.items.forEach(element => {
          console.log(element.quantity > item.numInStock)
          // console.log(item)
          if (element.itemId === item._id && element.quantity >= item.numInStock) {
            setOutOfStock(true);
          }
        });
      })
    }
  }, [item]);
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
        console.log(data.data.items);
        data.data.items.forEach(element => {
          console.log(element.quantity > item.numInStock)
          // console.log(item)
          if (element.itemId === item._id && element.quantity >= item.numInStock) {
            setOutOfStock(true);
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
    {item &&
      <>
        <Wrapper>
          <ImgDiv>
            <Img alt="Item" src={item.imageSrc}/>
          </ImgDiv>
          <InfoDiv>
            <Details>
              {brandName &&
              <BrandLink to={`/brands/${brandName}`} >
                <CompanyId>{brandName}</CompanyId>
              </BrandLink>
              }
              <ItemName>{item.name}</ItemName>
              <ItemPrice>{item.price}</ItemPrice>
              <AddToCartButton onClick={addToCart} disabled={outOfStock}>Add to Cart</AddToCartButton>
              <DescriptionTitle>
                DESCRIPTION
              </DescriptionTitle>
              <Hr/>
              <Description>
                  The worst wearables, all new. The worst wearables, all new. The worst
                  wearables, all new. The worst wearables, all new. The worst wearables,
                  all new. The worst wearables, all new. The worst wearables, all new. The
                  worst wearables, all new. The worst wearables, all new. The worst
                  wearables, all new.
                  </Description>
              {/* with dropdown capabilities? */}
            </Details>
          </InfoDiv>
        </Wrapper>
        <YouMayAlsoLike />
              </>
      }

    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw;
  padding: 100px;
`;

const ImgDiv = styled.div`
  width: 50vw;
  display: flex;
  justify-content: center;
`;

const Img = styled.img`
width: 70%;
height: auto;
object-fit: cover;
`;

const InfoDiv = styled.div`
  width: 50vw;
  padding: 0 100px 0 100px;
  display: flex;
  flex-direction: column;
`;

const Details = styled.div`
`;

const CompanyId = styled.p`
  text-decoration: none;
  font-size: 30px;
  margin-bottom: 30px;
`;

const BrandLink = styled(Link)`
text-decoration: none;
`;

const ItemName = styled.div`
font-size: 40px;
margin-bottom: 30px;
`;

const ItemPrice = styled.div`
  margin-bottom: 30px;
  font-weight: 700;
  font-size: 20px;
`;

const AddToCartButton = styled.button`
width: 100%;
height: 40px;
background-color: black;
color: white;
font-weight: 700;
font-size: 14px;
margin-bottom: 30px;
cursor: pointer;

&:disabled {
filter: contrast(40%);
};
`;

const Description = styled.div`
line-height: 1.4;
margin-bottom:s 30px;
font-size: 15px;
`;

const Hr = styled.hr`
  border: solid 1px;
  margin-bottom: 30px;
`;

const DescriptionTitle = styled.p`
font-size: 20px;
`;

export default ItemBig;

