import { toast } from 'react-toastify';
import userService from "../../services/userService";
import actionTypes from "./actionTypes";
// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })

// GENDER
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {

        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START })
            let res = await userService.getAllCodeService('GENDER')
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data))
            } else {
                dispatch(fetchGenderFail())
            }
        } catch (error) {
            console.log("fetch gender fail", error);
            dispatch(fetchGenderFail())
        }
    }
}
export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})
export const fetchGenderFail = () => ({
    type: actionTypes.FETCH_GENDER_FAIL
})
//POSISTION

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {

        try {

            let res = await userService.getAllCodeService('POSITION')
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data))
            } else {
                dispatch(fetchPositionFail())
            }
        } catch (error) {
            console.log("fetch Position fail", error);
            dispatch(fetchPositionFail())
        }
    }
}
export const fetchPositionSuccess = (PositionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: PositionData
})
export const fetchPositionFail = () => ({
    type: actionTypes.FETCH_POSITION_FAIL
})

//ROLE
export const fetchRoleStart = () => {
    return async (dispatch, getState) => {

        try {
            dispatch({ type: actionTypes.FETCH_ROLE_START })
            let res = await userService.getAllCodeService('ROLE')
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data))
            } else {
                dispatch(fetchRoleFail())
            }
        } catch (error) {
            console.log("fetch role fail", error);
            dispatch(fetchRoleFail())
        }
    }
}
export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})
export const fetchRoleFail = () => ({
    type: actionTypes.FETCH_ROLE_FAIL
})

// create user

export const createUser = (data) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.CREATE_USER_START
            })
            let res = await userService.createUserService(data)
            console.log("check res create user", res);
            if (res && res.errCode === 0) {
                dispatch(createUserSuccess())
                dispatch(getAllUser())
            } else {
                dispatch(createUserFail())
            }
        } catch (error) {
            console.log("eror create user", error);
            dispatch(createUserFail())
        }
    }
}

export const createUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})
export const createUserFail = () => ({
    type: actionTypes.CREATE_USER_FAIL
})

// GET ALL USER

export const getAllUser = () => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.getUserService("ALL")
            console.log("check res", res);
            if (res && res.errCode === 0) {
                dispatch(getUserSuccess(res.user.reverse()))
            } else {
                dispatch(getUserFail())
            }

        } catch (error) {
            console.log("error get all user", error);
            dispatch(getUserFail())
        }
    }
}

export const getUserSuccess = (dataUser) => ({
    type: actionTypes.GET_ALL_USER_SUCCESS,
    dataUser: dataUser
})
export const getUserFail = () => ({
    type: actionTypes.GET_ALL_USER_FAIL
})

// DELETE USER
export const deleteUser = (idUser) => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.deleteUserService(idUser)
            console.log("check res", res);
            if (res && res.errCode === 0) {
                dispatch(deleteUserSuccess())
                toast.success("delete user success")
                dispatch(getAllUser())
            } else {
                dispatch(deleteUserFail())
                toast.error("delete user fail")
            }

        } catch (error) {
            console.log("error get all user", error);
            dispatch(deleteUserFail())
            toast.error("delete user fail")
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,
})
export const deleteUserFail = () => ({
    type: actionTypes.DELETE_USER_FAIL
})

//EDIT

export const editUser = (dataUser) => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.updateUserService(dataUser)
            console.log("check res", res);
            if (res && res.errCode === 0) {
                dispatch(edittUserSuccess())
                toast.success("edit user success")
                dispatch(getAllUser())
            } else {
                dispatch(editUserFail())
                toast.error("edit user fail")
            }

        } catch (error) {
            console.log("error get all user", error);
            dispatch(editUserFail())
            toast.error("edit user fail")
        }
    }
}

export const edittUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS,
})
export const editUserFail = () => ({
    type: actionTypes.EDIT_USER_FAIL
})

//TOP DOCTOR

