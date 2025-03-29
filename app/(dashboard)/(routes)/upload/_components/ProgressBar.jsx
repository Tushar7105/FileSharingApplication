import React from 'react'

function ProgressBar({progress}) {
  return (
    <div className='bg-gray-300 w-full rounded-full mt-3 h-4'>
        <div className=' bg-primary rounded-full h-4 text-[10px] text-white' style={{width : `${progress}%`}}>
            {`${Number(progress).toFixed(0)}%`}
        </div>
    </div>
  )
}

export default ProgressBar