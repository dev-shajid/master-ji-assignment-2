import React from 'react'
import { courses } from '../data/drag'
import { RxDotsVertical, RxDragHandleDots2 } from "react-icons/rx";


export default function DragDrop() {
  return (
    <div className='rounded-lg bg-white p-8 space-y-3 flex flex-col justify-center'>
      <h4 className='text-3xl font-semibold'>Manage Bundle</h4>
      <p className='text-gray-600 font-light max-w-sm'>Change orders of the products based on priority</p>

      <div className='grid gap-3 align-middle overflow-y-auto'>
        <div className='grid gap-3 min-w-[900px]'>
          {
            courses.map((course, i) => (
              <div className='px-4 py-2 shadow-md border rounded-md flex items-center gap-6'>
                <div className='flex flex-1 items-center gap-3'>
                  <RxDragHandleDots2 className='text-gray-500 cursor-grab size-6 select-none' />
                  <img src={course.thumbnail} alt="" className='aspect-video max-w-28 w-full rounded-md object-cover bg-gray-400' />
                  <p className='flex-1'>{course.title}</p>
                </div>
                <div className='flex max-w-[220px] w-full items-center justify-between gap-3'>
                  <p className='text-sm'>{course.free ? 'Free' : `Rs. ${course.price}/-`}</p>
                  <div className='bg-[#DBFFCE] border font-light rounded-sm text-xs px-2 py-0.5 capitalize'>
                    {course.type}
                  </div>
                  <RxDotsVertical className='text-gray-500 cursor-pointer size-5' />
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
