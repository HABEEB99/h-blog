import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { BiImageAdd, BiLink } from 'react-icons/bi'
import { BsThreeDots } from 'react-icons/bs'
import {
  FaCommentMedical,
  FaSave,
  FaShare,
  FaThumbsDown,
  FaThumbsUp,
} from 'react-icons/fa'
import { IoMdSend } from 'react-icons/io'
import { auth } from '../../utils/firebase'

type GroupUiBodyProps = {}

const GroupUiBody: React.FC<GroupUiBodyProps> = () => {
  const router = useRouter()
  const [user] = useAuthState(auth)

  const createPost = () => {
    if (!user) {
      return router.push(`/signin`)
    }

    const { groupId } = router.query
    router.push(`${groupId}/createpost`)
  }

  return (
    <div className="mt-4 flex min-h-fit w-[100%] flex-col items-center justify-between space-x-1 md:w-[90%] lg:mt-8 lg:flex-row lg:space-x-10">
      {/* ----SIDEBAR---- */}
      <div className="flex w-[100%] flex-col items-center space-y-4 bg-header px-2 py-4 lg:w-[70%] lg:px-0">
        {/* ----CREATE POST FORM---- */}
        <div className="flex h-16 w-[100%] items-center justify-between space-x-3 rounded-xl bg-body px-3 shadow-2xl lg:w-[80%]">
          <div
            onClick={createPost}
            className="flex h-10 w-full flex-1 items-center justify-center  rounded-lg bg-gray-100 px-2"
          >
            <input
              type="text"
              placeholder="Create Post"
              className="w-full bg-transparent outline-none"
            />
            <IoMdSend className="text-xl text-btn hover:text-cta" />
          </div>

          <div className="flex items-center justify-center space-x-2 ">
            <BiImageAdd className="text-2xl font-bold text-btn hover:text-cta" />
            <BiLink className="text-2xl font-bold text-btn hover:text-cta" />
          </div>
        </div>

        {/* ----CREATED POSTS---- */}
        <div className="flex h-[20rem] items-center rounded-lg bg-body md:w-[100%] lg:w-[80%]">
          <div className="flex min-h-[100%] w-[10%] flex-col items-center space-y-3 rounded-tl-lg rounded-bl-lg bg-gray-200 py-2">
            <FaThumbsUp className="text-xl text-green-500 hover:text-green-700" />
            <span className="text-lg text-blue-600">200</span>
            <FaThumbsDown className="text-xl text-red-500 hover:text-red-700" />
          </div>

          <div className="flex h-full w-[90%] flex-col items-center space-y-3 p-2">
            <div className="flex w-full items-center justify-between text-gray-300">
              <span className="text-xs text-gray-500">Created by HBO</span>
              <span className="text-xs italic text-gray-400">
                on May 25th, 2022
              </span>
            </div>

            <div className="flex flex-col space-x-1">
              <h3 className="text-2xl font-bold text-gray-600">Dummy Text</h3>
              <span className="text-md text-gray-400">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut
                facilis totam autem in odio ratione excepturi itaque molestias
                eligendi magnam vitae, vero expedita, sequi non aspernatur, est
                ex beatae ipsum.
              </span>
            </div>

            <div className="relative h-[10rem] w-full">
              <Image src="/real-estate.png" layout="fill" objectFit="contain" />
            </div>

            <div className="flex w-full items-center space-x-8 ">
              <div className="flex items-center space-x-1">
                <FaCommentMedical className="text-md cursor-pointer text-btn hover:text-cta" />
                <span className="text-base text-gray-400">200</span>
              </div>

              <div className="flex cursor-pointer items-center space-x-1 text-2xl text-btn hover:text-cta">
                <FaShare className="text-md cursor-pointer text-btn hover:text-cta" />
                <span className="text-base text-gray-400">share</span>
              </div>

              <div className="flex cursor-pointer items-center space-x-1 text-2xl text-btn hover:text-cta">
                <FaSave className="text-md cursor-pointer text-btn hover:text-cta" />
                <span className="text-base text-gray-400">save</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ----WIDGET---- */}
      <div className="mt-4 h-[15rem] w-[100%] rounded-lg bg-body shadow-2xl lg:mt-0 lg:w-[30%]">
        <div className="flex h-12 items-center justify-between rounded-tl-lg rounded-tr-lg bg-header px-2">
          <h1>Groups info</h1>
          <BsThreeDots className="text-xl font-bold text-btn hover:text-cta" />
        </div>

        <div className="flex h-28 items-center justify-center space-x-12">
          <div className="flex flex-col">
            <span className="text-xl font-bold text-blue-600">201,000</span>
            <span className="text-lg font-bold text-cta">Members</span>
          </div>

          <div className="flex flex-col">
            <span className="animate-pulse text-xl font-bold text-green-600">
              129
            </span>
            <span className="text-lg font-bold text-cta">Online</span>
          </div>
        </div>

        <div className="flex flex-col items-center space-y-1 px-2">
          <span className="text-base text-gray-400">
            Created on April 6, 2022
          </span>
          <button className="h-10 w-full rounded-full bg-btn font-bold text-white hover:bg-cta">
            Create Post
          </button>
        </div>
      </div>
    </div>
  )
}
export default GroupUiBody
