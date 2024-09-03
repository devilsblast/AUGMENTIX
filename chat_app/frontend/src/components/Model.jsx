import React from 'react'

function Model({isModelOpen, setIsModelOpen, children}) {
    if(!isModelOpen) return null;
  return (
    <div className='fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 pl-96 pr-96'>
        <div className='bg-white rounded-lg shadow-lg p-6 w-full max-wmd'>
            <button className='absolute top-4 right-4 text-gray-300 text-3xl' onClick={() => setIsModelOpen(false)}>
                &times;
            </button>
            {children}
        </div>
    </div>
  )
}

export default Model