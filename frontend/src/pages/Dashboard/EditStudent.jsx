import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { BsFillClipboardCheckFill, BsFillClipboardXFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteStudent, editStudents } from '../../store/authSlice'
import { addCompExam, addlesson, getGroups, getStudent, removeCompExam, removelesson } from '../../store/dashboardSlice'
import Select from 'react-select';
const EditStudent = () => {
    const { groups, user } = useSelector(s => s.Dashboard)
    const { id } = useParams()
    const [addLesson, setaddLesson] = useState(false)
    const [addExam, setaddExam] = useState(false)
    const hw = useRef()
    const att = useRef()
    const sig = useRef()
    const exam = useRef()
    const location = useRef()
    const examName = useRef()
    const examsig = useRef()
    const examdeg = useRef()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [Level, setLevel] = useState({ value: user.level, label: `${user.level}ثانوي` })
    const [selectedOptionLevel, setSelectedOption] = useState();

    useEffect(() => {
        dispatch(getStudent(id))

    }, [id])

    useEffect(() => {

        selectedOptionLevel && dispatch(getGroups(selectedOptionLevel.value?.toString()))
    }, [user, selectedOptionLevel])

    useEffect(() => {
        user && setLevel({ value: user.level, label: `${user.level}ثانوي` })
    }, [user])


    const options = [1, 2, 3].map((lvl) => { return { value: lvl, label: `${lvl}ثانوي` } })



    useEffect(() => {
      console.log(user)
    }, [user])
    


    const addStudent = async (e) => {
        e.preventDefault()
        const phoneNumber = e.target.phoneNumber.value != user.phoneNumber ? e.target.phoneNumber.value : undefined
        const data = {
            name: e.target.name.value,
            phoneNumber,
            parentPhoneNumber: e.target.parentPhoneNumber.value,
            group: e.target.group.value,
            role: e.target.role.value,
            level: e.target.level.value,

        }
        dispatch(editStudents({ data: data, id: user._id }))
    }

    const addcomExam = async () => {

        const data = {
            name: examName.current.value,
            deg: examdeg.current.value,
            sig: examsig.current.value,
            date: Date()
        }
        dispatch(addCompExam({ exam: data, id: user._id }))
        setaddExam()
    }

    const deleteExam = async (ex) => {
        dispatch(removeCompExam({ id: user._id, exam: ex }))
        setaddExam()

    }


    const saveLesson = async () => {
        const data = {
            hw: hw.current.checked,
            sig: sig.current.value,
            exam: exam.current.value,
            location: location.current.value,
            date: Date().slice(0, 24),
            attendance: att.current.checked,
        }
        dispatch(addlesson({ lesson: data, id: user._id }))
        setaddLesson(false)

    }

    const deleteLesson = async (ls) => {
        dispatch(removelesson({ lesson: ls, id: user._id }))
        setaddLesson(false)
    }


    const deleteUser = async () => {
        dispatch(deleteStudent(user._id))
        navigate('/dashboard/students')
    }

   



    return (
        <div>
            {user && <form className=' p-4' onSubmit={addStudent}>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">اسم الطالب</label>
                        <input defaultValue={user?.name} name='name' type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>
                    <div>
                        <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">رقم الطالب</label>
                        <input maxLength='11' defaultValue={user?.phoneNumber} name='phoneNumber' type='text' id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>
                    <div>
                        <label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">رقم ولي الامر</label>
                        <input maxLength='11' defaultValue={user?.parentPhoneNumber} name='parentPhoneNumber' type='text' id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>
                    <div>
                        <label htmlFor="website" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">المرحله</label>
                        <Select
                        name='level'
                            className='rounded-lg cursor-pointer'
                            classNamePrefix='bg-gray-50 dark:text-white text-gray-900 text-sm p-[1px]  dark:bg-gray-700 cursor-pointer '
                            value={selectedOptionLevel || Level}
                            onChange={setSelectedOption}
                            options={options}
                            isSearchable={false}
                        />
                    </div>
                    <div>
                        <label htmlFor="website" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">المجموعة</label>
                        <select name='group' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >
                            {groups?.map(group => <option selected={group.group == user?.group} key={Math.random()} >{group.group}</option>)}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="website" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">الدور</label>
                        <select defaultValue={user?.role} name='role' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >
                            <option defaultValue="student">طالب</option>
                            <option defaultValue="admin">مشرف</option>
                        </select>
                    </div>

                </div>


                <button type="submit" className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm   px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">حفظ</button>
            </form>}

            <h1 className=' text-2xl font-semibold  dark:text-white w-full text-center'>الحصص الاسبوعيه</h1>

            <div className=' w-[95%] max-w-5xl mx-auto mt-16'>
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
                                    تاريخ الحضور
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    حضور
                                </th>
                                <th scope="col" className="px-6 py-3">
                                </th>
                            </tr>
                        </thead>
                        <tbody className=' w-full'>
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
                                    {ls.date}
                                </td>
                                <td className="px-6 py-4">
                                    {ls.attendance ? <BsFillClipboardCheckFill className=' w-5 h-5 text-green-500' /> : <BsFillClipboardXFill className=' w-5 h-5 text-red-500' />}

                                </td>
                                <td onClick={() => deleteLesson(ls)} className="px-6 py-4 cursor-pointer hover:text-red-600">
                                    Delete
                                </td>
                            </tr>)}

                            {addLesson && <tr key={Math.random()} className="bg-white border-b ring-1 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <input ref={hw} type="checkbox" name="hw" className=' w-5 h-5' />
                                </th>
                                <td className="px-6 py-4">
                                    <input ref={sig} type="text" className=' p-1 rounded-md ring-1 border-none outline-none w-20 ' />
                                </td>
                                <td className="px-6 py-4">
                                    <input ref={exam} type="number" className=' p-1 rounded-md ring-1 border-none outline-none w-12' />
                                </td>

                                <td className="px-6 py-4">
                                    {/* <input ref={location} type="text" className=' p-1 rounded-md ring-1 border-none outline-none w-20 ' /> */}
                                    <select ref={location} name='group' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >
                                        {groups?.map(group => <option selected={group.group == user?.group} key={Math.random()} >{group.group}</option>)}
                                    </select>
                                </td>

                                <td className="px-6 py-4">
                                    {Date().slice(0, 24)}
                                </td> <td className="px-6 py-4">
                                    <input ref={att} type="checkbox" name="att" className=' w-5 h-5' />

                                </td>
                                <td className="px-6 py-4">

                                </td>
                            </tr>}

                        </tbody>
                    </table>
                    <div className=' flex items-center justify-between'>


                        <div onClick={() => setaddLesson(!addLesson)} className=' flex items-center justify-center text-3xl w-[95%] mx-auto p-1 text-white my-2 hover:bg-blue-900 cursor-pointer rounded-md bg-blue-700'>
                            {addLesson ? 'cancel' : '+'}
                        </div>
                        {addLesson && <>
                            <div className=' mx-3' />

                            <div onClick={saveLesson} className=' flex items-center justify-center text-3xl w-[95%] mx-auto p-1 text-white my-2 hover:bg-green-900 cursor-pointer rounded-md bg-green-700'>
                                Save
                            </div></>
                        }
                    </div>

                </div>
            </div>


            <h1 className=' text-2xl font-semibold dark:text-white w-full text-center mt-16'>الامتحانات الشاملة</h1>

            <div className=' w-[95%] max-w-5xl mx-auto mt-16'>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    رقم الشامل
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    درجة الامتحان
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    توقيع
                                </th>
                                <th scope="col" className="px-6 py-3">

                                </th>
                            </tr>
                        </thead>
                        <tbody>{user?.comprehensiveExams?.map(ex => <tr key={Math.random()} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {ex.name}
                            </th>
                            <td className="px-6 py-4">
                                {ex.deg}
                            </td>
                            <td className="px-6 py-4">
                                {ex.sig}
                            </td>
                            <td onClick={() => deleteExam(ex)} className="px-6 py-4 cursor-pointer hover:text-red-600">
                                Delete
                            </td>


                        </tr>)
                        }
                            {addExam && <tr className="bg-white border-b text-black  ring-1 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    <input ref={examName} type="text" name="examName" className=' w-20 p-1 ring-1 rounded-md border-none outline-none ' />
                                </th>
                                <td className="px-6 py-4">
                                    <input type="number" ref={examdeg} name="examdeg" className=' w-16 p-1 ring-1 rounded-md border-none outline-none ' />
                                </td>
                                <td className="px-6 py-4">
                                    <input type="text" name="sig" ref={examsig} className=' w-20 p-1 ring-1 rounded-md border-none outline-none ' />

                                </td>
                                <td className="px-6 py-4">

                                </td>


                            </tr>}
                        </tbody>
                    </table>


                    <div className=' flex items-center justify-between'>


                        <div onClick={() => setaddExam(!addExam)} className=' flex items-center justify-center text-3xl w-[95%] mx-auto p-1 text-white my-2 hover:bg-blue-900 cursor-pointer rounded-md bg-blue-700'>
                            {addExam ? 'cancel' : '+'}
                        </div>
                        {addExam && <>
                            <div className=' mx-3' />

                            <div onClick={() => addcomExam()} className=' flex items-center justify-center text-3xl w-[95%] mx-auto p-1 text-white my-2 hover:bg-green-900 cursor-pointer rounded-md bg-green-700'>
                                Save
                            </div></>
                        }
                    </div>
                </div>
            </div>

            <div className=' mt-20 w-full text-center'>

                <button onClick={deleteUser} type="button" className="focus:outline-none w-[80%] max-w-3xl  my-8  text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                    حذف الحساب
                </button>
            </div>

        </div >
    )
}

export default EditStudent