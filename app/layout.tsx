import clsx from 'clsx'
import type { Metadata } from 'next'

import RootProviders from '@/components/RootProviders'
import { DEFAULT_METADATA } from '@/lib/config/defaultMetadata'
import { roboto } from '@/lib/config/fonts'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Тестовое задание от Московского Антона для ESoft <3',
  ...DEFAULT_METADATA,
}

export default function RootLayout({
  children,
  params: {},
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  return (
    <html lang="ru" className={clsx(['light', roboto.variable])}>
      <head />
      <body>
        <div id="modal-root"></div>
        <RootProviders>{children}</RootProviders>
      </body>
    </html>
  )
}
