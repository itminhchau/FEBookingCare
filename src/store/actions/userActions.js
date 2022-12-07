import userService from '../../services/userService';
import actionTypes from './actionTypes';

export const addUserSuccess = () => ({
    type: actionTypes.ADD_USER_SUCCESS
})

export const userLoginSuccess = (userInfo) => ({
    type: actionTypes.USER_LOGIN_SUCCES,
    userInfo: userInfo
})

export const userLoginFail = () => ({
    type: actionTypes.USER_LOGIN_FAIL
})

export const processLogout = () => ({
    type: actionTypes.PROCESS_LOGOUT
})

// get detail doctor
export const getDetailDoctor = (idInput) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.GET_DETAIL_DOCTOR_START
            })
            let res = await userService.getDetailDoctor(idInput)
            console.log("check res", res);
            if (res && res.errCode === 0) {
                dispatch(getDetailDoctorSuccess(res.data))
            } else {
                dispatch(getDetailDoctorFail())
            }
        } catch (error) {
            dispatch(getDetailDoctorFail())
        }
    }
}

export const getDetailDoctorSuccess = (doctorInfo) => ({
    type: actionTypes.GET_DETAIL_DOCTOR_SUCCESS,
    doctorInfo: doctorInfo
})

export const getDetailDoctorFail = () => ({
    type: actionTypes.GET_DETAIL_DOCTOR_fAIL
})