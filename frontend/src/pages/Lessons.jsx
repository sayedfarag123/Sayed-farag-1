import React from 'react'
import { BsFillClipboardCheckFill, BsFillClipboardXFill } from 'react-icons/bs'
import { useSelector } from 'react-redux'

const Lessons = () => {
    const user = useSelector(s => s.Auth.user)



    const showDate = (isoDateString) => {
        const date = new Date(isoDateString);

        date.setMinutes(date.getMinutes() - date.getTimezoneOffset());

        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        const formattedDate = date.toLocaleString('en-US', options);
        return formattedDate
    }

    return (
        <div> <div className=' w-[95%] max-w-5xl mx-auto mt-16'>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                الواجب
                            </th>
                            <th scope="col" className="px-6 py-3">
                                توقيع
                            </th>
                            <th scope="col" className="px-6 py-3">
                                درجة الامتحان
                            </th>
                            <th scope="col" className="px-6 py-3">
                                مركز الحضور
                            </th>
                            <th scope="col" className="px-6 py-3">
                                حضور
                            </th>
                            <th scope="col" className="px-6 py-3">
                                تاريخ الحضور
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {user?.lessons?.map(ls => <tr key={Math.random()} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {ls.hw ? <BsFillClipboardCheckFill className=' w-5 h-5 text-green-500' /> : <BsFillClipboardXFill className=' w-5 h-5 text-red-500' />}
                            </th>
                            <td className="px-6 py-4">
                                {ls.sig}
                            </td>
                            <td className="px-6 py-4">
                                {ls.exam}
                            </td>

                            <td className="px-6 py-4">
                                {ls.location}
                            </td>

                            <td className="px-6 py-4">
                                {/* {ls.attendance} */}
                                {ls.attendance ? <BsFillClipboardCheckFill className=' w-5 h-5 text-green-500' /> : <BsFillClipboardXFill className=' w-5 h-5 text-red-500' />}

                            </td>

                            <td className="px-6 py-4">
                                {showDate(ls.date)}
                            </td>
                        </tr>)}

                    </tbody>
                </table>
            </div>
        </div></div>
    )
}

export default Lessons