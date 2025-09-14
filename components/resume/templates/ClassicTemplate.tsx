import React from 'react';
import { ResumeData } from '../../../types';

const formatUrl = (url: string) => {
    if (!url) return url;
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('mailto:')) {
        return url;
    }
    if (url.includes('@')) {
        return `mailto:${url}`;
    }
    return `https://${url}`;
};


const ClassicTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
    const { personalInfo, summary, experience, education, skills, projects, certifications, languages } = data;

    const Section: React.FC<{ title: string; children: React.ReactNode; isPresent: boolean }> = ({ title, children, isPresent }) => {
        if (!isPresent) return null;
        return (
            <section className="mb-4">
                <h2 className="text-sm font-bold uppercase tracking-widest text-gray-600 border-b-2 border-gray-300 pb-1 mb-2">{title}</h2>
                {children}
            </section>
        );
    };

    return (
        <div className="w-full h-full bg-white p-10 font-serif text-gray-800 text-[10.5pt] leading-normal flex flex-col">
            <header className="text-center mb-6">
                <h1 className="text-3xl font-bold tracking-wider">{personalInfo.fullName}</h1>
                <p className="text-lg text-gray-600 mt-1">{personalInfo.jobTitle}</p>
                 <div className="text-xs mt-2 text-gray-500 flex justify-center flex-wrap gap-x-3 gap-y-1">
                    {personalInfo.address && <span>{personalInfo.address}</span>}
                    {personalInfo.phone && <span>{personalInfo.phone}</span>}
                    {personalInfo.email && <a href={formatUrl(personalInfo.email)} className="hover:underline">{personalInfo.email}</a>}
                    {personalInfo.linkedin && <a href={formatUrl(personalInfo.linkedin)} target="_blank" rel="noopener noreferrer" className="hover:underline">{personalInfo.linkedin}</a>}
                    {personalInfo.website && <a href={formatUrl(personalInfo.website)} target="_blank" rel="noopener noreferrer" className="hover:underline">{personalInfo.website}</a>}
                </div>
            </header>

            <main>
                <Section title="Summary" isPresent={!!summary}>
                    <p>{summary}</p>
                </Section>
                
                <Section title="Experience" isPresent={experience && experience.length > 0}>
                    {experience.map(exp => (
                        <div key={exp.id} className="mb-3">
                            <div className="flex justify-between items-baseline">
                                <p><span className="font-bold">{exp.jobTitle}</span>, <span className="italic">{exp.company}</span></p>
                                <p className="text-[9.5pt] text-gray-600">{exp.startDate} - {exp.endDate}</p>
                            </div>
                            <ul className="list-disc list-outside ml-4 mt-1 space-y-0.5">
                                {exp.description.map((desc, i) => <li key={i}>{desc}</li>)}
                            </ul>
                        </div>
                    ))}
                </Section>

                <Section title="Projects" isPresent={projects && projects.length > 0}>
                        {projects.map(proj => (
                            <div key={proj.id} className="mb-3">
                                <p className="font-bold">
                                {proj.link ? (
                                    <a href={formatUrl(proj.link)} target="_blank" rel="noopener noreferrer" className="text-black hover:underline">{proj.name}</a>
                                ) : (
                                    proj.name
                                )}
                            </p>
                            <ul className="list-disc list-outside ml-4 mt-1 space-y-0.5">
                                {proj.description.map((desc, i) => <li key={i}>{desc}</li>)}
                            </ul>
                        </div>
                        ))}
                </Section>
            
                <Section title="Education" isPresent={education && education.length > 0}>
                    {education.map(edu => (
                        <div key={edu.id} className="mb-2 flex justify-between">
                            <p><span className="font-bold">{edu.degree}</span>, {edu.institution}</p>
                            <p className="text-[9.5pt] text-gray-600">{edu.endDate}</p>
                        </div>
                    ))}
                </Section>
                
                <Section title="Skills" isPresent={skills && skills.length > 0}>
                    <p>{skills.map(s => s.name).join(' | ')}</p>
                </Section>
            </main>
        </div>
    );
};

export default ClassicTemplate;