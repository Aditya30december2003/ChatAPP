import { FaArrowLeft } from "react-icons/fa6";
import { LuPenSquare } from "react-icons/lu";
import { TbDotsVertical } from "react-icons/tb";
import Icon from '../assets/Icon.png'
const Header = () => {
  return (
    <div className='fixed text w-full z-20'>
    <div className='flex items-center justify-between p-2 '>
      <div className='flex items-center gap-3'>
        <FaArrowLeft  className='cursor-pointer' size={20}/>
        <h1 className='text-[1.5rem]  font-bold'>Trip 1</h1>
      </div>
      <div><LuPenSquare className='cursor-pointer'  size={20}/></div>
    </div>

    <div className='flex justify-between items-center p-2'>
      <div className='flex items-center gap-2'>
      <img className='w-[3.3rem] cursor-pointer h-[3.3rem]' src={Icon} alt="" />
      <div className='font-bold text-black text-[1.1rem]'> <span className='text-[1rem] text-black/50 font-bold'>From </span>IGI Airport, T3 <br /> <span className='text-[1rem] text-black/50 font-bold'>To</span> Sector 28 </div>
      </div>
      <div className='cursor-pointer'><TbDotsVertical size={22}/></div>
    </div>

    <hr className='h-[0.06rem] bg-black/30 w-full mt-2'/>
    </div>
  )
}

export default Header
