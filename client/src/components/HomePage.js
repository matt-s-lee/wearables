import styled from "styled-components"
import SaleItem from "./SaleItem";
import video from '../data/Watch product video.mp4';
import { useNavigate } from "react-router-dom";
//homepage
//a route
const HomePage = () => {
  let navigate = useNavigate();

  return (
    <Wrapper>
      <VideoDiv>
        <Video src={video} autoPlay loop muted></Video>
        <ContentDiv>
          <ContentTitle>Wearless</ContentTitle>
          <Content>Wearless is a place where we do not recommend our products. It is a store with the most outrageous prices and pictures that will make you dream of having our products - but you cannot ever have them. Wearless: where the best customer is a customer deeply unsatisfied.</Content>
          <ShopNowButton onClick={()=>{navigate("/products")}}>Shop Now</ShopNowButton>
        </ContentDiv>
      </VideoDiv>
      <SaleItem />
    </Wrapper>
  )
}

const Wrapper = styled.div`
width: 100vw;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`;

const VideoDiv = styled.div`
width: 100%;
height: 50vh;
display: flex;
margin-bottom: 25px;
justify-content: baseline;
position: relative;
;
`;

const Video = styled.video`
width: 100%;
height: 100%;
position: absolute;
object-fit: cover;
z-index: 0;
`;

const ContentDiv = styled.div`
z-index: 1;
width: 18%;
display: flex;
flex-direction: column;
justify-content: flex-end;
align-items: flex-start;
color: Black;
padding: 0 0 2% 2%;
font-family: var(--font);
`;

const Content = styled.p`
margin-bottom: 5%;
font-size: 16px;
`;

const ContentTitle = styled.h1`
font-size: 35px;
margin-bottom: 5%;
`;

const ShopNowButton = styled.button`
width: 98%;
height: 8%;
background-color: black;
color: white;
font: inherit;
border: solid 1px white;
cursor: pointer;
`;


export default HomePage;