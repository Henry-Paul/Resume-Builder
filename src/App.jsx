import React, { useState, useEffect } from 'react';
import { 
  Plus, Trash2, Download, Printer, RotateCcw, FileText, 
  User, GraduationCap, Briefcase, Code, Award, Settings, 
  CheckCircle2, ArrowLeft, Send, Sparkles, Layout
} from 'lucide-react';

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
    }
  ],
  skills: {
    languages: "Python, SQL, JAVA",
    frameworks: "Pandas, Numpy, Scikit-Learn, Matplotlib",
    tools: "Power BI, Excel, PowerPoint, Tableau, MySQL, SQLite",
    softSkills: "Rapport Building, People Management, Excellent communication"
  },
  experience: [
    {
      id: 1,
      role: "BUSINESS ANALYST INTERN",
      company: "WS",
      link: "LINK",
      dates: "January 24 - March 24",
      points: [
        "Streamlined data collection and reporting procedures, reducing processing time by 20%.",
        "Implemented process improvements and automation solutions, resulting in 15% increase in productivity."
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
        "Achieved a 96% accuracy rate in forecasting student academic performance."
      ]
    }
  ],
  certificates: [
    {
      id: 1,
      title: "Programming in Python (Meta)",
      link: "CERTIFICATE",
      dates: "March 2023",
      points: ["Mastered fundamental Python syntax and data structures."]
    }
  ]
};

// --- Modern UI Components ---

const FormCard = ({ title, icon: Icon, children }) => (
  <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden mb-8 transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
    <div className="bg-slate-50/50 px-8 py-5 border-b border-slate-100 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-white rounded-xl shadow-sm text-blue-600 border border-slate-100">
          <Icon size={20} />
        </div>
        <h3 className="font-bold text-slate-800 uppercase tracking-widest text-xs">{title}</h3>
      </div>
    </div>
    <div className="p-8">{children}</div>
  </div>
);

const Input = ({ label, value, onChange, placeholder, className = "" }) => (
  <div className={`flex flex-col gap-2 ${className}`}>
    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">{label}</label>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all placeholder:text-slate-300"
    />
  </div>
);

const PreviewSectionTitle = ({ title }) => (
  <div className="w-full mb-1 mt-4">
    <h2 className="font-bold uppercase tracking-tight text-black text-[11pt] mb-0.5">{title}</h2>
    <div className="border-b-[1.5px] border-black w-full"></div>
  </div>
);

