import React from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { FilePicker } from 'react-file-picker';

import { graphState } from '../recoil_store';
import { filePickerBarColour } from '../styles/colours';

const FilePickerBarStyled = styled.div`
    background-color: ${filePickerBarColour};
    padding: 4px;
    display: grid;
    grid-template-columns: auto 180px;
`;


function readFile(fileObject, setGraph) {
    const read = new FileReader();

    read.readAsBinaryString(fileObject);

    read.onloadend = function(){
        setGraph(JSON.parse(read.result))
    }
}

export function FilePickerBar() {
    const [graph, setGraph] = useRecoilState(graphState);

    return <FilePickerBarStyled>
        <div />
        <FilePicker
            extensions={['json']}
            onChange={FileObject => readFile(FileObject, setGraph)}
            onError={errMsg => console.log(`file-picker error: ${errMsg}`)}
        >
            <button>
            Click to select terraform file
            </button>
        </FilePicker>
    </FilePickerBarStyled>
}
