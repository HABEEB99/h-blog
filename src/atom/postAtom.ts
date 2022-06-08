import { Timestamp } from 'firebase/firestore'
import { atom } from 'recoil'

export type Post = {
  id?: string
  groupId: string
  authorId: string
  authorName: string
  postTitle: string
  postBody: string
  numberOfComments: number
  voteCounts: number
  imageUrl?: string
  groupImageUrl?: string
  createdAt: Timestamp
}

interface PostState {
  selectedPost: Post | null
  posts: Array<Post>
}

const defaultPostState: PostState = {
  selectedPost: null,
  posts: [],
}

export const postState = atom<PostState>({
  key: 'postState',
  default: defaultPostState,
})
