import {
  doc,
  getDoc,
  runTransaction,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore'
import Image from 'next/image'
import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { IoMdAddCircle } from 'react-icons/io'
import { auth, dataBase } from '../../utils/firebase'

type GroupsProps = {}

type FormInputs = {
  name: string
  type: string
}

const Groups: React.FC<GroupsProps> = () => {
  const [user] = useAuthState(auth)
  const [createGroup, setCreateGroup] = useState<boolean>(false)

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<FormInputs>({ mode: 'all' })

  const submitForm: SubmitHandler<FormInputs> = async ({ name, type }) => {
    try {
      const groupDocRef = doc(dataBase, 'groups', name)
      await runTransaction(dataBase, async (transaction) => {
        const groupDoc = await transaction.get(groupDocRef)

        if (groupDoc.exists()) {
          return toast.error(`Sorry! ${name} has been taken`, {
            duration: 4000,
            position: 'top-center',
          })
        } else {
          transaction.set(groupDocRef, {
            creatorId: user?.uid,
            createdAt: serverTimestamp(),
            members: 1,
            groupType: type,
          })

          transaction.set(
            doc(dataBase, `users/${user?.uid}/groupSnippets`, name),
            {
              groupId: name,
              isAdmin: true,
            }
          )

          toast.success(`${name} group created successfully`, {
            position: 'top-center',
            duration: 2000,
          })

          reset()

          setCreateGroup(false)
        }
      })
    } catch (error: any) {
      return toast.error(error.message, {
        position: 'top-center',
        duration: 4000,
      })
    }
  }

  return (
    <div className="absolute top-20 left-4 min-h-[10rem] w-[20rem] rounded-lg bg-header p-4 shadow-2xl md:left-[5rem]">
      <div className="flex flex-col  space-y-2">
        <h3 className="font-medium text-blue-400">My Groups</h3>

        <div className="flex items-center space-x-2">
          <div className="relative h-8 w-8 rounded-[50%]">
            <Image
              src="/programmer (3).png"
              layout="fill"
              objectFit="contain"
              className="rounded-[50%]"
            />
          </div>
          <h5 className="text-gray-400">Web Developments</h5>
        </div>
      </div>

      <hr className="my-4 h-[0.18rem] w-full bg-header" />

      <div>
        <div
          onClick={() => setCreateGroup(!createGroup)}
          className="flex cursor-pointer items-center space-x-2"
        >
          <IoMdAddCircle className="text-2xl font-bold text-btn hover:text-green-500" />
          <h3 className="font-medium text-purple-600">Create a new group</h3>
        </div>

        {createGroup && (
          <div className="mt-2">
            <form onSubmit={handleSubmit(submitForm)}>
              <div className="relative flex w-full flex-col rounded-full py-5">
                <input
                  className="peer h-10 rounded-full px-3 text-base placeholder-transparent outline-cta  focus:border-2 focus:border-cta focus:bg-gray-200"
                  type="text"
                  id="name"
                  placeholder="Name"
                  {...register('name', {
                    minLength: 2,
                    maxLength: 20,
                    required: true,
                  })}
                />
                <label
                  htmlFor="email"
                  className="text-md absolute -top-[0.5rem] left-3 text-btn transition-transform duration-200 ease-in-out peer-placeholder-shown:top-[1.8rem] peer-placeholder-shown:left-3 peer-focus:-top-2 peer-focus:left-4 peer-focus:text-base peer-focus:text-btn "
                >
                  Input the name of the group
                </label>

                {errors.name && (
                  <span className="text-md animate-pulse pl-3 text-red-600">
                    {errors.name.type === 'required' &&
                      'Group Name is required'}
                    {errors.name.type === 'minLength' &&
                      "Group Name can't be less than 2 characters"}
                    {errors.name.type === 'maxLength' &&
                      "Group Name can't be more than 20 characters"}
                  </span>
                )}
              </div>

              <div>
                <select
                  id="type"
                  {...register('type', {
                    required: true,
                  })}
                  className="h-10 w-full self-center rounded-full p-2  text-gray-500 outline-cta  focus:border-2 focus:border-cta focus:bg-gray-200"
                >
                  <option value="">Select Group type</option>
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                  <option value="restricted">Restricted</option>
                </select>

                {errors.type && (
                  <span className="text-md animate-pulse pl-3 text-red-600">
                    {errors.type.type === 'required' &&
                      'You must select group type'}
                  </span>
                )}
              </div>

              <div className="mt-5 flex items-center justify-between">
                <button
                  onClick={() => setCreateGroup(false)}
                  className="h-8 w-[5rem] rounded-full bg-red-500 font-bold text-gray-200 hover:bg-red-700 hover:text-white"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="h-8 w-[8rem] rounded-full bg-btn font-bold text-gray-200 hover:bg-cta hover:text-white"
                >
                  Create Group
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
export default Groups
