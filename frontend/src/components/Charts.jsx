import React, { useEffect } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import { Line, Pie } from 'react-chartjs-2';
import { getAnalytics } from '../store/dashboardSlice';
import { useDispatch, useSelector } from 'react-redux';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);
// ChartJS.register(ArcElement, Tooltip, Legend);




const Charts = () => {
    const dispatch = useDispatch()
    const {dbData} = useSelector(s=>s.Dashboard)

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
            },

        },
    };
    const pieOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
            },

        },
    };


 
    const data = {
        labels:dbData?.groupedUsersByDay?.map(d=>d._id.slice(5,10)),
        datasets: [
            {
                label: 'عدد الطلاب',
                data:dbData?.groupedUsersByDay?.map(d=>d.count),
                borderColor: 'rgb(79 70 229 /1)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderWidth: 7,
                pointRadius: 6,
                pointBackgroundColor: 'rgb(14 165 233  /1)',
                pointBorderColor: 'white',
                pointBorderWidth: 2,
            }
        ],
    };

    
    const pielabels = ['1 ثانوي', '2 ثانوي', '3 ثانوي']
    const pieData = {
        labels:pielabels,
        datasets: [
            {
                label: 'عدد الطلاب',
                data: dbData?.studentsNums?.map((e) => e),
                borderColor: 'rgb(79 70 229 /1)',
                backgroundColor: ['rgb(99 102 241)', 'rgb(14 165 233)', 'rgb(59 130 246)']

            }
        ],
    };


    useEffect(() => {
        dispatch(getAnalytics())
    
      }, [])



    return (
        <div className=' sm:flex-row flex-col flex  text-center w-full my-4  text-white'>







            <div className="sm:w-[60%] w-[90%] inline-block mx-auto sm:mx-5 my-4 p-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <h1 className=' text-lg font-bold  dark:text-white  w-full text-center my-2 bg-indigo-600 p-2  rounded-md '>عدد الطلاب اخر 30 يوم</h1>
                {/* <select name='level' className="bg-gray-50 border text-center border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option>ثانوي1</option>
                    <option>ثانوي2</option>
                    <option>ثانوي3</option>
                </select> */}


                <div className=' w-[97%] bg-slate-600 h-[1px] my-5 mx-auto' />
                <div className=' w-full bg-white dark:bg-slate-800 rounded-md p-4'>
                    <Line options={options} data={data} />
                </div>


            </div>





            <div className="sm:w-[30%] w-[90%] inline-block mx-auto sm:mx-5 p-3 my-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <h1 className=' text-lg font-bold  dark:text-white  w-full text-center my-2 bg-indigo-600 p-2  rounded-md '>نسبة الطلاب</h1>



                <div className=' w-[97%] bg-slate-600 h-[1px] my-5 mx-auto' />
                <div className=' w-full bg-white dark:bg-slate-800 rounded-md p-4'>
                    <Pie options={pieOptions} data={pieData} />
                </div>


            </div>












        </div>
    )
}

export default Charts