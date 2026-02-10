import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Download, Printer, RotateCcw, FileText } from 'lucide-react';

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
        "Collaborated with 3+ cross-functional teams to gather requirements, define project scopes, and ensure alignment.",
        "Produced 15+ comprehensive reports and presentations summarizing findings and recommendations.",
        "Conducted in-depth market research and analysis, resulting in the identification of 10+ key trends."
      ]
    }
  ],
  projects: [
    {
      id: 1,
      title: "Student Performance Prediction",
      link: "LINK",
      dates: "December 23 - February 2024",
      points: [
        "Achieved a 96% accuracy rate in forecasting student academic performance by developing and deploying a machine learning model.",
        "Managed data integrity by handling missing values and encoding categorical variables, enhancing quality by 33%.",
        "Conducted experiments with both classification and regression algorithms to identify the most suitable approach.",
        "Identified and comprehended key factors influencing academic performance through thorough analysis."
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
        "Mastered fundamental Python syntax, proficiently utilizing control flow, loops, functions, and data structures.",
        "Acquired expertise in procedural programming paradigms and associated logical concepts."
      ]
    }
  ]
};

const SectionTitle = ({ title }) => (
  <div className="w-full mb-2 mt-4">
    <h2 className="font-bold uppercase tracking-tight text-gray-900 text-[11pt] mb-0.5">{title}</h2>
    <div className="border-b-[1.5px] border-gray-800 w-full"></div>
  </div>
);

const BulletInput = ({ points, onChange }) => {
  const addPoint = () => onChange([...points, ""]);
  const removePoint = (index) => onChange(points.filter((_, i) => i !== index));
  const updatePoint = (index, value) => {
    const newPoints = [...points];
    newPoints[index] = value;
    onChange(newPoints);
  };

  return (
    <div className="space-y-2 mt-2">
      <label className="text-[10px] font-bold text-gray-500 uppercase">Bullet Points</label>
      {points.map((point, index) => (
        <div key={index} className="flex gap-2">
          <textarea
            value={point}
            onChange={(e) => updatePoint(index, e.target.value)}
            className="flex-1 p-2 border rounded text-sm focus:ring-1 focus:ring-black outline-none resize-none h-14"
            placeholder="Describe an achievement..."
          />
          <button onClick={() => removePoint(index)} className="text-red-500 hover:bg-red-50 p-1 rounded h-fit self-center">
            <Trash2 size={14} />
          </button>
        </div>
      ))}
      <button onClick={addPoint} className="text-blue-600 text-xs flex items-center gap-1 hover:underline">
        <Plus size={12} /> Add Point
      </button>
    </div>
  );
};

