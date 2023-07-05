import React from 'react'
import Front from '../components/Front'
import Todo from '../components/Todo'
import Timer from './Timer'
import Nav from './Nav'
import Weather from './Weather'
import Chatgpt from './Chatgpt'
import Image from './Image'
const Bg = () => {


  return (
    <>
    <Nav/>
    <div   className='  dark:bg-[#18122B] w-full  absolute overflow-hidden min-h-screen bg-slate-300'>
    <Weather/>
     <Front />
      <div   className="box3 select-none"><Timer />
      </div>
       <div className="box1 z-[1000]"> <Todo/> </div>
   <Chatgpt/>
   <div className=" z-[10001] "><Image/></div>
    
    </div>
    </>
  )
}

export default Bg