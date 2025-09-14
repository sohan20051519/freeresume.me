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

const SohoTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
    const { personalInfo, summary, experience, education, skills, projects, certifications, languages } = data;

    const Section: React.FC<{ title: string; children: React.ReactNode; }> = ({ title, children }) => (
        <section className="mb-6">
            <h2 className="text-sm font-bold uppercase tracking-widest text-brand-secondary pb-2 mb-3">{title}</h2>
            {children}
        </section>
    );

    return (
        <div className="h-full bg-white p-10 font-sans text-gray-800 text-sm">
            {/* Header */}
            <header className="mb-8 text-left border-b-2 border-gray-100 pb-6">
                <h1 className="text-5xl font-extrabold tracking-tight text-gray-900">{personalInfo.fullName}</h1>
                <p className="text-xl font-medium text-brand-primary mt-2">{personalInfo.jobTitle}</p>
                 <div className="flex flex-wrap text-xs mt-4 text-gray-500 gap-x-5 gap-y-1">
                    {personalInfo.email && <a href={formatUrl(personalInfo.email)} className="hover:underline">{personalInfo.email}</a>}
                    {personalInfo.phone && <span>{personalInfo.phone}</span>}
                    {personalInfo.address && <span>{personalInfo.address}</span>}
                    {personalInfo.linkedin && <a href={formatUrl(personalInfo.linkedin)} target="_blank" rel="noopener noreferrer" className="hover:underline">{personalInfo.linkedin}</a>}
                    {personalInfo.website && <a href={formatUrl(personalInfo.website)} target="_blank" rel="noopener noreferrer" className="hover:underline">{personalInfo.website}</a>}
                </div>
            </header>

            <main>
                <Section title="Profile">
                    <p className="leading-relaxed">{summary}</p>
                </Section>

                <Section title="Experience">
                    {experience.map(exp => (
                        <div key={exp.id} className="mb-5">
                            <div className="flex justify-between items-baseline">
                                <h3 className="text-md font-semibold">{exp.jobTitle}, <span className="font-normal text-gray-700">{exp.company}</span></h3>
                                <p className="text-xs font-mono text-gray-500">{exp.startDate} - {exp.endDate}</p>
                            </div>
                            <p className="text-sm italic text-gray-600 mb-2">{exp.location}</p>
                            <ul className="list-disc list-outside ml-5 space-y-1.5 text-gray-700">
                                {exp.description.map((desc, i) => <li key={i}>{desc}</li>)}
                            </ul>
                        </div>
                    ))}
                </Section>

                {projects.length > 0 && (
                    <Section title="Projects">
                        {projects.map(proj => (
                            <div key={proj.id} className="mb-5">
                                <div className="flex justify-between items-baseline">
                                    <h3 className="text-md font-semibold">{proj.name}</h3>
                                    {proj.link && <a href={formatUrl(proj.link)} target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-brand-primary hover:underline">View Project</a>}
                                </div>
                                <ul className="list-disc list-outside ml-5 space-y-1.5 text-gray-700">
                                    {proj.description.map((desc, i) => <li key={i}>{desc}</li>)}
                                </ul>
                            </div>
                        ))}
                    </Section>
                )}

                <div className="grid grid-cols-2 gap-x-10">
                    <Section title="Education">
                        {education.map(edu => (
                            <div key={edu.id} className="mb-3">
                                <h3 className="text-md font-semibold">{edu.institution}</h3>
                                <p className="text-sm text-gray-700">{edu.degree}</p>
                                <p className="text-xs text-gray-500">{edu.startDate} - {edu.endDate}</p>
                            </div>
                        ))}
                    </Section>
                    
                    <Section title="Skills">
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
