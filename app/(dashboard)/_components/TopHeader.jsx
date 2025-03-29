import { UserButton } from '@clerk/nextjs'
import { AlignJustify } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

function TopHeader() {
  return (
    <div className=' flex p-5 border-b item-center justify-between md:justify-end'>
        <AlignJustify className='mt-auto md:hidden'/>
        <Image src='/logo.svg' width={45} height={45} alt='logo' className='md:hidden'/>
        <UserButton appearance={{elements: {
        userButtonAvatarBox: {
            width: '50px',
            height: '50px',
        },
        },
    }} />
    </div>
  )
}

export default TopHeader