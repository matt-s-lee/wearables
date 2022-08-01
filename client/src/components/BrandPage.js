import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ItemSmall from "./ItemSmall";
import LoadingScreen from "./LoadingScreen";

//shopping cart
//a route
const BrandPage = () => {
  const brand = useParams().brand;
  const [items, setItems] = useState(null)

  useEffect(() => {
    console.log(brand)
    fetch(`/api/items-by-brand/${brand}`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setItems(data.data);
      })  
  }, [brand])



  if (items !== null) {
    return (
      <Wrapper>
        {items.map(item => {
          return (
            <ItemSmall
              imageSrc={item.imageSrc}
              name={item.name}
              price={item.price}
              companyId={item.companyId}
              id={item.id}
            />
          )
        })}
      </Wrapper>
    )
  }
  else {
    return (
      <Wrapper>
        <LoadingScreen />
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  padding: 0 var(--padding-page);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

export default BrandPage;