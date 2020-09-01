import React from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { FilePicker } from 'react-file-picker';

import { graphState, fileNameState } from '../recoil_store';
import { filePickerBarColour } from '../styles/colours';

const FilePickerBarStyled = styled.div`
    background-color: ${filePickerBarColour};
    padding: 4px;
    display: grid;
    grid-template-columns: 120px auto 132px;
`;

const FilenameStyle = styled.div`
    color: white;
    padding-left: 8px;
`;

function readFile(fileObject, setGraph) {
    const read = new FileReader();

    read.readAsBinaryString(fileObject);

    read.onloadend = function(){
        setGraph(JSON.parse(read.result))
    }
}

export function FilePickerBar() {
    const [filename, setFilename] = useRecoilState(fileNameState);
    const [graph, setGraph] = useRecoilState(graphState);

    return <FilePickerBarStyled>
        <FilenameStyle>{filename}</FilenameStyle>
        <div />
        <FilePicker
            extensions={['json']}
            onChange={FileObject => {
                const minusSuffix = FileObject.name.substring(0, FileObject.name.indexOf('.json'));
                setFilename(minusSuffix)
                readFile(FileObject, setGraph)
            }}
            onError={errMsg => console.log(`file-picker error: ${errMsg}`)}
        >
            <button>
            Select terraform file
            </button>
        </FilePicker>
    </FilePickerBarStyled>
}
