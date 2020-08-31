import ELK from 'elkjs/lib/elk.bundled.js';
import { root } from './TerraformToElk'

// some stuff copied from: https://github.com/OpenKieler/elkjs/issues/21
const elk = new ELK({
    defaultLayoutOptions: {
        'elk.algorithm': 'layered',
        'elk.direction': 'RIGHT',
        'elk.spacing.componentComponent': 105,
        'elk.layered.spacing.nodeNodeBetweenLayers': 210,
        'elk.edgeLabels.inline': true,
        'elk.nodeLabels.placement': 'V_BOTTOM',
        'elk.graphviz.labelDistance': 6,
        'elk.edgeRouting': 'SPLINES'
    }
})

function GenerateGraph(data) {
    function generate()  {
        // const graph = {
        //     id: 'root',
        //     children: [
        //         { id: 'n1', labels: [{ text: 'identity-auth-sync' }], type:'lambda', width: 45, height: 45 },
        //         { id: 'n2', labels: [{ text: 'account_account' }], type:'dynamo-table', width: 45, height: 45 },
        //         { id: 'n3', labels: [{ text: 'identity-sync-sns' }], type:'sns', width: 45, height: 45 },
        //         { id: 'n4', labels: [{ text: 'iapi' }], type:'api', width: 45, height: 45 },
        //         { id: 'n5', labels: [{ text: 'account-api' }], type:'api', width: 45, height: 45 },
        //         { id: 'n6', labels: [{ text: 'secret-api' }], type:'api', width: 45, height: 45 }
        //     ],
        //     edges: [
        // { id: 'e1', sources: [ 'n1' ], targets: [ 'n2' ] },
        // { id: 'e2', sources: [ 'n3' ], targets: [ 'n1' ] },
        // { id: 'e3', sources: [ 'n1' ], targets: [ 'n4' ] },
        // { id: 'e4', sources: [ 'n1' ], targets: [ 'n5' ] },
        // { id: 'e5', sources: [ 'n1' ], targets: [ 'n6' ] }
        //     ]
        // };

        const graph = root(data);
        return elk.layout(graph);
    }

    return Object.freeze({
        generate
    })
}

export default GenerateGraph
