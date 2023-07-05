import React, { useState } from "react";
import ImageLoading from "../assets/Image.json";
import Lottie from "lottie-react";

function Image() {





  const [imageData, setImageData] = useState();
  const [imageLoaded, setimageLoaded] = useState(false);
  const handelSubmit = async (e) => {
    setimageLoaded(true);
    setImageData()
    e.preventDefault();





    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: e.target.imgdata.value,
        n: 1,
        size: "1024x1024",
      }),
    };

    try {
      const response = await fetch(
        "https://api.openai.com/v1/images/generations",
        options
      );
      const datas = await response.json();
      setImageData(datas.data[0].url);
    } catch (error) {
      console.error();
    }

    setimageLoaded(true);
  };

  return (
    <>

    <div className="  overflow-hidden w-[18%] h-[41%] rounded-xl  absolute top-[50%] left-[2%]">
        <form onSubmit={(e) => handelSubmit(e)} className="  " action="">
          <input
            autoComplete="off"
            name="imgdata"
            placeholder=" Ask me anything..."
            className="   select-none  dark:text-white dark:bg-slate-600
           bg-slate-100 indent-4   rounded-t-lg w-full  "
          />
        </form>

        {imageLoaded ? <>
          {imageData == null ? (
          <>
        <Lottie animationData={ImageLoading}/>
          </>
        ) : (
          <>
            <img
              src={imageData}
              className=" h-full w-full  z-[1000]"
              loading="lazy"
            />
          </>
        )}
        
        </> : <>
        <div class="   flex items-center  justify-center w-full h-full bg-gray-100 rounded sm:w-96 dark:bg-gray-700">
              <svg
                class="w-20 h-20  text-gray-200 dark:text-gray-600"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 18"
              >
                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
              </svg>
            </div>
     
        
        </>}

 
      </div><div className=" overflow-hidden w-[18%] h-[40%] rounded-xl   absolute top-[50%] left-[2%]">
        <form onSubmit={(e) => handelSubmit(e)} className="  " action="">
          <input
            autoComplete="off"
            name="imgdata"
            placeholder=" Ask me anything..."
            className="   select-none  dark:text-white dark:bg-slate-600
           bg-slate-100 indent-4   rounded-t-lg w-full  "
          />
        </form>

        {imageLoaded ? <>
          {imageData == null ? (
          <>
        <Lottie animationData={ImageLoading}/>
          </>
        ) : (
          <>
            <img
              src={imageData}
              className=" h-full w-full  z-[1000]"
              loading="lazy"
            />
          </>
        )}
        
        </> : <>
        <div class="   flex items-center  justify-center w-full h-full bg-gray-100 rounded sm:w-96 dark:bg-gray-700">
              <svg
                class="w-20 h-20  text-gray-200 dark:text-gray-600"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 18"
              >
                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
              </svg>
            </div>
     
        
        </>}

 
      </div>

      
    </>
  );
}

export default Image;
