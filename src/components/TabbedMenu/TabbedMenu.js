import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import AceEditor from 'react-ace';

import "ace-builds/src-noconflict/theme-github";

import { graphState, resourceInFocusState } from '../../recoil_store';

export const TabbedMenuStyled = styled.div`
    border-right: 1px solid black;
    border-bottom: 1px solid black;
    border-top: 1px solid black;
    display: grid;
    grid-template-rows: 30px auto;
    margin: 5px;
    width: 100%;
    margin-left: 0;
`;

const MenuItems = styled.div`
    display: grid;
    border-bottom: 1px solid black;
    grid-auto-flow: column;
`;

const MenuItem = styled.div`
    border-right: 1px solid black;
    padding-top: 4px;
    padding-left: 4px;
    place-content: center;
    background-color: white;
`;

function extractPolicyResults(graph, resourceInFocus) {
    if (Object.keys(resourceInFocus).length === 0 || Object.keys(graph).length === 0) {
        return {};
    }

    return graph.policy_results[`${resourceInFocus.type}_${resourceInFocus.name}`] || {};
}

export function TabbedMenu() {
    const graph = useRecoilValue(graphState);
    const [resourceInFocus, setResourceInFocus] = useRecoilState(resourceInFocusState);

    const policyResults = extractPolicyResults(graph, resourceInFocus);

    return <TabbedMenuStyled>
        <MenuItems>
            <MenuItem>Policy Violations</MenuItem>
            <MenuItem>Documentation</MenuItem>
            <MenuItem>SRE</MenuItem>
        </MenuItems>
        <div>
            <AceEditor
                name="policyViolations"
                mode="json"
                theme="github"
                onChange={() => {
                    /* handler required, do nothing */
                }}
                editorProps={{ $blockScrolling: false }}
                fontSize="13px"
                height="400px"
                value={JSON.stringify(policyResults, null, 2)}
            />
        </div>
    </TabbedMenuStyled>
}