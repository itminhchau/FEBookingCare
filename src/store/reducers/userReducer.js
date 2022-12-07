import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoggedIn: false,
    userInfo: null,
    doctorInfo: {}
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_LOGIN_SUCCES:
            return {
                ...state,
                isLoggedIn: true,
                userInfo: action.userInfo
            }
        case actionTypes.USER_LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null
            }
        case actionTypes.PROCESS_LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null
            }
        // get detail doctor
        case actionTypes.GET_DETAIL_DOCTOR_START:
            state.isLoading = true
            return {
                ...state
            }
        case actionTypes.GET_DETAIL_DOCTOR_SUCCESS:
            state.doctorInfo = action.doctorInfo
            state.isLoading = false
            return {
                ...state
            }
        case actionTypes.GET_DETAIL_DOCTOR_FAIL:
            state.isLoading = false
            return {
                ...state,
            }

        default:
            return state;
    }
}

export default userReducer;