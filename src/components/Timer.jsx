import React, { useEffect, useState } from 'react'

const Timer = () => {
    const date = new Date();
    const [newdate , setDate] = useState(date.toLocaleTimeString())


const updateTime = ()=> {
    let time = new Date().toLocaleTimeString()
    setDate(time)
}

useEffect(()=> {
    setInterval(updateTime,1000)
},[newdate])

  return (
    <div className='  dark:bg-slate-700  shadow-lg  dark:text-white text-center bg-white text-balck rounded-xl h-[34px] w-[150px]'>
{`${newdate}` }
    </div>
  )
}

export default Timer