import React from 'react'

function DeleteButton() {
  return (
    <div className="">
      <button  className="w-24 h-12 rounded-xl bg-gray-900 text-white shadow-xl hover:bg-gray-700 transition-all">
        <p className="text-bold text-xl">削除</p>
      </button>
    </div>
  )
}

export default DeleteButton