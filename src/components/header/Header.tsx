import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

import { FaBlog } from 'react-icons/fa'
import { ImSearch } from 'react-icons/im'
import { RiArrowDropDownLine, RiUserSettingsFill } from 'react-icons/ri'
import { auth } from '../../utils/firebase'
import User from '../user/User'

type HeaderProps = {}

const Header: React.FC<HeaderProps> = () => {
  const [userSetting, setUserSetting] = useState<boolean>(false)

  const [currentUser, loading, error] = useAuthState(auth)

  return (
    <header className="flex h-[8vh] items-center justify-between space-x-3 bg-header px-3 shadow-2xl sm:px-5 md:space-x-6 md:px-12 lg:px-32">
      <Link href="/" passHref>
        <div className="group flex cursor-pointer items-center text-cta">
          <h1 className="text-2xl font-bold">h</h1>
          <FaBlog className="text-2xl group-hover:animate-ping" />
        </div>
      </Link>

      <div className=" flex h-8 flex-1 items-center rounded-full border-2 border-gray-300 bg-gray-200 px-4 hover:border-cta ">
        <input
          type="text"
          placeholder="Search for a topic......."
          className=" flex-1 bg-transparent outline-none"
        />
        <ImSearch className="text-xl font-bold text-btn" />
      </div>

      {currentUser ? (
        <div
          onClick={() => setUserSetting(!userSetting)}
          className="group flex h-8 min-w-[4rem] cursor-pointer items-center justify-center space-x-1 rounded-lg bg-gray-200 px-1 hover:bg-white"
        >
          <div className="relative h-6 w-6 rounded-[100%]">
            <Image
              src={currentUser?.photoURL}
              layout="fill"
              objectFit="contain"
              className="rounded-[100%]"
            />
          </div>

          <span className="hidden text-pink-400 md:inline-block">
            {currentUser.displayName || currentUser.email?.split('@')[0]}
          </span>
          <RiArrowDropDownLine className="text-xl text-btn group-hover:text-cta" />
        </div>
      ) : (
        <div onClick={() => setUserSetting(!userSetting)}>
          <RiUserSettingsFill className="animate-pulse cursor-pointer text-2xl text-btn hover:text-cta md:text-4xl" />
        </div>
      )}

      {userSetting && <User />}
    </header>
  )
}
export default Header
