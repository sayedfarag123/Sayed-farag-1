import React, { useState } from 'react'
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoClose } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { createUser } from '../../store/authSlice';
import { useEffect } from 'react';
import { getGroups } from '../../store/dashboardSlice';

const AddStudent = ({ groups }) => {
    const [isOpen, setisOpen] = useState(false)
    const [Level, setLevel] = useState('1')
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getGroups(Level))

    }, [Level])


    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            name: e.target.name.value,
            phoneNumber: e.target.phoneNo.value,
            parentPhoneNumber: e.target.parePhoneNo.value,
            group: e.target.group.value,
            level: parseInt(e.target.level.value.slice(5, 6)),
            role: e.target.role.value,
        }
        dispatch(createUser(data))
        setisOpen(false)
    }

    return (
        <>
            {!isOpen ? <button onClick={() => setisOpen(true)} className="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">

                <IoMdAddCircleOutline className="w-5 h-5" />
                <span>أضافه طالب</span>
            </button> : <div className=' z-50 fixed left-0 right-0 bottom-0 top-0 bg-black/40 backdrop-blur-md flex items-center justify-center'>
                <form onSubmit={handleSubmit} className=' dark: text-white w-[97%] p-3 pt-8 rounded-md relative dark:bg-slate-800 bg-white max-w-xl'>
                    <IoClose onClick={() => setisOpen(false)} className=' w-6 h-6 bg-black/20 dark:bg-slate-100/20 rounded-md p-1 absolute right-1 top-1 cursor-pointer dark:hover:bg-slate-100/50 hover:bg-black/60' />

                    <div>
                        <div className=' w-1/2 inline-block px-1'>
                            <label htmlFor="username" className="block text-sm text-gray-500 dark:text-gray-300">اسم الطالب</label>
                            <input type="text" name='name' className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
                        </div>
                        <div className=' w-1/2 inline-block px-1'>
                            <label htmlFor="username" className="block text-sm text-gray-500 dark:text-gray-300">رقم ولي الامر</label>
                            <input maxLength={11} type="text" name='parePhoneNo' className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
                        </div>

                    </div>
                    <div>
                        <div className=' w-1/2 inline-block px-1 my-3'>
                            <label htmlFor="username" className="block text-sm text-gray-500 dark:text-gray-300">رقم الطالب</label>
                            <input maxLength={11} type="text" name='phoneNo' className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
                        </div>
                        <div className=' w-1/2 inline-block px-1'>
                            <label htmlFor="username" className="block text-sm text-gray-500 dark:text-gray-300">المجموعه</label>

                            <select name='group' className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" >
                                {groups?.map(group => <option key={Math.random()}>{group.group}</option>)}
                            </select>
                        </div>

                    </div>
                    <div>

                        <div className=' w-1/2 inline-block px-1 my-3'>
                            <label htmlFor="username" className="block text-sm text-gray-500 dark:text-gray-300">المرحله الدراسيه</label>

                            <select onChange={e => setLevel(e.target.value.slice(5, 6))} name='level' className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" >
                                <option>ثانوي1</option>
                                <option>ثانوي2</option>
                                <option>ثانوي3</option>
                            </select>


                        </div>
                        <div className=' w-1/2 inline-block px-1 my-3'>
                            <label htmlFor="username" className="block text-sm text-gray-500 dark:text-gray-300">الحالة</label>

                            <select name='role' className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" >
                                <option>طالب</option>
                                <option>مشرف</option>
                            </select>
                        </div>

                    </div>
                    <button className="px-6 w-full mx-auto py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                        اضافه
                    </button>
                </form>
            </div >}
        </>
    )
}

export default AddStudent