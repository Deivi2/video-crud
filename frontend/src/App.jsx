import React, {Component} from 'react';
import Main from './components/Main';
import {Provider} from 'react-redux';
import store from './store';

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <div>
                    <h1>File Upload</h1>
                    <Main/>
                </div>
            </Provider>
        )

    }
};

export default App;
