import actionTypes from '../actions/actionTypes';

const initialState = {
    genders: [],
    position: [],
    role: [],
    isLoading: false
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        //Gender
        case actionTypes.FETCH_GENDER_START:
            state.isLoading = true
            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data
            state.isLoading = true
            return {
                ...state
            }
        case actionTypes.FETCH_GENDER_FAIL:
            state.isLoading = true
            return {
                ...state,
            }
        //position
        case actionTypes.FETCH_POSITION_START:
            state.isLoading = true
            return {
                ...state,
            }
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.position = action.data
            state.isLoading = true
            return {
                ...state
            }


        case actionTypes.FETCH_POSITION_FAIL:
            state.isLoading = true
            return {
                ...state,
            }
        // ROle
        case actionTypes.FETCH_ROLE_START:
            state.isLoading = true
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.role = action.data
            state.isLoading = true
            console.log("role", action);
            return {
                ...state
            }
        case actionTypes.FETCH_ROLE_FAIL:
            state.isLoading = true
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default adminReducer;