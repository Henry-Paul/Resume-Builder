import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Download, Printer, Save, RotateCcw, FileText } from 'lucide-react';

// --- Initial Data (From the Image) ---
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
    },
    {
      id: 2,
      title: "Credit Card Fraud Detection",
      link: "LINK",
      dates: "September 23 - October 2023",
      points: [
        "Developed and fine-tuned a logistic regression-based machine learning model achieving an 87% accuracy rate.",
        "Minimized false positives by 16% through rigorous feature engineering and hyperparameter tuning processes.",
        "Implemented under-sampling and ensemble techniques to address class imbalance.",
        "Successfully mitigated fraudulent transactions while optimizing model efficiency by 23%."
      ]
    },
    {
      id: 3,
      title: "Heart Disease Prediction",
      link: "LINK",
      dates: "July 23 - August 2023",
      points: [
        "Orchestrated the development of a Logit model to predict heart disease, achieving an impressive accuracy rate of 91%.",
        "Spearheaded the implementation of HIPAA-compliant data encryption protocols across all healthcare solutions.",
        "Demonstrated commitment to ethical data practices while contributing to the development of data-driven solutions.",
        "Enhanced healthcare outcomes by 26% through accurate prediction of heart disease."
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
    },
    {
      id: 2,
      title: "Introduction to Data Analyst (IBM)",
      link: "CERTIFICATE",
      dates: "March 2023",
      points: [
        "Learned about the data ecosystem, including the ETL process and big data basics.",
        "Mastered data gathering, identification, and cleaning for analysis preparation."
      ]
    },
    {
      id: 3,
      title: "Foundations: Data, Data, Everywhere (Google)",
      link: "CERTIFICATE",
      dates: "March 2023",
      points: [
        "Developed a comprehensive understanding of the data life cycle and various stages involved in the data analysis.",
        "Introduced to diverse applications designed to streamline and optimize the data analysis journey."
      ]
    }
  ]
};

// --- Helper Components ---

const SectionTitle = ({ title }) => (
  <div className="w-full mb-3 mt-4">
    <h2 className="text-center font-bold uppercase tracking-wide text-gray-800 text-sm mb-1">{title}</h2>
    <div className="border-b border-gray-400 w-full"></div>
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
      <label className="text-xs font-semibold text-gray-500 uppercase">Bullet Points</label>
      {points.map((point, index) => (
        <div key={index} className="flex gap-2">
          <textarea
            value={point}
            onChange={(e) => updatePoint(index, e.target.value)}
            className="flex-1 p-2 border rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none h-16"
            placeholder="• Describe an achievement..."
          />
          <button onClick={() => removePoint(index)} className="text-red-500 hover:bg-red-50 p-1 rounded h-fit self-center">
            <Trash2 size={16} />
          </button>
        </div>
      ))}
      <button onClick={addPoint} className="text-blue-600 text-sm flex items-center gap-1 hover:underline">
        <Plus size={14} /> Add Bullet Point
      </button>
    </div>
  );
};

// --- Main Application ---

