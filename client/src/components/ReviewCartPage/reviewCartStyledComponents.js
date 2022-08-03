import styled from "styled-components";

// ------------------------------------------------
// Header
export const YourCart = styled.h2`
  font-size: 25px;
  margin: 0 30px;
  text-shadow: 3px;
  border-bottom: 1px solid;
  height: 40px;
  line-height: 40px;
`;
export const ItemsNum = styled.span`
  color: grey;
`;
export const EmptyCart = styled.div`
  margin: 30px 30px;
  font-size: 15px;
  font-style: italic;
  color: grey;
`;
// ------------------------------------------------
// Products Table
export const Review = styled.div`
  display: flex;
  flex-direction: row;
`;
export const ItemDetails = styled.table`
  margin: 30px;
  width: 550px;
`;
export const ItemRow = styled.tr`
  margin: 0px 40px;
  height: 50px;
`;
export const ItemHeader = styled.th`
  border-bottom: 1px solid #e8e8e8;
  padding-bottom: 10px;
  width: 100px;
  height: 40px;
`;
export const ItemData = styled.td`
  padding: 10px;
  vertical-align: top;
  text-align: center;
`;
export const ItemName = styled(ItemData)`
  width: 50%;
  text-align: left;
`;
export const ItemPrice = styled(ItemData)`
  text-align: right;
`;
export const ItemPic = styled.img`
  width: 100px;
`;
export const ChangeQuantity = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;
// ------------------------------------------------
// Subtotal Table
export const Cost = styled.div`
  height: 40%;
  width: 30%;
  margin: 30px;
  padding: 30px;
  border: 1px solid grey;
`;
export const CostDetails = styled.table`
  width: 100%;
`;
export const CostRow = styled.tr`
  margin: 30px 0px;
`;
export const CostTotal = styled(CostRow)`
  border-top: 1px solid #e8e8e8;
`;
export const CostHeader = styled.th`
  padding: 30px 0px;
  text-align: left;
  vertical-align: center;
`;
export const CostData = styled.td`
  text-align: right;
  vertical-align: center;
`;
export const AddToCart = styled.button`
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
  }
`;
// ------------------------------------------------
// Alignment Wrapper for Conditinal Load

export const LoadWrapper = styled.div`
  display: flex;
  justify-content: center;
`;