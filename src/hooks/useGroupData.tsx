import {
  collection,
  doc,
  getDocs,
  increment,
  writeBatch,
} from 'firebase/firestore'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import toast from 'react-hot-toast'
import { useRecoilState } from 'recoil'
import { group, groupSnippet, groupState } from '../atom/groupsAtom'
import { auth, dataBase } from '../utils/firebase'

const useGroupData = () => {
  const [user] = useAuthState(auth)
  const router = useRouter()
  const { redirect } = router.query

  const [groupStateValue, setGroupStateValue] = useRecoilState(groupState)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const onJoiningOrLeavingGroup = (
    groupData: group,
    hasJoinedGroup: boolean
  ) => {
    if (!user) {
      return router.push(`/signin`)
    }

    setLoading(true)
    if (hasJoinedGroup) {
      leaveGroup(groupData.id)
      return
    } else {
      joinGroup(groupData)
    }
  }

  const joinGroup = async (groupData: group) => {
    setLoading(true)
    try {
      const batch = writeBatch(dataBase)

      const newSnippet: groupSnippet = {
        groupId: groupData.id,
        imageUrl: groupData.imageUrl || '',
      }

      batch.set(
        doc(dataBase, `users/${user?.uid}/groupSnippets`, groupData.id),
        newSnippet
      )

      batch.update(doc(dataBase, 'groups', groupData.id), {
        members: increment(1),
      })

      await batch.commit()

      setGroupStateValue((prev) => ({
        ...prev,
        mySnippets: [...prev.mySnippets, newSnippet],
      }))
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  const leaveGroup = async (groupId: string) => {
    setLoading(true)
    try {
      const batch = writeBatch(dataBase)

      batch.delete(doc(dataBase, `users/${user?.uid}/groupSnippets`, groupId))

      batch.update(doc(dataBase, 'groups', groupId), {
        members: increment(-1),
      })

      await batch.commit()

      setGroupStateValue((prev) => ({
        ...prev,
        mySnippets: prev.mySnippets.filter(
          (group) => group.groupId !== groupId
        ),
      }))
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  const getMySnippets = async () => {
    setLoading(true)
    try {
      const snippetDocs = await getDocs(
        collection(dataBase, `users/${user?.uid}/groupSnippets`)
      )

      const snippets = snippetDocs.docs.map((doc) => ({ ...doc.data() }))
      setGroupStateValue((prev) => ({
        ...prev,
        mySnippets: snippets as Array<groupSnippet>,
      }))
    } catch (error) {
      console.log(error)
    }

    setLoading(false)
  }

  useEffect(() => {
    if (!user) return
    getMySnippets()
  }, [user])

  return { groupStateValue, onJoiningOrLeavingGroup, loading }
}
export default useGroupData
