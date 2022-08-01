import { useState, useEffect } from "react";
import Banner from "./Banner";
import ItemSmall from "./ItemSmall";
import styled from "styled-components";

// ?? Should the descriptions go in their own file?

// PAGE COMPONENT FOR "/new-arrivals"
const NewArrivals = () => {
  // ******* TEMPORARY (to be replaced by reducer)
  const [newArrivals, setNewArrivals] = useState(null);
  console.log(newArrivals);

  // FETCH request for all new items
  useEffect(() => {
    fetch("/api/new-arrivals")
      .then((res) => res.json()) // is it in JSON?
      .then((json) => {
        setNewArrivals(json.data);
      });
  }, []);

  // RETURNS a banner with text, the page description, and items
  return (
    <>
      <Banner text="New arrivals banner" />

      <Description>
        The worst wearables, all new. The worst wearables, all new. The worst
        wearables, all new. The worst wearables, all new. The worst wearables,
        all new. The worst wearables, all new. The worst wearables, all new. The
        worst wearables, all new. The worst wearables, all new. The worst
        wearables, all new.
      </Description>

      <Wrapper>
        {/* RETURN an ItemSmall component for each new arrival */}
        {newArrivals &&
          newArrivals.map((item) => (
            <ItemSmall
              key={item._id}
              imageSrc={item.imageSrc}
              name={item.name}
              companyId={item.companyId}
              price={item.price}
              id={item._id}
            />
          ))}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
`;

const Description = styled.p`
  padding: 100px;
  line-height: 1.4;
`;

export default NewArrivals;
