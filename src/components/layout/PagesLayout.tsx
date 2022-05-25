import Head from 'next/head'
import React from 'react'
import Footer from '../footer/Footer'
import Header from '../header/Header'

type PagesLayoutProps = {
  title: string
  description: string
}

const PagesLayout: React.FC<PagesLayoutProps> = ({
  children,
  title,
  description,
}) => {
  return (
    <div className="">
      <Head>
        <title>{title ? `H-BLOG - ${title}` : 'H-BLOG'}</title>
        {description && <meta name="description" content={description} />}
      </Head>
      <Header />
      <main className="flex min-h-[88vh] w-screen items-center justify-center bg-body py-10 px-3 sm:px-5 md:px-12 lg:px-32">
        {children}
      </main>
      <Footer />
    </div>
  )
}
export default PagesLayout
