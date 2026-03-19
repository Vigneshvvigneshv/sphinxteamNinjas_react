import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const HeaderContainer=styled.div`
`;

export const HeaderLogo=styled.div`
`;

export const HeaderButton=styled.div`
`;

export const NavButton=styled(NavLink)`
   text-decoration: none;
    padding:4px 10px;
    border:1px solid rgb(43, 21, 212);
    border-radius:6px;
    color:white;
    background-color:rgb(86, 67, 227);
`;