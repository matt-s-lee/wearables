import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";
import { underline, underlineTransition } from "./underline";
import { HiLocationMarker, HiPhone, HiMail } from "react-icons/hi";


const Footer = () => {

  return (
    <Wrapper>
      <FooterLeft>
        <Title>WEARLESS</Title>
        <FooterLinks>
          <Nav to="/">Home</Nav>
          <Nav to="/products">Products</Nav>
          <Nav to="/brands">Brands</Nav>
          <Nav to="/categories">Categories</Nav>
          <Nav to="/new-arrivals">New Arrivals</Nav>
        </FooterLinks>
        <FooterCompanyName>WEARLESS © 5001</FooterCompanyName>
      </FooterLeft>
      <FooterMiddle>
        <ContactWrapper>
          <IconWrapper>
            <HiLocationMarker />
          </IconWrapper>
          <Contact>123 Elf Road, North Pole, 88888 </Contact>
        </ContactWrapper>
        <ContactWrapper>
          <IconWrapper>
            <HiPhone />
          </IconWrapper>
          <Contact>+1 555 555-5555</Contact>
        </ContactWrapper>
        <ContactWrapper>
          <IconWrapper>
            <HiMail />
          </IconWrapper>
          <Contact>nosupport@nonexistant.not</Contact>
        </ContactWrapper>
      </FooterMiddle>
      <FooterRight>
        <About>
          About the Company
        </About>
        <AboutText>
          Wearless is not place where we do not recommend our products. It a place with the most outrageous prices and pictures that will make dream of having, but you cannot. Wearless, where we make the customer very unsatisfied.
        </AboutText>
      </FooterRight>
    </Wrapper>
  )
}

const Wrapper = styled.footer`
  height: fit-content;
  padding: 24px 48px;
  display: flex;
`

const FooterLeft = styled.div`
  width: 35%;
`

const Title = styled.div`
  font-family: var(--font-logo);
  font-size: 24px;
`

const FooterMiddle = styled.div`
  width: 35%;
`

const FooterRight = styled.div`
  width: 30%;
`

const FooterLinks = styled.div`
  margin: 20px 0 12px;
  display: flex;
  
`

const Nav = styled(NavLink)`
  text-decoration: none;
  color: black;
  position: relative;
  margin-right: 10px;
  &:after {
    ${underline}
    background-color: black;
  }
  &:hover:after {
    ${underlineTransition}
  }
`

const FooterCompanyName = styled.div`
  font-style: italic;
  font-size: 12px;
`

const ContactWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 0;
`

const Contact = styled.div`
  padding: 5px;
`

const IconWrapper = styled.div`
  border-radius: 50%;
  padding: 5px;
  background-color: black;
  margin-right: 5px;
  & svg {
    height: 25px;
    width: 25px;
    fill: white;
  }
`

const About = styled.div`
  font-weight: bold;
  border-bottom: 1px solid black;
  margin-bottom: 10px;
`

const AboutText = styled.div`
  font-style: italic;
  line-height: 1.2;
`

export default Footer;