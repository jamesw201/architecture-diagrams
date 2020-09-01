import { atom } from "recoil";

const count = atom({
    key: "count",
    default: 0
});

const graphState = atom({
    key: "graph",
    default: { resources: [] }
});

const resourceInFocusState = atom({
    key: "resourceInFocus",
    default: {}
});

const fileNameState = atom({
    key: "filename",
    default: ''
});


export { count, graphState, resourceInFocusState, fileNameState };
