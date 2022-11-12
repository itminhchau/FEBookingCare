import actionTypes from '../actions/actionTypes';

const initialState = {
    genders: [],
    position: [],
    role: [],
    isLoading: false,
    arrayUser: [],
    arrayTopDoctor: [],
    arrayAllDoctor: []
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
            state.isLoading = false
            return {
                ...state
            }
        case actionTypes.FETCH_GENDER_FAIL:
            state.isLoading = false
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
            state.isLoading = false
            return {
                ...state
            }


        case actionTypes.FETCH_POSITION_FAIL:
            state.isLoading = false
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
            state.isLoading = false
            return {
                ...state
            }
        case actionTypes.FETCH_ROLE_FAIL:
            state.isLoading = false
            return {
                ...state,
            }
        // get All User
        case actionTypes.GET_ALL_USER_SUCCESS:
            state.arrayUser = action.dataUser
            console.log("get all use action", state.arrayUser);
            state.isLoading = false
            return {
                ...state
            }
        case actionTypes.FETCH_ROLE_FAIL:
            state.isLoading = false
            state.arrayUser = []
            return {
                ...state,
            }

        // get top doctor
        case actionTypes.FETCH_TOP_DOCTOR_START:
            state.isLoading = true
            return {
                ...state,
            }
        case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
            state.arrayTopDoctor = action.data
            state.isLoading = false
            return {
                ...state
            }
        case actionTypes.FETCH_TOP_DOCTOR_FAIL:
            state.isLoading = false
            return {
                ...state,
            }

        // get all doctor
        case actionTypes.FETCH_ALL_DOCTOR_START:
            state.isLoading = true
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
            state.arrayAllDoctor = action.data
            state.isLoading = false
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_DOCTOR_FAIL:
            state.isLoading = false
            return {
                ...state,
            }

        default:
            return state;
    }
}

export default adminReducer;