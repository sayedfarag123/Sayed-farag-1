import React from 'react'
import { logout } from '../store/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import {NavLink} from 'react-router-dom'

const Header = () => {
  const dispatch = useDispatch()
  const { user } = useSelector(s => s.Auth)


  return (
    <header className="dark:text-gray-400 text-gray-900  bg-white dark:bg-gray-900 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font  items-center font-extrabold dark:text-white mb-4 md:mb-0">
          {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-10 h-10 text-white p-2 bg-purple-500 rounded-full" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg> */}
          <span className="ml-3 text-xl">Sayed Farag</span>
        </a>
       {user && <><nav className="md:ml-auto md:mr-auto flex  flex-wrap items-center text-base justify-center bg-slate-100 dark:bg-slate-800 rounded-md -m-4 font-semibold">
          <NavLink to='/dashboard/dashboard' className="mx-5 dark:hover:text-white  hover:text-blue-500 p-5">الاحصائيات</NavLink>
          <NavLink to='/dashboard/students' className="mx-5 dark:hover:text-white hover:text-blue-500 p-5">قائمة الطلاب</NavLink>
          <NavLink to='/dashboard/groups' className="mx-5 dark:hover:text-white hover:text-blue-500 p-5">قائمة المجموعات</NavLink>
          {/* <NavLink to='' className="mr-5 hover:text-white">Fourth Link</NavLink> */}
        </nav>
         <button onClick={() => dispatch(logout())} className="inline-flex items-center text-white bg-red-700 border-0 py-1 px-3 focus:outline-none hover:bg-red-900 rounded text-base mt-4 md:mt-0">
          تسجيل الخروج
        </button></>}
      </div>
    </header>

  )
}

export default Header