import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Banner from "./Banner";
import ItemSmall from "./ItemSmall";
import LoadingScreen from "./LoadingScreen";

// All Products page
// a route (URL: /products)

const ItemsPage = () => {
  let navigate = useNavigate();

  const [firstResults, setFirstResults] = useState(); // array of products to display upon page mount
  const [allResults, setAllResults] = useState(); // array of all products
  const [resultsLoaded, setResultsLoaded] = useState(0); // counter to keep track of the number of results displayed

  // FETCHES data for all products
  useEffect(() => {
    fetch("/api/all-items")
      .then((res) => res.json())
      .then((json) => {
        console.log(json.data);
        setFirstResults(json.data.slice(0, 15)); // shows first 15 results
        setAllResults(json.data);
        setResultsLoaded(resultsLoaded + 15); // sets counter to 15
      });
  }, []);

  // SHOWS more results when clicking on the "Load More" button
  const handleClick = (ev) => {
    ev.preventDefault();
    setResultsLoaded(resultsLoaded + 15);
    setFirstResults(allResults.slice(0, resultsLoaded + 15)); // updates counter
  };

  return (
    <Wrapper>
      <Banner text="All Products" />
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
      {resultsLoaded && allResults ? (
        <div>
          Displaying {resultsLoaded} of
          {allResults.length} products
        </div>
      ) : (
        <div></div>
      )}
      {firstResults && <button onClick={handleClick}>Load more</button>}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex
  flex-direction: column;
`;

const ProductsGrid = styled.div`
  display: flex;
  flex-flow: wrap;
`;
export default ItemsPage;
