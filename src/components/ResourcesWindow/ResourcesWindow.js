import React from 'react';
import styled from 'styled-components';
import { darkBrown } from '../../styles/colours';

export const ResourcesWindowStyled = styled.div`
    display: grid;
    border-top: 1px solid ${darkBrown};
    border-right: 1px solid ${darkBrown};
    border-left: 1px solid ${darkBrown};
`;

export function ResourcesWindow() {
    return <ResourcesWindowStyled>
        resources window
    </ResourcesWindowStyled>
}