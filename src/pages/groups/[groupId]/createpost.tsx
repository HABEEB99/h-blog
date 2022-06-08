import React, { useState } from 'react'
import PagesLayout from '../../../components/layout/PagesLayout'

import { FaLongArrowAltDown, FaPoll } from 'react-icons/fa'
import CreatePostNavItem from '../../../components/create-post-modals/PostModal'
import { BsFillFileEarmarkPostFill } from 'react-icons/bs'
import { BiImageAdd, BiLink } from 'react-icons/bi'
import { MdKeyboardVoice } from 'react-icons/md'
import PostModal from '../../../components/create-post-modals/PostModal'
import SelectAssetsModal from '../../../components/create-post-modals/SelectAssetsModal'
import { useAuthState } from 'react-firebase-hooks/auth'
import { assetStorage, auth, dataBase } from '../../../utils/firebase'
import { useRouter } from 'next/router'
import { Post } from '../../../atom/postAtom'
import {
  addDoc,
  collection,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from 'firebase/firestore'
import toast from 'react-hot-toast'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'

type CreatePostProps = {}

const CreatePost: React.FC<CreatePostProps> = () => {
  const [user] = useAuthState(auth)

  const router = useRouter()

  const styles = {
    tab: `flex cursor-pointer items-center justify-center space-x-2 text-xl md:text-md text-btn p-2 max-w-fit`,
    activeTab: `flex cursor-pointer items-center justify-center space-x-2  text-xl md:text-md text-white bg-btn p-2 max-w-fit`,
  }

  const [loading, setLoading] = useState<boolean>(false)
  const [uploadedAsset, setUploadedAsset] = useState<string>()
  const [tabIndex, setTabIndex] = useState<number>(1)
  const [formInputs, setFormInputs] = useState({
    title: '',
    body: '',
  })

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target
    setFormInputs((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const uploadAsset = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader()

    if (event.target.files?.[0]) {
      fileReader.readAsDataURL(event.target.files[0])
    }

    fileReader.onload = (event) => {
      if (event.target?.result) {
        setUploadedAsset(event.target.result as string)
      }
    }
  }

  const submitPost = async () => {
    const { groupId } = router.query

    // ---Created a post structure----
    const post: Post = {
      groupId: groupId as string,
      authorId: user?.uid as string,
      authorName: user?.displayName as string,
      postTitle: formInputs.title,
      postBody: formInputs.body,
      voteCounts: 0,
      numberOfComments: 0,
      createdAt: serverTimestamp() as Timestamp,
    }

    setLoading(true)

    try {
      // ---Stored the post in the database----
      const postDocRef = await addDoc(collection(dataBase, 'posts'), post)

      // ---Check if the post comes with an asset (image/video) and store it in the firebase storage and add the asset to the post object----
      if (uploadedAsset) {
        const assetRef = ref(assetStorage, `posts/${postDocRef.id}/asset`)
        await uploadString(assetRef, uploadedAsset, 'data_url')
        const assetUrl = await getDownloadURL(assetRef)

        await updateDoc(postDocRef, {
          imageUrl: assetUrl,
        })
      }
    } catch (error: any) {
      console.log(error.message)
      toast.error(error.message, {
        position: 'top-center',
        duration: 4000,
      })
    }

    setLoading(false)
    setFormInputs({
      title: '',
      body: '',
    })

    router.back()
  }

  const handleTabIndex = (index: number) => setTabIndex(index)

  return (
    <PagesLayout title="Create-Post" description="create a post">
      <main>
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold text-gray-600">Create a post</h1>
          <FaLongArrowAltDown className="mt-6 animate-bounce text-2xl text-btn" />
        </div>

        <div className="mt-5 w-full rounded-lg bg-header lg:w-[39%]">
          <div className="flex items-center justify-evenly">
            <div
              onClick={() => handleTabIndex(1)}
              className={`${tabIndex === 1 ? styles.activeTab : styles.tab}`}
            >
              <h3>Post</h3>
              <BsFillFileEarmarkPostFill />
            </div>

            <div
              onClick={() => handleTabIndex(2)}
              className={`${tabIndex === 2 ? styles.activeTab : styles.tab}`}
            >
              <h3>Image or Video</h3>
              <BiImageAdd />
            </div>

            {/* <div
              onClick={() => handleTabIndex(3)}
              className={`${tabIndex === 3 ? styles.activeTab : styles.tab}`}
            >
              <h3>Link</h3>
              <BiLink />
            </div>

            <div
              onClick={() => handleTabIndex(4)}
              className={`${tabIndex === 4 ? styles.activeTab : styles.tab}`}
            >
              <h3>Voice</h3>
              <MdKeyboardVoice />
            </div>

            <div
              onClick={() => handleTabIndex(5)}
              className={`${tabIndex === 5 ? styles.activeTab : styles.tab}`}
            >
              <h3>Poll</h3>
              <FaPoll />
            </div> */}
          </div>

          <div className="flex min-h-[18rem] w-full items-center justify-center">
            {tabIndex === 1 && (
              <PostModal
                formInputs={formInputs}
                handleChange={handleChange}
                submitPost={submitPost}
                loading={loading}
              />
            )}
            {tabIndex === 2 && (
              <SelectAssetsModal
                uploadedAsset={uploadedAsset}
                uploadAsset={uploadAsset}
                setUploadedAsset={setUploadedAsset}
              />
            )}
          </div>
        </div>
      </main>
    </PagesLayout>
  )
}
export default CreatePost
