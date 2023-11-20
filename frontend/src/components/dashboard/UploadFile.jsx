import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { uplodaFile } from '../../store/dashboardSlice';

const UploadFile = () => {
    const [file, setFile] = useState(null);
    const dispatch = useDispatch()


    const handleUpload = async () => {
        try {
            if (file) {
                const formData = new FormData();
                formData.append('file', file);

                
                // setuploadingFile(true)

                // await axios.post(`/api/upload-file/upload-excel-cheat`, formData, { withCredentials: true })

                dispatch(uplodaFile(formData))

                // setuploadDone('done')

                setFile()

                // setuploadingFile(false)
            }
        } catch (error) {
            // setuploadingFile(false)
            // setuploadDone(error.message)
            console.log(error)
        }

    };




    return (
        <div>
            {!file ? <label
                htmlFor="xlsx"
                className="flex cursor-pointer items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700"
            >
                <IoCloudUploadOutline className='w-5 h-5' />
                <span>Import</span>
            </label>
                :
                <button onClick={handleUpload} className="flex cursor-pointer items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-200 transition-colors duration-200 bg-green-600 border rounded-lg gap-x-2 sm:w-auto hover:bg-green-800    dark:border-gray-700">
                    <IoCloudUploadOutline className='w-5 h-5' />
                    <span>upload</span>
                </button>}

            <input
                onChange={e =>setFile(e.target.files[0])}
                id='xlsx'  // Use 'id' instead of 'name' for associating with 'htmlFor'
                name='xlsx'  // Use 'id' instead of 'name' for associating with 'htmlFor'
                className='hidden'
                type='file'
            />
        </div>

    )
}

export default UploadFile