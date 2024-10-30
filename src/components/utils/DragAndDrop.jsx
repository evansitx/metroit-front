import { DndContext } from "@dnd-kit/core";

import { Draggable } from "./Draggable";
import { Droppable } from "./Droppable";

const DragAndDrop = () => {
  return (
    <DndContext>
      <Draggable />
      <Droppable />
    </DndContext>
  );
};

export default DragAndDrop;
