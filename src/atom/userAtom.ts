import { atom } from 'recoil'

export interface User {
  open: boolean
}

const defaultUserState: User = {
  open: false,
}

export const userState = atom<User>({
  key: 'userState',
  default: defaultUserState,
})
