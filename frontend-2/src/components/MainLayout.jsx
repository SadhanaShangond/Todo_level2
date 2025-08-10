import React from 'react'
import Header from './Header'
import CopyRightNotice from './CopyrightNotice'

export default function MainLayout({children}) {
  return (
    <div>
        <Header/>
        {children}
        <CopyRightNotice/>
    </div>
    
  )
}
