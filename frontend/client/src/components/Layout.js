import React from 'react'
import Navbar from 'components/Navbar'
import { Helmet } from 'react-helmet'

const Layout = ({ title, content, children }) => {
  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name='description' content={content} />
      </Helmet>
      <Navbar />
      <div className='container mt-5'>
        {children}
      </div>
    </div>
  )
}

export default Layout
