import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

import { FaBlog } from 'react-icons/fa'
import { ImSearch } from 'react-icons/im'
import { RiArrowDropDownLine, RiUserSettingsFill } from 'react-icons/ri'
import { auth } from '../../utils/firebase'
import CreateGroup from '../create-group/CreateGroup'
import Groups from '../create-group/CreateGroup'
import SearchModal from '../modals/SearchModal'
import Navigations from '../navigations/Navigations'
import User from '../user/User'

type HeaderProps = {}

const Header: React.FC<HeaderProps> = () => {
  const [scroll, setScroll] = useState<boolean>(false)
  const [userSetting, setUserSetting] = useState<boolean>(false)
  const [openDirectory, setOpenDirectory] = useState<boolean>(false)
  const [openSearchBar, setOpenSearchBar] = useState<boolean>(false)

  const [currentUser, loading, error] = useAuthState(auth)

  const handleScroll = () => {
    window.scrollY > 0 ? setScroll(true) : setScroll(false)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-[999] flex h-[8vh] items-center justify-between space-x-2 ${
        scroll ? 'bg-gray-300' : 'bg-header'
      } px-2  sm:px-3 md:space-x-6 md:px-12 lg:px-32`}
    >
      <div className="flex items-center space-x-2">
        <Link href="/" passHref>
          <div className="group flex cursor-pointer items-center text-cta">
            <h1 className="text-2xl font-bold">h</h1>
            <FaBlog className="text-2xl group-hover:animate-ping" />
          </div>
        </Link>

        <div onClick={() => setOpenDirectory(!openDirectory)}>
          <Navigations />
        </div>
      </div>

      <div className="hidden h-8 flex-1 items-center rounded-full border-2 border-gray-300 bg-gray-200 px-4 hover:border-cta md:flex ">
        <ImSearch className="text-xl font-bold text-btn" />
        <input
          type="text"
          placeholder="Search for a topic......."
          className=" flex-1 bg-transparent outline-none"
        />
      </div>

      {currentUser ? (
        <div className="flex items-center space-x-2">
          <div
            className="inline-block md:hidden"
            onClick={() => setOpenSearchBar(!openSearchBar)}
          >
            <ImSearch className="text-xl font-bold text-btn" />
          </div>
          <div
            onClick={() => setUserSetting(!userSetting)}
            className="group flex h-8 min-w-[2rem] cursor-pointer items-center justify-center space-x-1 rounded-lg bg-gray-200 px-1 hover:bg-white"
          >
            <div className="relative h-6 w-6 rounded-[100%]">
              <Image
                src={currentUser?.photoURL}
                layout="fill"
                objectFit="contain"
                className="rounded-[100%]"
              />
            </div>

            <span className=" text-pink-400">
              {currentUser.displayName || currentUser.email?.split('@')[0]}
            </span>
            <RiArrowDropDownLine className="text-xl text-btn group-hover:text-cta" />
          </div>
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          <div
            className="inline-block md:hidden"
            onClick={() => setOpenSearchBar(!openSearchBar)}
          >
            <ImSearch className="text-xl font-bold text-btn" />
          </div>

          <div onClick={() => setUserSetting(!userSetting)}>
            <RiUserSettingsFill className="animate-pulse cursor-pointer text-2xl text-btn hover:text-cta md:text-4xl" />
          </div>
        </div>
      )}
      {openSearchBar && <SearchModal />}
      {userSetting && <User />}
      {openDirectory && <CreateGroup />}
    </header>
  )
}
export default Header
