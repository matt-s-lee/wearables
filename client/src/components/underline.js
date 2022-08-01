import { css } from "styled-components";


export const underline = css`
  height: 3px;
  width: 100%;
  background: black;
  position: absolute;
  content: "";
  top: 100%;
  left: 0;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.5s;
`

export const underlineTransition = css`
  transform: scaleX(1);
  transform-origin: left;
`

