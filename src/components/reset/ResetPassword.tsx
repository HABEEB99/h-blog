import React from 'react'
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth'

import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { BiLoader } from 'react-icons/bi'
import { auth } from '../../utils/firebase'

type FormProps = {
  resetEmail: string
}

const ResetPassword: React.FC = () => {
  const [sendPasswordResetEmail, sending, error] =
    useSendPasswordResetEmail(auth)

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<FormProps>()

  const submitForm: SubmitHandler<FormProps> = async ({ resetEmail }) => {
    if (error) {
      return toast.error(error.message, {
        duration: 4000,
        style: { color: 'red' },
        position: 'top-center',
      })
    } else {
      await sendPasswordResetEmail(resetEmail)
      toast.success('link has been sent to your mail', {
        duration: 4000,
        style: { color: 'green' },
        position: 'top-center',
      })
      reset()
    }
  }

  return (
    <div className="flex  flex-col items-center ">
      <span className="md:text-md px-2 text-xs text-pink-400 lg:text-xl">
        enter your email below to receive a password reset link
      </span>

      <form onSubmit={handleSubmit(submitForm)} className="my-2 w-[100%]">
        <div className="relative flex w-full flex-col rounded-full py-5">
          <input
            className="peer h-10 rounded-full px-3 placeholder-transparent outline-cta  focus:border-2 focus:border-cta focus:bg-gray-200"
            type="text"
            id="resetEmail"
            placeholder="Email"
            {...register('resetEmail', {
              required: true,
              pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
            })}
          />
          <label
            htmlFor="resetEmail"
            className="absolute -top-[0.5rem]  left-3 text-xl text-btn transition-transform duration-200 ease-in-out peer-placeholder-shown:top-[1.5rem] peer-placeholder-shown:left-3 peer-focus:-top-2 peer-focus:left-4 peer-focus:text-xl peer-focus:text-btn "
          >
            Input your email address
          </label>

          {errors.resetEmail && (
            <span className="text-md animate-pulse pl-3 text-red-600">
              {errors.resetEmail.type === 'required' && 'Email is required'}
              {errors.resetEmail.type === 'pattern' && 'Invalid Email pattern'}
            </span>
          )}
        </div>

        {sending ? (
          <button
            type="submit"
            className="my-4 flex h-12 w-full  items-center justify-center space-x-3 rounded-full bg-btn text-2xl font-bold text-gray-200 hover:bg-cta"
          >
            <BiLoader className="mr-2 animate-spin font-bold text-white" />
          </button>
        ) : (
          <button
            type="submit"
            className="my-4 flex h-12 w-full  items-center justify-center space-x-3 rounded-full bg-btn text-2xl font-bold text-gray-200 hover:bg-cta "
          >
            Reset Password
          </button>
        )}
      </form>
    </div>
  )
}
export default ResetPassword
