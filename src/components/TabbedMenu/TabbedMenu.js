import React from 'react';
import styled from 'styled-components';

export const TabbedMenuStyled = styled.div`
    border-left: 1px solid black;
    border-right: 1px solid black;
    border-bottom: 1px solid black;
    border-top: 1px solid black;
    display: grid;
    grid-template-rows: 30px auto;
`;

const MenuItems = styled.div`
    display: grid;
    border-bottom: 1px solid black;
    grid-auto-flow: column;
`;

const MenuItem = styled.div`
    border-right: 1px solid black;
    padding-top: 4px;
    padding-left: 4px;
    place-content: center;
    background-color: #e6e1e1;
`;

export function TabbedMenu() {
    return <TabbedMenuStyled>
        <MenuItems>
            <MenuItem>Policy</MenuItem>
            <MenuItem>Documentation</MenuItem>
            <MenuItem>SRE</MenuItem>
        </MenuItems>
        <div></div>
    </TabbedMenuStyled>
}