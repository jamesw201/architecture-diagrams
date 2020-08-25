import data from './discovery_graph.json';
import * as R from 'ramda';

console.log(data.resources.length);
console.log(data.relationships.length);

function generateNodes(resources) {
    const invalidResources = ['provider', 'terraform', 'terraform_remote_state', 'variable', 
    'aws_cloudwatch_metric_alarm', 'aws_iam_role_policy', 'aws_api_gateway_base_path_mapping', 
    'aws_api_gateway_integration', 'aws_appautoscaling_target', 'aws_appautoscaling_policy', 
    'aws_api_gateway_method', 'aws_api_gateway_resource', 'aws_route_table', 'aws_route', 
    'aws_route_table_association', 'aws_kms_alias', 'aws_flow_log', 'aws_cloudwatch_log_group',
    'aws_iam_policy_document', 'aws_cloudwatch_event_rule', 'aws_cloudwatch_event_target'];
    // aws_kms_key

    const validResources = resources
        .map((resource, idx) => ({
            id: `n${idx}`,
            labels: [{ text: resource.name }],
            type: resource.type,
            width: 35,
            height: 35
        }))
        .filter(resource => !invalidResources.includes(resource.type))

    return validResources;
}

/*
    {"id":239,"labels":[{"text":"discovery_scheduler-rule_target"}],"type":"aws_cloudwatch_event_target","width":45,"height":45}
*/

/*
    {
        "in": "aws_cloudwatch_event_rule.discovery_legacy-scheduler-rule",
        "out": "aws_lambda_function.discovery_legacy-scheduler",
        "label": ""
    }
*/

// find the names of all aws_iam_role resources
// find all relationships where the role name appears as [in, out]
// 

// { id: 'e3', sources: [ 'n1' ], targets: [ 'n4' ] },
function existsInResources(id, children) {
    let result = undefined;
    children.forEach(resource => {
        const fullName = `${resource.type}.${resource.labels[0].text}`;
        if (fullName === id) {
            result = resource.id;
        }
    })
    return result;
}

function generateEdges(relationships, children) {
    const edges = relationships
        .filter(relationship => existsInResources(relationship.in, children) && existsInResources(relationship.out, children))
        .map((relationship, idx) => ({
            id: `e${idx}`,
            sources: [existsInResources(relationship.in, children)],
            targets: [existsInResources(relationship.out, children)]
        }));

    return edges;
}

export function mergeRoleRelationships(roleRelationshipPair) {
    if (roleRelationshipPair[0].length === 0 || roleRelationshipPair[1].length === 0) {
        return null;
    }

    const newEdges = roleRelationshipPair[0].map(rel => 
        ({ id: `${rel.id}c`, sources: [ roleRelationshipPair[1][0].sources[0] ], targets: [ rel.targets[0] ] })
    );
    const sourcesEdgesToBeDeleted = roleRelationshipPair[0].map(rel => rel.id);

    return {
        nodesToBeDeleted: roleRelationshipPair[1][0].targets[0],
        edgesToBeDeleted: [...sourcesEdgesToBeDeleted, roleRelationshipPair[1][0].id],
        newEdges
    }
}

export function root() {
    const children = generateNodes(data.resources);
    const edges = generateEdges(data.relationships, children);
    
    const iamRoles = children.filter(child => child.type === 'aws_iam_role');
    const roleRelationships = iamRoles.map(role => {
        const list = edges.filter(edge => edge.sources[0] === role.id || edge.targets[0] === role.id);
        return R.partition(edge => edge.sources[0] === role.id, list);
    });

    const results = roleRelationships.map(mergeRoleRelationships).filter(_=>_);
    // console.log(`results: ${JSON.stringify(results)}`);

    const emptyResult = { nodesToBeDeleted: [], edgesToBeDeleted: [], newEdges: []}
    const merged = results.reduce((acc, curr) => ({
        nodesToBeDeleted: [...acc.nodesToBeDeleted, curr.nodesToBeDeleted],
        edgesToBeDeleted: [...acc.edgesToBeDeleted, ...curr.edgesToBeDeleted],
        newEdges: [...acc.newEdges, ...curr.newEdges]
    }), emptyResult);

    // console.log(`merged: ${JSON.stringify(merged)}`);

    const newNodes = children.filter(child => !merged.nodesToBeDeleted.includes(child.id));
    const newEdges = edges.filter(edge => !merged.edgesToBeDeleted.includes(edge.id));

    return {
        id: 'root',
        children: newNodes,
        edges: [...newEdges, ...merged.newEdges]
    }
}
