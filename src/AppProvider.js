import React from 'react';

export const AppContext = React.createContext();

export class AppProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 'docs',
            ...this.savedSettings(),
            setPage: this.setPage
        }
    }

    setPage = page => this.setState({page})

    savedSettings() {
        let diagramData = JSON.parse(localStorage.getItem('infra-data'));
        if (!diagramData) {
            return { page: 'docs', firstVisit: true }
        }
        return {};
    }

    render() {
        return (
            <AppContext.Provider value={this.state}>
                {this.props.children}
            </AppContext.Provider>
        )
    }
}
