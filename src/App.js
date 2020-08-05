import React from 'react'
import fs from 'fs'
import path from 'path'
import GraphLayout from './GraphLayout';
import D3NodeLayout from './D3NodeLayout';

const HOOK_SVG =
  'M60.5,62.5H48.18a1,1,0,0,1-.9-.57L29.86,25.5H22.49a1,1,0,0,1-1-1v-11a1,1,0,0,1,1-1H37.89a1,1,0,0,1,.9.57L56.13,49.5H60.5a1,1,0,0,1,1,1v11A1,1,0,0,1,60.5,62.5Zm-11.69-2H59.5v-9h-4a1,1,0,0,1-.9-.57L37.26,14.5H23.5v9h7a1,1,0,0,1,.9.57Z"/><path class="cls-2" d="M27.48,62.5h-13a1,1,0,0,1-.85-.47,1,1,0,0,1-.05-1L27.18,32.62a1,1,0,0,1,.9-.57h0a1,1,0,0,1,.9.56L35.49,46a1,1,0,0,1,0,.87l-7.1,15A1,1,0,0,1,27.48,62.5Zm-11.4-2H26.85l6.63-14L28.09,35.35Z'
const HOOK_PATH = new Path2D(HOOK_SVG)
const SCALE = 0.3
const OFFSET = 80

function draw(ctx, location) {
  ctx.fillStyle = 'deepskyblue'
  ctx.shadowColor = 'dodgerblue'
  ctx.shadowBlur = 20
  ctx.save()
  ctx.scale(SCALE, SCALE)
  ctx.translate(location.x / SCALE - OFFSET, location.y / SCALE - OFFSET)
  ctx.fill(HOOK_PATH)
  ctx.restore()
}

function App() {
    const [layout, setLayout] = React.useState({})
    const canvasRef = React.useRef(null)

    React.useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')

        GraphLayout().generate()
            .then((res: Graph) => {
                setLayout(res)
                // const lambdaSvg = fs.readFileSync(path.resolve(__dirname, '../AWS-Architecture-Icons_SVG_20200430/SVG Light/Compute/AWS-Lambda.svg', 'utf8'))
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