export default function App() {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('resume_pro_v1');
    return saved ? JSON.parse(saved) : initialData;
  });

  const [view, setView] = useState('form');

  useEffect(() => {
    localStorage.setItem('resume_pro_v1', JSON.stringify(data));
  }, [data]);

  const handlePrint = () => window.print();

  const handleDownloadWord = () => {
    const content = document.getElementById("resume-preview").innerHTML;
    const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><style>body{font-family:'Arial';font-size:10.5pt;}</style></head><body>";
    const footer = "</body></html>";
    const blob = new Blob(['\ufeff', header + content + footer], { type: 'application/msword' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${data.personalInfo.name.replace(" ", "_")}_Resume.doc`;
    link.click();
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

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      
      {/* --- FORM VIEW --- */}
      {view === 'form' && (
        <div className="animate-in fade-in slide-in-from-top-4 duration-700">
          <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 px-6 py-4">
            <div className="max-w-5xl mx-auto flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-slate-800 to-black rounded-xl flex items-center justify-center text-white font-black text-xl shadow-xl shadow-slate-200">R</div>
                <div>
                  <h1 className="font-bold text-slate-900 tracking-tight leading-none">Resume Desk</h1>
                  <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mt-1">Professional Edition</p>
                </div>
              </div>
              <button 
                onClick={() => setView('resume')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-2xl font-bold text-sm shadow-xl shadow-blue-200 flex items-center gap-2 transition-all active:scale-95 group"
              >
                Generate Resume <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>
          </nav>

          <div className="max-w-4xl mx-auto p-6 md:p-16">
            <header className="mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest mb-4">
                <Sparkles size={12} /> AI-Ready Formatting
              </div>
              <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Craft your narrative.</h2>
              <p className="text-lg text-slate-500 max-w-xl leading-relaxed">Fill in your professional details below. Our engine will transform them into the industry-standard Ishika layout.</p>
            </header>

            <FormCard title="Personal Profile" icon={User}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="Full Name" value={data.personalInfo.name} onChange={(v) => setData({...data, personalInfo: {...data.personalInfo, name: v}})} className="md:col-span-2" />
                <Input label="Email Address" value={data.personalInfo.email} onChange={(v) => setData({...data, personalInfo: {...data.personalInfo, email: v}})} />
                <Input label="Mobile Number" value={data.personalInfo.mobile} onChange={(v) => setData({...data, personalInfo: {...data.personalInfo, mobile: v}})} />
                <Input label="LinkedIn Username" value={data.personalInfo.linkedin} onChange={(v) => setData({...data, personalInfo: {...data.personalInfo, linkedin: v}})} />
                <Input label="GitHub / Portfolio" value={data.personalInfo.github} onChange={(v) => setData({...data, personalInfo: {...data.personalInfo, github: v}})} />
              </div>
            </FormCard>

            <FormCard title="Education History" icon={GraduationCap}>
              {data.education.map((edu, idx) => (
                <div key={edu.id} className="mb-10 last:mb-0 p-6 bg-slate-50 border border-slate-100 rounded-3xl relative group">
                  <button onClick={() => removeItem('education', edu.id)} className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-colors"><Trash2 size={20}/></button>
                  <div className="grid gap-6">
                    <Input label="Institution" value={edu.institution} onChange={(v) => updateNested('education', idx, 'institution', v)} />
                    <Input label="Degree & Grade" value={edu.degree} onChange={(v) => updateNested('education', idx, 'degree', v)} />
                    <div className="grid grid-cols-2 gap-4">
                       <Input label="Location" value={edu.location} onChange={(v) => updateNested('education', idx, 'location', v)} />
                       <Input label="Dates" value={edu.dates} onChange={(v) => updateNested('education', idx, 'dates', v)} />
                    </div>
                  </div>
                </div>
              ))}
              <button onClick={() => addItem('education', { institution: "", degree: "", location: "", dates: "" })} className="w-full py-5 border-2 border-dashed border-slate-200 rounded-3xl text-slate-400 font-bold text-xs tracking-widest hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50/50 transition-all">+ ADD EDUCATION</button>
            </FormCard>

            <FormCard title="Technical Arsenal" icon={Settings}>
              <div className="grid gap-6">
                <Input label="Programming Languages" value={data.skills.languages} onChange={(v) => setData({...data, skills: {...data.skills, languages: v}})} />
                <Input label="Frameworks & Libraries" value={data.skills.frameworks} onChange={(v) => setData({...data, skills: {...data.skills, frameworks: v}})} />
                <Input label="Tools & Platforms" value={data.skills.tools} onChange={(v) => setData({...data, skills: {...data.skills, tools: v}})} />
                <Input label="Soft Skills" value={data.skills.softSkills} onChange={(v) => setData({...data, skills: {...data.skills, softSkills: v}})} />
              </div>
            </FormCard>

            <div className="flex justify-center mt-12 mb-32">
              <button 
                onClick={() => setView('resume')}
                className="group relative bg-slate-900 text-white px-12 py-5 rounded-2xl font-black text-xl shadow-2xl shadow-slate-300 transition-all hover:-translate-y-1 active:scale-95 overflow-hidden"
              >
                <div className="relative z-10 flex items-center gap-3">
                  Generate Final Resume <CheckCircle2 className="text-blue-400" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- RESUME PREVIEW VIEW --- */}
      {view === 'resume' && (
        <div className="animate-in zoom-in-95 duration-500 bg-slate-100 min-h-screen">
          <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 px-6 py-4 print:hidden">
            <div className="max-w-5xl mx-auto flex justify-between items-center">
              <button onClick={() => setView('form')} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-bold text-xs tracking-widest">
                <ArrowLeft size={16} /> BACK TO DESK
              </button>
              <div className="flex gap-3">
                <button onClick={handleDownloadWord} className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all">
                  <FileText size={18} /> WORD
                </button>
                <button onClick={handlePrint} className="bg-slate-900 hover:bg-black text-white px-6 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-xl shadow-slate-200 transition-all">
                  <Download size={18} /> DOWNLOAD PDF
                </button>
              </div>
            </div>
          </nav>

          <div className="max-w-[210mm] mx-auto py-12 px-4 flex flex-col items-center">
             <div className="w-full flex justify-between items-center mb-6 print:hidden">
                <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                   <Layout size={14} /> Official A4 Preview
                </div>
                <div className="h-[1px] flex-1 mx-4 bg-slate-200"></div>
                <div className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">Pixel Perfect</div>
             </div>
             
             <div 
              id="resume-preview" 
              className="bg-white shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] w-full p-[15mm] text-black print:shadow-none print:m-0"
              style={{ fontFamily: "'Arial', sans-serif" }}
            >
              <style>{`
                @media print {
                  body { background: white !important; }
                  .print\\:hidden { display: none !important; }
                  #resume-preview { width: 100% !important; padding: 10mm !important; box-shadow: none !important; margin: 0 !important; }
                  @page { margin: 0; }
                }
              `}</style>

              {/* Header */}
              <div className="flex justify-between items-start">
                <div>
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

              <PreviewSectionTitle title="EDUCATION" />
              <div className="text-[10.5pt] space-y-2 mt-1">
                {data.education.map(edu => (
                  <div key={edu.id} className="flex justify-between">
                    <div>
                      <p className="font-bold">{edu.institution}</p>
                      <p className="italic">{edu.degree}</p>
                    </div>
                    <div className="text-right">
                      <p>{edu.location}</p>
                      <p className="font-bold italic">{edu.dates}</p>
                    </div>
                  </div>
                ))}
              </div>

              <PreviewSectionTitle title="SKILLS SUMMARY" />
              <div className="text-[10.5pt] space-y-0.5 mt-1">
                 <p><span className="font-bold">• Languages:</span> {data.skills.languages}</p>
                 <p><span className="font-bold">• Frameworks:</span> {data.skills.frameworks}</p>
                 <p><span className="font-bold">• Tools:</span> {data.skills.tools}</p>
                 <p><span className="font-bold">• Soft Skills:</span> {data.skills.softSkills}</p>
              </div>

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
                      <p className="font-bold italic">{exp.dates}</p>
                    </div>
                    <ul className="list-disc ml-5 mt-1 space-y-0.5">
                      {exp.points.map((p, i) => <li key={i} className="pl-1 leading-tight">{p}</li>)}
                    </ul>
                  </div>
                ))}
              </div>

              <PreviewSectionTitle title="PROJECTS" />
              <div className="text-[10.5pt] space-y-4 mt-2">
                {data.projects.map(proj => (
                  <div key={proj.id}>
                    <div className="flex justify-between items-baseline">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold">{proj.title}</span>
                        <span className="text-slate-400">|</span>
                        <span className="text-blue-700 font-bold text-[9.5pt]">{proj.link}</span>
                      </div>
                      <p className="font-bold italic">{proj.dates}</p>
                    </div>
                    <ul className="list-disc ml-5 mt-1 space-y-0.5">
                      {proj.points.map((p, i) => <li key={i} className="pl-1 leading-tight">{p}</li>)}
                    </ul>
                  </div>
                ))}
              </div>

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
            
            <div className="mt-12 mb-24 print:hidden">
              <button onClick={() => setView('form')} className="flex items-center gap-2 text-slate-400 hover:text-slate-600 font-bold text-xs mx-auto">
                <RotateCcw size={14} /> RESET OR EDIT DETAILS
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

