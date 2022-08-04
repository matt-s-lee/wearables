import styled from "styled-components";
import { Link } from "react-router-dom";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw;
  padding: 100px;
`;
//left part of this page
export const ImgDiv = styled.div`
  width: 50vw;
  display: flex;
  justify-content: center;
`;
export const Img = styled.img`
  width: 70%;
  height: auto;
  object-fit: contain;
`;

//Left part of this page
export const InfoDiv = styled.div`
  width: 50vw;
  padding: 0 100px 0 100px;
  display: flex;
  flex-direction: column;
`;

export const Details = styled.div``;

export const CompanyId = styled.p`
  text-decoration: none;
  font-size: 30px;
  margin-bottom: 30px;
`;

export const BrandLink = styled(Link)`
  text-decoration: none;
`;

export const ItemName = styled.div`
  font-size: 40px;
  margin-bottom: 30px;
`;

export const ItemPrice = styled.div`
  margin-bottom: 30px;
  font-weight: 700;
  font-size: 20px;
`;

//Add-To-Cart Button
export const AddToCartButton = styled.button`
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

export const PleaseSignIn = styled.p`
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

//description
export const Description = styled.div`
  line-height: 1.4;
  margin-bottom: s 30px;
  font-size: 15px;
`;

export const Hr = styled.hr`
  border: solid 1px;
  margin-bottom: 30px;
`;

export const DescriptionTitle = styled.p`
  font-size: 20px;
`;

export const LoadWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

