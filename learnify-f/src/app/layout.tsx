import './globals.css';
import AuthProvider from '@/contexts/AuthContext'
import type { Metadata } from 'next'
import Footer from '@/components/Footer'
import Header from '@/components/Header'

export const metadata: Metadata = {
  title: 'Glamify',
  description: 'Your Beauty, Your Schedule: Effortless Salon Appointments Made Simple!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
    <html lang="en">
      <body className="bg-white">
        <AuthProvider>
          <Header></Header>
          {children}
          <Footer></Footer>
        </AuthProvider>
      </body>
    </html>
  )
}
