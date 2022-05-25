import { signOut } from 'firebase/auth'
import Link from 'next/link'
import React from 'react'
import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth'

import { BiLogInCircle, BiLogOutCircle } from 'react-icons/bi'
import { useRecoilState } from 'recoil'
import { userState } from '../../atom/userAtom'
import { auth } from '../../utils/firebase'

const User: React.FC = () => {
  const [openUser, setOpenUser] = useRecoilState(userState)

  const [currentUser, loading, error] = useAuthState(auth)

  const handleSignIn = () => {
    setOpenUser((prevState) => ({
      ...prevState,
      open: false,
    }))
  }

  const handleSignOut = () => {
    signOut(auth)
    setOpenUser((prevState) => ({
      ...prevState,
      open: false,
    }))
  }

  return (
    <div className="absolute top-20 right-8 flex h-20 w-60 items-center justify-center rounded-lg bg-header p-4 shadow-2xl">
      {!currentUser ? (
        <Link href="/signin" passHref>
          <button
            onClick={handleSignIn}
            className="flex h-full w-full items-center justify-center space-x-2 rounded-full bg-btn text-2xl font-bold text-white hover:bg-cta"
          >
            <BiLogInCircle className="mr-2 text-white" />
            Sign in
          </button>
        </Link>
      ) : (
        <button
          onClick={handleSignOut}
          className="flex h-full w-full items-center justify-center space-x-2 rounded-full bg-red-500 text-2xl font-bold text-white hover:bg-red-700"
        >
          <BiLogOutCircle className="mr-2 text-white" />
          Sign out
        </button>
      )}
    </div>
  )
}
export default User
