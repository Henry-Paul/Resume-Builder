import React, { useState, useEffect } from 'react';
import { 
  Plus, Trash2, Download, Printer, RotateCcw, FileText, 
  User, GraduationCap, Briefcase, Code, Award, Settings, 
  CheckCircle2, ArrowLeft, Send, Layout, ChevronUp, 
  ChevronDown, Palette, Type, ExternalLink, Menu, X
} from 'lucide-react';

// --- Constants ---
const ACCENT_COLORS = [
  { name: 'Classic Blue', hex: '#1d4ed8' },
  { name: 'Professional Black', hex: '#000000' },
  { name: 'Emerald Green', hex: '#059669' },
  { name: 'Ruby Red', hex: '#dc2626' },
  { name: 'Slate Gray', hex: '#475569' },
];

const initialData = {
  themeConfig: {
    accentColor: '#1d4ed8', 
    fontSize: '10.5pt',
    lineHeight: '1.4',
  },
  personalInfo: {
    name: "ISHIKA RAWAT",
    email: "ishika.rawat@example.com",
    mobile: "+91 960000000",
    linkedin: "linkedin.com/in/ishika",
    github: "github.com/ishika",
  },
  sections: [
    {
      id: 'edu_1',
      title: 'EDUCATION',
      type: 'list',
      items: [
        { id: 101, title: 'Master of Computer Application', subtitle: 'Vellore Institute of Technology', location: 'Bhopal, India', dates: 'June 2022 - Aug 2024', points: ['GPA: 8.06'] },
        { id: 102, title: 'Bachelor of Science (HONORS) - Mathematics', subtitle: 'Barasat Govt. College', location: 'Kolkata, India', dates: 'June 2018 - Aug 2021', points: ['GPA: 8.70'] }
      ]
    },
    {
      id: 'skills_1',
      title: 'SKILLS SUMMARY',
      type: 'skills',
      items: [
        { label: 'Languages', value: 'Python, SQL, JAVA' },
        { label: 'Frameworks', value: 'Pandas, Numpy, Scikit-Learn, Matplotlib' },
        { label: 'Tools', value: 'Power BI, Excel, PowerPoint, Tableau, MySQL, SQLite' },
        { label: 'Platforms', value: 'PyCharm, Jupyter Notebook, VS Code, IntelliJ IDEA' },
        { label: 'Soft Skills', value: 'Rapport Building, Strong Stakeholder management, People Management' }
      ]
    },
    {
      id: 'exp_1',
      title: 'WORK EXPERIENCE',
      type: 'list',
      items: [
        { 
          id: 201, 
          title: 'BUSINESS ANALYST INTERN', 
          subtitle: 'WS', 
          link: 'LINK', 
          location: '', 
          dates: 'Jan 24 - Mar 24', 
          points: [
            'Streamlined data collection and reporting procedures, reducing processing time by 20%.',
            'Implemented process improvements resulting in 15% increase in productivity.',
            'Collaborated with 3+ cross-functional teams to ensure project alignment.'
          ] 
        }
      ]
    }
  ]
};

// --- Helper Components ---
const PreviewSectionTitle = ({ title }) => (
  <div className="w-full mb-1 mt-4">
    <h2 className="font-bold uppercase tracking-tight text-black text-[11pt] mb-0.5">{title}</h2>
    <div className="border-b-[1.5px] border-black w-full"></div>
  </div>
);

const Field = ({ label, value, onChange, placeholder, type = "text" }) => (
  <div className="flex flex-col gap-1.5 w-full">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{label}</label>
    <input 
      type={type} 
      value={value} 
      onChange={e => onChange(e.target.value)} 
      placeholder={placeholder}
      className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
    />
  </div>
);

