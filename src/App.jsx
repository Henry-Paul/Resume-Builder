import React, { useState, useEffect } from 'react';
import { 
  Plus, Trash2, Download, Printer, RotateCcw, FileText, 
  User, GraduationCap, Briefcase, Code, Award, Settings, 
  CheckCircle2, ArrowLeft, Send, Sparkles, Layout, 
  ChevronUp, ChevronDown, Palette, Type, AlignLeft
} from 'lucide-react';

// --- Initial Pro Data ---
const initialData = {
  theme: 'ishika', // 'ishika' or 'minimal'
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
      title: 'EDUCATION',
      type: 'list',
      items: [
        { id: 1, title: 'Master of Computer Application', subtitle: 'Vellore Institute of Technology', location: 'Bhopal, India', dates: 'June 2022 - Aug 2024', points: ['GPA: 8.06'] }
      ]
    },
    {
      id: 'skills',
      title: 'SKILLS SUMMARY',
      type: 'skills',
      items: [
        { label: 'Languages', value: 'Python, SQL, JAVA' },
        { label: 'Frameworks', value: 'Pandas, Numpy, Scikit-Learn' }
      ]
    },
    {
      id: 'exp',
      title: 'WORK EXPERIENCE',
      type: 'list',
      items: [
        { id: 2, title: 'BUSINESS ANALYST INTERN', subtitle: 'WS', link: 'LINK', location: '', dates: 'Jan 24 - Mar 24', points: ['Streamlined data collection and reporting procedures.'] }
      ]
    }
  ]
};

