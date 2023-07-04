import { data } from 'autoprefixer'
import React, { useState, useEffect, useRef } from 'react'
const Api = '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'
const api2 = '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'
import { PhotoIcon, DocumentTextIcon } from '@heroicons/react/24/solid'
import Loading from './ExtraCompnenents/Loading'

const Chatgpt = () => {
  const containerRef = useRef(null);
  const boxRef = useRef(null);

  const isClicked = useRef(false);

  const coords = useRef({
    startX: 350,
    startY: 100,
    lastX: 350,
    lastY: 100
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



  const [asked, setAsked] = useState(false)
  const [loading, setLoading] = useState(false)
  const handelSubmit = async (e) => {
    setLoading(true)
    e.preventDefault()
    const options = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${api2}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: 'system', content: "You are a helpful assistant." }, {
          role: 'user',
          content: e.target.data.value
        }]

      })
    }

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', options)
      const data = await response.json()
      setChatData(data.choices[0].message.content)

      setLoading(false)
    }
    catch (error) {
      console.error()
    }
    setAsked(true)


  }

  const [chatData, setChatData] = useState()
  return (
    <div ref={containerRef} className=" cursor-grab ">

      <div ref={boxRef} className='    flex w-[820px] h-[500px]  dark:bg-slate-700 shadow-xl bg-white absolute left-[350px] top-[60px] rounded-xl ' >
        <form onSubmit={(e) => handelSubmit(e)} className=' mt-auto ' action="">
          <input autoComplete='off' name='data' placeholder='Ask me anything...' className=' select-none  dark:text-white dark:bg-slate-600  bg-slate-100 indent-4 rounded-t-none rounded-b-xl w-[820px] h-[30px]' />
        </form>
        {!loading ? <>

          {asked ? <>
            <ui className=' dark:text-white w-[800px] h-[200px] absolute mt-3 ml-1' >
              {(chatData).slice(0, 1700) + '...'}
            </ui>
          </> :
            <>
            </>}
        </> :
          <>
            <Loading />
          </>}

     

      </div>
    </div>

  )
}

export default Chatgpt