import React, { ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'This is the default title' }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
      <nav className="bg-white mx-auto max-w-7xl px-8">
        <Link href="/dashboard" className="px-6 py-4 text-sm font-medium inline-flex hover:border-b-2 hover:border-gray-600">Dashboard</Link>
      </nav>
      <hr className="inset"></hr>
    </header>
    <main className="bg-white mx-auto max-w-7xl px-8 py-4">
      {children}
    </main>
  </div>
)

export default Layout
