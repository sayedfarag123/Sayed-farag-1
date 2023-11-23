import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login';
import Header from './components/Header';
import Footer from './components/Footer';
// import Home from './pages/Home';
import { useDispatch, useSelector } from "react-redux";
import StudentsList from './pages/Dashboard/StudentsList';
import { BsMoon, BsSun } from 'react-icons/bs'
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { checkLoggedIn } from './store/authSlice';
import GroupsList from './pages/Dashboard/GroupsList';
import EditStudent from './pages/Dashboard/EditStudent';
import Dashboard from './pages/Dashboard/Dashboard';
import Student from './pages/Student';
import Lessons from './pages/Lessons';
import ComprExams from './pages/ComprExams';





function App() {
  const { user } = useSelector(s => s.Auth)
  const [theme, settheme] = useState(localStorage.getItem("theme") || "light");
  const dispatch = useDispatch()



  const CheckNotAuth = ({ children }) => (
    user != null ? <Navigate to='/' /> : children
  );

  const CheckAuth = ({ children }) => (
    user == null ? <Navigate to='/login' /> : children
  );

  const CheckAdmin = ({ children }) => (
    user?.role == 'مشرف' ? children : <Navigate to='/' />
  );
  const changeTheme = (changedTheme) => {
    // Remove existing theme classes from body
    const existingThemes = ["dark", "light"]; // Add more themes as needed
    existingThemes.forEach((theme) => {
      document.body.classList.remove(theme);
    });

    // Add the new theme class to body
    document.body.classList.add(changedTheme);

    // Update state and save theme to local storage
    settheme(changedTheme);
    localStorage.setItem("theme", changedTheme);
  };
  useEffect(() => {
    document.body.classList.add(theme);
    user && dispatch(checkLoggedIn())
  }, [])


  return (
    <div className={theme}>

      <div className="fixed right-10 bottom-10 z-50 ring-[10px]  rounded-3xl bg-slate-200 dark:bg-slate-950 w-16 shadow-md flex items-center justify-around p-1">
        <BsSun
          style={{ background: theme == "light" && "#fff" }}
          onClick={() => changeTheme("light")}
          className=" dark:text-white w-9 h-6 p-1  rounded-full"
        />
        <BsMoon
          style={{ background: theme == "dark" && "rgb(30 41 59 /1)" }}
          onClick={() => changeTheme("dark")}
          className=" dark:text-white  w-9 h-6 p-1  rounded-xl"
        />
      </div>
      <div className=' min-h-screen dark:bg-slate-950 bg-[#eee] pb-5'>
        <ToastContainer theme={theme} pauseOnFocusLoss={false} />
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path='/' element={<CheckAuth><Student /></CheckAuth>} />
           <Route path='/lessons' element={<CheckAuth><Lessons /></CheckAuth>} />
           <Route path='/comprehensive-exams' element={<CheckAuth><ComprExams /></CheckAuth>} />
            <Route path='/login' element={<CheckNotAuth><Login /></CheckNotAuth>} />
            <Route
              path='/dashboard/*'
              element={
                <CheckAuth>
                  <CheckAdmin>

                    <Routes>
                      <Route path='dashboard' element={<Dashboard />} />
                      <Route path='students' element={<StudentsList />} />
                      <Route path='edit-student/:id' element={<EditStudent />} />
                      <Route path='groups' element={<GroupsList />} />
                    </Routes>
                  </CheckAdmin>
                </CheckAuth>
              }
            />

          </Routes>
        </BrowserRouter>
      </div>
      <Footer />
    </div>
  )
}

export default App
