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
            {/* Mobile menu button*/}
            {/* <button type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
    
              <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
    
              <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button> */}
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <img className="h-8 w-auto rounded-sm" src={Logo} alt="Your Company" />
            </div>
        {user&&<div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                <NavLink to='/dashboard/dashboard' className="dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white text-slate-800 hover:bg-gray-300 hover:text-gray-800  rounded-md px-3 py-2 text-sm font-medium" >الاحصائيات</NavLink>
                <NavLink to='/dashboard/students' className="dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white text-slate-800 hover:bg-gray-300 hover:text-gray-800  rounded-md px-3 py-2 text-sm font-medium"> الطلاب</NavLink>
                <NavLink to='/dashboard/groups' className="dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white text-slate-800 hover:bg-gray-300 hover:text-gray-800  rounded-md px-3 py-2 text-sm font-medium"> المجموعات</NavLink>
                {/* <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Calendar</a> */}
              </div>
            </div>}
          </div>
            {/* Profile sec */}
          {user&&<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

            <div className="relative ml-3">
              <div className='flex items-center'>
                <div type="button" className="relative mr-3 font-extrabold dark:text-slate-100 flex rounded-full  text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                  {user?.name?.length >= 6 ?user?.name?.slice(0,6)+'...':user?.name}
                </div>
                <button onClick={() => dispatch(logout())}  className=' w-8 h-8 rounded-md hover:bg-red-700 bg-red-600'>
                <IoLogOutOutline className=' w-7 ml-1 h-7 text-white' />
                </button>
              </div>
            </div>
          </div>}

        </div>
      </div>
      {/* Mobile menu, show/hide based on menu state. */}
      {user&&<div className="sm:hidden" id="mobile-menu">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
          <NavLink to='/dashboard/dashboard' className="dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white block rounded-md px-3 py-2 text-base font-medium" >الاحصائيات</NavLink>
          <NavLink to='/dashboard/students' className="dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white block rounded-md px-3 py-2 text-base font-medium">قائمة الطلاب</NavLink>
          <NavLink to='/dashboard/groups'  className="dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white block rounded-md px-3 py-2 text-base font-medium">قائمة المجموعات</NavLink>
        </div>
      </div>}
    </nav>



  )
}

export default Header
// import React from 'react'
// import { logout } from '../store/authSlice'
// import { useDispatch, useSelector } from 'react-redux'
// import {NavLink} from 'react-router-dom'

// const Header = () => {
//   const dispatch = useDispatch()
//   const { user } = useSelector(s => s.Auth)


//   return (
//     <header className="dark:text-gray-400 text-gray-900  bg-white dark:bg-gray-900 body-font">
//       <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
//         <a className="flex title-font  items-center font-extrabold dark:text-white mb-4 md:mb-0">
//           {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-10 h-10 text-white p-2 bg-purple-500 rounded-full" viewBox="0 0 24 24">
//             <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
//           </svg> */}
//           <span className="ml-3 text-xl">Sayed Farag</span>
//         </a>
//        {user && <><nav className="md:ml-auto md:mr-auto flex  flex-wrap items-center text-base justify-center bg-slate-100 dark:bg-slate-800 rounded-md -m-4 font-semibold">
//           <NavLink to='/dashboard/dashboard' className="mx-5 dark:hover:text-white  hover:text-blue-500 p-5">الاحصائيات</NavLink>
//           <NavLink to='/dashboard/students' className="mx-5 dark:hover:text-white hover:text-blue-500 p-5"> قائمةالطلاب</NavLink>
//           <NavLink to='/dashboard/groups' className="mx-5 dark:hover:text-white hover:text-blue-500 p-5">قائمةالمجموعات</NavLink>
//           {/* <NavLink to='' className="mr-5 hover:text-white">Fourth Link</NavLink> */}
//         </nav>
//          <button onClick={() => dispatch(logout())} className="inline-flex items-center text-white bg-red-700 border-0 py-1 px-3 focus:outline-none hover:bg-red-900 rounded text-base mt-4 md:mt-0">
//           تسجيل الخروج
//         </button></>}
//       </div>
//     </header>

//   )
// }

// export default Header