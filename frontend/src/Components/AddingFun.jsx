import { useState } from "react";
import { VscArrowLeft, VscArrowRight } from "react-icons/vsc"
export default function AddingFun() {
  const [count, setCount] = useState(0)

  const handleClick = () => {
    setCount(count + 1);
  }

  const unhandleClick = () => {
    setCount(count - 1);
  }
  return (
    <div>

      <div className='h-screen font-inconsolata grid place-content-center bg-[#0b0c14]'>
        <p className='font-inconsolata text-white text-center mb-10 text-5xl'>Hello World</p>
        <div className="flex justify-around align-middle">
          <button className='font-geist text-blue-400 text-3xl' onClick={unhandleClick}>
            <VscArrowLeft />
          </button>
          <h1 className="font-kayPho text-4xl text-white ml-4 mr-4">{count}</h1>
          <button className='font-inter text-4xl text-blue-100' onClick={handleClick}>
            <VscArrowRight />
          </button>
        </div>
      </div >
    </div>
  )
}
