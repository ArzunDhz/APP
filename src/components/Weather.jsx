import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ClearDay from '../assets/DayClear.json'
import CloudyDay from '../assets/Cloudyday.json'
import ClearNight from '../assets/ClearNight.json'
import CloudyNight from '../assets/CloudyNight.json'
import DayRain from '../assets/DayRain.json'
import DayRainWithThunder from '../assets/DayRainWithThunder.json'
import NightRainWithThunder from '../assets/NightRainandThunder.json'
import NightRain from '../assets/NightRain.json'
import { useRef } from 'react';
import Lottie from "lottie-react";
const Weather = () => {


    const containerRef = useRef(null);
    const boxRef = useRef(null);

    const isClicked = useRef(false);

    const coords = useRef({
        startX: 1250,
        startY: 50,
        lastX: 1250,
        lastY: 50
    });

    useEffect(() => {
        if (!boxRef.current || !containerRef.current) return;

        const box = boxRef.current;
        const container = containerRef.current;

        const onMouseDown = (e) => {
            isClicked.current = true;
            coords.current.startX = e.clientX;
            coords.current.startY = e.clientY;
        };

        const onMouseUp = (e) => {
            isClicked.current = false;
            coords.current.lastX = box.offsetLeft;
            coords.current.lastY = box.offsetTop;
        };

        const onMouseMove = (e) => {
            if (!isClicked.current) return;

            const nextX = e.clientX - coords.current.startX + coords.current.lastX;
            const nextY = e.clientY - coords.current.startY + coords.current.lastY;

            box.style.top = `${nextY}px`;
            box.style.left = `${nextX}px`;
        };

        box.addEventListener('mousedown', onMouseDown);
        box.addEventListener('mouseup', onMouseUp);
        container.addEventListener('mousemove', onMouseMove);
        container.addEventListener('mouseleave', onMouseUp);

        const cleanup = () => {
            box.removeEventListener('mousedown', onMouseDown);
            box.removeEventListener('mouseup', onMouseUp);
            container.removeEventListener('mousemove', onMouseMove);
            container.removeEventListener('mouseleave', onMouseUp);
        };

        return cleanup;
    }, []);









    const [data, setData] = useState();
    const [loaded, setLoaded] = useState(false)
    const [icon, setIcon] = useState()
    const Rain =[1153 ,1246 ,1243 ,1240 ,1201,1198 ,1195, 1192 ,1189, 1186, 1183, 1180 ,1171, 1168, 1153 ,1150 ]
    const Clear = [1000]
    const Cloudy = [1003, 1006 , 1009 ,1030 , 1135,1147]
    const Thunder = [1282 ,1279, 1276 ,1273 ]
   const hours = new Date().getHours();

    useEffect( () => {
        
        const loadData = async () => {
            await axios.get('http://api.weatherapi.com/v1/current.json?key=45886d53e9ef46d391941102230406&q=kathmandu&aqi=no').then(res => { setData(res.data), setLoaded(true) })
    
             
                if( ( hours > 6 && hours < 18) &&  Rain.includes(data.current.condition.code))
                {
                    setIcon(DayRain)
                
                }
               else if ( !( hours > 6 && hours < 18)  &&  Rain.includes(data.current.condition.code)   )
                {

                    setIcon(NightRain)
         
                }  

              else if(!( hours > 6 && hours < 18)  &&  Clear.includes(data.current.condition.code) )
                {

                    setIcon(ClearNight) 
        
                }
                else if(( hours > 6 && hours < 18) &&  Clear.includes(data.current.condition.code) )
                {

                    setIcon(ClearDay)   
       
                }
                else  if(!( hours > 6 && hours < 18)  &&  Cloudy.includes(data.current.condition.code) )
                {

                    setIcon(CloudyNight)  
        
                }
                else  if(( hours > 6 && hours < 18) && Cloudy.includes(data.current.condition.code) )
                {

                    setIcon(CloudyDay)   
               
                }
                else  if(!( hours > 6 && hours < 18) && Thunder.includes(data.current.condition.code) )
                {

                    setIcon(NightRainWithThunder)   
              
                }
                else  if(( hours > 6 && hours < 18)&& Thunder.includes(data.current.condition.code))
                {

                    setIcon(DayRainWithThunder)   
                  
                }
                setLoaded(true)

        }
         loadData();


    },[loaded])



    return (
        <div ref={containerRef} className="">
            <div ref={boxRef} className=' cursor-grab dark:bg-slate-700 dark:text-white shadow-xl bg-white w-[250px] h-[300px] justify-center  flex-col absolute left-[1250px] top-[50px] rounded-xl'>
                {loaded ?
                    <>
                        <div className=" select-none ">
                            <Lottie className=' ml-[20px]w-[30px] h-[150px] ' animationData={icon} />
                            <h1 className=' text-[40px] text-center '>  {data.current.temp_c}°C</h1>
                            <h1 className='  text-[18px] text-center'>{data.current.condition.text}</h1>
                            <h4 className=' text-[14px] text-center mt-1' >{data.location.name}</h4>

                        </div>
                    </>
                    :
                    <>
                        <div className=' ml-[110px] mt-[130px] ' role="status">
                            <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                        </div>



                    </>}



            </div>
        </div>
    )
}

export default Weather