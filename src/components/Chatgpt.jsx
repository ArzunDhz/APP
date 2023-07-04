import React from 'react'
const Api = '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'


const handelSubmit= async (e)=>
{
    e.preventDefault()
    const options = {
        method:'POST',
        headers:{
            'Authorization': `Bearer ${Api}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            prompt: e.target.data.value,
            n: 2,
            size: "1024x1024"
          
                })
    }

   try{
    const response =await fetch('https://api.openai.com/v1/images/generations', options)
       const data =await response.json()
       console.log(data)
       
} 
   catch(error){
console.error()
   }
   e.target.data.value = ''
}


const Chatgpt = () => {
  return (
    <div className=' flex w-[800px] h-[500px]  dark:bg-slate-700 shadow-xl bg-white absolute left-[350px] top-[60px] rounded-xl ' >
    <form onSubmit={(e)=>handelSubmit(e)}  className=' mt-auto ' action=""> 
        <input  autoComplete='off' name='data'placeholder='Ask me anything...' className=' select-none  dark:text-white dark:bg-slate-600 indent-4 rounded-t-none rounded-b-xl w-[800px] h-[30px]'/>
    </form>
    </div>
  )
}

export default Chatgpt