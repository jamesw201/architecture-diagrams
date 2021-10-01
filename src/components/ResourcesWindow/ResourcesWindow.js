import React from 'react';
import styled from 'styled-components';
import AceEditor from 'react-ace';
import { useRecoilValue } from 'recoil';

import "ace-builds/src-noconflict/theme-github";

import { resourceInFocusState } from '../../recoil_store';

export const ResourcesWindowStyled = styled.div`
    max-height: 60px;
`;

const ResourceTitle = styled.p`
    padding-left: 4px;
`;

export function ResourcesWindow() {
    const resourceInFocus = useRecoilValue(resourceInFocusState);

    return <ResourcesWindowStyled>
        <ResourceTitle>{resourceInFocus.name}</ResourceTitle>
        <AceEditor
            name="generatedCode"
            mode="json"
            theme="github"
            onChange={() => {
                /* handler required, do nothing */
            }}
            editorProps={{ $blockScrolling: false }}
            fontSize="13px"
            height="404px"
            value={JSON.stringify(resourceInFocus, null, 2)}
        />
    </ResourcesWindowStyled>
}