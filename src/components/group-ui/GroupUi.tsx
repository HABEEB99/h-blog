import Image from 'next/image'
import React from 'react'
import { BiLoader } from 'react-icons/bi'
import { group } from '../../atom/groupsAtom'
import useGroupData from '../../hooks/useGroupData'
import GroupUiBody from './GroupUiBody'
import GroupUiHeader from './GroupUiHeader'

type GroupUiProps = {
  groupData: group
}

const GroupUi: React.FC<GroupUiProps> = ({ groupData }) => {
  return (
    <div className="flex flex-col items-center ">
      {/*------GROUP HEADER-----*/}
      <GroupUiHeader groupData={groupData} />

      {/* ----GROUP BODY----- */}
      <GroupUiBody />
    </div>
  )
}
export default GroupUi
