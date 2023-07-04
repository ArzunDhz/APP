import React from 'react'
import Dhz from '../assets/dhz1.png'
import { useState, useEffect } from "react";

const Nav = () => {
    const [theme, setTheme] = useState(null);
    useEffect(() => {
        if(window.matchMedia('(prefers-color-scheme: dark)').matches){
          setTheme('dark');
        }
        else {
          setTheme('light');
        }
      }, [])

      useEffect(() => {
        if (theme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }, [theme]);

      const handleThemeSwitch = () => {
        setTheme(theme === "dark" ? "light" : "dark");
      };
    
  return (

          <div className='  z-30 absolute left-6 top-2 Navbar flex'>
         <img src={Dhz} width={40} className=' rounded-full' alt="dhz" /> 
         <div className=" dark:bg-white  ml-10 w-20 h-10 bg-slate-700 rounded-full flex items-center">
          <button onClick={handleThemeSwitch}  className=' bg-white ml-1 w-[30px] h-[30px] rounded-full'></button>
          <button onClick={handleThemeSwitch}  className=' bg-slate-700 ml-1 w-[30px] h-[30px] rounded-full'></button>
         </div>
         </div>
    
  )
}

export default Nav