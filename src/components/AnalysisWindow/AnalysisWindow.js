import React from 'react';
import styled from 'styled-components';

import { TabbedMenu } from '../TabbedMenu/TabbedMenu';
import { ResourcesWindow } from '../ResourcesWindow/ResourcesWindow';

export const AnalysisWindowStyled = styled.div`
    display: grid;
    height: 100%;
    template-grid-rows: 1fr 1fr;
    grid-row-gap: 390px;
`;

export function AnalysisWindow() {
    return <AnalysisWindowStyled>
        <ResourcesWindow />
        <TabbedMenu />
    </AnalysisWindowStyled>
}