import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { ShopContext } from "./ShopContext";
import YouMayAlsoLike from "./YouMayAlsoLike";
import SnackbarComponent from "./SnackbarComponent";
import LoadingScreen from "./LoadingScreen";

// PAGE COMPONENT for each individual item
// a route
const ItemBig = () => {
  const [item, setItem] = useState();//for idividual item
  const [brandName, steBrandName] = useState();//for brandName
  const [outOfStock, setOutOfStock] = useState(false);//for outOfStock
  const [snackbarOpen, setSnackbarOpen] = useState(false); // for Snackbar
  const [buttonMessage, setButtonMessage] = useState("")//for button message
  const [loadingState, setLoadingState] = useState("loading")//for loadingstate

  // GET item ID # from URL
  const { id } = useParams();

  // GET userId from ShopContext
  const { state } = useContext(ShopContext);
  let currentUser = state.currentUser;

  // FETCH details about the individual item
  useEffect(() => {
    setLoadingState("loading");
    fetch(`/api/item/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setItem(data.data);
        if (data.data.numInStock < 1) {
          setOutOfStock(true);
          setButtonMessage("NOT AVAILABLE");
        } else {
          setOutOfStock(false);
          setButtonMessage("ADD TO CART");
        }
      }); 
  }, [id]);
//GET brand name
  useEffect(() => {
    if (item) {
      fetch(`/api/get-brand-name/${item.companyId}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          steBrandName(data.data);
          setLoadingState("idle");
        });
      if (currentUser){
        //GET item instock number, compare with the number we've put in shopping-cart
        //If item in stock, add-it-to-cart 
        //if not, add-to-cart button disabled, and replaced by NOT AVAILABLE sign
      fetch(`/api/all-items-in-cart/${currentUser._id}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          data.data.items.forEach((element) => {
            console.log(element.quantity > item.numInStock);
            if (
              element.itemId === item._id &&
              element.quantity >= item.numInStock
            ) {
              setOutOfStock(true);
              setButtonMessage("NOT AVAILABLE");
            }
          });
        })};
    }
  }, [item]);

  // POST item to cart, when button is clicked
  const addToCart = (ev) => {
    ev.preventDefault();
    if (currentUser){
    fetch(`/api/add-item-in-cart/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: currentUser._id,
        item: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        data.data.items.forEach((element) => {
          console.log(element.quantity > item.numInStock);
          if (
            element.itemId === item._id &&
            element.quantity >= item.numInStock
          ) {
            setOutOfStock(true);
            setButtonMessage("NOT AVAILABLE");
          }
          if (data.status === 201) {
            setSnackbarOpen(true);
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }};


  return (
    <>
      <SnackbarComponent
        message="Item added to cart"
        snackbarOpen={snackbarOpen}
        setSnackbarOpen={setSnackbarOpen}
      />

      {(item && loadingState==="idle") ?
        <>
          <Wrapper>
            <ImgDiv>
              <Img alt="Item" src={item.imageSrc} />
            </ImgDiv>
            <InfoDiv>
              <Details>
                {brandName && (
                  <BrandLink to={`/brands/${brandName}`}>
                    <CompanyId>{brandName}</CompanyId>
                  </BrandLink>
                )}
                <ItemName>{item.name}</ItemName>
                <ItemPrice>{item.price}</ItemPrice>
                {currentUser ?
                <AddToCartButton onClick={addToCart} disabled={outOfStock}>
                  {buttonMessage}
                </AddToCartButton> :
                <PleaseSignIn>Please sign in to enable add-to-cart button.</PleaseSignIn>}
                <DescriptionTitle>DESCRIPTION</DescriptionTitle>
                <Hr />
                <Description>
                  The worst wearables, all new. The worst wearables, all new.
                  The worst wearables, all new. The worst wearables, all new.
                  The worst wearables, all new. The worst wearables, all new.
                  The worst wearables, all new. The worst wearables, all new.
                  The worst wearables, all new. The worst wearables, all new.
                </Description>
              </Details>
            </InfoDiv>
          </Wrapper>
          <YouMayAlsoLike />
        </>
        : <LoadWrapper>
            <LoadingScreen />
          </LoadWrapper>}
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
  object-fit: contain;
`;

const InfoDiv = styled.div`
  width: 50vw;
  padding: 0 100px 0 100px;
  display: flex;
  flex-direction: column;
`;

const Details = styled.div``;

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
  }
`;

const PleaseSignIn = styled.p`
  width: 100%;
  height: 40px;
  background-color: black;
  color: white;
  font-weight: 700;
  font-size: 14px;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;


const Description = styled.div`
  line-height: 1.4;
  margin-bottom: s 30px;
  font-size: 15px;
`;

const Hr = styled.hr`
  border: solid 1px;
  margin-bottom: 30px;
`;

const DescriptionTitle = styled.p`
  font-size: 20px;
`;

const LoadWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export default ItemBig;
