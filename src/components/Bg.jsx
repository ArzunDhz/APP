import React from 'react'
import { useState,useEffect , useRef } from 'react'
import Front from '../components/Front'
import Todo from '../components/Todo'
import Timer from './Timer'
import Nav from './Nav'
import Dhz from '../assets/dhz1.png'
import Weather from './Weather'
import Chatgpt from './Chatgpt'
const Bg = () => {
const containerRef = useRef(null);
const boxRef = useRef(null);

const isClicked = useRef(false);

const coords = useRef({
  startX: 50,
  startY: 650,
  lastX: 50,
  lastY: 650
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
  return (
    <>
    <Nav/>
    <div  ref={containerRef} className='  dark:bg-[#18122B] container bg-slate-300'>
    <Weather/>
     <Front />
      <div   ref={boxRef} className="box3 select-none"><Timer />
      </div>
       <div className="box1"> <Todo/> </div>
    
   <Chatgpt/>
    </div>
    </>
  )
}

export default Bg