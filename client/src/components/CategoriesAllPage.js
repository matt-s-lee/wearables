import { useContext } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { ShopContext } from "./ShopContext";
import { underline, underlineTransition } from "./underline";


//all cateroies page
//a route

//missing some styling in letter and item

const CategoriesAllPage = () => {
  const { state } = useContext(ShopContext);


  //sorting categories alphabetically 
  const sortByLetter = state.categories.sort();

  return (
    <Wrapper>
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
`

const ItemList = styled.div`

`

const Item = styled(NavLink)`
  padding: 10px;

  text-decoration: none;
  color: black  
`

const ItemAfter = styled.div`
  font-size: 18px;
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
