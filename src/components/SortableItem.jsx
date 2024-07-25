import React, { createContext, useMemo, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import "../SortableItem.css";
import { RxDotsVertical, RxDragHandleDots2 } from "react-icons/rx";
import { LuArrowDown, LuArrowUp } from "react-icons/lu";
import { AiOutlineDelete } from "react-icons/ai";


const SortableItemContext = createContext({
  attributes: {},
  listeners: undefined,
  ref() { }
});

export function SortableItem({ id, course, index, setItems, items}) {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition
  } = useSortable({ id });
  const context = useMemo(
    () => ({
      attributes,
      listeners,
      ref: setActivatorNodeRef
    }),
    [attributes, listeners, setActivatorNodeRef]
  );

  const [openMenu, setOpenMenu] = useState(false);

  const style = {
    opacity: isDragging ? 1 : undefined,
    transform: CSS.Translate.toString(transform),
    transition
  }

  const moveToTop = (index) => {
    setOpenMenu(false);
    if (index === 0) return;
    const newItems = [...items];
    [newItems[index-1], newItems[index]] = [newItems[index], newItems[index-1]]
    setItems(newItems);
  }
  // functions for moving to one step bottom item from items
  const moveToBottom = (index) => {
    setOpenMenu(false);
    if (index === items.length - 1) return;
    const newItems = [...items];
    [newItems[index+1], newItems[index]] = [newItems[index], newItems[index+1]]
    setItems(newItems);
  }
  
  const removeItem = (index) => {
    setOpenMenu(false);
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  }

  return (
    <SortableItemContext.Provider value={context}>
      <div className={isDragging ? 'border border-dashed border-gray-300 rounded-md' : ''}>
        <div className={`px-4 py-2 shadow-md border rounded-lg flex items-center gap-6 bg-white ${isDragging ? 'border border-dashed border-gray-300 rounded-md' : ''}`} ref={setNodeRef} style={style}>
          <div className={`flex flex-1 items-center gap-3 ${isDragging ? 'invisible' : 'visible'}`}>
            <RxDragHandleDots2 {...listeners} {...attributes} className='text-gray-500 cursor-grab size-6 select-none' />
            <img src={course.thumbnail} alt="" className='aspect-video max-w-28 w-full rounded-md object-cover bg-gray-400' />
            <p className='flex-1'>{course.title}</p>
          </div>
          <div className={`flex max-w-[220px] w-full items-center justify-between gap-3 ${isDragging ? 'invisible' : 'visible'}`}>
            <p className='text-sm max-w-[90px] w-full'>{course.free ? 'Free' : `Rs. ${course.price}/-`}</p>
            <div className='bg-[#DBFFCE] max-w-[70px] w-full text-center border font-light rounded-sm text-xs px-1 py-0.5 capitalize'>
              {course.type}
            </div>
            <div className="relative">
              <RxDotsVertical
                className='text-gray-800 cursor-pointer size-5'
                onClick={() => setOpenMenu(!openMenu)}
              />
              <div class={`z-10 bg-white rounded-md shadow w-44 space-y-1 absolute top-6 right-0 ${openMenu ? '' : 'hidden'}`}>
                <div className="flex items-center gap-2 p-1 px-3 hover:bg-gray-100 cursor-pointer" onClick={()=>moveToTop(index)}>
                  <LuArrowUp className="text-gray-700" /> <span>Move To Top</span>
                </div>
                <div className="flex items-center gap-2 p-1 px-3 hover:bg-gray-100 cursor-pointer" onClick={()=>moveToBottom(index)}>
                  <LuArrowDown className="text-gray-700" /> <span>Move To Down</span>
                </div>
                <div className="flex items-center gap-2 text-red-500 p-1 px-3 hover:bg-gray-100 cursor-pointer" onClick={()=>removeItem(index)}>
                  <AiOutlineDelete className="" /> <span>Remove</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SortableItemContext.Provider>
  );
}