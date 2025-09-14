import React from 'react';
import { ResumeData } from '../../../types';

const formatUrl = (url: string) => {
    if (!url) return url;
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    if (url.includes('@')) return `mailto:${url}`;
    return `https://${url}`;
};

const ModernTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
    const { personalInfo, summary, experience, education, skills, projects, certifications, languages } = data;

    const MainSection: React.FC<{ title: string; children: React.ReactNode; isPresent: boolean }> = ({ title, children, isPresent }) => {
        if (!isPresent) return null;
        return (
            <section className="mb-5">
                <h2 className="text-lg font-bold uppercase tracking-wider text-gray-800 border-b-2 border-gray-200 pb-1 mb-3">{title}</h2>
                {children}
            </section>
        );
    };

    const SidebarSection: React.FC<{ title: string; children: React.ReactNode; isPresent: boolean }> = ({ title, children, isPresent }) => {
        if (!isPresent) return null;
        return (
            <section className="mb-5">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-white border-b border-gray-400 pb-1 mb-2">{title}</h2>
                {children}
            </section>
        );
    };

    return (
        <div className="w-full h-full bg-white font-sans flex text-sm">
            {/* Sidebar */}
            <aside className="w-1/3 bg-gray-700 text-white p-6">
                <SidebarSection title="Contact" isPresent={true}>
                    <div className="text-xs space-y-2 text-gray-200">
                        {personalInfo.email && <p><span className="font-semibold">Email:</span><br/><a href={formatUrl(personalInfo.email)} className="break-all hover:underline">{personalInfo.email}</a></p>}
                        {personalInfo.phone && <p><span className="font-semibold">Phone:</span><br/>{personalInfo.phone}</p>}
                        {personalInfo.address && <p><span className="font-semibold">Location:</span><br/>{personalInfo.address}</p>}
                        {personalInfo.linkedin && <p><span className="font-semibold">LinkedIn:</span><br/><a href={formatUrl(personalInfo.linkedin)} target="_blank" rel="noopener noreferrer" className="break-all hover:underline">linkedin.com/...</a></p>}
                        {personalInfo.website && <p><span className="font-semibold">Website:</span><br/><a href={formatUrl(personalInfo.website)} target="_blank" rel="noopener noreferrer" className="break-all hover:underline">{personalInfo.website}</a></p>}
                    </div>
                </SidebarSection>
                
                <SidebarSection title="Skills" isPresent={skills && skills.length > 0}>
                    <ul className="text-xs space-y-1 text-gray-200">
                        {skills.map(skill => <li key={skill.id}>{skill.name}</li>)}
                    </ul>
                </SidebarSection>
            
                <SidebarSection title="Education" isPresent={education && education.length > 0}>
                    {education.map(edu => (
                        <div key={edu.id} className="text-xs mb-3">
                            <p className="font-bold text-white">{edu.degree}</p>
                            <p className="text-gray-300">{edu.institution}</p>
                            <p className="text-gray-400">{edu.endDate}</p>
                        </div>
                    ))}
                </SidebarSection>
            </aside>

            {/* Main Content */}
            <main className="w-2/3 p-8">
                <header className="mb-6">
                    <h1 className="text-4xl font-extrabold text-gray-800">{personalInfo.fullName}</h1>
                    <p className="text-xl text-gray-600 font-medium">{personalInfo.jobTitle}</p>
                </header>

                <MainSection title="Summary" isPresent={!!summary}>
                    <p className="text-sm leading-relaxed text-gray-700">{summary}</p>
                </MainSection>

                <MainSection title="Experience" isPresent={experience && experience.length > 0}>
                    {experience.map(exp => (
                        <div key={exp.id} className="mb-4">
                            <div className="flex justify-between items-baseline">
                                <h3 className="text-md font-semibold text-gray-800">{exp.jobTitle}</h3>
                                <p className="text-xs text-gray-500">{exp.startDate} - {exp.endDate}</p>
                            </div>
                            <p className="text-sm italic text-gray-600">{exp.company}, {exp.location}</p>
                            <ul className="list-disc list-outside ml-5 mt-1 space-y-1 text-xs text-gray-700">
                                {exp.description.map((desc, i) => <li key={i}>{desc}</li>)}
                            </ul>
                        </div>
                    ))}
                </MainSection>

                    <MainSection title="Projects" isPresent={projects && projects.length > 0}>
                    {projects.map(proj => (
                        <div key={proj.id} className="mb-4">
                            <h3 className="text-md font-semibold text-gray-800">
                                {proj.link ? (
                                    <a href={formatUrl(proj.link)} target="_blank" rel="noopener noreferrer" className="hover:underline">{proj.name}</a>
                                ) : (
                                    proj.name
                                )}
                            </h3>
                            <ul className="list-disc list-outside ml-5 mt-1 space-y-1 text-xs text-gray-700">
                                {proj.description.map((desc, i) => <li key={i}>{desc}</li>)}
                            </ul>
                        </div>
                    ))}
                </MainSection>
            </main>
        </div>
    );
};

export default ModernTemplate;