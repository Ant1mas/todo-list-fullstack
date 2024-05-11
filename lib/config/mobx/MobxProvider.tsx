import { observer, useLocalObservable } from 'mobx-react-lite'
import { createContext, useContext } from 'react'

import { createMobxStore } from '@/lib/config/mobx/MobxStore'

const Context: any = createContext(null)

export const MobxProvider = observer(({ children }: any) => {
  const store = useLocalObservable(() => createMobxStore())
  return <Context.Provider value={store}>{children}</Context.Provider>
})

export const useMobxStore = () => {
  const store = useContext(Context)
  if (!store) throw new Error('Use App store within provider!')
  return store
}
