import React, { useState, useEffect } from 'react';
import { 
  Plus, Trash2, Download, Printer, RotateCcw, FileText, 
  User, GraduationCap, Briefcase, Code, Award, Settings, 
  CheckCircle2, ArrowLeft, Send, Layout, MoveUp, MoveDown, PlusCircle
} from 'lucide-react';

// --- Default Structure ---
const defaultData = {
  personalInfo: {
    name: "ISHIKA RAWAT",
    email: "ishika.rawat@example.com",
    mobile: "+91 960000000",
    linkedin: "linkedin.com/in/ishika",
    github: "github.com/ishika",
  },
  sections: [
    {
      id: 'edu',
      type: 'list',
      title: 'EDUCATION',
      items: [
        { id: 1, title: 'Master of Computer Application', subtitle: 'Vellore Institute of Technology', location: 'Bhopal, India', dates: 'June 2022 - Aug 2024', points: ['GPA: 8.06'] }
      ]
    },
    {
      id: 'skills',
      type: 'skills',
      title: 'SKILLS SUMMARY',
      items: [
        { label: 'Languages', value: 'Python, SQL, JAVA' },
        { label: 'Frameworks', value: 'Pandas, Numpy, Scikit-Learn' }
      ]
    },
    {
      id: 'exp',
      type: 'list',
      title: 'WORK EXPERIENCE',
      items: [
        { id: 1, title: 'BUSINESS ANALYST INTERN', subtitle: 'WS', link: 'LINK', location: '', dates: 'Jan 24 - Mar 24', points: ['Streamlined data collection and reporting procedures.'] }
      ]
    }
  ]
};

