import styled from "styled-components";

//company profile page
//a route
const Contact = () => {


  return (
    <Wrapper>
      <Text>
        Here at Wearless, we do not need your input.
      </Text>
      <Text>
        If you do not find this acceptable, feel free to contact us at nosupport@nonexistant.not.
      </Text>
      <Text>
        We forgive you.
      </Text>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: var(--padding-page);
  display: flex;
  flex-direction: column;
  align-items: center;
`


const Text = styled.div`
  width: 309px;
  line-height: 1.2;
`

export default Contact;