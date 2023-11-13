import Link from 'next/link'
import React from 'react'

function ExhibitionButton() {
  return (
    <Link href={"/"} className=''>
        <div className="w-32 h-16 rounded-xl text-center bg-gray-900 text-white shadow-xl hover:bg-gray-800 hover:-translate-y-1 hover:-translate-x-1 transition-all">
            <p className='pt-3 text-2xl'>出品</p>
        </div>
    </Link>
  )
}

export default ExhibitionButton