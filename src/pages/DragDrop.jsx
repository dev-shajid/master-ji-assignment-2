import React, { useState } from "react";
import { courses } from '../data/drag'

import { SortableList } from "../components/SortableList";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

export default function DragDrop() {
  const [items, setItems] = useState(courses);

  const moveToTop = (index) => {
    if (index === 0) return;
    const newItems = [...items];
    const [removed] = newItems.splice(index, 1);
    newItems.unshift(removed);
    setItems(newItems);
  }
  // functions for moving to bottom item from items
  const moveToBottom = (index) => {
    if (index === items.length - 1) return;
    const newItems = [...items];
    const [removed] = newItems.splice(index, 1);
    newItems.push(removed);
    setItems(newItems);
  }

  const removeItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  }



  return (
    <div className='rounded-lg bg-white p-8 space-y-3 flex flex-col justify-center'>
      <h4 className='text-3xl font-semibold'>Manage Bundle</h4>
      <p className='text-gray-600 font-light max-w-sm'>Change orders of the products based on priority</p>

      <div>
        <SortableList
          items={items}
          onChange={setItems}
          renderItem={(item) => (
            <SortableList.Item id={item.id}>
              {item.id}
              <SortableList.DragHandle />
            </SortableList.Item>
          )}
        />

      </div>


      <div>

      </div>

    </div>
  )
}