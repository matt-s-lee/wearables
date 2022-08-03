import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { ShopContext } from "./ShopContext";
import { NavLink } from "react-router-dom";
import LoadingScreen from "./LoadingScreen";
import ItemSmall from "./ItemSmall";

//for individual order 
//a route
const OrderHistory = () => {
  const [orders, setOrders] = useState(null);
  const { state } = useContext(ShopContext);

  //FETCH all orders of currentUser
  useEffect(() => {
    if (state.currentUser) {
      fetch(`/api/all-orders-by-user/${state.currentUser._id}`)
        .then(res => res.json())
        .then(data => {
          setOrders(data.data)
        })
    }
  }, [])

  //conditional rendering based on currentUser and fetch orders
  if (state.currentUser && orders) {
    return (
      <Wrapper>
        {orders.map(order => {
          console.log(order)
          return (
            <Order> 
              <OrderId>{`Order Number: ${order.OrderId}`}</OrderId>
              <ItemList>
                {order.items.map((item, index) => {
                    // console.log(item)
                  return (
                    <div></div>
                  )
                })}
              </ItemList>
            </Order>  
          )
        })}
      </Wrapper>
    )
  }
  else if (state.currentUser && !orders) {
    return (
      <Wrapper>
        <LoadingScreen />
      </Wrapper>
    )
  }
  else {
    return (
      <Wrapper>
        <Text>
          Please&nbsp;
          <NavLink to="/signin" >log-in</NavLink>
          &nbsp;to see cart!
        </Text>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  padding: var(--padding-page);
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Text = styled.div`
width: fit-content;
`

const Order = styled.div`

`

const OrderId = styled.div`

`

const ItemList = styled.div`
  padding: 10px;
`

const Item = styled.div`

`

export default OrderHistory;