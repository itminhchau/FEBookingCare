import axios from "../axios"
const handleLogin = async (email, password) => {
    return await axios.post('/api/v1/login', { email, password })
}


const getUserService = async (idUser) => {
    return await axios.get(`/api/v1/user?id=${idUser}`)
}

const createUserService = async (dataUser) => {
    return await axios.post('/api/v1/create/user', dataUser)
}

const deleteUserService = async (idUser) => {
    return await axios.delete('/api/v1/delete/user', {
        data: { id: idUser }
    })
}

const updateUserService = async (userData) => {
    return await axios.put('/api/v1/update/user', userData)
}

const getAllCodeService = async (inputType) => {
    return await axios.get(`/api/v1/allcode?type=${inputType}`)
}
export default {
    handleLogin,
    getUserService,
    createUserService,
    deleteUserService,
    updateUserService,
    getAllCodeService
}