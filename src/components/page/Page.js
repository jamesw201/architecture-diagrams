import React from 'react';
import styled from 'styled-components';
import { DiagramWindow } from '../DiagramWindow/DiagramWindow';
import { AnalysisWindow } from '../AnalysisWindow/AnalysisWindow';

export const PageStyled = styled.div`
    display: grid;
    height: 94vh;
    grid-template-columns: 7fr 3fr;
`;

export function Page() {
    return <PageStyled>
        <DiagramWindow />
        <AnalysisWindow />
    </PageStyled>
}