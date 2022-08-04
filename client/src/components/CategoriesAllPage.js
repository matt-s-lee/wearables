import { useContext } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { ShopContext } from "./ShopContext";
import { underline, underlineTransition } from "./underline";
import banner1 from "../data/banner1.jpeg";
import Banner from "./Banner";

//all cateroies page
//a route

//missing some styling in letter and item
const CategoriesAllPage = () => {
  const { state } = useContext(ShopContext);

  //sorting categories alphabetically 
  const sortByLetter = state.categories.sort();

  return (
    <Wrapper>
      <Banner imageSrc={banner1} text="All Categories" />
      <ItemList>
        {/* mapping array assigned to letter */}
        {sortByLetter.map(category => {
          return (
            <Item to={`/categories/${category}`}>
              <ItemAfter >
                {category}
              </ItemAfter>
            </Item>
          )
        })}
      </ItemList>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0 var(--padding-page);
  justify-content: center;
`

const ItemList = styled.div`
width: 50vw;
display: grid;
grid-template-columns: auto auto auto;
padding: 24px;
`

const Item = styled(NavLink)`
  padding: 24px;
  text-decoration: none;
  color: black; 
`

const ItemAfter = styled.div`
  font-size: 24px;
  position: relative;
  width: fit-content;
  &:after{
    ${underline};
  }
  &:hover:after{
    ${underlineTransition};

  }
`

export default CategoriesAllPage;

