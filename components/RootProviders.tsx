'use client'

type Props = {
  children: React.ReactElement | React.ReactElement[]
}

export default function RootProviders({ children }: Props) {
  return <>{children}</>
}
