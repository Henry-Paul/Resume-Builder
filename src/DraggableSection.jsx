
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function DraggableSection({ id, children }) {
  const { setNodeRef, transform, transition, attributes, listeners } =
    useSortable({ id });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        transform: CSS.Transform.toString(transform),
        transition
      }}
      className="cursor-move"
    >
      {children}
    </div>
  );
}
