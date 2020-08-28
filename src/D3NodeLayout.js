// import { createCanvas, Image, registerFont } from 'canvas' // supports node-canvas v1 & v2.x§

// function D3NodeExperiment(iconRetriever) {
function D3NodeExperiment(ctx, layout) {
    function selectIcon(resourceType) {
        const types = {
            aws_lambda_function: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 75 75"><defs><style>.cls-1{fill:#d86613;}.cls-2{fill:#fff;}</style></defs><title>AWS-Lambda_light-bg</title><g id="Reference"><rect id="Orange_Light_BG" data-name="Orange Light BG" class="cls-1" width="75" height="75"/><g id="Product_Icon" data-name="Product Icon"><path class="cls-2" d="M60.5,62.5H48.18a1,1,0,0,1-.9-.57L29.86,25.5H22.49a1,1,0,0,1-1-1v-11a1,1,0,0,1,1-1H37.89a1,1,0,0,1,.9.57L56.13,49.5H60.5a1,1,0,0,1,1,1v11A1,1,0,0,1,60.5,62.5Zm-11.69-2H59.5v-9h-4a1,1,0,0,1-.9-.57L37.26,14.5H23.5v9h7a1,1,0,0,1,.9.57Z"/><path class="cls-2" d="M27.48,62.5h-13a1,1,0,0,1-.85-.47,1,1,0,0,1-.05-1L27.18,32.62a1,1,0,0,1,.9-.57h0a1,1,0,0,1,.9.56L35.49,46a1,1,0,0,1,0,.87l-7.1,15A1,1,0,0,1,27.48,62.5Zm-11.4-2H26.85l6.63-14L28.09,35.35Z"/></g></g></svg>',
            aws_sns_topic: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 75 75"><defs><style>.cls-1{fill:url(#PinkGradient);}.cls-2{fill:#fff;}</style><linearGradient id="PinkGradient" x1="806.75" y1="-382.13" x2="806.75" y2="-232.13" gradientTransform="translate(825.13 390.78) rotate(-135)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#b0084d"/><stop offset="1" stop-color="#ff4f8b"/></linearGradient></defs><title>Amazon-Simple-Notification-Service-SNS</title><g id="Working"><rect id="Pink_Gradient" data-name="Pink Gradient" class="cls-1" width="75" height="75"/><g id="Icon_Test" data-name="Icon Test"><path class="cls-2" d="M54.58,50.92l0,.83c0-.1,0-.2,0-.3A2.33,2.33,0,0,1,54.58,50.92Z"/><path class="cls-2" d="M41.45,31l-.1.19a.72.72,0,0,0,.09-.2Z"/><path class="cls-2" d="M32.78,27.53c-.89,0-8.75-.07-8.75,2.9a1.42,1.42,0,0,0,.1.55,2,2,0,0,0,.1.21l5.44,12v6.21c0,.63.26,1,.81,1h.26a8.76,8.76,0,0,0,3.42-1.77l.67-.47a1,1,0,0,0,.47-.84V43.22l6.05-12h0a.72.72,0,0,0,.09-.2,1.42,1.42,0,0,0,.1-.55C41.54,27.46,33.68,27.53,32.78,27.53Zm0,1.84c3.53,0,5.8.62,6.56,1.06-.76.44-3,1.06-6.56,1.06s-5.79-.62-6.55-1.06C27,30,29.25,29.37,32.78,29.37Zm.73,13c0,.14,0,.39,0,.65v3.91l-.39.24c-.57.33-1.07.56-1.64.86V43a1.14,1.14,0,0,0-.08-.4l-4.26-9.74a25.91,25.91,0,0,0,5.64.62,26.37,26.37,0,0,0,5.48-.58Z"/><path class="cls-2" d="M51,55.17A22.8,22.8,0,0,1,37.54,59.5C26.66,59.5,17.38,52.43,15.2,42a4.51,4.51,0,0,0,4.18-3.49h5.1V36.62H19.4A4.49,4.49,0,0,0,15.22,33a23,23,0,0,1,35.4-13.42L51.76,18A25,25,0,0,0,13.08,33.44a4.48,4.48,0,0,0,0,8.13A25,25,0,0,0,37.54,61.5a24.77,24.77,0,0,0,14.58-4.71ZM12.5,37.5A2.5,2.5,0,0,1,14.7,35H15a2.5,2.5,0,1,1-2.49,2.5Z"/><path class="cls-2" d="M14.86,35a0,0,0,0,0,0,0l-.15,0Z"/><path class="cls-2" d="M60,42a4.5,4.5,0,1,0-4.4-5.43h-5.2l0-12.37h2.7a4.5,4.5,0,1,0,.08-1.61l-3.68-.05a.83.83,0,0,0-1,.88V36.54H40.81v1.85H48.5V51.47a1,1,0,0,0,1,1h3.14a4.5,4.5,0,1,0,0-1.77H50.46l-.05-12.32H55.6A4.51,4.51,0,0,0,60,42Zm0-7a2.5,2.5,0,1,1-2.5,2.5A2.5,2.5,0,0,1,60,35Zm-2.5-13.91A2.49,2.49,0,1,1,55,23.56,2.49,2.49,0,0,1,57.51,21.07ZM57,49a2.5,2.5,0,1,1-2.47,2.81v0c0-.1,0-.2,0-.3a2.33,2.33,0,0,1,.06-.53h0A2.51,2.51,0,0,1,57,49Z"/></g></g></svg>',
            aws_sqs_queue: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 75 75"><defs><style>.cls-1{fill:url(#PinkGradient);}.cls-2{fill:#fff;}</style><linearGradient id="PinkGradient" x1="575.58" y1="207.32" x2="425.99" y2="199.48" gradientTransform="translate(535.43 -172.78) rotate(135)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#b0084d"/><stop offset="1" stop-color="#ff4f8b"/></linearGradient></defs><title>Amazon-Simple-Queue-Service-SQS</title><g id="Working"><rect id="Pink_Gradient" data-name="Pink Gradient" class="cls-1" width="75" height="75"/><g id="Icon_Test" data-name="Icon Test"><path class="cls-2" d="M21.69,22a22.18,22.18,0,0,1,36.6,8.36l1.89-.66a24.18,24.18,0,0,0-45.65,0l1.89.66A21.84,21.84,0,0,1,21.69,22Z"/><path class="cls-2" d="M53,53a22.19,22.19,0,0,1-31.36,0,22,22,0,0,1-5.27-8.42l-1.89.66a24.18,24.18,0,0,0,39.93,9.17,23.89,23.89,0,0,0,5.78-9.25l-1.89-.64A22,22,0,0,1,53,53Z"/><path class="cls-2" d="M20.15,37.46a5.84,5.84,0,1,0-1.71,4.12A5.78,5.78,0,0,0,20.15,37.46ZM17,40.17a3.93,3.93,0,0,1-5.41,0,3.83,3.83,0,0,1,2.7-6.53A3.86,3.86,0,0,1,17,34.76a3.83,3.83,0,0,1,0,5.41Z"/><path class="cls-2" d="M64.8,33.41a5.82,5.82,0,1,0,0,8.23h0A5.82,5.82,0,0,0,64.8,33.41Zm-1.42,6.81a3.82,3.82,0,0,1-5.4,0,3.81,3.81,0,0,1,0-5.4,3.82,3.82,0,1,1,5.4,5.4Z"/><path class="cls-2" d="M29.18,47.18c4.1-4.1,12.45-4.1,16.55,0a1,1,0,0,0,.7.29,1,1,0,0,0,1-1,1,1,0,0,0-.29-.71,11.66,11.66,0,0,1-3-8.27,11.67,11.67,0,0,1,3-8.27,1,1,0,0,0,0-1.41,1,1,0,0,0-1.41,0c-4.1,4.09-12.45,4.09-16.55,0a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.41,11.67,11.67,0,0,1,3.05,8.27,11.66,11.66,0,0,1-3.05,8.27,1,1,0,0,0-.29.71,1,1,0,0,0,.29.71A1,1,0,0,0,29.18,47.18Zm2.59-15.36a15.6,15.6,0,0,0,11.37,0,15.86,15.86,0,0,0,0,11.35,15.6,15.6,0,0,0-11.37,0,15.86,15.86,0,0,0,0-11.35Z"/><path class="cls-2" d="M49.63,41.59,53,38.18a1,1,0,0,0,0-1.41l-3.39-3.39-1.42,1.41,1.71,1.7H45.38v2H49.9l-1.69,1.69Z"/><path class="cls-2" d="M25.46,41.61l3.41-3.41a1,1,0,0,0,0-1.41l-3.41-3.41-1.41,1.41,1.7,1.7H21.38v2h4.37l-1.7,1.71Z"/></g></g></svg>',
            aws_dynamodb_table: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 75 75"><defs><style>.cls-1{fill:url(#BlueGradient);}.cls-2{fill:#fff;}</style><linearGradient id="BlueGradient" x1="-15.53" y1="90.53" x2="90.53" y2="-15.53" gradientTransform="translate(0 0)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#2e27ad"/><stop offset="1" stop-color="#527fff"/></linearGradient></defs><title>Amazon-DynamoDB</title><g id="Reference"><rect id="Blue_Gradient" data-name="Blue Gradient" class="cls-1" width="75" height="75"/><g id="Icon_Test" data-name="Icon Test"><path class="cls-2" d="M50.25,40.48l-6.61,6.6a16.23,16.23,0,0,0,3.42-1.39,2.58,2.58,0,0,1,1.19,1.8c0,1.83-3.88,3.82-9.64,4.63a42.23,42.23,0,0,1-5.36.38h-1c-8.08-.19-14-2.74-14-5a2.58,2.58,0,0,1,1.19-1.8c3.14,1.75,8.23,2.79,13.81,2.79h.11l.56-2c-.22,0-.44,0-.67,0-5.5,0-10.6-1.09-13.31-2.81-1.08-.71-1.68-1.48-1.69-2.15V36.9c3.06,2.34,9.16,3.56,15,3.56.79,0,1.58,0,2.35-.07l.57-2c-1,.07-1.93.1-2.92.1-8.58,0-15-2.63-15-5a2.58,2.58,0,0,1,1.19-1.8c2.76,1.55,7,2.52,11.81,2.74l.05-2c-4.73-.23-9-1.25-11.36-2.76-1.07-.69-1.67-1.47-1.69-2.15V22.9c3.06,2.34,9.16,3.56,15,3.56h.22l1.06-2-1.28,0c-8.58,0-15-2.63-15-5s6.42-5,15-5a36,36,0,0,1,8.58,1h5.49c-3-1.83-8.18-3-14.07-3-8.24,0-17,2.44-17,7v8.05a4.06,4.06,0,0,0,1.51,2.95,4.07,4.07,0,0,0-1.51,3v8a4.06,4.06,0,0,0,1.51,3,4.07,4.07,0,0,0-1.51,3v8a1.25,1.25,0,0,0,0,.21c.27,4.39,8.87,6.75,17,6.75s16.73-2.36,17-6.77a.75.75,0,0,0,0-.21v-8a4,4,0,0,0-1.51-3,4.06,4.06,0,0,0,1.51-3Zm-2,15c0,2.36-6.42,5-15,5s-15-2.61-15-5v-4.6c3.06,2.32,9.16,3.54,15,3.54s11.94-1.22,15-3.54Z"/><circle class="cls-2" cx="21.25" cy="27.52" r="1.25"/><circle class="cls-2" cx="21.25" cy="41.52" r="1.25"/><circle class="cls-2" cx="21.25" cy="55.52" r="1.25"/><path class="cls-2" d="M35.75,51.48a1,1,0,0,1-.5-.14,1,1,0,0,1-.46-1.15l5.62-18.71H34.75A1,1,0,0,1,33.86,30l6-12a1,1,0,0,1,.89-.55h13a1,1,0,0,1,1,1.31l-2.56,7.69h5.61a1,1,0,0,1,.72,1.69l-22,23A1,1,0,0,1,35.75,51.48Zm.62-22h5.38a1,1,0,0,1,.8.4,1,1,0,0,1,.16.88l-4.81,16,17.51-18.3H50.75a1,1,0,0,1-1-1.32l2.56-7.68h-11Z"/></g></g></svg>',
            aws_iam_role: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 75 75"><defs><style>.cls-1{fill:url(#RedGradient);}.cls-2{fill:#fff;}</style><linearGradient id="RedGradient" x1="-2417.47" y1="-41.53" x2="-2523.54" y2="64.54" gradientTransform="translate(-2433 49) rotate(180)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#bd0816"/><stop offset="1" stop-color="#ff5252"/></linearGradient></defs><title>AWS-Identity-and-Access-Management_IAM</title><g id="Reference"><rect id="Red_Gradient" data-name="Red Gradient" class="cls-1" width="75" height="75"/><g id="Icon_Test" data-name="Icon Test"><path class="cls-2" d="M59.7,19H15.3a2.81,2.81,0,0,0-2.8,2.8V53.2A2.81,2.81,0,0,0,15.3,56H59.7a2.81,2.81,0,0,0,2.8-2.8V21.8A2.81,2.81,0,0,0,59.7,19Zm.8,34.2a.8.8,0,0,1-.8.8H15.3a.8.8,0,0,1-.8-.8V21.8a.8.8,0,0,1,.8-.8H59.7a.8.8,0,0,1,.8.8Z"/><rect class="cls-2" x="40.5" y="32" width="10" height="2"/><rect class="cls-2" x="54.5" y="32" width="2" height="2"/><path class="cls-2" d="M36.21,35.3A1,1,0,0,0,35.5,35h-14V30A3.63,3.63,0,0,1,23,27.15,5.74,5.74,0,0,1,26.5,26a5.55,5.55,0,0,1,3.6,1.26A3.64,3.64,0,0,1,31.5,30v5h2V29.6a5.07,5.07,0,0,0-2.11-4A7.92,7.92,0,0,0,26.5,24c-3.86,0-7,2.51-7,5.59V35h-2a1,1,0,0,0-1,1V50a1,1,0,0,0,1,1h18a1,1,0,0,0,1-1V36A1,1,0,0,0,36.21,35.3ZM34.5,40h-3v2h3v2h-3v2h3v3h-16V37h16Z"/><path class="cls-2" d="M26.5,38.57a2.93,2.93,0,0,0-1,5.68V47h2V44.25a2.93,2.93,0,0,0-1-5.68Zm0,4.2a1.27,1.27,0,1,1,1.27-1.27A1.27,1.27,0,0,1,26.5,42.77Z"/><rect class="cls-2" x="40.5" y="37" width="7" height="2"/><rect class="cls-2" x="51.5" y="37" width="5" height="2"/><rect class="cls-2" x="40.5" y="42" width="13" height="2"/></g></g></svg>',
            aws_kms_key: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 75 75"><defs><style>.cls-1{fill:url(#RedGradient);}.cls-2{fill:#fff;}</style><linearGradient id="RedGradient" x1="-2436.76" y1="961.37" x2="-2436.76" y2="1111.37" gradientTransform="translate(-2418.37 -952.72) rotate(-135)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#bd0816"/><stop offset="1" stop-color="#ff5252"/></linearGradient></defs><title>AWS-Key-Management-Service</title><g id="Reference"><rect id="Red_Gradient" data-name="Red Gradient" class="cls-1" width="75" height="75"/><g id="Icon_Test" data-name="Icon Test"><path class="cls-2" d="M24.5,62a1,1,0,0,1-.75-.34l-3.5-4A1,1,0,0,1,20,57V54.42l-2.71-2.71a1,1,0,0,1,0-1.42L20,47.59V46.42l-2.71-2.71a1,1,0,0,1,0-1.42L20,39.59V37.17a12.45,12.45,0,0,1-8-11.82,12.5,12.5,0,0,1,25,.15,12.43,12.43,0,0,1-8,11.66V58a1,1,0,0,1-.35.76l-3.5,3A1,1,0,0,1,24.5,62ZM22,56.62l2.6,3L27,57.54V36.45a1,1,0,0,1,.7-1,10.49,10.49,0,1,0-6.43,0,1,1,0,0,1,.73,1V40a1,1,0,0,1-.29.71L19.42,43l2.29,2.29A1,1,0,0,1,22,46v2a1,1,0,0,1-.29.7L19.42,51l2.29,2.29A1,1,0,0,1,22,54ZM24.5,26.5A4.5,4.5,0,1,1,29,22,4.51,4.51,0,0,1,24.5,26.5Zm0-7A2.5,2.5,0,1,0,27,22,2.5,2.5,0,0,0,24.5,19.5Z"/><path class="cls-2" d="M61.09,55H31V53H61V31H39V29H61.09A1.9,1.9,0,0,1,63,30.87V53.13A1.9,1.9,0,0,1,61.09,55Z"/><path class="cls-2" d="M34.5,45.5a4,4,0,1,1,4-4A4,4,0,0,1,34.5,45.5Zm0-6a2,2,0,1,0,2,2A2,2,0,0,0,34.5,39.5Z"/><path class="cls-2" d="M44.5,45.5a4,4,0,1,1,4-4A4,4,0,0,1,44.5,45.5Zm0-6a2,2,0,1,0,2,2A2,2,0,0,0,44.5,39.5Z"/><rect class="cls-2" x="31" y="48" width="7" height="2"/><rect class="cls-2" x="41" y="48" width="7" height="2"/><rect class="cls-2" x="51" y="48" width="7" height="2"/></g></g></svg>'
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

    function getIcon(child) {
        // make it base64
        const xml = selectIcon(child.type);
        var svg64 = btoa(xml);
        var b64Start = 'data:image/svg+xml;base64,';

        // prepend a "header"
        var image64 = b64Start + svg64;
        const img = new Image();
        img.src = image64;

        // draw the image onto the canvas
        img.onload = () => {
            ctx.drawImage(img, child.x, child.y, child.width, child.height)
            if (child.violationsCount) {
                var w = 16;
                var x = child.x;
                var y = child.y;
                ctx.beginPath();
                ctx.fillStyle = "white";
                ctx.lineWidth = 1;
                ctx.strokeStyle = 'rgb(200,0,0)';
                ctx.arc(x, y, w/2, 0, 2 * Math.PI, false);
                ctx.fill();
                ctx.stroke();

                ctx.font = '8pt Calibri';
                ctx.fillStyle = 'rgb(200,0,0)';
                ctx.textAlign = 'center';
                ctx.fillText(child.violationsCount, x, y+3);
            }
        }
        img.onerror = (err) => { throw err }
    }

    async function drawOnCanvas() {
        ctx.fillStyle = 'white'
        ctx.fillRect(0, 0, layout.width + 40, layout.height)

        // draw nodes
        layout.children.forEach(async (child) => {
            const bla = selectIcon(child.type);
            if (bla) {
                getIcon(child)
            } else {
                console.log(`not found: ${child.type}`)
                ctx.strokeRect(child.x, child.y, child.width, child.height)
            }
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
