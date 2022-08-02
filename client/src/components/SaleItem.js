import { useState, useEffect } from "react";
import ItemSmall from "./ItemSmall";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";

const SaleItem = () => {
    const [saleItem, setSaleItem] = useState(null);
    const id = useParams();
    // FETCH request for you may also like(fetching random items using sale-item endpoint)
    useEffect(() => {
        fetch("/api/sale-items")
        .then((res) => res.json())
        .then((data) => {
            const result = data.data.slice(1, 4);
            setSaleItem(result);
            console.log(result);
        });
    }, [id]);

    return (
        <>
            <Wrapper>
                <Title>
                    Sale Items
                </Title>
                
                <ItemDiv>
                {/* RETURN an ItemSmall component for each SaleItem */}
                {saleItem &&
                saleItem.map((item) => (
                    <>
                        <ItemLink to={`/item/${item._id}`}>
                            <ItemSmall
                            key={item._id}
                            imageSrc={item.imageSrc}
                            name={item.name}
                            companyId={item.companyId}
                            price={item.price}
                            id={item._id}
                            />
                        </ItemLink>
                    </>
                ))}
                </ItemDiv>
            </Wrapper>
        </>
    );
};

const ItemLink = styled(Link)`
text-decoration: none;
color: black;
display: flex;
`;

const Wrapper = styled.div`
width: 100vw;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`;

const ItemDiv = styled.div`
display: flex;
justify-content: space-evenly ;
flex-direction: row;
width: 90%;
`;

const Title = styled.div`
font-size: 30px;
margin-bottom: 20px;
`;

export default SaleItem;

