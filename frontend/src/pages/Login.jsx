import React from 'react'
import { useDispatch } from 'react-redux'
import { signIn } from '../store/authSlice'
const Login = () => {
    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = {
            name: e.target.name.value,
            phoneNumber: e.target.phoneNumber.value
        }
        dispatch(signIn(data))
        // const res = await axios.post('http://localhost:8000/api/user/create-user',{
        //     "name":"Ali Ahmed",
        //     "phoneNumber":"01277137499",
        //     "parentPhoneNumber":"01099484552",
        //     "group":"safi"
        // },{withCredentials:true})
        // const res = await axios.post('http://localhost:8000/api/user/login',data,{withCredentials:true})

    }


    return (
        <div className=' flex items-center justify-center '>




            <form onSubmit={handleSubmit} className=' p-6 rounded-md bg-white dark:bg-slate-800 w-[98%]  max-w-xl mt-24'>
                <div className="mb-6">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">الاسم</label>
                    <input type="name" id="name" name='name' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <div className="mb-6">
                    <label htmlFor="number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">رقم الطالب</label>
                    <input type="number" id="number" name='phoneNumber' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>

                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>




        </div>
    )
}

export default Login