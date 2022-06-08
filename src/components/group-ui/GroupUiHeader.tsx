import Image from 'next/image'
import React from 'react'
import { BiLoader } from 'react-icons/bi'
import { group } from '../../atom/groupsAtom'
import useGroupData from '../../hooks/useGroupData'

type GroupUiHeaderProps = {
  groupData: group
}

const GroupUiHeader: React.FC<GroupUiHeaderProps> = ({ groupData }) => {
  const { groupStateValue, onJoiningOrLeavingGroup, loading } = useGroupData()

  const hasJoined = !!groupStateValue.mySnippets.find(
    (group) => group.groupId === groupData.id
  )

  return (
    <div className="flex h-[8vh] w-[96vw] items-center justify-center space-x-3 bg-cta md:w-[80vw]">
      <div>
        {groupData.imageUrl ? (
          <div className="relative h-12 w-12 rounded-[50%]">
            <Image
              src={groupData.imageUrl}
              layout="fill"
              objectFit="contain"
              className="rounded-[50%]"
            />
          </div>
        ) : (
          <div className="relative h-12 w-12 rounded-[50%]">
            <Image
              src="/programmer (3).png"
              layout="fill"
              objectFit="contain"
              className="rounded-[50%]"
            />
          </div>
        )}
      </div>

      <h3 className="text-lg font-bold text-white">{groupData.id}'s group</h3>

      <button
        onClick={() => onJoiningOrLeavingGroup(groupData, hasJoined)}
        className={`flex h-10 w-[9rem] items-center justify-center rounded-full ${
          hasJoined
            ? 'bg-red-500 hover:bg-red-700'
            : 'bg-green-500 hover:bg-green-700'
        } font-bold text-white `}
      >
        {hasJoined ? 'Leave Group' : 'Join Group'}
        {loading && <BiLoader className="ml-3 animate-spin text-white" />}
      </button>
    </div>
  )
}
export default GroupUiHeader
