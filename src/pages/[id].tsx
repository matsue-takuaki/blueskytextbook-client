import Goods from '@/components/Goods'
import Navber from '@/components/Navber'
import React from 'react'

function University() {
  return (
    <div className='h-screen bg-white'>
        <Navber/>
        <main className='w-3/4 mx-auto mt-8'>
            <Goods/>
        </main>
    </div>
  )
}

export default University