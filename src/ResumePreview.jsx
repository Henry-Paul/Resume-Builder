
import DraggableSection from "./DraggableSection";

export default function ResumePreview({ resume }) {
  return (
    <div id="resume-preview" className="bg-white p-8 shadow-lg max-w-4xl mx-auto">
      <h1 contentEditable suppressContentEditableWarning className="text-3xl font-bold">
        {resume.header.name}
      </h1>
      <p className="text-gray-600">{resume.header.title}</p>

      <div className="grid grid-cols-3 gap-6 mt-6">
        <div className="col-span-2 space-y-6">
          {resume.sections.map(section => (
            <DraggableSection key={section.id} id={section.id}>
              <div>
                <h3 className="uppercase text-sm font-semibold">{section.title}</h3>
                <div contentEditable suppressContentEditableWarning className="mt-2">
                  {section.content}
                </div>
              </div>
            </DraggableSection>
          ))}
        </div>

        <div className="col-span-1 space-y-2 text-sm">
          <p>{resume.header.phone}</p>
          <p>{resume.header.email}</p>
          <p>{resume.header.linkedin}</p>
          <p>{resume.header.location}</p>
        </div>
      </div>
    </div>
  );
}
