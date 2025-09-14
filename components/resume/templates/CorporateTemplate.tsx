import React from 'react';
import { ResumeData } from '../../../types';

const formatUrl = (url: string) => {
    if (!url) return url;
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    if (url.includes('@')) return `mailto:${url}`;
    return `https://${url}`;
};


const CorporateTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
    const { personalInfo, summary, experience, education, skills, projects } = data;

    const Section: React.FC<{ title: string; children: React.ReactNode; isPresent: boolean }> = ({ title, children, isPresent }) => {
        if (!isPresent) return null;
        return (
            <section className="mb-4">
                <h2 className="text-base font-semibold text-gray-700 tracking-wide border-b border-gray-200 pb-1 mb-3">{title}</h2>
                {children}
            </section>
        );
    };

    return (
        <div className="w-full h-full bg-white font-sans text-gray-800 text-sm p-10 flex flex-col">
            <header className="mb-6">
                <h1 className="text-3xl font-bold tracking-tight">{personalInfo.fullName}</h1>
                <p className="text-lg text-gray-600 mt-1">{personalInfo.jobTitle}</p>
                 <div className="flex flex-wrap text-xs mt-3 text-gray-500 gap-x-6">
                    {personalInfo.email && <a href={formatUrl(personalInfo.email)} className="hover:underline">{personalInfo.email}</a>}
                    {personalInfo.phone && <span>{personalInfo.phone}</span>}
                    {personalInfo.linkedin && <a href={formatUrl(personalInfo.linkedin)} target="_blank" rel="noopener noreferrer" className="hover:underline">{personalInfo.linkedin}</a>}
                    {personalInfo.website && <a href={formatUrl(personalInfo.website)} target="_blank" rel="noopener noreferrer" className="hover:underline">{personalInfo.website}</a>}
                </div>
            </header>

            <main>
                <Section title="Professional Summary" isPresent={!!summary}>
                    <p className="leading-normal text-gray-700 text-sm">{summary}</p>
                </Section>

                <Section title="Work Experience" isPresent={experience && experience.length > 0}>
                    {experience.map(exp => (
                        <div key={exp.id} className="mb-4">
                            <div className="flex justify-between items-baseline">
                                <h3 className="text-md font-semibold">{exp.jobTitle}</h3>
                                <p className="text-xs text-gray-500">{exp.startDate} - {exp.endDate}</p>
                            </div>
                            <p className="text-sm italic text-gray-600">{exp.company} &mdash; {exp.location}</p>
                            <ul className="list-disc list-outside ml-5 mt-1 space-y-1 text-sm text-gray-700">
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
                            <ul className="list-disc list-outside ml-5 mt-1 space-y-1 text-sm text-gray-700">
                                {proj.description.map((desc, i) => <li key={i}>{desc}</li>)}
                            </ul>
                        </div>
                    ))}
                </Section>
            
                <div className="grid grid-cols-2 gap-x-10">
                    <Section title="Education" isPresent={education && education.length > 0}>
                        {education.map(edu => (
                            <div key={edu.id} className="mb-2">
                                <h3 className="text-md font-semibold">{edu.degree}</h3>
                                <p className="text-sm text-gray-600">{edu.institution}</p>
                                <p className="text-xs text-gray-500">{edu.startDate} - {edu.endDate}</p>
                            </div>
                        ))}
                    </Section>
                    <Section title="Skills" isPresent={skills && skills.length > 0}>
                        <ul className="columns-2">
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

export default CorporateTemplate;