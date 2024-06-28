import { useState } from 'react'
import { GoPaperclip } from "react-icons/go";
import { PiPaperPlaneRightBold } from "react-icons/pi";
import { CiCamera , CiVideoOn } from "react-icons/ci";
import { HiOutlineDocumentArrowDown } from "react-icons/hi2";
const Text = () => {
  const [tab , setTab] = useState(false);
  return (
    <>
    <div className='flex rounded-lg items-center bg-white  w-[95%] mx-auto'>
      <input className='w-full outline-none p-2' type="text" placeholder='Reply to @Rhoit Yadav'/>
      <div className='flex gap-3'>

      <div className='cursor-pointer flex flex-col items-center'>

      <div className={tab ?'absolute mt-[-3.5rem] duration-500': 'hidden duration-500'}>
      <div className='flex gap-3 text-white bg-green-700 font-bold  p-2 rounded-[4rem]'>
      <CiCamera className='cursor-pointer hover:scale-110 duration-500'  size={23}/>
      <CiVideoOn className='cursor-pointer hover:scale-110 duration-500'  size={23}/>
      <HiOutlineDocumentArrowDown className='cursor-pointer hover:scale-110 duration-500' size={23}/>
      </div>
      <div className='triangle-down ml-[45%] mt-[-0.1rem]'></div>
      </div>
        <GoPaperclip onClick={()=>setTab(!tab)} size={20}/>
      </div>

      <div className='cursor-pointer'><PiPaperPlaneRightBold size={20}/></div>
      </div>
    </div>
    </>
  )
}

export default Text
