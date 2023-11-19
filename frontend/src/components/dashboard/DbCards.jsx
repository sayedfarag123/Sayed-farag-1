import React from 'react'
import { FaLayerGroup, FaUsers } from "react-icons/fa";
import { useSelector } from 'react-redux';


const DbCards = () => {
    const {dbData} = useSelector(s=>s.Dashboard)

    return (
        <div className=' text-center w-full'>

            <div className=' inline-block min-w-[310px] w-[calc(100%/2.2)]'>
                <div className="relative   m-5 flex flex-col bg-clip-border rounded-xl dark:bg-slate-800 dark:text-white dark:border-slate-600 bg-white text-gray-700 border border-blue-gray-100 shadow-sm">
                    <div className="bg-clip-border mt-4 mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-indigo-700 to-indigo-600  dark:shadow-indigo-600 shadow-xl text-white shadow-gray-900/20 absolute grid h-12 w-12 place-items-center">
                        <FaUsers className="w-6 h-6 text-white" />
                    </div>
                    <div className="p-4 text-right">
                        <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">عدد الطلاب</p>
                        <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">{dbData?.getAllStudentsCount}</h4>
                    </div>
                    <div className="border-t dark:border-slate-500 border-blue-gray-50 p-4">
                    </div>
                </div>
            </div>


            <div className=' inline-block min-w-[310px] w-[calc(100%/2.2)]'>
                <div className="relative   m-5 flex flex-col bg-clip-border rounded-xl dark:bg-slate-800 dark:text-white dark:border-slate-600 bg-white text-gray-700 border border-blue-gray-100 shadow-sm">
                    <div className="bg-clip-border mt-4 mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-sky-700 to-sky-600  dark:shadow-sky-600 shadow-xl text-white shadow-gray-900/20 absolute grid h-12 w-12 place-items-center">
                        <FaLayerGroup  className="w-6 h-6 text-white" />
                    </div>
                    <div className="p-4 text-right">
                        <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">عدد المجموعات</p>
                        <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">{dbData?.allGroups}</h4>
                    </div>
                    <div className="border-t dark:border-slate-500 border-blue-gray-50 p-4">
                    </div>
                </div>
            </div>


            


        </div>
    )
}

export default DbCards