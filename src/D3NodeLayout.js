// import { createCanvas, Image, registerFont } from 'canvas' // supports node-canvas v1 & v2.x§

// import SVGLayout from './svg_data.json'

// function D3NodeExperiment(iconRetriever) {
function D3NodeExperiment(ctx, layout) {
    const iconFilenames = ['AWS-Lambda@4x.png', 'Amazon-Simple-Notification-Service-SNS@4x.png', 'Amazon-DynamoDB@4x.png', 'Amazon-API-Gateway@4x.png']

    function selectIcon(resourceType) {
        const types = {
            lambda: 'AWS-Lambda@4x.png',
            sns: 'Amazon-Simple-Notification-Service-SNS@4x.png',
            'dynamo-table': 'Amazon-DynamoDB@4x.png',
            api: 'Amazon-API-Gateway@4x.png'
        }
        return types[resourceType]
    }

    // expand with color, background etc.
    function drawTextBG(txt, font, x, y) {
        // lets save current state as we make a lot of changes
        ctx.save()

        // set font
        ctx.font = font

        // draw text from top - makes life easier at the moment
        ctx.textBaseline = 'top'

        // color for background
        ctx.fillStyle = '#fff'

        // get width of text
        const { width } = ctx.measureText(txt)

        // draw background rect assuming height of font
        ctx.fillRect(x, y, width, parseInt(10, 10))

        // text color
        ctx.fillStyle = '#000'

        // draw text on top
        ctx.fillText(txt, x, y)

        // restore original state
        ctx.restore()
    }

    function drawSvg(type, width, height) {
        // var data = SVGLayout.lambda;
        // var data = lambdaSvg;
        //  var DOMURL = window.URL || window.webkitURL || window;
        //  var img1 = new Image();
        //  var svg = new Blob([data], {type: 'image/svg+xml'});
        //  var url = DOMURL.createObjectURL(svg);
        //  img1.onload = function() {
        //     ctx.drawImage(img1, width, height);
        //     DOMURL.revokeObjectURL(url);
        //  }
        //  img1.src = url;
    }

    async function drawOnCanvas() {
        // console.log(`layout: ${JSON.stringify(layout)}`);
        ctx.fillStyle = 'white'
        ctx.fillRect(0, 0, layout.width + 40, layout.height)

        // draw nodes
        layout.children.forEach(async (child) => {
            if (child.type === 'aws_lambda_function') {
                // drawSvg(child.type, child.width, child.height)
                ctx.strokeRect(child.x, child.y, child.width, child.height)
            } else {
                ctx.strokeRect(child.x, child.y, child.width, child.height)
            }

            // TODO: try this approach: https://www.tutorialspoint.com/How-to-draw-an-SVG-file-on-an-HTML5-canvas

            // const data = fs.readFileSync(`/tmp/${selectIcon(child.type)}`)
            // const img = new Image()
            // img.onload = () => ctx.drawImage(img, child.x, child.y, child.width, child.height)
            // img.onerror = (err) => { throw err }
            // img.src = data
        })

        // draw edges
        layout.edges.forEach((edge) => {
            const { startPoint, endPoint, bendPoints } = edge.sections[0]
            ctx.beginPath()
            ctx.moveTo(startPoint.x, startPoint.y)
            if (bendPoints) {
                bendPoints.forEach((point) => {
                    ctx.lineTo(point.x, point.y)
                })
            }
            ctx.lineTo(endPoint.x, endPoint.y)
            ctx.stroke()
        })

        // draw labels
        layout.children.forEach((child) => {
            drawTextBG(child.labels[0].text, '13px Noto Sans', child.x, child.y + child.height)
        })
    }

    return Object.freeze({
        drawOnCanvas
    })
}

export default D3NodeExperiment
