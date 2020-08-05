import React from 'react'
import GraphLayout from './GraphLayout';
import D3NodeLayout from './D3NodeLayout';

function App() {
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
        <canvas
            ref={canvasRef}
            width={layout.width}
            height={layout.height}
        />
    )
}

export default App
