import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { ShopContext } from "./ShopContext";
import { underline, underlineTransition } from "./underline";

//signing up form page
//a route
const SignIn = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { actions: { handleUserLogin } } = useContext(ShopContext);
  const navigate = useNavigate();


  //change input's respective state on change
  const handleInput = (e) => {
      setError(null);
    switch (e.target.id) {
      case "user":
        setUser(e.target.value)
        break;
      case "password":
        setPassword(e.target.value)
        break;
      default:
        break;
    }
  }

  //post user login form
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`/api/user?email=${user}&password=${password}`)
      .then(res => res.json())
      .then(data => {
        // console.log(data)
        if (data.status === 200) {
          handleUserLogin(data.data);
          setError("null");
          navigate("/")
        }
        else if (data.status === 400) {
          setError("password");
        }
        else if (data.status === 422 ){
          setError("both");
        }
        else if (data.status === 404) {
          setError("user");
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <Wrapper onSubmit={handleSubmit}>
      <Title>Username:</Title>
      <Input
        placeholder="email"
        type="text"
        value={user}
        id="user"
        onChange={handleInput}
        className={(error === "user" || error === "both") && "error"}
      />
      <Title>Password:</Title>
      <Input
        placeholder="password"
        type="password"
        value={password}
        id="password"
        onChange={handleInput}
        className={(error === "password" || error === "both") && "error"}
      />
      <Button type="submit"><p>Submit</p></Button>
    </Wrapper>
  )
}

const Wrapper = styled.form`
  margin: 0 auto;
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 40px 80px;
  outline: 1px solid black;
`

const Title = styled.div`
  text-align: center;
  font-size: 20px;
  padding: 10px 0;
`

const Shake = keyframes`
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }
  
  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
`

const Input = styled.input`
  font-size: 20px;
  padding: 5px;
  outline: none;
  border-radius: 4px;
  &.error {
    transform: translate3d(0, 0, 0);
    animation: ${Shake} 0.3s linear;
    border: 2px solid red;
    color: red;
  }
`

const Button = styled.button`
  margin-top: 10px;
  font-size: 20px;
  background: none;
  border: none;
  align-self: center;
  padding: 5px 15px;
  border-radius: 4px;
  & p {
    position: relative;
    transition: transform 0.5s ease;
  }
  &:hover p {
    transform: scale(1.1);
  }
  & p:after {
    ${underline}
  }
  &:hover p:after {
    ${underlineTransition}
  }
`

export default SignIn;

