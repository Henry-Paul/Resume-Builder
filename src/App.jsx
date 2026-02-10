import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Download, Printer, RotateCcw, FileText, ChevronRight, User, GraduationCap, Briefcase, Code, Award, Settings } from 'lucide-react';

const initialData = {
  personalInfo: {
    name: "ISHIKA RAWAT",
    email: "ishika.rawat@example.com",
    mobile: "+91 960000000",
    linkedin: "linkedin.com/in/ishika",
    github: "github.com/ishika",
    behance: "behance.net/ishika"
  },
  education: [
    {
      id: 1,
      institution: "Vellore Institute of Technology",
      degree: "Master of Computer Application; GPA: 8.06",
      location: "Bhopal, India",
      dates: "June 2022 - August 2024"
    },
    {
      id: 2,
      institution: "Barasat Govt. College",
      degree: "Bachelor of Science (HONORS) - Mathematics; GPA: 8.70",
      location: "Kolkata, India",
      dates: "June 2018 - August 2021"
    }
  ],
  skills: {
    languages: "Python, SQL, JAVA",
    frameworks: "Pandas, Numpy, Scikit-Learn, Matplotlib",
    tools: "Power BI, Excel, PowerPoint, Tableau, MySQL, SQLite",
    platforms: "PyCharm, Jupyter Notebook, Visual Studio Code, IntelliJ IDEA",
    softSkills: "Rapport Building, Strong Stakeholder management, People Management, Excellent communication"
  },
  experience: [
    {
      id: 1,
      role: "BUSINESS ANALYST INTERN",
      company: "WS",
      link: "LINK",
      dates: "January 24 - March 24",
      points: [
        "Streamlined data collection and reporting procedures, reducing processing time by 20% enhancing efficiency.",
        "Implemented process improvements and automation solutions, resulting in 15% increase in productivity.",
        "Collaborated with 3+ cross-functional teams to gather requirements, define project scopes, and ensure alignment."
      ]
    }
  ],
  projects: [
    {
      id: 1,
      title: "Student Performance Prediction",
      link: "LINK",
      dates: "Dec 23 - Feb 2024",
      points: [
        "Achieved a 96% accuracy rate in forecasting student academic performance by developing and deploying a machine learning model.",
        "Managed data integrity by handling missing values and encoding categorical variables, enhancing quality by 33%."
      ]
    }
  ],
  certificates: [
    {
      id: 1,
      title: "Programming in Python (Meta)",
      link: "CERTIFICATE",
      dates: "March 2023",
      points: [
        "Mastered fundamental Python syntax, proficiently utilizing control flow, loops, functions, and data structures."
      ]
    }
  ]
};

// --- Atomic Components ---

const PreviewSectionTitle = ({ title }) => (
  <div className="w-full mb-1 mt-4">
    <h2 className="font-bold uppercase tracking-tight text-black text-[11pt] mb-0.5">{title}</h2>
    <div className="border-b-[1.5px] border-black w-full"></div>
  </div>
);

const Input = ({ label, value, onChange, placeholder }) => (
  <div className="flex flex-col gap-1">
    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{label}</label>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
    />
  </div>
);

