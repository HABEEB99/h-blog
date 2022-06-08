import React from 'react'
import { BiLoader } from 'react-icons/bi'

type PostModalProps = {
  loading: boolean

  formInputs: {
    title: string
    body: string
  }

  handleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void

  submitPost: () => void
}

const PostModal: React.FC<PostModalProps> = ({
  loading,
  formInputs,
  handleChange,
  submitPost,
}) => {
  return (
    <div className="flex w-full flex-col items-center space-y-3 px-3">
      <input
        type="text"
        name="title"
        value={formInputs.title}
        onChange={handleChange}
        placeholder=" Title"
        className="h-10 w-full rounded-lg border-2 border-gray-500 bg-transparent px-2 outline-cta"
      />

      <textarea
        name="body"
        id=""
        value={formInputs.body}
        onChange={handleChange}
        className="h-40 w-full rounded-lg border-2 border-gray-500 bg-transparent px-2 outline-cta"
        placeholder="Body"
      />

      <button
        onClick={submitPost}
        type="submit"
        className="flex h-10 w-full items-center justify-center rounded-full bg-btn text-2xl font-bold text-white hover:bg-cta"
      >
        Post
        {loading && (
          <BiLoader className="ml-3 animate-spin text-xl font-bold text-white" />
        )}
      </button>
    </div>
  )
}

export default PostModal
