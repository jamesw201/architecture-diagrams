import React from 'react';
import styled from 'styled-components';
import { darkBrown } from '../styles/colours';
import { Title } from '../styles/title';
import profilePng from '../images/user.png'

const NavBarStyled = styled.div`
    background-color: ${darkBrown};
    padding: 10px;
    display: grid;
    border-top: 1px solid black;
    border-right: 1px solid black;
    border-left: 1px solid black;
    border-bottom: 1px solid black;
    grid-template-columns: 300px auto 80px 80px 40px;
`;

const ControlButtonElem = styled.div`
    cursor: pointer;
    color: white;
    padding-top: 4px;
`;

const Logo = styled(Title)`
    font-size: 20px;
    color: white;
    text-shadow: 1px 1px 4px #420101;
`;

export function NavBar() {
    return <NavBarStyled>
        <Logo>
            Infrastructure Graph
        </Logo>
        <div></div>
        <ControlButtonElem>docs</ControlButtonElem>
        <ControlButtonElem>demos</ControlButtonElem>
        <img src={profilePng} alt="profile" style={{ width: "25px", height: "25px", paddingTop: "2px" }} />
    </NavBarStyled>
}
