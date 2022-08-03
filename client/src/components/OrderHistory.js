import { useState } from "react";
import styled from "styled-components";

//for individual order 
//a route
const OrderHistory = () => {
  const [orderNumber, setOrderNumber] = useState("")

  const handleInput = (e) => {
    setOrderNumber(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    window.alert("For your convenience, we added an alert instead of doing nothing, as we can make something happen but will not.")
    fetch(`/api/order/${orderNumber}`)
      .then(res => res.json())
      .then(data => {

      })
  }

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}> 
        <Input placeholder="Order Number" value={orderNumber} onChange={handleInput}/>
        <Button type="submit">Search</Button>
      </Form>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: var(--padding-page);
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Form = styled.form`
width: fit-content;
`

const Input = styled.input`
  padding: 5px;
  width: 300px;
`

const Button = styled.button`
  padding: 5px;
  margin-left: 10px;
`

export default OrderHistory;