import React from 'react';
import styled from 'styled-components';
import { GlobalStyle } from './styles/GlobalStyles';

import { NavBar } from './navbar/NavBar';
import { FilePickerBar } from './FilePicker/FilePicker';
import { Page } from './components/page/Page';


const AppStyle = styled.div`
    display: grid;
    grid-template-rows: 50px 1fr;
`;

function App() {
    return (
        <AppStyle>
            <GlobalStyle />
            <NavBar />
            <FilePickerBar />
            <Page />
        </AppStyle>
    )
}

export default App
