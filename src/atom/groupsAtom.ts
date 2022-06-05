import { Timestamp } from 'firebase/firestore'
import { atom } from 'recoil'

export interface group {
  id: string
  createdAt?: Timestamp
  imageUrl?: string
  creatorId: string
  members: number
  groupType: 'public' | 'private' | 'restricted'
}

export interface groupSnippet {
  groupId: string
  isAdmin?: boolean
  imageUrl?: string
}

interface groupState {
  mySnippets: groupSnippet[]
}

const defaultGroupState: groupState = {
  mySnippets: [],
}

export const groupState = atom<groupState>({
  key: 'groupsState',
  default: defaultGroupState,
})
