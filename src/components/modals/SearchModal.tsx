import React from 'react'
import { ImSearch } from 'react-icons/im'

type SearchModalProps = {}

const SearchModal: React.FC<SearchModalProps> = () => {
  return (
    <div className="absolute top-[11vh] right-4 flex h-20 w-[20rem] items-center justify-center rounded-lg bg-header px-4">
      <div className="flex h-10 flex-1 items-center space-x-3 rounded-full border-2 border-gray-300 bg-gray-200 px-4 hover:border-btn ">
        <ImSearch className="text-xl font-bold text-btn" />
        <input
          type="text"
          placeholder="Search for a movie"
          className=" flex-1 bg-transparent outline-none"
        />
      </div>
    </div>
  )
}
export default SearchModal
