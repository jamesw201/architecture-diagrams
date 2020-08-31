// This Entity will annotate the elkGraph with Policy Results
function GraphAnnotator(terraformGraph, elkGraph) {
    function annotate() {
        const annotatedChildren = elkGraph.children.map(child => {
            const resourceName = child.labels[0].text;
            const resourceType = child.type;
            
            const violations = terraformGraph.policy_results[`${resourceType}_${resourceName}`];

            return violations ? { ...child, violationsCount: violations.length } : child;
        })

        return { ...elkGraph, children: annotatedChildren };
    }

    return Object.freeze({
        annotate
    })    
}

export default GraphAnnotator;
