import React from 'react'
import styled from 'styled-components'
import { GlobalStyle } from './styles/GlobalStyles';

import { NavBar } from './navbar/NavBar';
import { Page } from './components/page/Page';

const AppStyle = styled.div`
    display: grid;
    grid-template-rows: 50px 1fr;
`;

function App() {
    // const [layout, setLayout] = React.useState({})
    // const canvasRef = React.useRef(null)

    // React.useEffect(() => {
    //     const canvas = canvasRef.current
    //     const ctx = canvas.getContext('2d')

    //     GraphLayout().generate()
    //         .then((res: Graph) => {
    //             setLayout(res)
    //             const nodeLayout = D3NodeLayout(ctx, res);
    //             nodeLayout.drawOnCanvas()
    //         })
    // }, [])

    // <canvas
    //     ref={canvasRef}
    //     width={layout.width}
    //     height={layout.height}
    // />

    return (
        <AppStyle>
            <GlobalStyle />
            <NavBar />
            <Page />
        </AppStyle>
    )
}

export default App
