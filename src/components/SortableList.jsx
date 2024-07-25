import React, { useMemo, useState } from "react";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates
} from "@dnd-kit/sortable";

import "../SortableList.css";

import { SortableItem } from "../components/SortableItem";
import { SortableOverlay } from "./SortableOverlay";

export function SortableList({
  items,
  onChange,
}) {
  const [active, setActive] = useState(null);
  const activeItem = useMemo(
    () => items.find((item) => item.id === active?.id),
    [active, items]
  );
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  return (
    <DndContext
      sensors={sensors}
      onDragStart={({ active }) => {
        setActive(active);
      }}
      onDragEnd={({ active, over }) => {
        if (over && active.id !== over?.id) {
          const activeIndex = items.findIndex(({ id }) => id === active.id);
          const overIndex = items.findIndex(({ id }) => id === over.id);

          onChange(arrayMove(items, activeIndex, overIndex));
        }
        setActive(null);
      }}
      onDragCancel={() => {
        setActive(null);
      }}
    >
      <SortableContext items={items}>
        <ul className="SortableList" role="application">
          {items.map((item, index) => (
            <React.Fragment key={item.id}>
              <SortableItem id={item.id} course={item} index={index} setItems={onChange} items={items} />
            </React.Fragment>
          ))}
        </ul>
      </SortableContext>
      <SortableOverlay>
        {activeItem ?
          <SortableItem id={activeItem.id} course={activeItem} />
          : null}
      </SortableOverlay>
    </DndContext>
  );
}

SortableList.Item = SortableItem;
