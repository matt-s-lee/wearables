import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Banner from "./Banner";
import ItemSmall from "./ItemSmall";
import LoadingScreen from "./LoadingScreen";
import { underline, underlineTransition } from "./underline";

// All Products page
// a route (URL: /products)

const ItemsPage = () => {
  let navigate = useNavigate();

  const [firstResults, setFirstResults] = useState(null); // array of products to display upon page mount
  const [allResults, setAllResults] = useState(); // array of all products
  const [resultsLoaded, setResultsLoaded] = useState(0); // counter to keep track of the number of results displayed

  // FETCHES data for all products
  useEffect(() => {
    fetch("/api/all-items")
      .then((res) => res.json())
      .then((json) => {
        // console.log(json.data);
        setFirstResults(json.data.slice(0, 15)); // shows first 15 results
        setAllResults(json.data);
        setResultsLoaded(15); // sets counter to 15
      });
  }, []);

  // SHOWS more results when clicking on the "Load More" button
  const handleClick = (ev) => {
    ev.preventDefault();
    setResultsLoaded(resultsLoaded + 15);
    setFirstResults(allResults.slice(0, resultsLoaded + 15)); // updates counter
  };

  //show loading when fetching
  if (allResults !== undefined) {
    return (
      <Wrapper>
        <Banner text="All Products" />
        <Title>Products</Title>
        <ProductsGrid>
          {firstResults &&
            firstResults.map((product) => {
              return (
                <ItemSmall
                  key={product._id}
                  imageSrc={product.imageSrc}
                  name={product.name}
                  price={product.price}
                  companyId={product.companyId}
                  id={product._id}
                />
              );
            })}
        </ProductsGrid>
        <GridExtra>
          <NumberText>
            {`Displaying ${resultsLoaded} of ${allResults.length} products`}
          </NumberText>
          {resultsLoaded < allResults.length && <Button onClick={handleClick}>
            <Span>Load More</Span>
          </Button>}
        </GridExtra>
      </Wrapper>
    );
  }
  else {
    return (
      <Wrapper>
        <LoadingScreen />
      </Wrapper>
    )
  }
};

const Title = styled.div`
  margin: 10px auto;
  font-size: 32px;
  text-decoration: underline;
`

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const ProductsGrid = styled.div`
  display: flex;
  flex-flow: wrap;
  justify-content: center;
  margin: 0 auto;
`;

const GridExtra = styled.div`
  display: block;
  position: relative;
  height: 80px;
`

const NumberText = styled.div`
  position: absolute;
  left: 0;
  padding: 10px 48px;
  font-size: 16px;
  font-style: italic;
`

const Span = styled.span`
  font-size: 16px;
  color: white;
  position: relative;
  &:after {
    ${underline}
    background-color: white;
  }
`

const Button = styled.button`
  position: relative;
  left: calc(45% - 24px);
  outline: none;
  border: none;
  background-color: black;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  overflow: hidden;
  &:hover ${Span}:after {
    ${underlineTransition}
  }
`

export default ItemsPage;
