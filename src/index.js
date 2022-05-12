import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import {Provider} from "react-redux"

import App from './App'

const defaultState = {
    cart: [],
    users: [],
}

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'ADD_PROD':
            return {...state, cart: [...state.cart, action.payload]}
        case 'ADD_USER':
            for (let i = 0; i < state.users.length; i++)
                if (state.users[i].email === action.payload.email)
                    return state
            return {...state, users: [...state.users, action.payload]}
        default: return state
    }
}

const store = createStore(reducer)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
