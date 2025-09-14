import React from 'react';
import { ResumeData } from '../../../types';

const formatUrl = (url: string) => {
    if (!url) return url;
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    if (url.includes('@')) return `mailto:${url}`;
    return `https://${url}`;
};

const ProfessionalTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
    const { personalInfo, summary, experience, education, skills, projects } = data;

    const Section: React.FC<{ title: string; children: React.ReactNode; isPresent: boolean }> = ({ title, children, isPresent }) => {
        if (!isPresent) return null;
        return (
            <section className="mb-5">
                <h2 className="text-base font-bold text-brand-primary uppercase tracking-wider mb-2">{title}</h2>
                {children}
            </section>
        );
    };

    return (
        <div className="w-full h-full bg-white font-sans text-gray-800 text-sm flex flex-col">
            <header className="bg-gray-100 p-8 text-center">
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">{personalInfo.fullName}</h1>
                <p className="text-xl text-gray-600 mt-1">{personalInfo.jobTitle}</p>
                <div className="flex justify-center flex-wrap text-xs mt-3 text-gray-500 gap-x-4">
                    {personalInfo.email && <a href={formatUrl(personalInfo.email)} className="hover:underline">{personalInfo.email}</a>}
                    {personalInfo.phone && <span>{personalInfo.phone}</span>}
                    {personalInfo.linkedin && <a href={formatUrl(personalInfo.linkedin)} target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>}
                    {personalInfo.website && <a href={formatUrl(personalInfo.website)} target="_blank" rel="noopener noreferrer" className="hover:underline">Portfolio</a>}
                </div>
            </header>

            <main className="p-8">
                <Section title="Professional Summary" isPresent={!!summary}>
                    <p className="text-sm leading-normal">{summary}</p>
                </Section>
                
                <Section title="Experience" isPresent={experience && experience.length > 0}>
                    {experience.map(exp => (
                        <div key={exp.id} className="mb-4">
                            <div className="flex justify-between items-baseline">
                                <h3 className="font-semibold text-md">{exp.jobTitle}</h3>
                                <p className="text-xs text-gray-500">{exp.startDate} - {exp.endDate}</p>
                            </div>
                            <p className="text-sm italic text-gray-600">{exp.company}, {exp.location}</p>
                            <ul className="list-disc list-outside ml-5 mt-1 text-xs space-y-1">
                                {exp.description.map((desc, i) => <li key={i}>{desc}</li>)}
                            </ul>
                        </div>
                    ))}
                </Section>
                
                    <Section title="Projects" isPresent={projects && projects.length > 0}>
                    {projects.map(proj => (
                        <div key={proj.id} className="mb-4">
                            <h3 className="font-semibold text-md">
                                {proj.link ? (
                                    <a href={formatUrl(proj.link)} target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:underline">{proj.name}</a>
                                ) : (
                                    proj.name
                                )}
                            </h3>
                            <ul className="list-disc list-outside ml-5 mt-1 text-xs space-y-1">
                                {proj.description.map((desc, i) => <li key={i}>{desc}</li>)}
                            </ul>
                        </div>
                    ))}
                </Section>
            
                <div className="pt-0 grid grid-cols-2 gap-8">
                    <Section title="Education" isPresent={education && education.length > 0}>
                        {education.map(edu => (
                            <div key={edu.id}>
                                <h3 className="font-semibold">{edu.degree}</h3>
                                <p className="text-sm text-gray-600">{edu.institution}</p>
                                <p className="text-xs text-gray-500">{edu.endDate}</p>
                            </div>
                        ))}
                    </Section>
                    
                    <Section title="Skills" isPresent={skills && skills.length > 0}>
                        <ul className="columns-2 text-sm">
                            {skills.map(skill => (
                                <li key={skill.id} className="mb-1">{skill.name}</li>
                            ))}
                        </ul>
                    </Section>
                </div>
            </main>
        </div>
    );
};

export default ProfessionalTemplate;