export default function ResumeApp() {
  // Load initial state from LocalStorage if available, else use default
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('resumeData');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return initialData;
      }
    }
    return initialData;
  });

  const [activeTab, setActiveTab] = useState('edit');

  // Save to LocalStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('resumeData', JSON.stringify(data));
  }, [data]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadWord = () => {
    const content = document.getElementById("resume-preview").innerHTML;
    // Basic wrapper with some default styles to make it readable in Word
    const preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Resume</title><style>body{font-family: 'Arial', sans-serif; font-size: 11pt;} h1{font-size: 16pt; text-transform: uppercase;} h2{font-size: 11pt; text-transform: uppercase; border-bottom: 1px solid #000;}</style></head><body>";
    const postHtml = "</body></html>";
    const html = preHtml + content + postHtml;

    const url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);
    const filename = 'resume.doc';
    const downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);
    
    if(navigator.msSaveOrOpenBlob ){
        navigator.msSaveOrOpenBlob(new Blob(['\ufeff', html], { type: 'application/msword'}), filename);
    } else {
        downloadLink.href = url;
        downloadLink.download = filename;
        downloadLink.click();
    }
    document.body.removeChild(downloadLink);
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to reset all data to the template default? This cannot be undone.")) {
      setData(initialData);
      localStorage.removeItem('resumeData');
    }
  };

  const updateNestedState = (section, index, field, value) => {
    const newData = { ...data };
    newData[section][index][field] = value;
    setData(newData);
  };

  const updateState = (section, field, value) => {
    const newData = { ...data };
    newData[section][field] = value;
    setData(newData);
  };

  const addItem = (section, template) => {
    setData({
      ...data,
      [section]: [...data[section], { ...template, id: Date.now() }]
    });
  };

  const removeItem = (section, id) => {
    setData({
      ...data,
      [section]: data[section].filter(item => item.id !== id)
    });
  };

  // --- Editor Form Components ---

  const EditorSection = ({ title, children }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        {title}
      </h3>
      {children}
    </div>
  );

  const InputGroup = ({ label, value, onChange, placeholder, type = "text", className = "" }) => (
    <div className={`flex flex-col ${className}`}>
      <label className="text-xs font-semibold text-gray-500 uppercase mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none text-sm"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-900 print:bg-white print:p-0">
      
      {/* Navbar - Hidden on Print */}
      <nav className="bg-slate-900 text-white p-4 sticky top-0 z-50 shadow-md print:hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
          <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-start">
            <h1 className="text-xl font-bold tracking-tight">Resume<span className="text-blue-400">Builder</span></h1>
            <span className="text-xs bg-green-600 px-2 py-0.5 rounded ml-2">Auto-Save On</span>
             {/* Mobile Reset Button */}
             <button 
              onClick={handleReset}
              className="md:hidden px-2 py-1 rounded text-xs bg-red-800 hover:bg-red-700 flex items-center gap-1"
            >
              <RotateCcw size={12} /> Reset
            </button>
          </div>
          
          <div className="flex flex-wrap gap-2 justify-center md:justify-end w-full md:w-auto">
             <button 
              onClick={handleReset}
              className="hidden md:flex px-3 py-1.5 rounded text-sm bg-red-800 hover:bg-red-700 items-center gap-1"
            >
              <RotateCcw size={14} /> Reset
            </button>
            <button 
              onClick={() => setActiveTab('edit')}
              className={`md:hidden px-4 py-2 rounded text-sm ${activeTab === 'edit' ? 'bg-blue-600' : 'bg-slate-800'}`}
            >
              Edit
            </button>
            <button 
              onClick={() => setActiveTab('preview')}
              className={`md:hidden px-4 py-2 rounded text-sm ${activeTab === 'preview' ? 'bg-blue-600' : 'bg-slate-800'}`}
            >
              Preview
            </button>

            {/* Desktop & Mobile Actions */}
             <button 
              onClick={handleDownloadWord} 
              className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
              title="Download editable Word file"
            >
              <FileText size={16} /> <span>Word</span>
            </button>

            <button 
              onClick={handlePrint} 
              className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
            >
              <Download size={16} /> <span>PDF</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-[1600px] mx-auto p-4 md:p-8 flex flex-col md:flex-row gap-8">
        
        {/* --- LEFT: EDITOR --- */}
        <div className={`w-full md:w-1/2 lg:w-5/12 xl:w-1/3 flex-shrink-0 space-y-6 ${activeTab === 'preview' ? 'hidden md:block' : 'block'} print:hidden`}>
          
          <EditorSection title="Personal Info">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputGroup label="Full Name" value={data.personalInfo.name} onChange={(v) => updateState('personalInfo', 'name', v)} />
              <InputGroup label="Mobile" value={data.personalInfo.mobile} onChange={(v) => updateState('personalInfo', 'mobile', v)} />
              <InputGroup label="Email" value={data.personalInfo.email} onChange={(v) => updateState('personalInfo', 'email', v)} className="sm:col-span-2" />
              <InputGroup label="LinkedIn" value={data.personalInfo.linkedin} onChange={(v) => updateState('personalInfo', 'linkedin', v)} />
              <InputGroup label="GitHub / Behance" value={data.personalInfo.github} onChange={(v) => updateState('personalInfo', 'github', v)} />
            </div>
          </EditorSection>

          <EditorSection title="Skills Summary">
            <div className="space-y-4">
              <InputGroup label="Languages" value={data.skills.languages} onChange={(v) => updateState('skills', 'languages', v)} />
              <InputGroup label="Frameworks" value={data.skills.frameworks} onChange={(v) => updateState('skills', 'frameworks', v)} />
              <InputGroup label="Tools" value={data.skills.tools} onChange={(v) => updateState('skills', 'tools', v)} />
              <InputGroup label="Platforms" value={data.skills.platforms} onChange={(v) => updateState('skills', 'platforms', v)} />
              <div className="flex flex-col">
                <label className="text-xs font-semibold text-gray-500 uppercase mb-1">Soft Skills</label>
                <textarea 
                  value={data.skills.softSkills} 
                  onChange={(e) => updateState('skills', 'softSkills', e.target.value)} 
                  className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none text-sm resize-none h-20"
                />
              </div>
            </div>
          </EditorSection>

          <EditorSection title="Education">
            <div className="space-y-6">
              {data.education.map((edu, index) => (
                <div key={edu.id} className="p-4 bg-gray-50 rounded border border-gray-200 relative group">
                  <button onClick={() => removeItem('education', edu.id)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Trash2 size={16} />
                  </button>
                  <div className="grid gap-3">
                    <InputGroup label="Institution" value={edu.institution} onChange={(v) => updateNestedState('education', index, 'institution', v)} />
                    <InputGroup label="Degree / GPA" value={edu.degree} onChange={(v) => updateNestedState('education', index, 'degree', v)} />
                    <div className="grid grid-cols-2 gap-3">
                      <InputGroup label="Location" value={edu.location} onChange={(v) => updateNestedState('education', index, 'location', v)} />
                      <InputGroup label="Dates" value={edu.dates} onChange={(v) => updateNestedState('education', index, 'dates', v)} />
                    </div>
                  </div>
                </div>
              ))}
              <button 
                onClick={() => addItem('education', { institution: "", degree: "", location: "", dates: "" })}
                className="w-full py-2 border-2 border-dashed border-gray-300 text-gray-500 rounded-lg hover:border-blue-500 hover:text-blue-500 transition-colors flex justify-center items-center gap-2 text-sm font-medium"
              >
                <Plus size={16} /> Add Education
              </button>
            </div>
          </EditorSection>

          <EditorSection title="Work Experience">
            <div className="space-y-6">
              {data.experience.map((exp, index) => (
                <div key={exp.id} className="p-4 bg-gray-50 rounded border border-gray-200 relative group">
                  <button onClick={() => removeItem('experience', exp.id)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Trash2 size={16} />
                  </button>
                  <div className="grid gap-3 mb-4">
                    <InputGroup label="Role" value={exp.role} onChange={(v) => updateNestedState('experience', index, 'role', v)} />
                    <InputGroup label="Company" value={exp.company} onChange={(v) => updateNestedState('experience', index, 'company', v)} />
                    <div className="grid grid-cols-2 gap-3">
                       <InputGroup label="Link Text" value={exp.link} onChange={(v) => updateNestedState('experience', index, 'link', v)} />
                       <InputGroup label="Dates" value={exp.dates} onChange={(v) => updateNestedState('experience', index, 'dates', v)} />
                    </div>
                  </div>
                  <BulletInput points={exp.points} onChange={(newPoints) => updateNestedState('experience', index, 'points', newPoints)} />
                </div>
              ))}
              <button 
                onClick={() => addItem('experience', { role: "Role", company: "Company", link: "LINK", dates: "Dates", points: [""] })}
                className="w-full py-2 border-2 border-dashed border-gray-300 text-gray-500 rounded-lg hover:border-blue-500 hover:text-blue-500 transition-colors flex justify-center items-center gap-2 text-sm font-medium"
              >
                <Plus size={16} /> Add Experience
              </button>
            </div>
          </EditorSection>

          <EditorSection title="Projects">
            <div className="space-y-6">
              {data.projects.map((proj, index) => (
                <div key={proj.id} className="p-4 bg-gray-50 rounded border border-gray-200 relative group">
                  <button onClick={() => removeItem('projects', proj.id)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Trash2 size={16} />
                  </button>
                  <div className="grid gap-3 mb-4">
                    <InputGroup label="Project Title" value={proj.title} onChange={(v) => updateNestedState('projects', index, 'title', v)} />
                    <div className="grid grid-cols-2 gap-3">
                       <InputGroup label="Link Text" value={proj.link} onChange={(v) => updateNestedState('projects', index, 'link', v)} />
                       <InputGroup label="Dates" value={proj.dates} onChange={(v) => updateNestedState('projects', index, 'dates', v)} />
                    </div>
                  </div>
                  <BulletInput points={proj.points} onChange={(newPoints) => updateNestedState('projects', index, 'points', newPoints)} />
                </div>
              ))}
              <button 
                onClick={() => addItem('projects', { title: "Title", link: "LINK", dates: "Dates", points: [""] })}
                className="w-full py-2 border-2 border-dashed border-gray-300 text-gray-500 rounded-lg hover:border-blue-500 hover:text-blue-500 transition-colors flex justify-center items-center gap-2 text-sm font-medium"
              >
                <Plus size={16} /> Add Project
              </button>
            </div>
          </EditorSection>

          <EditorSection title="Certificates">
            <div className="space-y-6">
              {data.certificates.map((cert, index) => (
                <div key={cert.id} className="p-4 bg-gray-50 rounded border border-gray-200 relative group">
                  <button onClick={() => removeItem('certificates', cert.id)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Trash2 size={16} />
                  </button>
                  <div className="grid gap-3 mb-4">
                    <InputGroup label="Certificate Name" value={cert.title} onChange={(v) => updateNestedState('certificates', index, 'title', v)} />
                     <div className="grid grid-cols-2 gap-3">
                       <InputGroup label="Link Text" value={cert.link} onChange={(v) => updateNestedState('certificates', index, 'link', v)} />
                       <InputGroup label="Dates" value={cert.dates} onChange={(v) => updateNestedState('certificates', index, 'dates', v)} />
                    </div>
                  </div>
                  <BulletInput points={cert.points} onChange={(newPoints) => updateNestedState('certificates', index, 'points', newPoints)} />
                </div>
              ))}
              <button 
                onClick={() => addItem('certificates', { title: "Certificate Name", link: "CERTIFICATE", dates: "Date", points: [""] })}
                className="w-full py-2 border-2 border-dashed border-gray-300 text-gray-500 rounded-lg hover:border-blue-500 hover:text-blue-500 transition-colors flex justify-center items-center gap-2 text-sm font-medium"
              >
                <Plus size={16} /> Add Certificate
              </button>
            </div>
          </EditorSection>

        </div>

        {/* --- RIGHT: PREVIEW --- */}
        <div className={`flex-1 ${activeTab === 'edit' ? 'hidden md:block' : 'block'} relative`}>
          <div className="sticky top-24">
             <div className="mb-4 text-center text-sm text-gray-500 md:hidden">
                Tap 'Edit' above to change details.
             </div>

            {/* Resume Container (A4 Aspect Ratio approx) */}
            <div className="bg-white shadow-2xl mx-auto print:shadow-none print:w-full print:max-w-none w-full max-w-[210mm] min-h-[297mm] p-[10mm] md:p-[15mm] text-gray-900 leading-normal" id="resume-preview">
              
              <style>{`
                @media print {
                  @page { margin: 0.5cm; size: auto; }
                  body { -webkit-print-color-adjust: exact; }
                  #resume-preview { width: 100% !important; padding: 0 !important; margin: 0 !important; box-shadow: none !important; }
                  /* Hide browser defaults if possible */
                }
                .resume-content p, .resume-content li { font-size: 10.5pt; }
                .resume-content h1 { font-size: 16pt; }
                .resume-content h2 { font-size: 11pt; }
                .resume-content h3 { font-size: 10.5pt; }
              `}</style>
              
              <div className="resume-content font-sans">
                
                {/* Header */}
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h1 className="font-bold text-2xl uppercase tracking-wide mb-1">{data.personalInfo.name}</h1>
                    <div className="text-sm text-gray-700 space-y-0.5">
                      <p>Linkedin: <span className="text-gray-900">{data.personalInfo.linkedin}</span></p>
                      <p>GitHub/ Behance: <span className="text-gray-900">{data.personalInfo.github}</span></p>
                    </div>
                  </div>
                  <div className="text-right text-sm text-gray-700 space-y-0.5 mt-1">
                     <p>Email:</p>
                     <p className="text-gray-900 font-medium">{data.personalInfo.email}</p>
                     <p className="mt-1">Mobile: <span className="text-gray-900 font-medium ml-2">{data.personalInfo.mobile}</span></p>
                  </div>
                </div>

                <hr className="border-t-2 border-gray-800 my-2" />

                {/* Education */}
                {data.education.length > 0 && (
                  <section>
                    <SectionTitle title="EDUCATION" />
                    <div className="space-y-2">
                      {data.education.map((edu) => (
                        <div key={edu.id}>
                          <div className="flex justify-between font-bold text-[10.5pt]">
                            <span>{edu.institution}</span>
                            <span className="font-normal">{edu.location}</span>
                          </div>
                          <div className="flex justify-between text-[10.5pt]">
                            <span className="italic">{edu.degree}</span>
                            <span className="font-bold">{edu.dates}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Skills */}
                <section>
                   <SectionTitle title="SKILLS SUMMARY" />
                   <div className="text-[10.5pt] space-y-1">
                      {data.skills.languages && (
                        <div className="flex"><span className="font-bold w-32 flex-shrink-0">• Languages:</span> <span>{data.skills.languages}</span></div>
                      )}
                      {data.skills.frameworks && (
                        <div className="flex"><span className="font-bold w-32 flex-shrink-0">• Frameworks:</span> <span>{data.skills.frameworks}</span></div>
                      )}
                      {data.skills.tools && (
                        <div className="flex"><span className="font-bold w-32 flex-shrink-0">• Tools:</span> <span>{data.skills.tools}</span></div>
                      )}
                      {data.skills.platforms && (
                        <div className="flex"><span className="font-bold w-32 flex-shrink-0">• Platforms:</span> <span>{data.skills.platforms}</span></div>
                      )}
                      {data.skills.softSkills && (
                        <div className="flex"><span className="font-bold w-32 flex-shrink-0">• Soft Skills:</span> <span>{data.skills.softSkills}</span></div>
                      )}
                   </div>
                </section>

                {/* Experience */}
                {data.experience.length > 0 && (
                  <section>
                    <SectionTitle title="WORK EXPERIENCE" />
                    <div className="space-y-4">
                      {data.experience.map((exp) => (
                        <div key={exp.id}>
                          <div className="flex justify-between items-baseline mb-1">
                            <div className="flex items-center gap-1">
                               <span className="font-bold uppercase text-[10.5pt]">{exp.role}</span>
                               <span className="mx-1">|</span>
                               <span className="font-bold text-[10.5pt]">{exp.company}</span>
                               <span className="mx-1">|</span>
                               <span className="text-blue-700 font-bold text-[9pt]">{exp.link}</span>
                            </div>
                            <span className="font-bold text-[10.5pt]">{exp.dates}</span>
                          </div>
                          <ul className="list-disc ml-4 space-y-0.5 text-[10.5pt]">
                             {exp.points.map((point, idx) => (
                               <li key={idx} className="pl-1 leading-snug">{point}</li>
                             ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Projects */}
                {data.projects.length > 0 && (
                  <section>
                    <SectionTitle title="PROJECTS" />
                    <div className="space-y-4">
                      {data.projects.map((proj) => (
                        <div key={proj.id}>
                          <div className="flex justify-between items-baseline mb-1">
                             <div className="flex items-center gap-1">
                               <span className="font-bold text-[10.5pt]">{proj.title}</span>
                               <span className="mx-1">|</span>
                               <span className="text-blue-700 font-bold text-[9pt]">{proj.link}</span>
                             </div>
                             <span className="font-bold text-[10.5pt]">{proj.dates}</span>
                          </div>
                          <ul className="list-disc ml-4 space-y-0.5 text-[10.5pt]">
                             {proj.points.map((point, idx) => (
                               <li key={idx} className="pl-1 leading-snug">{point}</li>
                             ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Certificates */}
                 {data.certificates.length > 0 && (
                  <section>
                    <SectionTitle title="CERTIFICATES" />
                    <div className="space-y-3">
                      {data.certificates.map((cert) => (
                        <div key={cert.id}>
                          <div className="flex justify-between items-baseline mb-1">
                             <div className="flex items-center gap-1">
                               <span className="font-bold text-[10.5pt]">{cert.title}</span>
                               <span className="mx-1">|</span>
                               <span className="text-blue-700 font-bold text-[9pt]">{cert.link}</span>
                             </div>
                             <span className="font-bold text-[10.5pt]">{cert.dates}</span>
                          </div>
                          <ul className="list-disc ml-4 space-y-0.5 text-[10.5pt]">
                             {cert.points.map((point, idx) => (
                               <li key={idx} className="pl-1 leading-snug">{point}</li>
                             ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

              </div>
            </div>
            
            <div className="mt-8 text-center print:hidden flex justify-center gap-4">
                 <button 
                  onClick={handleDownloadWord} 
                  className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-full shadow-lg transition-transform active:scale-95 flex items-center gap-2 font-medium"
                >
                  <FileText size={18} /> Download Word
                </button>
                <button 
                  onClick={handlePrint}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-full shadow-lg transition-transform active:scale-95 flex items-center gap-2 font-medium"
                >
                  <Download size={18} /> Download PDF
                </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}


