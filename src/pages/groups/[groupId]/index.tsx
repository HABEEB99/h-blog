import { doc, getDoc } from 'firebase/firestore'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import React from 'react'
import { group } from '../../../atom/groupsAtom'
import PagesLayout from '../../../components/layout/PagesLayout'
import { dataBase } from '../../../utils/firebase'
import safeJsonStringify from 'safe-json-stringify'
import Link from 'next/link'
import GroupUi from '../../../components/group-ui/GroupUi'

type GroupPageProps = {
  groupData: group
}

const GroupPage: React.FC<GroupPageProps> = ({ groupData }) => {
  if (!groupData) {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center space-y-3 bg-yellow-200">
        <h1 className="animate-pulse text-2xl font-bold text-red-500">
          ERROR!
        </h1>
        <h2 className="text-xl text-gray-400">
          The requested group is unavailable
        </h2>
        <Link href="/" passHref>
          <button className="h-12 w-80 rounded-full bg-btn text-xl text-white  hover:bg-cta">
            Go Back To Home Page
          </button>
        </Link>
      </div>
    )
  }
  return (
    <PagesLayout title={groupData.id} description="A group page">
      <GroupUi groupData={groupData} />
    </PagesLayout>
  )
}
export default GroupPage

export const getServerSideProps: GetServerSideProps = async ({
  query: { groupId },
}: GetServerSidePropsContext) => {
  try {
    const groupDocRef = doc(dataBase, 'groups', groupId as string)
    const groupDoc = await getDoc(groupDocRef)

    return {
      props: {
        groupData: groupDoc.exists()
          ? JSON.parse(
              safeJsonStringify({ id: groupDoc.id, ...groupDoc.data() })
            )
          : '',
      },
    }
  } catch (error) {
    console.log(error)
  }
}
