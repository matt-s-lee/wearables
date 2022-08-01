import { useState, useEffect } from "react";
import ItemSmall from "./ItemSmall";
import styled from "styled-components";
import Banner from "./Banner";

const YouMayAlsoLike = () => {
    const [youMayAlsoLike, setYouMayAlsoLike] = useState(null);
    console.log(youMayAlsoLike);

    // FETCH request for you may also like(fetching random items using sale-item endpoint)
    useEffect(() => {
        fetch("/api/sale-items")
        .then((res) => res.json())
        .then((data) => {
            setYouMayAlsoLike(data.data);
        });
    }, []);

    return (
        <>
            <Wrapper>
                <Title>
                    You May Also Like
                </Title>

                {/* RETURN an ItemSmall component for each YouMayAlsoLike */}
                {youMayAlsoLike &&
                youMayAlsoLike.map((item) => (
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

const Title = styled.p``;

export default YouMayAlsoLike;

