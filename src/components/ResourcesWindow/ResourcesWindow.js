import React from 'react';
import styled from 'styled-components';
import AceEditor from 'react-ace';
import { useRecoilValue } from 'recoil';

import "ace-builds/src-noconflict/theme-github";

import { navBarColour } from '../../styles/colours';

import { resourceInFocusState } from '../../recoil_store';

export const ResourcesWindowStyled = styled.div`
    border-top: 1px solid ${navBarColour};
    border-right: 1px solid ${navBarColour};
    max-height: 60px;
`;


export function ResourcesWindow() {
    const resourceInFocus = useRecoilValue(resourceInFocusState);

    return <ResourcesWindowStyled>
        <p>{resourceInFocus.name}</p>
        <AceEditor
            name="generatedCode"
            mode="json"
            theme="github"
            onChange={() => {
                /* handler required, do nothing */
            }}
            editorProps={{ $blockScrolling: false }}
            fontSize="13px"
            height="400px"
            value={JSON.stringify(resourceInFocus, null, 2)}
        />
    </ResourcesWindowStyled>
}