export default function App() {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('resume_premium_v1');
    return saved ? JSON.parse(saved) : initialData;
  });

  const [activeTab, setActiveTab] = useState('edit');
  const [activeFormSection, setActiveFormSection] = useState('personal');

  useEffect(() => {
    localStorage.setItem('resume_premium_v1', JSON.stringify(data));
  }, [data]);

  const handlePrint = () => window.print();

  const handleDownloadWord = () => {
    const content = document.getElementById("resume-preview").innerHTML;
    const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><style>body{font-family:'Arial'; font-size:10.5pt;}</style></head><body>";
    const footer = "</body></html>";
    const blob = new Blob(['\ufeff', header + content + footer], { type: 'application/msword' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${data.personalInfo.name.replace(" ", "_")}_Resume.doc`;
    link.click();
  };

  const updateState = (section, field, value) => {
    setData({ ...data, [section]: { ...data[section], [field]: value } });
  };

  const updateNested = (section, index, field, value) => {
    const newList = [...data[section]];
    newList[index][field] = value;
    setData({ ...data, [section]: newList });
  };

  const addItem = (section, template) => {
    setData({ ...data, [section]: [...data[section], { ...template, id: Date.now() }] });
  };

  const removeItem = (section, id) => {
    setData({ ...data, [section]: data[section].filter(item => item.id !== id) });
  };

  const addPoint = (section, index) => {
    const newList = [...data[section]];
    newList[index].points.push("");
    setData({ ...data, [section]: newList });
  };

  const updatePoint = (section, itemIdx, pointIdx, value) => {
    const newList = [...data[section]];
    newList[itemIdx].points[pointIdx] = value;
    setData({ ...data, [section]: newList });
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      
      {/* Header Navigation */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-50 print:hidden">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white font-black text-xl">R</div>
          <div>
            <h1 className="font-bold text-slate-900 leading-none">Professional Resume</h1>
            <p className="text-xs text-slate-500 mt-1">Status: <span className="text-green-600 font-medium">Draft Auto-Saved</span></p>
          </div>
        </div>

        <div className="flex items-center gap-2">
           <button 
            onClick={() => setActiveTab(activeTab === 'edit' ? 'preview' : 'edit')}
            className="md:hidden px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-semibold"
          >
            {activeTab === 'edit' ? 'See Preview' : 'Back to Edit'}
          </button>
          
          <div className="hidden md:flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
             <button onClick={() => setActiveTab('edit')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'edit' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>Editor</button>
             <button onClick={() => setActiveTab('preview')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'preview' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>Full Preview</button>
          </div>

          <div className="h-6 w-[1px] bg-slate-200 mx-2 hidden md:block"></div>

          <button onClick={handleDownloadWord} className="p-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-all flex items-center gap-2 font-semibold text-sm">
            <FileText size={18} /> <span className="hidden sm:inline">Word</span>
          </button>
          <button onClick={handlePrint} className="p-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all flex items-center gap-2 font-semibold text-sm shadow-lg shadow-blue-200">
            <Download size={18} /> <span className="hidden sm:inline">Download PDF</span>
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col md:flex-row h-[calc(100vh-73px)] overflow-hidden">
        
        {/* LEFT: FORM SIDEBAR */}
        <section className={`w-full md:w-[450px] bg-white border-r border-slate-200 flex flex-col print:hidden ${activeTab === 'preview' ? 'hidden md:flex' : 'flex'}`}>
          
          {/* Section Selector */}
          <div className="flex overflow-x-auto border-b border-slate-100 no-scrollbar">
            {[
              { id: 'personal', icon: User, label: 'Profile' },
              { id: 'edu', icon: GraduationCap, label: 'Edu' },
              { id: 'skills', icon: Settings, label: 'Skills' },
              { id: 'exp', icon: Briefcase, label: 'Work' },
              { id: 'proj', icon: Code, label: 'Projects' }
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveFormSection(tab.id)}
                className={`flex-1 flex flex-col items-center gap-1 py-3 px-2 min-w-[70px] border-b-2 transition-all ${activeFormSection === tab.id ? 'border-blue-600 bg-blue-50/50 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
              >
                <tab.icon size={18} />
                <span className="text-[10px] font-bold uppercase tracking-wider">{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            
            {activeFormSection === 'personal' && (
              <div className="animate-in fade-in slide-in-from-left-2 duration-300">
                <h3 className="text-lg font-bold text-slate-800 mb-6">Personal Details</h3>
                <div className="grid gap-5">
                  <Input label="Full Name" value={data.personalInfo.name} onChange={(v) => updateState('personalInfo', 'name', v)} />
                  <div className="grid grid-cols-2 gap-4">
                    <Input label="Email Address" value={data.personalInfo.email} onChange={(v) => updateState('personalInfo', 'email', v)} />
                    <Input label="Mobile Number" value={data.personalInfo.mobile} onChange={(v) => updateState('personalInfo', 'mobile', v)} />
                  </div>
                  <Input label="LinkedIn URL" value={data.personalInfo.linkedin} onChange={(v) => updateState('personalInfo', 'linkedin', v)} />
                  <Input label="GitHub / Portfolio" value={data.personalInfo.github} onChange={(v) => updateState('personalInfo', 'github', v)} />
                </div>
              </div>
            )}

            {activeFormSection === 'edu' && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-slate-800">Education History</h3>
                {data.education.map((edu, idx) => (
                  <div key={edu.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl relative">
                    <button onClick={() => removeItem('education', edu.id)} className="absolute -top-2 -right-2 bg-white border border-slate-200 p-1.5 rounded-full text-red-500 shadow-sm hover:bg-red-50"><Trash2 size={14}/></button>
                    <div className="grid gap-3">
                      <Input label="Institution" value={edu.institution} onChange={(v) => updateNested('education', idx, 'institution', v)} />
                      <Input label="Degree & Grade" value={edu.degree} onChange={(v) => updateNested('education', idx, 'degree', v)} />
                      <div className="grid grid-cols-2 gap-3">
                         <Input label="Location" value={edu.location} onChange={(v) => updateNested('education', idx, 'location', v)} />
                         <Input label="Dates" value={edu.dates} onChange={(v) => updateNested('education', idx, 'dates', v)} />
                      </div>
                    </div>
                  </div>
                ))}
                <button onClick={() => addItem('education', { institution: "", degree: "", location: "", dates: "" })} className="w-full py-3 border-2 border-dashed border-slate-200 text-slate-400 font-bold text-xs rounded-xl hover:border-blue-400 hover:text-blue-500 transition-all">+ ADD EDUCATION</button>
              </div>
            )}

            {activeFormSection === 'exp' && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-slate-800">Work Experience</h3>
                {data.experience.map((exp, idx) => (
                  <div key={exp.id} className="p-5 bg-slate-50 border border-slate-200 rounded-xl relative space-y-4">
                    <button onClick={() => removeItem('experience', exp.id)} className="absolute -top-2 -right-2 bg-white border border-slate-200 p-1.5 rounded-full text-red-500 shadow-sm"><Trash2 size={14}/></button>
                    <Input label="Job Role" value={exp.role} onChange={(v) => updateNested('experience', idx, 'role', v)} />
                    <Input label="Company Name" value={exp.company} onChange={(v) => updateNested('experience', idx, 'company', v)} />
                    <div className="grid grid-cols-2 gap-3">
                       <Input label="Dates" value={exp.dates} onChange={(v) => updateNested('experience', idx, 'dates', v)} />
                       <Input label="Link Text" value={exp.link} onChange={(v) => updateNested('experience', idx, 'link', v)} />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Achievements</label>
                      {exp.points.map((p, pIdx) => (
                        <div key={pIdx} className="flex gap-2 mt-2">
                          <textarea 
                            value={p} 
                            onChange={(e) => updatePoint('experience', idx, pIdx, e.target.value)}
                            className="flex-1 text-sm p-2 rounded-lg border border-slate-200 focus:ring-1 focus:ring-blue-500 outline-none h-14 resize-none"
                          />
                        </div>
                      ))}
                      <button onClick={() => addPoint('experience', idx)} className="mt-2 text-xs font-bold text-blue-600 hover:underline">+ Add Point</button>
                    </div>
                  </div>
                ))}
                <button onClick={() => addItem('experience', { role: "", company: "", link: "LINK", dates: "", points: [""] })} className="w-full py-3 border-2 border-dashed border-slate-200 text-slate-400 font-bold text-xs rounded-xl">+ ADD EXPERIENCE</button>
              </div>
            )}

            {activeFormSection === 'skills' && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-slate-800">Skills & Tech</h3>
                <div className="grid gap-4">
                  <Input label="Programming Languages" value={data.skills.languages} onChange={(v) => setData({...data, skills: {...data.skills, languages: v}})} />
                  <Input label="Frameworks/Libraries" value={data.skills.frameworks} onChange={(v) => setData({...data, skills: {...data.skills, frameworks: v}})} />
                  <Input label="Tools & Databases" value={data.skills.tools} onChange={(v) => setData({...data, skills: {...data.skills, tools: v}})} />
                  <Input label="Soft Skills" value={data.skills.softSkills} onChange={(v) => setData({...data, skills: {...data.skills, softSkills: v}})} />
                </div>
              </div>
            )}

          </div>
        </section>

        {/* RIGHT: PREVIEW AREA */}
        <section className={`flex-1 overflow-y-auto bg-slate-200 py-12 px-4 flex flex-col items-center ${activeTab === 'edit' ? 'hidden md:flex' : 'flex'}`}>
          
          <div className="mb-6 flex gap-4 print:hidden">
             <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
               <RotateCcw size={12} /> Live Sync Active
             </div>
          </div>

          {/* THE PAPER PREVIEW (A4) */}
          <div 
            id="resume-preview" 
            className="bg-white shadow-2xl w-full max-w-[210mm] min-h-[297mm] p-[15mm] text-black print:shadow-none print:m-0"
            style={{ fontFamily: "'Arial', sans-serif" }}
          >
            
            {/* Header */}
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h1 className="text-[18pt] font-bold leading-none mb-1 text-black">{data.personalInfo.name}</h1>
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

            {/* Education */}
            <PreviewSectionTitle title="EDUCATION" />
            <div className="text-[10.5pt] space-y-2 mt-1">
              {data.education.map(edu => (
                <div key={edu.id} className="flex justify-between">
                  <div>
                    <p className="font-bold">{edu.institution}</p>
                    <p className="italic text-slate-900">{edu.degree}</p>
                  </div>
                  <div className="text-right">
                    <p>{edu.location}</p>
                    <p className="font-bold italic">{edu.dates}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Skills */}
            <PreviewSectionTitle title="SKILLS SUMMARY" />
            <div className="text-[10.5pt] space-y-0.5 mt-1 leading-snug">
               <p><span className="font-bold">• Languages:</span> {data.skills.languages}</p>
               <p><span className="font-bold">• Frameworks:</span> {data.skills.frameworks}</p>
               <p><span className="font-bold">• Tools:</span> {data.skills.tools}</p>
               <p><span className="font-bold">• Soft Skills:</span> {data.skills.softSkills}</p>
            </div>

            {/* Experience */}
            <PreviewSectionTitle title="WORK EXPERIENCE" />
            <div className="text-[10.5pt] space-y-4 mt-2">
              {data.experience.map(exp => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold uppercase tracking-tight">{exp.role}</span>
                      <span className="text-slate-400">|</span>
                      <span className="font-bold">{exp.company}</span>
                      <span className="text-slate-400">|</span>
                      <span className="text-blue-700 font-bold text-[9.5pt]">{exp.link}</span>
                    </div>
                    <p className="font-bold text-right italic">{exp.dates}</p>
                  </div>
                  <ul className="list-disc ml-5 mt-1 space-y-0.5">
                    {exp.points.map((p, i) => <li key={i} className="pl-1 leading-tight">{p}</li>)}
                  </ul>
                </div>
              ))}
            </div>

            {/* Projects */}
            <PreviewSectionTitle title="PROJECTS" />
            <div className="text-[10.5pt] space-y-4 mt-2">
              {data.projects.map(proj => (
                <div key={proj.id}>
                  <div className="flex justify-between items-baseline">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold tracking-tight">{proj.title}</span>
                      <span className="text-slate-400">|</span>
                      <span className="text-blue-700 font-bold text-[9.5pt]">{proj.link}</span>
                    </div>
                    <p className="font-bold text-right italic">{proj.dates}</p>
                  </div>
                  <ul className="list-disc ml-5 mt-1 space-y-0.5">
                    {proj.points.map((p, i) => <li key={i} className="pl-1 leading-tight">{p}</li>)}
                  </ul>
                </div>
              ))}
            </div>

            {/* Certificates */}
            <PreviewSectionTitle title="CERTIFICATES" />
            <div className="text-[10.5pt] space-y-2 mt-2">
              {data.certificates.map(cert => (
                <div key={cert.id} className="flex justify-between items-baseline">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold">{cert.title}</span>
                    <span className="text-slate-400">|</span>
                    <span className="text-blue-700 font-bold text-[9.5pt]">{cert.link}</span>
                  </div>
                  <p className="font-bold italic">{cert.dates}</p>
                </div>
              ))}
            </div>

          </div>
        </section>
      </main>

      {/* Global CSS for Print */}
      <style>{`
        @media print {
          body { background: white !important; padding: 0 !important; }
          .print\\:hidden { display: none !important; }
          #resume-preview { 
            width: 100% !important; 
            box-shadow: none !important; 
            margin: 0 !important; 
            padding: 10mm !important;
          }
          @page { margin: 0; }
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}

