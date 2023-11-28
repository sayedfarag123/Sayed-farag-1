import React, { useEffect, useState } from 'react'
import { IoClose, IoSearchOutline } from "react-icons/io5";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { deleteStudent } from '../../store/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import AddStudent from '../../components/dashboard/AddStudent';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useNavigate } from 'react-router-dom';
import { deleteStudents, getGroups, getStudents, searchStudents, setfilterV } from '../../store/dashboardSlice';
import UploadFile from '../../components/dashboard/UploadFile';


const StudentsList = () => {
    const dispatch = useDispatch()
    const { students,filterV } = useSelector(s => s.Dashboard)
    const [popup, setpopup] = useState(false)
    const [stud, setstud] = useState()
    const [query, setsearchQuery] = useState()
    const { groups } = useSelector(s => s.Dashboard)
    const navigate = useNavigate()
    const [Level, setLevel] = useState(filterV?.level||'ع')
    const [mode, setmode] = useState()
    const [selectedGroup, setselectedGroup] = useState(filterV?.group||'ع')
    const [filter, setfilter] = useState(filterV)

    useEffect(() => {
    
        const fetchData = async () => {
            let filter = {};

            if (Level === 'ع') {
                dispatch(getGroups('all'));
            } else {
                dispatch(getGroups(Level));
                filter.level = Level;
            }

            if (selectedGroup !== 'ع') {
                filter.group = selectedGroup;
            }

            setfilter(filter);
            dispatch(getStudents(filter));
            dispatch(setfilterV(filter));

            
        };

        fetchData();
    }, [selectedGroup, Level]);

    const deletestudent = () => {
        setpopup(false)
        dispatch(deleteStudent(stud))

    }
    const applySearch = (e) => {
        e.preventDefault()
        console.log(query)
        dispatch(searchStudents({ page: 1, query }))

    }

    const paginate = (page) => {
        query ? dispatch(searchStudents({ page, query })) : dispatch(getStudents({ page, ...filter }))
    }

    const deleteAllUsers = async () => {
        setpopup(false)
        dispatch(deleteStudents())
    }


    return (
        <div className=' max-w-[95%]  mx-auto   '>
            <Popup
                open={popup}
                modal={true}
                onClose={() => setpopup(false)}
                closeOnEscape
                contentStyle={{ background: 'none', border: 'none' }}
            >

                {close => (
                    <div className="relative p-4 mx-auto w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <button onClick={close} type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">

                                <IoClose className="w-5 h-5" />
                                <span className="sr-only">Close modal</span>
                            </button>
                            <div className="p-4 md:p-5 text-center">
                                <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">هل انت متاكد</h3>
                                <button onClick={() => {
                                    mode == 'one' ? deletestudent() : deleteAllUsers()
                                }} data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2">
                                    تأكيد
                                </button>
                                <button onClick={close} data-modal-hide="popup-modal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">الغاء</button>
                            </div>
                        </div>
                    </div>


                )}


            </Popup>

            <section className="container px-4 mx-auto">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <div>
                        <div className="flex items-center gap-x-3">
                            <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">{students?.totalUsers}</span>
                            <h2 className="text-lg font-medium text-gray-800 dark:text-white">الطلاب</h2>
                        </div></div>
                    <div className="flex items-center mt-4 gap-x-3">

                        <UploadFile />


                        <AddStudent groups={groups} />
                    </div>
                </div>


                <div className="mt-6 md:flex md:items-center md:justify-between">
                    <div>
                        <div className="inline-flex m-2 overflow-hidden bg-white border divide-x rounded-lg dark:bg-gray-900 rtl:flex-row-reverse dark:border-gray-700 dark:divide-gray-700">
                            <select selected={Level == 'ع'} onChange={e => setLevel(e.target.value.slice(5, 6))} className="w-48 dark:text-white outline-none p-2  text-sm bg-white border border-gray-300 rounded-lg shadow-md dark:bg-gray-700 dark:border-gray-600">
                                <option>الجميع</option>
                                {[1, 2, 3].map(lvl => <option selected={Level == lvl} key={Math.random()} >ثانوي{lvl}</option>)}
                            </select>
                        </div>

                        <div className="inline-flex m-2 overflow-hidden bg-white border divide-x rounded-lg dark:bg-gray-900 rtl:flex-row-reverse dark:border-gray-700 dark:divide-gray-700">
                            <select selected={selectedGroup == 'ع'} onChange={e => setselectedGroup(e.target.value)} className="w-48 dark:text-white outline-none p-2  text-sm bg-white border border-gray-300 rounded-lg shadow-md dark:bg-gray-700 dark:border-gray-600">
                                <option value='ع'>الجميع</option>
                                {groups?.map(grp => <option selected={grp.group == selectedGroup} key={Math.random()} >{grp.group}</option>)}

                            </select>
                        </div>



                    </div>

                    <div className="relative flex items-center mt-4 md:mt-0">

                        <IoSearchOutline className="w-5 h-5 -mr-7 z-30 text-gray-400 dark:text-gray-600" />
                        <form onSubmit={applySearch}>
                            <input required onChange={(e) => setsearchQuery(e.target.value)} type="text" placeholder="Search" className="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                        </form>
                        {query && <button onClick={() => dispatch(getStudents({ page: 1 }))} type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mx-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">الغاء</button>}
                    </div>

                </div>




                <div className="flex flex-col mt-6">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-800">
                                        <tr>
                                            <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                <div className="flex items-center gap-x-3">
                                                    <span>الاسم</span>
                                                </div>
                                            </th>
                                            <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                <span>رقم الهاتف</span>

                                            </th>
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                <button className="flex items-center gap-x-2">
                                                    <span>المجموعة</span>
                                                </button>
                                            </th>
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                <button className="flex items-center gap-x-2">
                                                    <span>المرحله</span>
                                                </button>
                                            </th>
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                رقم هاتف ولي الامر
                                            </th>
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">حذف</th>
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">تعديل</th>

                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">

                                        {students?.users?.map(std => <tr key={Math.random()}>
                                            <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                <div className="inline-flex items-center gap-x-3">
                                                    <div className="flex items-center gap-x-2">
                                                        <h2 className="font-medium text-gray-800 dark:text-white ">{std.name}</h2>

                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                <h2 className="px-4  text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{std.phoneNumber}</h2>
                                            </td>

                                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{std.group}</td>
                                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">ثانوي{std.level}</td>

                                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{std.parentPhoneNumber}</td>

                                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                <button onClick={() => {
                                                    setmode('one')
                                                    setstud(std._id)
                                                    setpopup(true)
                                                }} className="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none">


                                                    <FaRegTrashAlt className="w-5 h-5" />
                                                </button>
                                            </td>

                                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                <div className="flex items-center gap-x-6">

                                                    <button onClick={() => navigate(`/dashboard/edit-student/${std._id.toString()}`)} className="text-gray-500 transition-colors duration-200 dark:hover:text-yellow-500 dark:text-gray-300 hover:text-yellow-500 focus:outline-none">

                                                        <FaRegEdit className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>)}

                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                </div>

                {/* //pagenation */}
                <div className="mt-6 sm:flex sm:items-center sm:justify-between  ">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        صفحة <span className="font-medium text-gray-700 dark:text-gray-100">{students?.page} من {students?.totalPages}</span>
                    </div>
                    <div className="flex items-center mt-4 gap-x-4 sm:mt-0">
                        <button onClick={() => paginate(students.page - 1)} className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                            </svg>
                            <span>
                                السابق
                            </span>
                        </button>
                        {/* <button onClick={() => { students.page + 1 <= students.totalPages && dispatch(getStudents({ page: (students?.page + 1) })) }} className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"> */}
                        <button onClick={() => { students.page + 1 <= students.totalPages && paginate(students.page + 1) }} className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
                            <span>
                                التالي
                            </span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                            </svg>
                        </button>
                    </div>
                </div>
            </section>

            <div className=' mt-20 w-full text-center'>

                <button onClick={() => {
                    setmode('many')
                    setpopup(true)
                }} type="button" className="focus:outline-none w-[80%] max-w-3xl  my-8  text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                    حذف جميع الطلاب
                </button>
            </div>

        </div>
    )
}

export default StudentsList