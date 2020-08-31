import React from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { GlobalStyle } from './styles/GlobalStyles';

import { graphState } from './recoil_store';
import { NavBar } from './navbar/NavBar';
import { FilePickerBar } from './FilePicker/FilePicker';
import { Page } from './components/page/Page';

import data from './graphs/policy_graph.json';

const AppStyle = styled.div`
    display: grid;
    grid-template-rows: 50px 1fr;
`;

function App() {
    const [graph, setGraph] = useRecoilState(graphState);

    React.useEffect(() => {
        setGraph(data)
    }, []);

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
