import {
    DATA_LOAD_TOGGLE,
    DATA_NOT_AVAILABLE
} from "./../types";

const initialState = {
    data_loading : false,
    data_not_available : false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case DATA_LOAD_TOGGLE:
            return Object.assign({}, state, {data_loading: action.payload});
        case DATA_NOT_AVAILABLE:
            return Object.assign({}, state, {data_not_available: !state.data_not_available});
       
        default:
            return state;
    }
}
