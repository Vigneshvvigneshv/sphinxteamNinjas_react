import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const HeaderContainer=styled.div`
    background-color:rgb(132, 96, 46);
    padding:10px 15px;
    display:flex;
    height:50px;
    align-items:center;
    justify-content:space-between;
`;

export const HeaderLogo=styled.div`
`;

export const HeaderButton=styled(NavLink)`
    text-decoration:none;
    background:none;
    font-size:14px;
    padding:7px 10px;
    color:white;
    border:none;
    &:hover{
       color:black;
    }
`;

export const NavButton=styled(NavLink)`
    text-decoration:none;   
    margin-top: 10px;
    padding: 9px 12px;
    border: none;
    border-radius: 6px;
    background: rgb(205 161 100);
    color: white;
    font-size: 14px;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
        background: rgb(132, 96, 46);
    }
`;