export default function App() {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('resumeData_v2');
    return saved ? JSON.parse(saved) : initialData;
  });

  const [activeTab, setActiveTab] = useState('edit');

  useEffect(() => {
    localStorage.setItem('resumeData_v2', JSON.stringify(data));
  }, [data]);

  const handlePrint = () => window.print();

  const handleDownloadWord = () => {
    const content = document.getElementById("resume-preview").innerHTML;
    const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Resume</title><style>body{font-family:'Arial';font-size:10.5pt;}h1{font-size:16pt;margin:0;}h2{font-size:11pt;border-bottom:1px solid #000;margin-top:10pt;}</style></head><body>";
    const footer = "</body></html>";
    const blob = new Blob(['\ufeff', header + content + footer], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'resume.doc';
    link.click();
  };

  const updateNestedState = (section, index, field, value) => {
    const newData = { ...data };
    newData[section][index][field] = value;
    setData(newData);
  };

  const updateState = (section, field, value) => {
    setData({ ...data, [section]: { ...data[section], [field]: value } });
  };

  const addItem = (section, template) => {
    setData({ ...data, [section]: [...data[section], { ...template, id: Date.now() }] });
  };

  const removeItem = (section, id) => {
    setData({ ...data, [section]: data[section].filter(item => item.id !== id) });
  };

  const InputGroup = ({ label, value, onChange, className = "" }) => (
    <div className={`flex flex-col ${className}`}>
      <label className="text-[10px] font-bold text-gray-400 uppercase mb-0.5">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="p-1.5 border border-gray-200 rounded text-sm focus:ring-1 focus:ring-black outline-none"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans print:bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b sticky top-0 z-50 px-4 py-3 print:hidden shadow-sm">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="font-black text-xl tracking-tighter">RESUME<span className="text-blue-600">PRO</span></div>
          <div className="flex gap-2">
            <button onClick={() => setActiveTab('edit')} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${activeTab === 'edit' ? 'bg-black text-white' : 'bg-gray-100 text-gray-600'}`}>Edit</button>
            <button onClick={() => setActiveTab('preview')} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${activeTab === 'preview' ? 'bg-black text-white' : 'bg-gray-100 text-gray-600'}`}>Preview</button>
            <div className="w-[1px] bg-gray-200 mx-1"></div>
            <button onClick={handleDownloadWord} className="bg-gray-100 p-2 rounded-full text-gray-700 hover:bg-gray-200 transition-colors" title="Download Word"><FileText size={18} /></button>
            <button onClick={handlePrint} className="bg-blue-600 p-2 rounded-full text-white hover:bg-blue-700 shadow-lg shadow-blue-200 transition-colors" title="Download PDF"><Download size={18} /></button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-4 md:p-8 flex flex-col md:flex-row gap-8">
        {/* EDITOR */}
        <div className={`w-full md:w-1/2 lg:w-5/12 space-y-6 print:hidden ${activeTab === 'preview' ? 'hidden md:block' : ''}`}>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">Personal Information</h3>
            <div className="grid grid-cols-2 gap-3">
              <InputGroup label="Name" value={data.personalInfo.name} onChange={(v) => updateState('personalInfo', 'name', v)} className="col-span-2" />
              <InputGroup label="Email" value={data.personalInfo.email} onChange={(v) => updateState('personalInfo', 'email', v)} />
              <InputGroup label="Mobile" value={data.personalInfo.mobile} onChange={(v) => updateState('personalInfo', 'mobile', v)} />
              <InputGroup label="LinkedIn" value={data.personalInfo.linkedin} onChange={(v) => updateState('personalInfo', 'linkedin', v)} />
              <InputGroup label="GitHub" value={data.personalInfo.github} onChange={(v) => updateState('personalInfo', 'github', v)} />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
             <h3 className="font-bold text-gray-800 mb-4">Education</h3>
             {data.education.map((edu, idx) => (
               <div key={edu.id} className="mb-4 p-3 border rounded-lg relative">
                 <button onClick={() => removeItem('education', edu.id)} className="absolute top-2 right-2 text-gray-300 hover:text-red-500"><Trash2 size={14}/></button>
                 <InputGroup label="Institution" value={edu.institution} onChange={(v) => updateNestedState('education', idx, 'institution', v)} />
                 <InputGroup label="Degree & GPA" value={edu.degree} onChange={(v) => updateNestedState('education', idx, 'degree', v)} />
                 <div className="grid grid-cols-2 gap-2 mt-2">
                   <InputGroup label="Location" value={edu.location} onChange={(v) => updateNestedState('education', idx, 'location', v)} />
                   <InputGroup label="Dates" value={edu.dates} onChange={(v) => updateNestedState('education', idx, 'dates', v)} />
                 </div>
               </div>
             ))}
             <button onClick={() => addItem('education', { institution: "", degree: "", location: "", dates: "" })} className="w-full py-2 border-2 border-dashed border-gray-200 text-gray-400 text-sm font-medium rounded-lg hover:border-blue-500 hover:text-blue-500 transition-all">+ Add Education</button>
          </div>

          {/* Other sections follow same pattern... adding Skills for brevity */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-4">Skills</h3>
            <div className="space-y-3">
              <InputGroup label="Languages" value={data.skills.languages} onChange={(v) => setData({...data, skills: {...data.skills, languages: v}})} />
              <InputGroup label="Frameworks" value={data.skills.frameworks} onChange={(v) => setData({...data, skills: {...data.skills, frameworks: v}})} />
              <InputGroup label="Tools" value={data.skills.tools} onChange={(v) => setData({...data, skills: {...data.skills, tools: v}})} />
            </div>
          </div>
        </div>

        {/* PREVIEW */}
        <div className={`flex-1 ${activeTab === 'edit' ? 'hidden md:block' : ''}`}>
          <div className="bg-white shadow-2xl mx-auto print:shadow-none w-full max-w-[210mm] min-h-[297mm] p-[15mm] text-black" id="resume-preview">
            <style>{`
              #resume-preview { font-family: 'Arial', sans-serif; line-height: 1.4; color: #000; }
              .res-name { font-size: 16pt; font-weight: bold; margin-bottom: 4px; }
              .res-sub { font-size: 10.5pt; color: #333; }
              .res-body { font-size: 10.5pt; }
              .res-section-title { font-size: 11pt; font-weight: bold; margin-top: 12pt; margin-bottom: 2pt; border-bottom: 1.5px solid #000; text-transform: uppercase; }
              .res-item-title { font-weight: bold; font-size: 10.5pt; }
              .res-item-sub { font-style: italic; font-size: 10.5pt; }
              .res-date { font-weight: bold; font-size: 10.5pt; text-align: right; }
              .res-link { color: #1d4ed8; font-weight: bold; font-size: 9pt; }
              .res-list { margin-left: 1.2rem; list-style-type: disc; margin-top: 2px; }
              .res-list li { padding-left: 4px; margin-bottom: 1px; }
            `}</style>

            <div className="flex justify-between items-start">
              <div>
                <h1 className="res-name">{data.personalInfo.name}</h1>
                <div className="res-sub">
                  <p>Linkedin: {data.personalInfo.linkedin}</p>
                  <p>GitHub/ Behance: {data.personalInfo.github}</p>
                </div>
              </div>
              <div className="text-right res-sub">
                <p>Email: <span className="font-bold">{data.personalInfo.email}</span></p>
                <p>Mobile: <span className="font-bold">{data.personalInfo.mobile}</span></p>
              </div>
            </div>

            <SectionTitle title="EDUCATION" />
            <div className="res-body space-y-2">
              {data.education.map(edu => (
                <div key={edu.id} className="flex justify-between">
                  <div>
                    <p className="res-item-title">{edu.institution}</p>
                    <p className="res-item-sub">{edu.degree}</p>
                  </div>
                  <div className="text-right">
                    <p>{edu.location}</p>
                    <p className="font-bold">{edu.dates}</p>
                  </div>
                </div>
              ))}
            </div>

            <SectionTitle title="SKILLS SUMMARY" />
            <div className="res-body space-y-0.5">
              <p><span className="font-bold">• Languages:</span> {data.skills.languages}</p>
              <p><span className="font-bold">• Frameworks:</span> {data.skills.frameworks}</p>
              <p><span className="font-bold">• Tools:</span> {data.skills.tools}</p>
              {data.skills.platforms && <p><span className="font-bold">• Platforms:</span> {data.skills.platforms}</p>}
              <p><span className="font-bold">• Soft Skills:</span> {data.skills.softSkills}</p>
            </div>

            <SectionTitle title="WORK EXPERIENCE" />
            <div className="res-body space-y-3">
              {data.experience.map(exp => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <div className="flex gap-1">
                      <span className="font-bold uppercase">{exp.role}</span> | <span className="font-bold">{exp.company}</span> | <span className="res-link">{exp.link}</span>
                    </div>
                    <p className="res-date">{exp.dates}</p>
                  </div>
                  <ul className="res-list">
                    {exp.points.map((p, i) => <li key={i}>{p}</li>)}
                  </ul>
                </div>
              ))}
            </div>

            <SectionTitle title="PROJECTS" />
            <div className="res-body space-y-3">
              {data.projects.map(proj => (
                <div key={proj.id}>
                  <div className="flex justify-between items-baseline">
                    <div className="flex gap-1">
                      <span className="font-bold">{proj.title}</span> | <span className="res-link">{proj.link}</span>
                    </div>
                    <p className="res-date">{proj.dates}</p>
                  </div>
                  <ul className="res-list">
                    {proj.points.map((p, i) => <li key={i}>{p}</li>)}
                  </ul>
                </div>
              ))}
            </div>

            <SectionTitle title="CERTIFICATES" />
            <div className="res-body space-y-2">
              {data.certificates.map(cert => (
                <div key={cert.id}>
                  <div className="flex justify-between items-baseline">
                    <div className="flex gap-1">
                      <span className="font-bold">{cert.title}</span> | <span className="res-link">{cert.link}</span>
                    </div>
                    <p className="res-date">{cert.dates}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

