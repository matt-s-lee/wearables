import styled, { keyframes } from "styled-components"


const LoadingScreen = () => {

  return (
    <Circle />
  )
}

const circleSpin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`

const Circle = styled.div`
  border: 8px solid #f3f3f3;
  border-top: 8px solid #3498db;
  border-radius: 50%;
  width: 150px;
  height: 150px;
  animation: ${circleSpin} 1s ease-in-out infinite;
  margin: 0 auto;
`

export default LoadingScreen;