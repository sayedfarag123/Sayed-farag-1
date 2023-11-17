import React, { useEffect, useState } from 'react'
import { FaRegTrashAlt } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { createGroup, deleteGroup, getGroups } from '../../store/dashboardSlice';





const GroupsList = () => {
    const [popup, setpopup] = useState(false)
    const [stud, setstud] = useState()
    const dispatch = useDispatch()
    const { groups } = useSelector(s => s.Dashboard)



    const handleaddGroup = (e) => {
        e.preventDefault()
        const data = {
            group: e.target.group.value,
            level: e.target.level.value.slice(5, 6),
        }
        dispatch(createGroup(data))
    }

    useEffect(() => {
        dispatch(getGroups('all'))
    }, [])

    const filterGroups = (filter) => {
        // !filter.includes('الجميع') ?dispatch(getGroups(filter.slice(5,6))):dispatch(getGroups())
        if (filter.includes('الجميع')) {
            dispatch(getGroups('all'))
        } else {
            dispatch(getGroups(filter.slice(5, 6)))
        }
    }

    const deleteGroupN = (id) => {
        dispatch(deleteGroup(id))
        setpopup(false)

    }

    return (
        <div>  <section className="container px-4 mx-auto w-[99%]">

            <Popup
                open={popup}
                modal={true}
                onClose={() => setpopup(false)}
                closeOnEscape={true}
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
                                <button onClick={() => deleteGroupN(stud)} data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2">
                                    تأكيد
                                </button>
                                <button onClick={close} data-modal-hide="popup-modal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">الغاء</button>
                            </div>
                        </div>
                    </div>


                )}


            </Popup>

            {/* <div className="mt-6 md:flex md:items-center md:justify-between "> */}
            <div className="mt-6 block sm:flex justify-between ">
                <form onSubmit={(e) => handleaddGroup(e)} className='   mr-3 flex items-center justify-around sm:scale-100 scale-75'>


                    <div className=' flex items-center justify-around p-2 rounded-md dark:bg-slate-800/50 bg-white/50 '>
                        <input type="text" name='group' placeholder="اسم المجموعه" className="block   mx-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
                        <select name='level' className="w-48 dark:text-white   outline-none p-2 py-3  text-sm bg-white border border-gray-300 rounded-lg shadow-md dark:bg-gray-700 dark:border-gray-600">
                            <option>ثانوي1</option>
                            <option>ثانوي2</option>
                            <option>ثانوي3</option>
                        </select>
                        <div className=' h-full w-[1px] bg-black/50 mx-3' />
                        <button className="px-6  mx-auto py-3 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                            اضافه
                        </button>
                    </div>
                </form>


                <div className="inline-flex overflow-hidden bg-white border divide-x rounded-lg dark:bg-gray-900 rtl:flex-row-reverse dark:border-gray-700 dark:divide-gray-700">
                    <select onChange={(e) => filterGroups(e.target.value)} name='level' className="w-48   dark:text-white  outline-none p-2  text-sm bg-white border border-gray-300 rounded-lg shadow-md dark:bg-gray-700 dark:border-gray-600">
                        <option>الجميع</option>
                        <option>ثانوي1</option>
                        <option>ثانوي2</option>
                        <option>ثانوي3</option>
                    </select>
                </div>

            </div>




            <div className="flex flex-col mt-6 overflow-hidden">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-800">
                                    <tr>
                                        <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            <div className="flex items-center gap-x-3">
                                                <span>المجموعة</span>
                                            </div>
                                        </th>

                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            <div className="flex items-center gap-x-2 ml-12">
                                                <span>المرحله</span>
                                            </div>
                                        </th>

                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">حذف</th>

                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">

                                    {groups?.map(grp =>
                                        <tr key={Math.random()}>
                                            <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                <div className="inline-flex items-center gap-x-3">
                                                    <div className="flex items-center gap-x-2">
                                                        <h2 className="font-medium text-gray-800 dark:text-white ">{grp.group}</h2>

                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                <h2 className="px-4  text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{grp.level}ثانوي</h2>
                                            </td>


                                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                <button onClick={() => {
                                                    setstud(grp._id)
                                                    setpopup(true)
                                                }} className="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none">


                                                    <FaRegTrashAlt className="w-5 h-5" />
                                                </button>
                                            </td>


                                        </tr>
                                    )}

                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>




        </section>
        </div>
    )
}

export default GroupsList