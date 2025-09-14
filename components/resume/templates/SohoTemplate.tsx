import React from 'react';
import { ResumeData } from '../../../types';

const formatUrl = (url: string) => {
    if (!url) return url;
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    if (url.includes('@')) return `mailto:${url}`;
    return `https://${url}`;
};

const SohoTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
    const { personalInfo, summary, experience, education, skills, projects } = data;

    const Section: React.FC<{ title: string; children: React.ReactNode; isPresent: boolean }> = ({ title, children, isPresent }) => {
        if (!isPresent) return null;
        return (
            <section className="mb-6">
                <h2 className="text-sm font-bold uppercase tracking-widest text-brand-secondary pb-2 mb-2">{title}</h2>
                {children}
            </section>
        );
    };

    return (
        <div className="w-full h-full bg-white p-10 font-sans text-gray-800 text-sm flex flex-col">
            <header className="mb-8 text-left border-b-2 border-gray-100 pb-4">
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">{personalInfo.fullName}</h1>
                <p className="text-xl font-medium text-brand-primary mt-1">{personalInfo.jobTitle}</p>
                 <div className="flex flex-wrap text-xs mt-3 text-gray-500 gap-x-5 gap-y-1">
                    {personalInfo.email && <a href={formatUrl(personalInfo.email)} className="hover:underline">{personalInfo.email}</a>}
                    {personalInfo.phone && <span>{personalInfo.phone}</span>}
                    {personalInfo.address && <span>{personalInfo.address}</span>}
                    {personalInfo.linkedin && <a href={formatUrl(personalInfo.linkedin)} target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>}
                    {personalInfo.website && <a href={formatUrl(personalInfo.website)} target="_blank" rel="noopener noreferrer" className="hover:underline">Portfolio</a>}
                </div>
            </header>

            <main>
                <Section title="Profile" isPresent={!!summary}>
                    <p className="leading-normal">{summary}</p>
                </Section>

                <Section title="Experience" isPresent={experience && experience.length > 0}>
                    {experience.map(exp => (
                        <div key={exp.id} className="mb-4">
                            <div className="flex justify-between items-baseline">
                                <h3 className="text-md font-semibold">{exp.jobTitle}, <span className="font-normal text-gray-700">{exp.company}</span></h3>
                                <p className="text-xs font-mono text-gray-500">{exp.startDate} - {exp.endDate}</p>
                            </div>
                            <p className="text-sm italic text-gray-600 mb-1">{exp.location}</p>
                            <ul className="list-disc list-outside ml-5 space-y-1 text-gray-700 text-sm">
                                {exp.description.map((desc, i) => <li key={i}>{desc}</li>)}
                            </ul>
                        </div>
                    ))}
                </Section>

                <Section title="Projects" isPresent={projects && projects.length > 0}>
                    {projects.map(proj => (
                        <div key={proj.id} className="mb-4">
                            <h3 className="text-md font-semibold">
                                {proj.link ? (
                                    <a href={formatUrl(proj.link)} target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:underline">{proj.name}</a>
                                ) : (
                                    proj.name
                                )}
                            </h3>
                            <ul className="list-disc list-outside ml-5 space-y-1 text-gray-700 text-sm">
                                {proj.description.map((desc, i) => <li key={i}>{desc}</li>)}
                            </ul>
                        </div>
                    ))}
                </Section>
            
                <div className="grid grid-cols-2 gap-x-10">
                    <Section title="Education" isPresent={education && education.length > 0}>
                        {education.map(edu => (
                            <div key={edu.id} className="mb-3">
                                <h3 className="text-md font-semibold">{edu.institution}</h3>
                                <p className="text-sm text-gray-700">{edu.degree}</p>
                                <p className="text-xs text-gray-500">{edu.startDate} - {edu.endDate}</p>
                            </div>
                        ))}
                    </Section>
                    
                    <Section title="Skills" isPresent={skills && skills.length > 0}>
                         <div className="flex flex-wrap gap-2">
                            {skills.map(skill => (
                                <span key={skill.id} className="bg-gray-100 text-gray-800 text-xs font-medium px-3 py-1 rounded-md">{skill.name}</span>
                            ))}
                        </div>
                    </Section>
                </div>
            </main>
        </div>
    );
};

export default SohoTemplate;