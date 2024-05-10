'use client'

import { MobxProvider } from '@/lib/config/mobx/MobxProvider'

type Props = {
  children: React.ReactNode | React.ReactNode[]
}

export default function RootProviders({ children }: Props) {
  return <MobxProvider>{children}</MobxProvider>
}
