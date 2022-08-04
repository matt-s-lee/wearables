import { useState, useEffect } from "react";
import Banner from "./Banner";
import ItemSmall from "./ItemSmall";
import styled from "styled-components";
import LoadingScreen from "./LoadingScreen";
import newArrivalsBanner from "../data/banner3.jpeg";

// ?? Should the descriptions go in their own file?

// PAGE COMPONENT FOR "/new-arrivals"
const NewArrivals = () => {
  const [newArrivals, setNewArrivals] = useState(null);
  // console.log(newArrivals);

  // FETCH request for all new items
  useEffect(() => {
    fetch("/api/new-arrivals")
      .then((res) => res.json()) // is it in JSON?
      .then((json) => {
        setNewArrivals(json.data);
      });
  }, []);

  // RETURNS a banner with text, the page description, and items
  // RETURNS loading when fetching
  if (newArrivals) {
    return (
      <Wrapper>
        <Banner imageSrc={newArrivalsBanner}/>
        <Title>New Arrivals</Title>
        <Description>
          The worst wearables, all new. The worst wearables, all new. The worst
          wearables, all new. The worst wearables, all new. The worst wearables,
          all new. The worst wearables, all new. The worst wearables, all new. The
          worst wearables, all new. The worst wearables, all new. The worst
          wearables, all new.
        </Description>

        <List>
          {/* RETURN an ItemSmall component for each new arrival */}
          {newArrivals.map((item) => (
            <ItemSmall
              key={item._id}
              imageSrc={item.imageSrc}
              name={item.name}
              companyId={item.companyId}
              price={item.price}
              id={item._id}
            />
          ))}
        </List>
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
  padding: 0 var(--padding-page);

`;

const Description = styled.p`
  padding: 20px 100px;
  line-height: 1.4;
  font-size: 18px;
`;

const List = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
`

export default NewArrivals;
