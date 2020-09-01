import React from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';

import { navBarColour } from '../../styles/colours';

import GraphLayout from '../../GraphLayout';
import D3NodeLayout from '../../D3NodeLayout';
import GraphAnnotator from '../../GraphAnnotator';

import { graphState, resourceInFocusState } from '../../recoil_store';

export const DiagramWindowStyled = styled.div`
    border-left: 1px solid ${navBarColour};
    border-right: 1px solid ${navBarColour};
    border-bottom: 1px solid ${navBarColour};
    
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
    width: calc(100%);
    height: calc(100vh - 22px);
    overflow: auto;
`;


function canvasClick(nodes, findX, findY, graph, setResourceInFocus) {
    const result = nodes.filter(child => {
        const validX = (child.x < findX) && (child.x + child.width > findX);
        const validY = (child.y < findY) && (child.y + child.height > findY);
    
        return validX && validY;
    });

    if (result.length > 0) {
        const resource = graph.resources.find(resource => resource.name === result[0].labels[0].text);
        setResourceInFocus(resource);
    } else {
        alert('not found');
    }
}


export function DiagramWindow() {
    const graph = useRecoilValue(graphState);
    const [resourceInFocus, setResourceInFocus] = useRecoilState(resourceInFocusState);
    const [layout, setLayout] = React.useState({})
    const canvasRef = React.useRef(null)

    React.useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')

        if (graph.resources.length > 0) {
            GraphLayout(graph).generate()
                .then((elkGraph: Graph) => {
                    setLayout(elkGraph)
    
                    const annotatedGraph = GraphAnnotator(graph, elkGraph).annotate();
                    const nodeLayout = D3NodeLayout(ctx, annotatedGraph);
                    nodeLayout.drawOnCanvas()
                })
        }
    }, [graph])

    return (
        <DiagramWindowStyled>
            <ScrollContainer>
                <LargeContainer>
                    <canvas
                        ref={canvasRef}
                        width={layout.width+300+"px"}
                        height={layout.height}
                        onClick={e => {
                            const canvas = canvasRef.current;
                            const rect = canvas.getBoundingClientRect();
                            const x = e.clientX - rect.left;
                            const y = e.clientY - rect.top;
                            canvasClick(layout.children, x, y, graph, setResourceInFocus);
                        }}
                    />
                </LargeContainer>
            </ScrollContainer>
        </DiagramWindowStyled>
    )
}
