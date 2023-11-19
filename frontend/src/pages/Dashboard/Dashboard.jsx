import React, { useEffect } from 'react'
import DbCards from '../../components/dashboard/DbCards'
import Charts from '../../components/Charts'

const Dashboard = () => {

 


  return (
    <div className=' pb-20 '>

      <DbCards />

      <Charts />

    </div>
  )
}

export default Dashboard