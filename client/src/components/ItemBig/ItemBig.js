import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../ShopContext";
import YouMayAlsoLike from "../YouMayAlsoLike";
import SnackbarComponent from "../SnackbarComponent";
import LoadingScreen from "../LoadingScreen";
import {
    Wrapper,
    ImgDiv,
    Img,
    InfoDiv,
    Details,
    CompanyId,
    BrandLink,
    ItemName,
    ItemPrice,
    AddToCartButton,
    PleaseSignIn,
    Description,
    Hr,
    DescriptionTitle,
    LoadWrapper,
} from "./ItemBigStyledComponent.js";

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
                data.data.items.forEach((element) => {
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
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


export default ItemBig;