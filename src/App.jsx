
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import ResumePreview from "./components/ResumePreview";
import DownloadButton from "./components/DownloadButton";
import { useResume } from "./hooks/useResume";

function App() {
  const { resume, reorderSections } = useResume();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={(event) => {
          const { active, over } = event;
          if (!over || active.id === over.id) return;

          const oldIndex = resume.sections.findIndex(
            (s) => s.id === active.id
          );
          const newIndex = resume.sections.findIndex(
            (s) => s.id === over.id
          );

          const updated = [...resume.sections];
          const [moved] = updated.splice(oldIndex, 1);
          updated.splice(newIndex, 0, moved);

          reorderSections(updated);
        }}
      >
        <SortableContext
          items={resume.sections.map((s) => s.id)}
          strategy={verticalListSortingStrategy}
        >
          <ResumePreview resume={resume} />
        </SortableContext>
      </DndContext>

      <div className="mt-6 flex justify-center">
        <DownloadButton />
      </div>
    </div>
  );
}

export default App;