export default function App() {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('resume_pro_engine_v1');
    return saved ? JSON.parse(saved) : initialData;
  });
  const [view, setView] = useState('builder'); // 'builder' or 'preview'
  const [activeTab, setActiveTab] = useState('content'); // 'content' or 'design'

  useEffect(() => {
    localStorage.setItem('resume_pro_engine_v1', JSON.stringify(data));
  }, [data]);

  // --- Logic Handlers ---
  const updatePersonal = (field, value) => {
    setData({ ...data, personalInfo: { ...data.personalInfo, [field]: value } });
  };

  const moveSection = (index, direction) => {
    const newSections = [...data.sections];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newSections.length) return;
    [newSections[index], newSections[targetIndex]] = [newSections[targetIndex], newSections[index]];
    setData({ ...data, sections: newSections });
  };

  const addSection = (type) => {
    const newSection = {
      id: Date.now().toString(),
      type: type,
      title: 'NEW SECTION',
      items: type === 'list' 
        ? [{ id: Date.now(), title: '', subtitle: '', link: '', dates: '', points: [''] }] 
        : [{ label: '', value: '' }]
    };
    setData({ ...data, sections: [...data.sections, newSection] });
  };

  const updateSection = (id, updatedFields) => {
    setData({ ...data, sections: data.sections.map(s => s.id === id ? { ...s, ...updatedFields } : s) });
  };

  const removeSection = (id) => {
    setData({ ...data, sections: data.sections.filter(s => s.id !== id) });
  };

  const handlePrint = () => window.print();

  return (
    <div className="min-h-screen bg-[#F1F5F9] font-sans text-slate-900">
      
      {/* --- BUILDER VIEW --- */}
      {view === 'builder' && (
        <div className="animate-in fade-in duration-500">
          <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 px-6 py-4 flex justify-between items-center shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white font-black">R</div>
              <h1 className="font-bold text-slate-900 hidden sm:block">Pro Resume Desk</h1>
            </div>
            
            <div className="flex gap-2">
               <button 
                onClick={() => setView('preview')}
                className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-xl shadow-blue-100 flex items-center gap-2 hover:bg-blue-700 transition-all active:scale-95"
              >
                Generate Final <Send size={16} />
              </button>
            </div>
          </nav>

          <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-8 p-6 md:p-12">
            
            {/* Sidebar Navigation */}
            <aside className="lg:w-64 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0">
               <button onClick={() => setActiveTab('content')} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${activeTab === 'content' ? 'bg-slate-900 text-white shadow-lg' : 'bg-white text-slate-500 hover:bg-slate-50'}`}>
                 <AlignLeft size={18} /> Edit Content
               </button>
               <button onClick={() => setActiveTab('design')} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${activeTab === 'design' ? 'bg-slate-900 text-white shadow-lg' : 'bg-white text-slate-500 hover:bg-slate-50'}`}>
                 <Palette size={18} /> Design & Theme
               </button>
            </aside>

            {/* Main Editor Area */}
            <div className="flex-1 max-w-2xl">
              
              {activeTab === 'content' && (
                <div className="space-y-8 animate-in slide-in-from-bottom-4">
                  
                  {/* Personal */}
                  <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                      <User size={14} /> Personal Identity
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="text-[10px] font-bold text-slate-400 ml-1">FULL NAME</label>
                        <input className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.personalInfo.name} onChange={e => updatePersonal('name', e.target.value)} />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 ml-1">EMAIL</label>
                        <input className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl" value={data.personalInfo.email} onChange={e => updatePersonal('email', e.target.value)} />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 ml-1">MOBILE</label>
                        <input className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl" value={data.personalInfo.mobile} onChange={e => updatePersonal('mobile', e.target.value)} />
                      </div>
                    </div>
                  </div>

                  {/* Dynamic Sections */}
                  {data.sections.map((section, idx) => (
                    <div key={section.id} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 relative group">
                      
                      {/* Section Controls */}
                      <div className="absolute -left-12 top-1/2 -translate-y-1/2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-all hidden lg:flex">
                        <button onClick={() => moveSection(idx, 'up')} className="p-2 bg-white rounded-lg shadow-sm hover:bg-slate-50"><ChevronUp size={16}/></button>
                        <button onClick={() => moveSection(idx, 'down')} className="p-2 bg-white rounded-lg shadow-sm hover:bg-slate-50"><ChevronDown size={16}/></button>
                      </div>

                      <div className="flex justify-between items-center mb-6">
                         <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-xs">{idx + 1}</div>
                           <input 
                            className="text-sm font-black uppercase tracking-widest text-slate-800 bg-transparent border-b border-dashed border-slate-200 focus:border-blue-500 outline-none" 
                            value={section.title} 
                            onChange={e => updateSection(section.id, { title: e.target.value })}
                          />
                         </div>
                         <button onClick={() => removeSection(section.id)} className="text-slate-300 hover:text-red-500"><Trash2 size={18}/></button>
                      </div>

                      {section.type === 'list' && (
                        <div className="space-y-6">
                          {section.items.map((item, iIdx) => (
                            <div key={item.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
                              <div className="grid grid-cols-2 gap-3">
                                <input className="p-2 border rounded-lg text-sm" placeholder="Title (e.g. Job Role)" value={item.title} onChange={e => {
                                  const items = [...section.items];
                                  items[iIdx].title = e.target.value;
                                  updateSection(section.id, { items });
                                }} />
                                <input className="p-2 border rounded-lg text-sm" placeholder="Subtitle (e.g. Company)" value={item.subtitle} onChange={e => {
                                  const items = [...section.items];
                                  items[iIdx].subtitle = e.target.value;
                                  updateSection(section.id, { items });
                                }} />
                                <input className="p-2 border rounded-lg text-sm" placeholder="Dates" value={item.dates} onChange={e => {
                                  const items = [...section.items];
                                  items[iIdx].dates = e.target.value;
                                  updateSection(section.id, { items });
                                }} />
                                <input className="p-2 border rounded-lg text-sm" placeholder="Link (Optional)" value={item.link} onChange={e => {
                                  const items = [...section.items];
                                  items[iIdx].link = e.target.value;
                                  updateSection(section.id, { items });
                                }} />
                              </div>
                              <div className="space-y-2">
                                {item.points.map((p, pIdx) => (
                                  <div key={pIdx} className="flex gap-2">
                                    <textarea className="flex-1 p-2 text-xs border rounded-lg h-12" value={p} onChange={e => {
                                      const items = [...section.items];
                                      items[iIdx].points[pIdx] = e.target.value;
                                      updateSection(section.id, { items });
                                    }} />
                                    <button onClick={() => {
                                      const items = [...section.items];
                                      items[iIdx].points = items[iIdx].points.filter((_, idx) => idx !== pIdx);
                                      updateSection(section.id, { items });
                                    }} className="text-red-300 hover:text-red-500"><Trash2 size={14}/></button>
                                  </div>
                                ))}
                                <button onClick={() => {
                                  const items = [...section.items];
                                  items[iIdx].points.push("");
                                  updateSection(section.id, { items });
                                }} className="text-blue-600 text-[10px] font-bold">+ ADD BULLET POINT</button>
                              </div>
                            </div>
                          ))}
                          <button onClick={() => {
                            const items = [...section.items, { id: Date.now(), title: '', subtitle: '', link: '', dates: '', points: [''] }];
                            updateSection(section.id, { items });
                          }} className="w-full py-3 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 font-bold text-xs">+ ADD ENTRY TO {section.title}</button>
                        </div>
                      )}

                      {section.type === 'skills' && (
                        <div className="space-y-3">
                          {section.items.map((item, kIdx) => (
                            <div key={kIdx} className="flex gap-2">
                              <input className="w-1/3 p-2 border rounded-lg text-sm" placeholder="Label" value={item.label} onChange={e => {
                                const items = [...section.items];
                                items[kIdx].label = e.target.value;
                                updateSection(section.id, { items });
                              }} />
                              <input className="flex-1 p-2 border rounded-lg text-sm" placeholder="Values" value={item.value} onChange={e => {
                                const items = [...section.items];
                                items[kIdx].value = e.target.value;
                                updateSection(section.id, { items });
                              }} />
                              <button onClick={() => {
                                const items = section.items.filter((_, idx) => idx !== kIdx);
                                updateSection(section.id, { items });
                              }}><Trash2 size={16} className="text-red-300"/></button>
                            </div>
                          ))}
                          <button onClick={() => {
                            const items = [...section.items, { label: '', value: '' }];
                            updateSection(section.id, { items });
                          }} className="text-blue-600 text-[10px] font-bold">+ ADD SKILL ROW</button>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Add Section UI */}
                  <div className="bg-slate-900 p-8 rounded-[2rem] text-center space-y-4">
                    <p className="text-slate-500 font-bold text-[10px] tracking-[0.3em]">NEW PARTITION</p>
                    <div className="flex flex-wrap justify-center gap-3">
                      <button onClick={() => addSection('list')} className="bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2"><Plus size={14}/> Experience / Projects</button>
                      <button onClick={() => addSection('skills')} className="bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2"><Plus size={14}/> Skills Grid</button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'design' && (
                <div className="animate-in slide-in-from-right-4 space-y-6">
                  <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
                    <h3 className="font-bold mb-6 flex items-center gap-2"><Palette size={20}/> Choose Theme</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <button onClick={() => setData({...data, theme: 'ishika'})} className={`p-4 border-2 rounded-2xl flex items-center justify-between text-left transition-all ${data.theme === 'ishika' ? 'border-blue-600 bg-blue-50' : 'border-slate-100 hover:border-slate-200'}`}>
                        <div>
                          <p className="font-bold">Professional (Ishika Style)</p>
                          <p className="text-xs text-slate-500">Bold lines, pipeline separators, and classic formatting.</p>
                        </div>
                        {data.theme === 'ishika' && <CheckCircle2 className="text-blue-600" />}
                      </button>
                      <button onClick={() => setData({...data, theme: 'minimal'})} className={`p-4 border-2 rounded-2xl flex items-center justify-between text-left transition-all ${data.theme === 'minimal' ? 'border-blue-600 bg-blue-50' : 'border-slate-100 hover:border-slate-200'}`}>
                        <div>
                          <p className="font-bold">Minimalist</p>
                          <p className="text-xs text-slate-500">Cleaner whitespace, no lines, focused on typography.</p>
                        </div>
                        {data.theme === 'minimal' && <CheckCircle2 className="text-blue-600" />}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* --- PREVIEW VIEW --- */}
      {view === 'preview' && (
        <div className="bg-slate-900 min-h-screen">
          <nav className="bg-white border-b px-6 py-4 flex justify-between items-center sticky top-0 z-50 print:hidden">
            <button onClick={() => setView('builder')} className="flex items-center gap-2 font-bold text-xs text-slate-500 hover:text-slate-900 tracking-widest">
              <ArrowLeft size={16}/> BACK TO BUILDER
            </button>
            <div className="flex gap-2">
              <button onClick={handlePrint} className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-xl flex items-center gap-2 hover:bg-black">
                <Download size={18}/> SAVE AS PDF
              </button>
            </div>
          </nav>

          <div className="max-w-[210mm] mx-auto py-12 px-4 flex flex-col items-center">
            
            <div id="resume-preview" className={`bg-white p-[15mm] shadow-2xl print:shadow-none print:p-0 w-full ${data.theme === 'minimal' ? 'minimal-theme' : 'ishika-theme'}`}>
               
               <style>{`
                @media print { body { background: white; } .print\\:hidden { display: none; } #resume-preview { width: 100%; padding: 10mm; } @page { margin: 0; } }
                #resume-preview { font-family: 'Arial', sans-serif; color: black; line-height: 1.4; }
                
                /* Ishika Theme Styles */
                .ishika-theme .r-section-title { font-size: 11pt; font-weight: bold; border-bottom: 1.5px solid black; margin-top: 14pt; padding-bottom: 1pt; margin-bottom: 5pt; text-transform: uppercase; }
                .ishika-theme .r-header { border-bottom: 2px solid black; padding-bottom: 8pt; margin-bottom: 2pt; }
                
                /* Minimal Theme Styles */
                .minimal-theme .r-section-title { font-size: 11pt; font-weight: 800; color: #1e293b; margin-top: 18pt; margin-bottom: 8pt; text-transform: uppercase; letter-spacing: 0.05em; }
                .minimal-theme .r-header { margin-bottom: 20pt; }
              `}</style>

              {/* Header */}
              <div className="r-header flex justify-between items-start">
                <div>
                  <h1 className="text-[20pt] font-black leading-none mb-1">{data.personalInfo.name}</h1>
                  <div className="text-[10pt] space-y-0.5 text-slate-700">
                    <p>Linkedin: {data.personalInfo.linkedin}</p>
                    <p>GitHub: {data.personalInfo.github}</p>
                  </div>
                </div>
                <div className="text-right text-[10pt] text-slate-700">
                  <p>Email: <span className="font-bold text-black">{data.personalInfo.email}</span></p>
                  <p className="mt-1">Mobile: <span className="font-bold text-black">{data.personalInfo.mobile}</span></p>
                </div>
              </div>

              {/* Render Sections */}
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
                              {item.title && item.subtitle && (data.theme === 'ishika' ? <span>|</span> : <span className="text-slate-300 text-xs">at</span>)}
                              {item.subtitle && <span className="font-bold">{item.subtitle}</span>}
                              {item.link && data.theme === 'ishika' && <span>|</span>}
                              {item.link && <span className="text-blue-700 font-bold text-[9pt]">{item.link}</span>}
                            </div>
                            {item.dates && <span className="font-bold italic whitespace-nowrap ml-4">{item.dates}</span>}
                          </div>
                          <ul className="list-disc ml-5 mt-1 space-y-0.5">
                            {item.points.map((p, idx) => p && <li key={idx} className="leading-tight pl-1">{p}</li>)}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}

                  {section.type === 'skills' && (
                    <div className="text-[10.5pt] space-y-1 mt-1">
                      {section.items.map((item, idx) => (
                        <p key={idx}><span className="font-bold">• {item.label}:</span> {item.value}</p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-10 mb-24 print:hidden text-center">
               <button onClick={() => setView('builder')} className="text-slate-400 font-bold text-xs hover:text-white transition-colors">
                 NEED TO CHANGE SOMETHING? GO BACK
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

