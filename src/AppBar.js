import React from 'react'
import styled, { css } from 'styled-components';
import { AppContext } from './AppProvider';

const Bar = styled.div`
    display: grid;
    margin-bottom: 40px;
    grid-template-columns: 280px auto 100px 100px;
`;

const Logo = styled.div`
    font-size: 1.5em;
`;

const ControlButtonElem = styled.div`
    cursor: pointer;
    ${props => props.active && css`
        color: blue;
        text-shadow: 0px 0px 60px #03ff03;
    `}
`;
function ControlButton({name, active}) {
    return (
        <AppContext.Consumer>
            {({page, setPage}) => (
                <ControlButtonElem 
                    onClick={() => setPage(name)}
                    active={page === name}
                >
                    {name}
                </ControlButtonElem>
            )}
        </AppContext.Consumer>
    )
}


export default function () {
    return <Bar>
        <Logo> architecture diagrams </Logo>
        <div></div>
        <ControlButton active name="docs" />
        <ControlButton name="demos" />
    </Bar>
}