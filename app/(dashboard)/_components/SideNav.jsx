"use client"
import { File, Shield, Upload } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'

function SideNav() {
  const menueList = [
    {
      id:1,
      name:'Upload',
      icon:Upload,
      path:'/upload'
    },
    {
      id:2,
      name:'Files',
      icon:File,
      path:'/files'
    },
    {
      id:3,
      name:'Upgrade',
      icon:Shield,
      path:'/upgrade'
    }
  ]

  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className='shadow-sm border-r h-full'>
      <div className='p-5 border-b'>
        <Image src='/logo.svg' width={50} height={50} alt='logo' ></Image>
      </div>
      <div className='flex flex-col float-left w-full'>
        {menueList.map((item,index)=>(
          <button key={item.id} className={`flex  gap-2 p-4 px-6 hover:bg-gray-700 w-full text-gray-500 ${activeIndex == index ? 'bg-blue-50, text-primary' : 'null'}`} onClick={()=>setActiveIndex(index)}>
            <item.icon/>
            <h2>
              {item.name}
            </h2>
          </button>
        ))}
      </div>
    </div>
  )
}

export default SideNav