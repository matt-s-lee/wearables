// Styling for Header.js

import styled, { css } from "styled-components";
import { underline, underlineTransition } from "../underline";
import { BiHistory } from "react-icons/bi";
import { BsCart4, BsSearch } from "react-icons/bs";
import { MdOutlineContactSupport } from "react-icons/md";
import { NavLink } from "react-router-dom";

export const List = styled.div`
  max-height: 555px;
  visibility: hidden;
  position: absolute;
  text-decoration: none;
  overflow: auto;
  background-color: rgb(211, 211, 211);
  left: 10%;
  white-space: nowrap;
  padding: 0 10px 5px 10px;
  z-index: 10;
  &:hover {
    visibility: visible;
  }
`;

export const ListAfter = styled.div`
  position: relative;
  width: fit-content;
  &:after {
    ${underline}
  }
`;

export const ListItem = styled(NavLink)`
  font-size: 18px;
  width: fit-content;
  cursor: pointer;
  text-decoration: none;
  color: black;
  overflow: hidden;
  &:hover ${ListAfter}:after {
    ${underlineTransition}
  }
`;

export const Wrapper = styled.header`
  height: var(--header-height);
  font-family: var(--font);
`;

export const Logo = styled(NavLink)`
  text-decoration: none;
  cursor: pointer;
  font-family: var(--font-logo);
  font-size: 48px;
  color: black;
  text-align: center;
  position: relative;
  left: 90px;
`;

export const Collection = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  text-transform: uppercase;
  font-size: 20px;
  &:after {
    ${underline}
  }
`;

export const Nav = styled(NavLink)`
  text-decoration: none;
  cursor: pointer;
  padding: 15px 24px;
  font-size: 24px;
  color: white;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  &:hover ${Collection}:after {
    ${underlineTransition}
  }
`;

export const DropWrapper = styled.div`
  position: relative;
  padding: 8px 0;
  & ${Nav}:hover + ${List} {
    visibility: visible;
  }
`;

export const WrapperTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
`;

export const WrapperTopRight = styled.div`
  display: flex;
  align-items: center;
  & ${Nav} {
    color: black;
  }
  & ${Nav} ${Collection}:after {
    background-color: black;
  }
`;

export const NavBar = styled.div`
  display: flex;
  justify-content: space-evenly;
  height: fit-content;
  width: 100%;
  background-color: black;
  & ${Nav}:hover + ${List} {
    visibility: visible;
  }
  & ${Collection}:after {
    background-color: white;
  }
`;

export const IconsCSS = css`
  padding: 0 4px;
  width: 30px;
  height: 30px;
`;

export const Cart = styled(BsCart4)`
  ${IconsCSS}
`;

export const History = styled(BiHistory)`
  ${IconsCSS}
`;

export const Contact = styled(MdOutlineContactSupport)`
  ${IconsCSS}
`;

export const Search = styled(BsSearch)`
  ${IconsCSS}
`;

export const ToolTip = styled.span`
  font-size: 18px;
  opacity: 0;
  width: 120px;
  background-color: #b1b3b3ff;
  color: white;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  top: 80%;
  left: 25%;
  margin-left: -10px;
  transform: translate3d(0, -10px, 0);
  transition: all 0.15s ease-in-out;
  &:after {
    content: "";
    position: absolute;
    bottom: 100%;
    left: 25%;
    margin-left: -10px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent #b1b3b3ff transparent;
  }
`;

export const Nav2 = styled(NavLink)`
  text-decoration: none;
  cursor: pointer;
  padding: 15px 12px;
  font-size: 24px;
  color: black;
  position: relative;
  &:hover ${ToolTip} {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;
