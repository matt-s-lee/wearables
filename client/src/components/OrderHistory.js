import { useState } from "react";
import styled from "styled-components";

//for individual order 
//a route
const OrderHistory = () => {
  const [orderNumber, setOrderNumber] = useState("")

  const handleInput = (e) => {
    setOrderNumber(e.target.value)
  }

  const handleSubmit = () => {
    fetch(`/api/order/${orderNumber}`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
      })
  }

  return (
    <Wrapper>
      <Form>
        <Input placeholder="Order Number" value={orderNumber} onChange={handleInput}/>
        <Button type="submit">Search</Button>
      </Form>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 24px;
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