// --- Main App ---
export default function App() {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('resume_ishika_pro_v2');
    return saved ? JSON.parse(saved) : initialData;
  });
  const [view, setView] = useState('form');
  const [activeTab, setActiveTab] = useState('content');

  useEffect(() => {
    localStorage.setItem('resume_ishika_pro_v2', JSON.stringify(data));
  }, [data]);

  const updatePersonalInfo = (field, value) => {
    setData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, [field]: value } }));
  };

  const updateTheme = (field, value) => {
    setData(prev => ({ ...prev, themeConfig: { ...prev.themeConfig, [field]: value } }));
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
    setData(prev => ({ ...prev, sections: [...prev.sections, newSection] }));
  };

  const removeSection = (id) => {
    setData(prev => ({ ...prev, sections: prev.sections.filter(s => s.id !== id) }));
  };

  const moveSection = (index, dir) => {
    setData(prev => {
      const newSections = [...prev.sections];
      const target = dir === 'up' ? index - 1 : index + 1;
      if (target < 0 || target >= newSections.length) return prev;
      [newSections[index], newSections[target]] = [newSections[target], newSections[index]];
      return { ...prev, sections: newSections };
    });
  };

  const updateSection = (id, fields) => {
    setData(prev => ({ 
      ...prev, 
      sections: prev.sections.map(s => s.id === id ? { ...s, ...fields } : s) 
    }));
  };

  const addListItem = (sId) => {
    setData(prev => ({
      ...prev,
      sections: prev.sections.map(s => s.id === sId ? { 
        ...s, items: [...s.items, { id: Date.now(), title: '', subtitle: '', link: '', dates: '', points: [''] }] 
      } : s)
    }));
  };

  const handlePrint = () => window.print();

  const handleDownloadWord = () => {
    const content = document.getElementById("resume-preview")?.innerHTML || "";
    const header = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><style>body{font-family:'Arial';font-size:${data.themeConfig.fontSize};}</style></head><body>`;
    const footer = "</body></html>";
    const blob = new Blob(['\ufeff', header + content + footer], { type: 'application/msword' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${data.personalInfo.name.replace(/\s+/g, '_')}_Resume.doc`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900">
      
      {/* --- HEADER --- */}
      <nav className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50 px-6 py-4 flex justify-between items-center print:hidden">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white font-black text-xl">R</div>
          <h1 className="font-bold text-slate-900 hidden sm:block uppercase tracking-tight">Resume Builder <span className="text-blue-600">Pro</span></h1>
        </div>
        <div className="flex items-center gap-3">
           <button onClick={() => setView(view === 'form' ? 'preview' : 'form')} className="px-5 py-2 bg-slate-100 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-200">
             {view === 'form' ? 'Final Preview' : 'Back to Edit'}
           </button>
           {view === 'preview' && (
             <div className="flex items-center gap-2">
                <button onClick={handleDownloadWord} className="p-2.5 bg-white border rounded-xl text-slate-600 hover:bg-slate-50 transition-colors" title="Download Word"><FileText size={20}/></button>
                <button onClick={handlePrint} className="px-5 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-blue-200 hover:bg-blue-700 transition-colors">Download PDF</button>
             </div>
           )}
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-4 md:p-10">
        
        {/* --- FORM VIEW --- */}
        {view === 'form' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col md:flex-row gap-8">
            
            {/* Control Sidebar */}
            <aside className="w-full md:w-64 space-y-2">
               <button onClick={() => setActiveTab('content')} className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl font-bold text-sm transition-all ${activeTab === 'content' ? 'bg-slate-900 text-white shadow-xl' : 'bg-white text-slate-500 hover:bg-slate-50'}`}>
                 <Layout size={18}/> Content
               </button>
               <button onClick={() => setActiveTab('design')} className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl font-bold text-sm transition-all ${activeTab === 'design' ? 'bg-slate-900 text-white shadow-xl' : 'bg-white text-slate-500 hover:bg-slate-50'}`}>
                 <Palette size={18}/> Design & Theme
               </button>
            </aside>

            {/* Main Workspace */}
            <div className="flex-1 space-y-8">
              
              {activeTab === 'content' && (
                <>
                  {/* Personal */}
                  <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-200">
                    <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2"><User size={16}/> Basic Profile</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <Field label="Full Name" value={data.personalInfo.name} onChange={v => updatePersonalInfo('name', v)} />
                      <Field label="Email Address" value={data.personalInfo.email} onChange={v => updatePersonalInfo('email', v)} />
                      <Field label="Mobile Number" value={data.personalInfo.mobile} onChange={v => updatePersonalInfo('mobile', v)} />
                      <Field label="LinkedIn URL" value={data.personalInfo.linkedin} onChange={v => updatePersonalInfo('linkedin', v)} />
                      <Field label="GitHub / Portfolio" value={data.personalInfo.github} onChange={v => updatePersonalInfo('github', v)} />
                    </div>
                  </div>

                  {/* Dynamic Sections */}
                  {data.sections.map((section, sIdx) => (
                    <div key={section.id} className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-200 relative group animate-in slide-in-from-left-4">
                      
                      <div className="absolute -left-12 top-1/2 -translate-y-1/2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-all hidden lg:flex">
                        <button onClick={() => moveSection(sIdx, 'up')} className="p-2 bg-white rounded-lg shadow-sm hover:bg-slate-50 border"><ChevronUp size={16}/></button>
                        <button onClick={() => moveSection(sIdx, 'down')} className="p-2 bg-white rounded-lg shadow-sm hover:bg-slate-50 border"><ChevronDown size={16}/></button>
                      </div>

                      <div className="flex justify-between items-center mb-6">
                        <input 
                          className="text-sm font-black text-slate-900 uppercase tracking-widest bg-transparent border-b border-dashed border-slate-200 focus:border-blue-500 outline-none pb-1"
                          value={section.title}
                          onChange={e => updateSection(section.id, { title: e.target.value })}
                        />
                        <button onClick={() => removeSection(section.id)} className="text-slate-300 hover:text-red-500 transition-colors"><Trash2 size={20}/></button>
                      </div>

                      {section.type === 'list' && (
                        <div className="space-y-6">
                          {section.items.map((item, iIdx) => (
                            <div key={item.id} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4 relative">
                              <button onClick={() => {
                                const newItems = section.items.filter(it => it.id !== item.id);
                                updateSection(section.id, { items: newItems });
                              }} className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-colors"><Trash2 size={16}/></button>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Field label="Primary Title" value={item.title} onChange={v => {
                                  const items = section.items.map((it, idx) => idx === iIdx ? { ...it, title: v } : it);
                                  updateSection(section.id, { items });
                                }} placeholder="e.g. Software Engineer" />
                                <Field label="Secondary Title" value={item.subtitle} onChange={v => {
                                  const items = section.items.map((it, idx) => idx === iIdx ? { ...it, subtitle: v } : it);
                                  updateSection(section.id, { items });
                                }} placeholder="e.g. Google" />
                                <Field label="Dates" value={item.dates} onChange={v => {
                                  const items = section.items.map((it, idx) => idx === iIdx ? { ...it, dates: v } : it);
                                  updateSection(section.id, { items });
                                }} placeholder="e.g. 2022 - Present" />
                                <Field label="Link Text" value={item.link} onChange={v => {
                                  const items = section.items.map((it, idx) => idx === iIdx ? { ...it, link: v } : it);
                                  updateSection(section.id, { items });
                                }} placeholder="e.g. LINK / CERTIFICATE" />
                              </div>

                              <div className="space-y-2">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Detail Points</label>
                                {item.points.map((p, pIdx) => (
                                  <div key={pIdx} className="flex gap-2">
                                    <textarea 
                                      className="flex-1 p-3 bg-white border border-slate-200 rounded-xl text-sm h-14 resize-none"
                                      value={p}
                                      onChange={e => {
                                        const newPoints = [...item.points];
                                        newPoints[pIdx] = e.target.value;
                                        const items = section.items.map((it, idx) => idx === iIdx ? { ...it, points: newPoints } : it);
                                        updateSection(section.id, { items });
                                      }}
                                    />
                                    <button onClick={() => {
                                      const newPoints = item.points.filter((_, idx) => idx !== pIdx);
                                      const items = section.items.map((it, idx) => idx === iIdx ? { ...it, points: newPoints } : it);
                                      updateSection(section.id, { items });
                                    }} className="text-slate-300 hover:text-red-400 transition-colors"><Trash2 size={16}/></button>
                                  </div>
                                ))}
                                <button onClick={() => {
                                  const newPoints = [...item.points, ""];
                                  const items = section.items.map((it, idx) => idx === iIdx ? { ...it, points: newPoints } : it);
                                  updateSection(section.id, { items });
                                }} className="text-blue-600 text-[10px] font-black uppercase tracking-widest hover:underline transition-all">+ Add Point</button>
                              </div>
                            </div>
                          ))}
                          <button onClick={() => addListItem(section.id)} className="w-full py-3 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 font-bold text-xs uppercase hover:bg-slate-50 tracking-widest transition-all">+ Add Entry to {section.title}</button>
                        </div>
                      )}

                      {section.type === 'skills' && (
                        <div className="space-y-3">
                          {section.items.map((item, kIdx) => (
                            <div key={kIdx} className="flex gap-3">
                              <input className="w-1/3 p-3 bg-slate-50 border rounded-xl text-sm" placeholder="Label" value={item.label} onChange={e => {
                                const items = section.items.map((it, idx) => idx === kIdx ? { ...it, label: e.target.value } : it);
                                updateSection(section.id, { items });
                              }} />
                              <input className="flex-1 p-3 bg-slate-50 border rounded-xl text-sm" placeholder="Values" value={item.value} onChange={e => {
                                const items = section.items.map((it, idx) => idx === kIdx ? { ...it, value: e.target.value } : it);
                                updateSection(section.id, { items });
                              }} />
                              <button onClick={() => {
                                const items = section.items.filter((_, idx) => idx !== kIdx);
                                updateSection(section.id, { items });
                              }} className="text-slate-300 hover:text-red-400 transition-colors"><Trash2 size={16}/></button>
                            </div>
                          ))}
                          <button onClick={() => {
                            const items = [...section.items, { label: '', value: '' }];
                            updateSection(section.id, { items });
                          }} className="text-blue-600 text-[10px] font-black uppercase tracking-widest hover:underline transition-all">+ Add Skill Category</button>
                        </div>
                      )}
                    </div>
                  ))}

                  <div className="bg-slate-900 p-8 rounded-[2rem] text-center space-y-4">
                     <p className="text-slate-500 font-bold text-[10px] tracking-[0.3em]">NEW PARTITION</p>
                     <div className="flex flex-wrap justify-center gap-3">
                       <button onClick={() => addSection('list')} className="bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all"><Plus size={16}/> Experience / Projects / Education</button>
                       <button onClick={() => addSection('skills')} className="bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all"><Plus size={16}/> Skills Summary List</button>
                     </div>
                  </div>
                </>
              )}

              {activeTab === 'design' && (
                <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-200 animate-in slide-in-from-right-4">
                  <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-8 flex items-center gap-2"><Palette size={16}/> Color Grading</h2>
                  
                  <div className="grid gap-6">
                    <div>
                      <label className="text-xs font-bold text-slate-500 mb-3 block uppercase">Link & Line Accent Color</label>
                      <div className="flex flex-wrap gap-4">
                        {ACCENT_COLORS.map(color => (
                          <button 
                            key={color.hex} 
                            onClick={() => updateTheme('accentColor', color.hex)}
                            className={`w-12 h-12 rounded-full border-4 transition-all ${data.themeConfig.accentColor === color.hex ? 'border-blue-200 scale-110' : 'border-transparent'}`}
                            style={{ backgroundColor: color.hex }}
                            title={color.name}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 border-t">
                       <label className="text-xs font-bold text-slate-500 mb-2 block uppercase">Base Font Size (pt)</label>
                       <select 
                         value={data.themeConfig.fontSize}
                         onChange={e => updateTheme('fontSize', e.target.value)}
                         className="w-full p-3 bg-slate-50 border rounded-xl"
                       >
                         <option value="9pt">9pt (Compact)</option>
                         <option value="10.5pt">10.5pt (Standard)</option>
                         <option value="11pt">11pt (Readable)</option>
                       </select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* --- PREVIEW VIEW --- */}
        {view === 'preview' && (
          <div className="flex flex-col items-center py-10 animate-in zoom-in-95 duration-500">
             <div 
              id="resume-preview" 
              className="bg-white shadow-2xl w-full max-w-[210mm] min-h-[297mm] p-[15mm] text-black print:shadow-none print:m-0"
              style={{ 
                fontFamily: "'Arial', sans-serif", 
                fontSize: data.themeConfig.fontSize,
                lineHeight: data.themeConfig.lineHeight
              }}
            >
               <style>{`
                @media print { 
                  body { background: white !important; } 
                  .print\\:hidden { display: none !important; } 
                  #resume-preview { width: 100% !important; padding: 10mm !important; box-shadow: none !important; margin: 0 !important; } 
                  @page { margin: 0; size: auto; } 
                }
                #resume-preview h2 { 
                  font-size: 11pt; 
                  font-weight: bold; 
                  text-transform: uppercase; 
                  border-bottom: 1.5px solid black; 
                  margin-top: 12pt; 
                  margin-bottom: 4pt; 
                  padding-bottom: 1pt; 
                }
                #resume-preview .link-text { color: ${data.themeConfig.accentColor}; font-weight: bold; font-size: 9pt; }
              `}</style>

              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h1 className="text-[18pt] font-bold uppercase leading-none mb-1 text-black">{data.personalInfo.name}</h1>
                  <div className="text-[10.5pt] text-slate-800 leading-tight space-y-0.5">
                    <p>Linkedin: {data.personalInfo.linkedin}</p>
                    <p>GitHub/ Behance: {data.personalInfo.github}</p>
                  </div>
                </div>
                <div className="text-right text-[10.5pt] text-slate-800 leading-tight">
                  <p>Email: <span className="font-bold">{data.personalInfo.email}</span></p>
                  <p className="mt-1">Mobile: <span className="font-bold">{data.personalInfo.mobile}</span></p>
                </div>
              </div>

              <hr className="border-t-[1.5px] border-black mt-2 mb-1" />

              {data.sections.map(section => (
                <div key={section.id} className="w-full">
                  <PreviewSectionTitle title={section.title} />
                  
                  {section.type === 'list' && (
                    <div className="space-y-3">
                      {section.items.map(item => (
                        <div key={item.id} className="w-full">
                          <div className="flex justify-between items-baseline w-full">
                            <div className="flex items-center gap-1.5 flex-wrap">
                               {item.title && <span className="font-bold uppercase">{item.title}</span>}
                               {item.title && item.subtitle && <span>|</span>}
                               {item.subtitle && <span className="font-bold uppercase">{item.subtitle}</span>}
                               {item.link && <span>|</span>}
                               {item.link && <span className="link-text">{item.link}</span>}
                            </div>
                            {item.dates && <span className="font-bold italic whitespace-nowrap ml-4">{item.dates}</span>}
                          </div>
                          {item.location && <p className="italic text-slate-600 -mt-0.5">{item.location}</p>}
                          <ul className="list-disc ml-5 mt-0.5 space-y-0.5">
                            {item.points.map((p, pIdx) => p && (
                              <li key={pIdx} className="pl-1 leading-snug">{p}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}

                  {section.type === 'skills' && (
                    <div className="space-y-0.5">
                      {section.items.map((item, kIdx) => (
                        <p key={kIdx} className="leading-snug">
                          <span className="font-bold">• {item.label}:</span> {item.value}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-12 mb-24 print:hidden text-center">
              <button onClick={() => setView('form')} className="flex items-center gap-2 text-slate-400 hover:text-slate-600 transition-colors font-bold text-xs mx-auto tracking-widest uppercase">
                <RotateCcw size={16}/> Back to Edit
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