export default function App() {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('resume_dynamic_v1');
    return saved ? JSON.parse(saved) : defaultData;
  });
  const [view, setView] = useState('form');

  useEffect(() => {
    localStorage.setItem('resume_dynamic_v1', JSON.stringify(data));
  }, [data]);

  // --- Handlers ---
  const updatePersonalInfo = (field, value) => {
    setData({ ...data, personalInfo: { ...data.personalInfo, [field]: value } });
  };

  const addSection = (type) => {
    const newSection = {
      id: Date.now().toString(),
      type: type,
      title: type === 'list' ? 'NEW SECTION' : 'NEW SKILLS SECTION',
      items: type === 'list' ? [{ id: Date.now(), title: '', subtitle: '', link: '', dates: '', points: [''] }] : [{ label: '', value: '' }]
    };
    setData({ ...data, sections: [...data.sections, newSection] });
  };

  const removeSection = (id) => {
    setData({ ...data, sections: data.sections.filter(s => s.id !== id) });
  };

  const updateSectionTitle = (id, title) => {
    setData({ ...data, sections: data.sections.map(s => s.id === id ? { ...s, title } : s) });
  };

  const addListItem = (sectionId) => {
    setData({ ...data, sections: data.sections.map(s => s.id === sectionId ? { 
      ...s, items: [...s.items, { id: Date.now(), title: '', subtitle: '', link: '', dates: '', points: [''] }] 
    } : s) });
  };

  const updateListItem = (sectionId, itemId, field, value) => {
    setData({ ...data, sections: data.sections.map(s => s.id === sectionId ? {
      ...s, items: s.items.map(item => item.id === itemId ? { ...item, [field]: value } : item)
    } : s) });
  };

  const updateListPoints = (sectionId, itemId, points) => {
    setData({ ...data, sections: data.sections.map(s => s.id === sectionId ? {
      ...s, items: s.items.map(item => item.id === itemId ? { ...item, points } : item)
    } : s) });
  };

  const handlePrint = () => window.print();

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* --- FORM VIEW --- */}
      {view === 'form' && (
        <div className="pb-20">
          <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 px-6 py-4 shadow-sm flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-black rounded flex items-center justify-center text-white font-bold">R</div>
              <h1 className="font-bold">Resume Builder</h1>
            </div>
            <button onClick={() => setView('preview')} className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg hover:bg-blue-700 flex items-center gap-2">
              Generate Resume <Send size={16} />
            </button>
          </nav>

          <div className="max-w-3xl mx-auto mt-10 p-4">
            {/* Personal Info */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 mb-8">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-800"><User size={20}/> Personal Profile</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input className="col-span-2 p-3 bg-slate-50 border rounded-xl" placeholder="Full Name" value={data.personalInfo.name} onChange={e => updatePersonalInfo('name', e.target.value)} />
                <input className="p-3 bg-slate-50 border rounded-xl" placeholder="Email" value={data.personalInfo.email} onChange={e => updatePersonalInfo('email', e.target.value)} />
                <input className="p-3 bg-slate-50 border rounded-xl" placeholder="Mobile" value={data.personalInfo.mobile} onChange={e => updatePersonalInfo('mobile', e.target.value)} />
                <input className="p-3 bg-slate-50 border rounded-xl" placeholder="LinkedIn" value={data.personalInfo.linkedin} onChange={e => updatePersonalInfo('linkedin', e.target.value)} />
                <input className="p-3 bg-slate-50 border rounded-xl" placeholder="GitHub" value={data.personalInfo.github} onChange={e => updatePersonalInfo('github', e.target.value)} />
              </div>
            </div>

            {/* Dynamic Sections */}
            {data.sections.map((section, sIdx) => (
              <div key={section.id} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 mb-8 relative group">
                <div className="flex justify-between items-center mb-6">
                   <input 
                    className="text-lg font-bold uppercase tracking-widest text-slate-800 bg-transparent border-b border-dashed border-slate-300 focus:border-blue-500 outline-none pb-1" 
                    value={section.title} 
                    onChange={e => updateSectionTitle(section.id, e.target.value)}
                  />
                  <button onClick={() => removeSection(section.id)} className="text-slate-300 hover:text-red-500 transition-colors"><Trash2 size={20}/></button>
                </div>

                {section.type === 'list' && (
                  <div className="space-y-8">
                    {section.items.map((item, iIdx) => (
                      <div key={item.id} className="p-4 bg-slate-50 rounded-xl relative border border-slate-100">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <input className="p-2 border rounded-lg bg-white" placeholder="Title (e.g. Job Role / Project Name)" value={item.title} onChange={e => updateListItem(section.id, item.id, 'title', e.target.value)} />
                          <input className="p-2 border rounded-lg bg-white" placeholder="Subtitle (e.g. Company / Institution)" value={item.subtitle} onChange={e => updateListItem(section.id, item.id, 'subtitle', e.target.value)} />
                          <input className="p-2 border rounded-lg bg-white" placeholder="Link (e.g. Certificate Link)" value={item.link} onChange={e => updateListItem(section.id, item.id, 'link', e.target.value)} />
                          <input className="p-2 border rounded-lg bg-white" placeholder="Dates (e.g. Jan 23 - Present)" value={item.dates} onChange={e => updateListItem(section.id, item.id, 'dates', e.target.value)} />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-slate-400">BULLET POINTS</label>
                          {item.points.map((p, pIdx) => (
                            <textarea 
                              key={pIdx} 
                              className="w-full p-2 text-sm border rounded-lg h-16 resize-none" 
                              value={p} 
                              onChange={e => {
                                const newPoints = [...item.points];
                                newPoints[pIdx] = e.target.value;
                                updateListPoints(section.id, item.id, newPoints);
                              }}
                            />
                          ))}
                          <button onClick={() => {
                            const newPoints = [...item.points, ""];
                            updateListPoints(section.id, item.id, newPoints);
                          }} className="text-blue-600 text-xs font-bold">+ Add Bullet</button>
                        </div>
                      </div>
                    ))}
                    <button onClick={() => addListItem(section.id)} className="w-full py-2 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 text-xs font-bold hover:bg-slate-50">+ ADD ENTRY TO {section.title}</button>
                  </div>
                )}

                {section.type === 'skills' && (
                  <div className="grid grid-cols-1 gap-4">
                    {section.items.map((item, kIdx) => (
                      <div key={kIdx} className="flex gap-2">
                        <input className="w-1/3 p-2 border rounded-lg" placeholder="Skill Label" value={item.label} onChange={e => {
                           const newItems = [...section.items];
                           newItems[kIdx].label = e.target.value;
                           setData({ ...data, sections: data.sections.map(s => s.id === section.id ? { ...s, items: newItems } : s) });
                        }} />
                        <input className="flex-1 p-2 border rounded-lg" placeholder="Skill Values" value={item.value} onChange={e => {
                           const newItems = [...section.items];
                           newItems[kIdx].value = e.target.value;
                           setData({ ...data, sections: data.sections.map(s => s.id === section.id ? { ...s, items: newItems } : s) });
                        }} />
                        <button onClick={() => {
                           const newItems = section.items.filter((_, idx) => idx !== kIdx);
                           setData({ ...data, sections: data.sections.map(s => s.id === section.id ? { ...s, items: newItems } : s) });
                        }} className="text-red-400"><Trash2 size={16}/></button>
                      </div>
                    ))}
                    <button onClick={() => {
                        const newItems = [...section.items, { label: '', value: '' }];
                        setData({ ...data, sections: data.sections.map(s => s.id === section.id ? { ...s, items: newItems } : s) });
                    }} className="text-blue-600 text-xs font-bold">+ Add Skill Row</button>
                  </div>
                )}
              </div>
            ))}

            <div className="bg-slate-900 p-6 rounded-2xl flex flex-wrap justify-center gap-4">
              <p className="w-full text-center text-slate-500 text-xs font-bold mb-2">ADD NEW PARTITION</p>
              <button onClick={() => addSection('list')} className="bg-white/10 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-white/20"><Plus size={16}/> Work / Projects / Edu</button>
              <button onClick={() => addSection('skills')} className="bg-white/10 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-white/20"><Plus size={16}/> Skills Summary</button>
            </div>
          </div>
        </div>
      )}

      {/* --- PREVIEW VIEW --- */}
      {view === 'preview' && (
        <div className="bg-slate-900 min-h-screen">
          <nav className="bg-white border-b px-6 py-4 flex justify-between items-center sticky top-0 z-50 print:hidden">
            <button onClick={() => setView('form')} className="flex items-center gap-2 font-bold text-sm text-slate-500"><ArrowLeft size={18}/> BACK TO EDIT</button>
            <button onClick={handlePrint} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold text-sm flex items-center gap-2 shadow-xl"><Download size={18}/> DOWNLOAD PDF</button>
          </nav>

          <div className="max-w-[210mm] mx-auto py-10 px-4">
            <div id="resume-preview" className="bg-white p-[15mm] shadow-2xl print:shadow-none print:p-0">
               <style>{`
                @media print { body { background: white; } .print\\:hidden { display: none; } #resume-preview { width: 100%; padding: 10mm; } @page { margin: 0; } }
                #resume-preview { font-family: 'Arial', sans-serif; color: black; line-height: 1.4; }
                .r-section-title { font-size: 11pt; font-weight: bold; border-bottom: 1.5px solid black; margin-top: 12pt; padding-bottom: 2pt; margin-bottom: 4pt; text-transform: uppercase; }
              `}</style>

              {/* Header */}
              <div className="flex justify-between items-start mb-1">
                <div>
                  <h1 className="text-[18pt] font-bold leading-none mb-1">{data.personalInfo.name}</h1>
                  <div className="text-[10.5pt] space-y-0.5">
                    <p>Linkedin: {data.personalInfo.linkedin}</p>
                    <p>GitHub/ Behance: {data.personalInfo.github}</p>
                  </div>
                </div>
                <div className="text-right text-[10.5pt]">
                  <p>Email: <span className="font-bold">{data.personalInfo.email}</span></p>
                  <p className="mt-1">Mobile: <span className="font-bold">{data.personalInfo.mobile}</span></p>
                </div>
              </div>

              <hr className="border-t-[1.5px] border-black mt-2" />

              {/* Dynamic Sections Rendering */}
              {data.sections.map(section => (
                <div key={section.id}>
                  <h2 className="r-section-title">{section.title}</h2>
                  
                  {section.type === 'list' && (
                    <div className="space-y-4">
                      {section.items.map(item => (
                        <div key={item.id} className="text-[10.5pt]">
                          <div className="flex justify-between items-baseline">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              {item.title && <span className="font-bold uppercase">{item.title}</span>}
                              {item.title && item.subtitle && <span>|</span>}
                              {item.subtitle && <span className="font-bold">{item.subtitle}</span>}
                              {item.link && <span>|</span>}
                              {item.link && <span className="text-blue-700 font-bold text-[9pt]">{item.link}</span>}
                            </div>
                            {item.dates && <span className="font-bold italic whitespace-nowrap ml-4">{item.dates}</span>}
                          </div>
                          {item.location && <p className="italic text-slate-700">{item.location}</p>}
                          <ul className="list-disc ml-5 mt-1 space-y-0.5">
                            {item.points.map((p, idx) => p && <li key={idx} className="leading-tight pl-1">{p}</li>)}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}

                  {section.type === 'skills' && (
                    <div className="text-[10.5pt] space-y-0.5 mt-1">
                      {section.items.map((item, idx) => (
                        <p key={idx}><span className="font-bold">• {item.label}:</span> {item.value}</p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