export const getTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTOR_START
            })
            let res = await userService.getTopDoctorService('10')
            if (res && res.errCode === 0) {
                dispatch(getTopDoctorSuccess(res.data))
            } else {
                dispatch(getTopDoctorFail())
            }
        } catch (error) {
            dispatch(getTopDoctorFail())
        }
    }
}

export const getTopDoctorSuccess = (dataUser) => ({
    type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
    data: dataUser
})

export const getTopDoctorFail = () => ({
    type: actionTypes.FETCH_TOP_DOCTOR_FAIL
})

// get all doctor

export const getAllDoctor = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTOR_START
            })
            let res = await userService.getAllDoctorService()
            if (res && res.errCode == 0) {
                dispatch(getAllDoctorSuccess(res.data))
            } else {
                dispatch(getAllDoctorFail())
            }
        } catch (e) {
            dispatch(getAllDoctorFail())
        }
    }
}

export const getAllDoctorSuccess = (dataInput) => ({
    type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
    data: dataInput
})

export const getAllDoctorFail = () => ({
    type: actionTypes.FETCH_ALL_DOCTOR_FAIL
})

// Create doctor

export const createDoctor = (dataInput) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.CREATE_DOCTOR_START
            })
            let res = await userService.createDoctorService(dataInput)
            if (res && res.errCode == 1) {
                toast.error("missing infor")
                // alert("infor existed can't create")
            }
            console.log("check res create", res);
            if (res && res.errCode === 0) {
                dispatch(createDoctorSuccess)
                toast.success("save information success")
                console.log("save information");
            }
        } catch (e) {
            dispatch(createDoctorFail)
            toast.error("infor existed can't create")
        }
    }
}

export const createDoctorSuccess = () => ({
    type: actionTypes.CREATE_DOCTOR_SUCCESS
})
export const createDoctorFail = () => ({
    type: actionTypes.CREATE_DOCTOR_FAIL
})


// GET TIME SCHEDULE

export const getDoctorTimeSchedule = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.GET_DOCTOR_TIME_SCHEDULE_START
            })
            let res = await userService.getAllCodeService('TIME')
            if (res && res.errCode === 0) {
                dispatch(getDoctorTimeScheduleSuccess(res.data))
            }
        } catch (error) {
            dispatch(getDoctorTimeScheduleFail())
        }
    }
}

export const getDoctorTimeScheduleSuccess = (timeInfor) => ({
    type: actionTypes.GET_DOCTOR_TIME_SCHEDULE_SUCCESS,
    timeInfor: timeInfor
})
export const getDoctorTimeScheduleFail = () => ({
    type: actionTypes.GET_DOCTOR_TIME_SCHEDULE_FAIL,
})

// GET province, payment, price
export const getRequireDoctorAllCode = () => {
    return async (dispatch, getState) => {

        try {
            dispatch({ type: actionTypes.GET_REQUIRE_TO_ALLCODE_START })
            let resPrice = await userService.getAllCodeService('PRICE')
            let resPayment = await userService.getAllCodeService('PAYMENT')
            let resProvince = await userService.getAllCodeService('PROVINCE')
            if (resPrice && resPrice.errCode === 0
                && resPayment && resPayment.errCode === 0
                && resProvince && resProvince.errCode === 0
            ) {
                let data = {
                    price: resPrice.data,
                    payment: resPayment.data,
                    province: resProvince.data
                }
                dispatch(getRequireDoctorAllCodeSuccess(data))
            } else {
                dispatch(getRequireDoctorAllCodeFail())
            }
        } catch (error) {
            console.log(" getRequireDoctorAllCodeFail fail", error);
            dispatch(getRequireDoctorAllCodeFail())
        }
    }
}
export const getRequireDoctorAllCodeSuccess = (dataInput) => ({
    type: actionTypes.GET_REQUIRE_TO_ALLCODE_SUCCESS,
    data: dataInput
})
export const getRequireDoctorAllCodeFail = () => ({
    type: actionTypes.GET_REQUIRE_TO_ALLCODE_FAIL
})