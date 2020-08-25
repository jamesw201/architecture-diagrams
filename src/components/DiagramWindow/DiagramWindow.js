import React from 'react';
import styled from 'styled-components';

import { darkBrown } from '../../styles/colours';

import GraphLayout from '../../GraphLayout';
import D3NodeLayout from '../../D3NodeLayout';

export const DiagramWindowStyled = styled.div`
    border-left: 1px solid ${darkBrown};
    border-bottom: 1px solid ${darkBrown};
    border-top: 1px solid ${darkBrown};
    
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: white;
    height: 100%;
    overflow: auto;
`;

const LargeContainer = styled.div`
    width: 10000px;
    height: 10000px;
    overflow: hidden;
`;

const ScrollContainer = styled.div`
    width: calc(100% - 22px);
    height: calc(100vh - 22px);
    overflow: auto;
`;


function canvasClick(nodes, findX, findY) {
    const result = nodes.filter(child => {
        const validX = (child.x < findX) && (child.x + child.width > findX);
        const validY = (child.y < findY) && (child.y + child.height > findY);
    
        return validX && validY;
    });

    if (result.length > 0) {
        alert(result[0].labels[0].text);
    } else {
        alert('not found');
    }
}


export function DiagramWindow() {
    const [layout, setLayout] = React.useState({})
    const canvasRef = React.useRef(null)

    React.useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')

        GraphLayout().generate()
            .then((res: Graph) => {
                setLayout(res)

                const nodeLayout = D3NodeLayout(ctx, res);
                nodeLayout.drawOnCanvas()
            })
    }, [])

    return (
        <DiagramWindowStyled>
            <ScrollContainer>
                <LargeContainer>
                    <canvas
                        ref={canvasRef}
                        width={layout.width}
                        height={layout.height}
                        onClick={e => {
                            const canvas = canvasRef.current;
                            const rect = canvas.getBoundingClientRect();
                            const x = e.clientX - rect.left;
                            const y = e.clientY - rect.top;
                            canvasClick(layout.children, x, y);
                        }}
                    />
                </LargeContainer>
            </ScrollContainer>
        </DiagramWindowStyled>
    )
}
