import './globals.css'
import { Figtree } from 'next/font/google'

import Sidebar from '@/components/Sidebar'
import SupabaseProvider from '@/providers/SupabaseProvider'
import UserProvider from '@/providers/UserProvider'
import ModalProvider from '@/providers/ModalProvider'
import ToasterProvider from '@/providers/ToasterProvider'
import getSongsByUserId from '@/actions/getSongsByUserId'
import Player from '@/components/Player'
import { LikedSongsProvider } from '@/hooks/useLikedSongs'
import getActiveProductsWithPrices from '@/actions/getActiveProductsWithPrices'

const font = Figtree({ subsets: ['latin'] })

export const metadata = {
  title: 'Splicify',
  description: 'Listen to music',
}

export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const userSongs = await getSongsByUserId();
  const products = await getActiveProductsWithPrices();

  return (
    <html lang="en">
      <body className={font.className}>
        <LikedSongsProvider>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider products={products}/>
              <Sidebar songs={userSongs}>
                {children}
              </Sidebar>
              <Player />
          </UserProvider>
        </SupabaseProvider>
        </LikedSongsProvider>
      </body>
    </html>
  )
}
