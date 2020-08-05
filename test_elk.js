const ELK = require('elkjs')
// const ELK = require('elkjs/lib/elk.bundled.js');

// some stuff copied from: https://github.com/OpenKieler/elkjs/issues/21
const elk = new ELK({
    defaultLayoutOptions: {
        'elk.algorithm': 'layered',
        'elk.direction': 'RIGHT',
        'elk.spacing.componentComponent': 175,
        'elk.layered.spacing.nodeNodeBetweenLayers': 110,
        'elk.edgeLabels.inline': true,
        'elk.nodeLabels.placement': 'V_BOTTOM',
        'elk.graphviz.labelDistance': 6,
        'elk.edgeRouting': 'SPLINES'
    }
})

function GenerateGraph() {
    function generate() {
        const graph = {
            id: 'root',
            children: [
                { id: 'n1', labels: [{ text: 'identity-auth-sync' }], type:'lambda', width: 45, height: 45 },
                { id: 'n2', labels: [{ text: 'account_account' }], type:'dynamo-table', width: 45, height: 45 },
                { id: 'n3', labels: [{ text: 'identity-sync-sns' }], type:'sns', width: 45, height: 45 },
                { id: 'n4', labels: [{ text: 'iapi' }], type:'api', width: 45, height: 45 },
                { id: 'n5', labels: [{ text: 'account-api' }], type:'api', width: 45, height: 45 },
                { id: 'n6', labels: [{ text: 'secret-api' }], type:'api', width: 45, height: 45 }
            ],
            edges: [
                { id: 'e1', sources: [ 'n1' ], targets: [ 'n2' ] },
                { id: 'e2', sources: [ 'n3' ], targets: [ 'n1' ] },
                { id: 'e3', sources: [ 'n1' ], targets: [ 'n4' ] },
                { id: 'e4', sources: [ 'n1' ], targets: [ 'n5' ] },
                { id: 'e5', sources: [ 'n1' ], targets: [ 'n6' ] }
            ]
        }

        return elk.layout(graph)
    }

    return Object.freeze({
        generate
    })
}

const result = GenerateGraph().generate();
result
    .then(res => console.log(JSON.stringify(res)))
    .catch(console.error)

// console.log(`generate graph for: ${JSON.stringify(result)}`);
