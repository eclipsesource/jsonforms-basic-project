import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import { jsonformsReducer } from '@jsonforms/core';
import { materialFields, materialRenderers } from '@jsonforms/material-renderers';

import * as serviceWorker from './serviceWorker';
import App from './App';
import './index.css';

/**
 * Store used for the creation of forms
 */
const store = createStore(
    combineReducers({ jsonforms: jsonformsReducer() }),
    {
        jsonforms: {
            renderers: materialRenderers,
            fields: materialFields
        }
    }
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
