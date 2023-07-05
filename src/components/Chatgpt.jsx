
import React, { useState, useEffect, useRef } from 'react'
import Loading from './ExtraCompnenents/Loading'

const Chatgpt = () => {
  const containerRef = useRef(null);
  const boxRef = useRef(null);

  const isClicked = useRef(false);

  const coords = useRef({
    startX: 0,
    startY: 100,
    lastX: 0,
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
        'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`,
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
      console.log(data)
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
    <div   ref={containerRef} className="   ">

      <div ref={boxRef} className=' cursor-grab  select-none absolute top-[10%]  w-[50%] h-[60%]   ' >
        <div className="overflow-hidden  overflow-y-scroll   flex w-[100%] h-[100%] 
       dark:bg-slate-700 shadow-xl bg-white absolute left-[50%]
        top-[10%]  rounded-t-lg ">
          {!loading ? <>  

            {asked ? <>
              <p className=' text-[100%] dark:text-white w-[99%]  absolute mt-2 ml-1' >
                {(chatData)}
              </p>
            </> :
              <>
              </>}
          </> :
            <>
              <Loading />
            </>}

        </div>
        <form onSubmit={(e) => handelSubmit(e)} className='  relative left-[50%] top-[109%] z-10 w-[100%] mt-auto ' action="">
          <input autoComplete='off' name='data' placeholder=' Ask me anything...'
            className='   select-none  dark:text-white dark:bg-slate-600
           bg-slate-100 indent-4 rounded-t-none rounded-b-xl  w-full  h-[30px]' />
        </form>
      </div>

 

    </div>

  )
}

export default Chatgpt