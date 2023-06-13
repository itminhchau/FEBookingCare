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

const getTopDoctorService = async (limitInput) => {
    return await axios.get(`/api/v1/top/doctor?limit=${limitInput}`)
}

const getAllDoctorService = async () => {
    return await axios.get('/api/v1/all/doctor')
}

const createDoctorService = async (doctorData) => {
    return await axios.post('/api/v1/create/doctor', doctorData)
}

const getDetailDoctor = async (idDoctor) => {
    return await axios.get(`http://localhost:8080/api/v1/detail/doctor?id=${idDoctor}`)
}

const getMarkdownService = async (idDoctor) => {
    return await axios.get(`http://localhost:8080/api/v1/get/markdown?id=${idDoctor}`)
}

const createDoctorScheduleService = async (dataSchedule) => {
    return await axios.post(`/api/v1/create/schedule/doctor`, dataSchedule)
}

const getTimeScheduleDoctorService = async (doctorId, date) => {
    return await axios.get(`http://localhost:8080/api/v1/get/time/schedule/doctor?id=${doctorId}&date=${date}`)
}

const getDoctorInforService = async (doctorId)=>{
    return await axios.get(`http://localhost:8080/api/v1/get/doctor-infor?id=${doctorId}`)
}
export default  {
    handleLogin,
    getUserService,
    createUserService,
    deleteUserService,
    updateUserService,
    getAllCodeService,
    getTopDoctorService,
    getAllDoctorService,
    createDoctorService,
    getDetailDoctor,
    getMarkdownService,
    createDoctorScheduleService,
    getTimeScheduleDoctorService,
    getDoctorInforService
}