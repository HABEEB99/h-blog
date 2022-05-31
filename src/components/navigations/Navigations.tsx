import React from 'react'

import { AiFillHome } from 'react-icons/ai'
import { IoMdArrowDropdown } from 'react-icons/io'

type NavigationsProps = {}

const Navigations: React.FC<NavigationsProps> = () => {
  return (
    <div className="group flex h-[1.8rem] w-[2.4rem] cursor-pointer  items-center justify-between rounded-md border-2 border-btn bg-gray-100 md:min-w-[7rem]">
      <AiFillHome className="text-lg text-gray-400 group-hover:text-btn" />
      <h3 className="hidden text-lg font-bold text-gray-500 group-hover:text-btn md:inline-block">
        Home
      </h3>
      <IoMdArrowDropdown className="text-lg text-gray-400 group-hover:text-btn" />
    </div>
  )
}
export default Navigations
