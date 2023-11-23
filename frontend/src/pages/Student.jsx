import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import avatar from '../assests/avatar .png'
const Student = () => {
    const { user } = useSelector(s => s.Auth)
    const navigate = useNavigate()


    useEffect(() => {
        user?.role == 'مشرف' && navigate('/dashboard/dashboard')
    }, [user])

    return (
        <div>


           {user?.role =='طالب'&& <div className=' w-[95%] flex items-center flex-col p-5 rounded-md bg-white dark:bg-slate-900 mx-auto mb-10 mt-32'>
                <img src={avatar} className=' -mt-20 w-28 h-28 bg-cover rounded-full bg-slate-100 dark:bg-slate-950 border-2 p-1' />

                <span className=' dark:text-white font-extrabold text-3xl'>{user?.name}</span>

                <div className=' w-full max-w-3xl mx-auto mt-16'>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left text-slate-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        الاسم 
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        المرحله
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        رقم الهاتف                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        عدد الحصص التى حضرها الطالب

                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        عدد الحصص التى لم يحضرها الطالب

                                    </th>

                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 ">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {user?.name}
                                    </th>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {user?.level}ثانوي
                                    </th>
                                    <td className="px-6 py-4">
                                        {user?.phoneNumber}

                                    </td>

                                    <td className="px-6 py-4 text-center">
                                    {user?.lessons?.filter(ls=>ls.attendance).length}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                    {user?.lessons?.filter(ls=>!ls.attendance).length}
                                    </td>

                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>

            </div>}



        </div>
    )
}

export default Student