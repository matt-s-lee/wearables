import styled from "styled-components";

// COMPONENT for Brand, Category, New Arrivals, and Home Pages
// Text and imageSrc can to be adjusted depending on page.

const Banner = ({ text, imageSrc }) => {
  return (
    <Wrapper>
      <Image>{imageSrc}</Image>
      <Text>{text}</Text>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
`;

// CODE to be used when banner images found
// const Image = styled.img`
// background-image: url("source")
// `
const Image = styled.div`
  background: lightblue;
  height: 300px;
`;

const Text = styled.div`
  position: absolute;
  color: white;
  top: 100px;
`;

export default Banner;
