import React, { useEffect } from 'react'
import PagesLayout from '../components/layout/PagesLayout'
import { auth, dataBase } from '../utils/firebase'

import { SubmitHandler, useForm } from 'react-hook-form'
import { BiLoader, BiLogInCircle } from 'react-icons/bi'
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import toast from 'react-hot-toast'
import { ERRORS_FROM_FIREBASE } from '../utils/firebaseErrors'
import { User } from 'firebase/auth'
import { addDoc, collection } from 'firebase/firestore'

type FormProps = {
  username: string
  email: string
  password: string
  confirmPassword: string
}

const signup: React.FC = () => {
  const [createUserWithEmailAndPassword, userCred, loading, error] =
    useCreateUserWithEmailAndPassword(auth)

  // const firebaseErr =
  //   ERRORS_FROM_FIREBASE[error.message as keyof typeof ERRORS_FROM_FIREBASE]

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<FormProps>()

  const submitForm: SubmitHandler<FormProps> = ({
    username,
    email,
    password,
    confirmPassword,
  }) => {
    if (password !== confirmPassword) {
      return toast.error("ooops! password doesn't correlate", {
        duration: 4000,
        position: 'top-center',
        style: {
          color: 'red',
        },
      })
    } else if (error) {
      return toast.error(<div>{error}</div>, {
        duration: 4000,
        position: 'top-center',
        style: {
          color: 'red',
        },
      })
    } else {
      createUserWithEmailAndPassword(email, password)
      return toast.success('Congrats! you signed-up successfully', {
        duration: 2000,
        position: 'top-center',
        style: {
          color: 'green',
        },
      })
      reset()
    }
  }

  const createUserDoc = async (user: User) => {
    await addDoc(
      collection(dataBase, 'users'),
      JSON.parse(JSON.stringify(user))
    )
  }

  useEffect(() => {
    if (userCred) {
      createUserDoc(userCred.user)
    }
  }, [userCred])

  return (
    <PagesLayout title="SIGN-UP PAGE" description="sign-up page">
      <main className="flex h-full w-full items-center justify-center">
        <div className="flex min-h-[55vh] w-[100vw] flex-col items-center rounded-lg border-[1px] border-cta bg-body p-2 shadow-2xl md:w-[50vw]">
          <form onSubmit={handleSubmit(submitForm)} className=" w-[90%]">
            <div className="relative flex w-full flex-col rounded-full py-5">
              <input
                className="peer h-10 rounded-full px-3 placeholder-transparent outline-cta  focus:border-2 focus:border-cta focus:bg-gray-200"
                type="text"
                id="username"
                placeholder="Username"
                {...register('username', {
                  required: true,
                  minLength: 2,
                })}
              />
              <label
                htmlFor="email"
                className="absolute -top-[0.5rem]  left-3 text-xl text-btn transition-transform duration-200 ease-in-out peer-placeholder-shown:top-[1.5rem] peer-placeholder-shown:left-3 peer-focus:-top-2 peer-focus:left-4 peer-focus:text-xl peer-focus:text-btn "
              >
                Input your Username
              </label>

              {errors.username && (
                <span className="text-md animate-pulse pl-3 text-red-600">
                  {errors.username.type === 'required' &&
                    'Username is required'}
                  {errors.username.type === 'minLength' &&
                    "Username can't be less than 2 characters"}
                </span>
              )}
            </div>

            <div className="relative flex w-full flex-col rounded-full py-5">
              <input
                className="peer h-10 rounded-full px-3 placeholder-transparent outline-cta  focus:border-2 focus:border-cta focus:bg-gray-200"
                type="text"
                id="email"
                placeholder="Input your enail"
                {...register('email', {
                  required: true,
                  pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                })}
              />
              <label
                htmlFor="email"
                className="absolute -top-[0.5rem]  left-3 text-xl text-btn transition-transform duration-200 ease-in-out peer-placeholder-shown:top-[1.5rem] peer-placeholder-shown:left-3 peer-focus:-top-2 peer-focus:left-4 peer-focus:text-xl peer-focus:text-btn "
              >
                Input your email
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

            <div className="relative flex w-full flex-col rounded-full py-5">
              <input
                className="peer h-10 rounded-full px-3 placeholder-transparent outline-cta  focus:border-2 focus:border-cta focus:bg-gray-200"
                type="password"
                id="confirmPassword"
                placeholder="Confirm Password"
                {...register('confirmPassword', {
                  required: true,
                  minLength: 8,
                })}
              />
              <label
                htmlFor="confirmPassword"
                className="absolute -top-[0.5rem]  left-3 text-xl text-btn transition-transform duration-200 ease-in-out peer-placeholder-shown:top-[1.5rem] peer-placeholder-shown:left-3 peer-focus:-top-2 peer-focus:left-4 peer-focus:text-xl peer-focus:text-btn "
              >
                Confirm your password
              </label>

              {errors.confirmPassword && (
                <span className="text-md animate-pulse pl-3 text-red-600">
                  {errors.confirmPassword.type === 'required' &&
                    'password is required'}
                  {errors.confirmPassword.type === 'minLength' &&
                    "password can't be less than 8 characters"}
                </span>
              )}
            </div>

            {loading ? (
              <button
                type="submit"
                className="my-4 flex h-12 w-full items-center justify-center space-x-3 rounded-full bg-btn text-2xl font-bold text-gray-200 hover:bg-cta"
              >
                <BiLoader className="mr-2 animate-spin font-bold text-white" />
              </button>
            ) : (
              <button
                type="submit"
                className="my-4 flex h-12 w-full items-center justify-center space-x-3 rounded-full bg-btn text-2xl font-bold text-gray-200 hover:bg-cta"
              >
                <BiLogInCircle className="mr-2 text-white" />
                Sign-up
              </button>
            )}
          </form>
        </div>
      </main>
    </PagesLayout>
  )
}
export default signup
