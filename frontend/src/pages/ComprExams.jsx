import React from 'react'
import { useSelector } from 'react-redux'

const ComprExams = () => {
    const user = useSelector(s => s.Auth.user)

  return (
    <div> <div className=' w-[95%] max-w-5xl mx-auto mt-16'>
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        اسم الامتحان
                    </th>
                    <th scope="col" className="px-6 py-3">
                        درجة الامتحان
                    </th>
                    <th scope="col" className="px-6 py-3">
                        توقيع
                    </th>
                    
                </tr>
            </thead>
            <tbody>
                {user?.comprehensiveExams?.map(ex => <tr key={Math.random()} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {ex.name}
                    </th>
                    <td className="px-6 py-4">
                        {ex.deg}
                    </td>
                    <td className="px-6 py-4">
                        {ex.sig}
                    </td>

                   
                </tr>)}

            </tbody>
        </table>
    </div>
</div></div>
  )
}

export default ComprExams