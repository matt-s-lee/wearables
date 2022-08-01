import { useContext } from "react";
import styled from "styled-components";
import { ShopContext } from "./ShopContext";
import { underline, underlineTransition } from "./underline";


//all cateroies page
//a route

//missing some styling in letter and item

const CategoryPage = () => {
  const { state } = useContext(ShopContext);


  //sorting categories alphabetically and seperate by letter in an array each
  const sortByLetter = state.categories.reduce((acc, brand) => {
    let firstLetter = brand[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = { data: [brand] }
    }
    else {
      acc[firstLetter].data.push(brand)
    }
    return acc;
  }, {})

  return (
    <Wrapper>
      {/* sorting letters alphabetically and map each letter */}
      {Object.keys(sortByLetter).sort().map(letter => {
        return (
          <LetterWrapper>
            <Letter>{letter}</Letter>
            <ItemList>
              {/* mapping array assigned to letter */}
              {sortByLetter[letter].data.map(brand => {
                return (
                  <Item>
                    <ItemAfter>
                      {brand}
                    </ItemAfter>
                  </Item>
                )
              })}
            </ItemList>
          </LetterWrapper>
        )
      })}
    </Wrapper>
  )
}

const Letter = styled.div`

`

const LetterWrapper = styled.div`

`

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0 var(--padding-page);
`

const ItemList = styled.div`

`

const Item = styled.div`
  padding: 10px;
  box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 16px 0, rgba(255, 255, 255, 0.8) -6px -2px 16px 0;
`

const ItemAfter = styled.div`
  font-size: 18px;
  position: relative;
  &:after{
    ${underline};
  }
  &:hover:after{
    ${underlineTransition};

  }
`

export default CategoryPage;

