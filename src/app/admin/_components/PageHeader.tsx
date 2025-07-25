import React from 'react'

export default function PageHeader({ children } : {children : React.ReactNode}) {
  return (
    <h1 className='text-4xl mb-4'>
        {children}
    </h1>
  )
}
