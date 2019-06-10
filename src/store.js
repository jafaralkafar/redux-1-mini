import { createStore } from 'redux'

const initialState = { 
    currentValue: 0,
    futureValues: [],
    previousValues: [] 
}

export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'
export const UNDO = 'UNDO'
export const REDO = 'REDO'

function reducer( state = initialState, action ) {
    switch (action.type) {
        case INCREMENT:
            return { 
                ...state,
                currentValue: state.currentValue + action.payload,
                futureValues: [],
                previousValues: [state.currentValue, ...state.previousValues]
            }
        case DECREMENT:
            return { 
                ...state,
                currentValue: state.currentValue - action.payload,
                futureValues: [],
                previousValues: [state.currentValue, ...state.previousValues]
            }
        case UNDO: 
            let [first, ...rest] = state.previousValues
            return {
                ...state,
                currentValue: first,
                futureValues: [state.currentValue, ...state.futureValues],
                previousValues: rest
            }
        case REDO:
            let [firstRedo, ...restRedo] = state.futureValues
            return {
                ...state,
                currentValue: firstRedo,
                futureValues: restRedo,
                previousValues: [state.currentValue, ...state.previousValues]
            }
        default:
            return state;
    }
}

export default createStore(reducer)