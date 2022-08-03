import styled from "styled-components"


const SearchPage = () => {

  return (
    <Wrapper>
      <Text>
        As you can see, there no is searching on our site. Please do not be a stickler and start clicking buttons.
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
  width: 300px;
  line-height: 1.2;
`

export default SearchPage;