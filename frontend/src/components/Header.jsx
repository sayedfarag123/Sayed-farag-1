import React from 'react'
import { logout } from '../store/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { IoLogOutOutline } from "react-icons/io5";
import Logo from "../assests/Logo.png";


const Header = () => {
  const dispatch = useDispatch()
  const { user } = useSelector(s => s.Auth)


  return (
    <nav className="dark:bg-gray-800 bg-white">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
           
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center mx-1">
              <img className="h-8 w-auto rounded-sm" src={Logo} alt="Your Company" />
            </div>
            {user &&<div className="hidden sm:ml-6 sm:block">{ user.role == 'مشرف' ?
              <div className="flex space-x-4">
                <NavLink to='/dashboard/dashboard' className="dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white text-slate-800 hover:bg-gray-300 hover:text-gray-800  rounded-md px-3 py-2 text-sm font-medium" >الاحصائيات</NavLink>
                <NavLink to='/dashboard/students' className="dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white text-slate-800 hover:bg-gray-300 hover:text-gray-800  rounded-md px-3 py-2 text-sm font-medium"> الطلاب</NavLink>
                <NavLink to='/dashboard/groups' className="dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white text-slate-800 hover:bg-gray-300 hover:text-gray-800  rounded-md px-3 py-2 text-sm font-medium"> المجموعات</NavLink>
              </div>
              : <div className="flex space-x-4">
                <NavLink to='/' className="dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white text-slate-800 hover:bg-gray-300 hover:text-gray-800  rounded-md px-3 py-2 text-sm font-medium" >صفحة الطالب</NavLink>
                <NavLink to='/lessons' className="dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white text-slate-800 hover:bg-gray-300 hover:text-gray-800  rounded-md px-3 py-2 text-sm font-medium">  درجات الحصص و الغياب</NavLink>
                <NavLink to='/comprehensive-exams' className="dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white text-slate-800 hover:bg-gray-300 hover:text-gray-800  rounded-md px-3 py-2 text-sm font-medium"> درجات الامتحان الشامل</NavLink>
              </div>}
            </div>}
          </div>
          {/* Profile sec */}
          {user && <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

            <div className="relative ml-3">
              <div className='flex items-center'>
                <div type="button" className="relative mr-3 font-extrabold dark:text-slate-100 flex rounded-full  text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                  {user?.name?.length >= 6 ? user?.name?.slice(0, 6) + '...' : user?.name}
                </div>
                <button onClick={() => dispatch(logout())} className=' w-8 h-8 rounded-md hover:bg-red-700 bg-red-600'>
                  <IoLogOutOutline className=' w-7 ml-1 h-7 text-white' />
                </button>
              </div>
            </div>
          </div>}

        </div>
      </div>
      {/* Mobile menu, show/hide based on menu state. */}
      {user &&<>{ user.role == 'مشرف' ? <div className="sm:hidden" id="mobile-menu">
        <div className="space-y-1 px-2 pb-3 pt-2">
          <NavLink to='/dashboard/dashboard' className="dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white block rounded-md px-3 py-2 text-base font-medium" >الاحصائيات</NavLink>
          <NavLink to='/dashboard/students' className="dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white block rounded-md px-3 py-2 text-base font-medium">قائمة الطلاب</NavLink>
          <NavLink to='/dashboard/groups' className="dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white block rounded-md px-3 py-2 text-base font-medium">قائمة المجموعات</NavLink>
        </div>
      </div> : <div className="sm:hidden" id="mobile-menu">
        <div className="space-y-1 px-2 pb-3 pt-2">
          <NavLink to='/' className="dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white block rounded-md px-3 py-2 text-base font-medium" >صفحة الطالب</NavLink>
          <NavLink to='/lessons' className="dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white block rounded-md px-3 py-2 text-base font-medium">
            درجات الحصص و الغياب</NavLink>
          <NavLink to='/comprehensive-exams' className="dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white block rounded-md px-3 py-2 text-base font-medium">
            درجات الامتحان الشامل
          </NavLink>
        </div>
      </div>}</>}
    </nav>



  )
}

export default Header
