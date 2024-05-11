import clsx from 'clsx'
import type { Metadata, Viewport } from 'next'

import RootProviders from '@/components/RootProviders'
import { DEFAULT_METADATA } from '@/lib/config/defaultMetadata'
import { roboto } from '@/lib/config/fonts'
import pwaManifest from '@/public/manifest.json'
import '@/styles/globals.css'

const colorPrimary = pwaManifest.theme_color

export const metadata: Metadata = {
  title: 'TODO list. Тестовое задание от Московского Антона для ESoft <3',
  ...DEFAULT_METADATA,
}

export const viewport: Viewport = {
  themeColor: colorPrimary,
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
        <RootProviders>
          <div id="modal-root"></div>
          <div>{children}</div>
        </RootProviders>
      </body>
    </html>
  )
}
