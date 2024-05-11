import type { Metadata } from 'next'

import { BASE_PATH } from '@/lib/constants/basePath'

export const DEFAULT_METADATA: Metadata = {
  manifest: BASE_PATH + '/manifest.json',
  icons: {
    icon: [
      {
        sizes: '32x32',
        url: BASE_PATH + '/assets/images/icons/app/favicon.ico',
      },
      {
        type: 'image/svg+xml',
        sizes: 'any',
        url: BASE_PATH + '/assets/images/icons/app/favicon.svg',
      },
    ],
    apple: [
      {
        url: BASE_PATH + '/assets/images/icons/app/apple-touch-icon.png',
      },
    ],
  },
}
