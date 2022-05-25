import React, { useState } from 'react'
import PagesLayout from '../components/layout/PagesLayout'

import { FcGoogle } from 'react-icons/fc'
import { BiLoader, BiLogInCircle } from 'react-icons/bi'
import Link from 'next/link'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from 'react-firebase-hooks/auth'
import { auth } from '../utils/firebase'
import toast from 'react-hot-toast'
import ResetPassword from '../components/reset/ResetPassword'

type FormProps = {
  email: string
  password: string
}

const signin: React.FC = () => {
  const [resetPassword, setResetPassword] = useState<boolean>(false)

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<FormProps>()

  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth)

  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth)

  const submitForm: SubmitHandler<FormProps> = ({ email, password }) => {
    if (error) {
      return toast.error("there's an error", {
        duration: 400,
        style: { color: 'red' },
        position: 'top-center',
      })
    } else {
      signInWithEmailAndPassword(email, password)
      return toast.success('Signed-in Successfully', {
        duration: 200,
        style: { color: 'green' },
        position: 'top-center',
      })
      reset()
    }
  }

  return (
    <PagesLayout title="SIGN-IN PAGE" description="Sign in page">
      <main className="m-1 flex h-full w-full items-center justify-center md:m-0">
        <div className="flex min-h-[55vh] w-[100vw] flex-col items-center rounded-lg border-[1px] border-cta bg-body shadow-2xl md:w-[50vw]">
          <button
            onClick={() => signInWithGoogle()}
            className="my-5 flex h-12 w-[90%] items-center justify-center space-x-3 rounded-full bg-btn text-2xl font-bold text-gray-200 hover:bg-cta"
          >
            <FcGoogle className="mr-3" />
            Sign-in with Google
            {loading && <BiLoader className="ml-3 animate-spin text-white" />}
          </button>

          <hr className="h-[0.18rem] w-full bg-header" />

          <h2 className="py-3 text-2xl text-gray-500">
            Or With Email and Password
          </h2>

          <form onSubmit={handleSubmit(submitForm)} className="w-[90%]">
            <div className="relative flex w-full flex-col rounded-full py-5">
              <input
                className="peer h-10 rounded-full px-3 placeholder-transparent outline-cta  focus:border-2 focus:border-cta focus:bg-gray-200"
                type="text"
                id="email"
                placeholder="Email"
                {...register('email', {
                  required: true,
                  pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                })}
              />
              <label
                htmlFor="email"
                className="absolute -top-[0.5rem]  left-3 text-xl text-btn transition-transform duration-200 ease-in-out peer-placeholder-shown:top-[1.5rem] peer-placeholder-shown:left-3 peer-focus:-top-2 peer-focus:left-4 peer-focus:text-xl peer-focus:text-btn "
              >
                Input your email address
              </label>

              {errors.email && (
                <span className="text-md animate-pulse pl-3 text-red-600">
                  {errors.email.type === 'required' && 'Email is required'}
                  {errors.email.type === 'pattern' && 'Invalid Email pattern'}
                </span>
              )}
            </div>

            <div className="relative flex w-full flex-col rounded-full py-5">
              <input
                className="peer h-10 rounded-full px-3 placeholder-transparent outline-cta  focus:border-2 focus:border-cta focus:bg-gray-200"
                type="password"
                id="password"
                placeholder="Password"
                {...register('password', {
                  required: true,
                  minLength: 8,
                })}
              />
              <label
                htmlFor="password"
                className="absolute -top-[0.5rem]  left-3 text-xl text-btn transition-transform duration-200 ease-in-out peer-placeholder-shown:top-[1.5rem] peer-placeholder-shown:left-3 peer-focus:-top-2 peer-focus:left-4 peer-focus:text-xl peer-focus:text-btn "
              >
                Input your password
              </label>

              {errors.password && (
                <span className="text-md animate-pulse pl-3 text-red-600">
                  {errors.password.type === 'required' &&
                    'password is required'}
                  {errors.password.type === 'minLength' &&
                    "password can't be less than 8 characters"}
                </span>
              )}
            </div>
            <button className="my-4 flex h-12 w-full items-center justify-center space-x-3 rounded-full bg-btn text-2xl font-bold text-gray-200 hover:bg-cta">
              <BiLogInCircle className="mr-2 text-white" />
              Sign-in
            </button>
          </form>

          <div className="my-3">
            <h3 className="text-red-400">
              Forgotten your password?
              <span
                onClick={() => setResetPassword(!resetPassword)}
                className="ml-2 cursor-pointer font-bold text-green-400 hover:text-green-700"
              >
                RESET
              </span>
            </h3>
          </div>
          {resetPassword && <ResetPassword />}

          <hr className="h-[0.18rem] w-full bg-header" />

          <div className="my-3 flex items-center justify-center space-x-2">
            <span>Don't have an account yet ? </span>
            <Link href="/signup">
              <a className="animate-pulse text-xl font-bold text-blue-400 hover:text-btn">
                sign-up
              </a>
            </Link>
          </div>
        </div>
      </main>
    </PagesLayout>
  )
}
export default signin
