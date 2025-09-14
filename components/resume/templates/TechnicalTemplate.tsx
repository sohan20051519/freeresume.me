import React from 'react';
import { ResumeData } from '../../../types';

const formatUrl = (url: string) => {
    if (!url) return url;
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    if (url.includes('@')) return `mailto:${url}`;
    return `https://${url}`;
};

const TechnicalTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
    const { personalInfo, summary, experience, education, skills, projects } = data;

    const Section: React.FC<{ title: string; children: React.ReactNode; isPresent: boolean }> = ({ title, children, isPresent }) => {
        if (!isPresent) return null;
        return (
            <section className="mb-4">
                <h2 className="text-xs font-bold font-mono uppercase tracking-widest text-gray-500 pb-1 mb-2">{`// ${title}`}</h2>
                {children}
            </section>
        );
    };

    return (
        <div className="w-full h-full bg-white p-8 font-sans text-gray-800 text-sm flex flex-col">
            <header className="mb-6">
                <h1 className="text-2xl font-bold font-mono">{personalInfo.fullName}</h1>
                <p className="text-lg text-gray-600">{personalInfo.jobTitle}</p>
                <div className="text-xs mt-2 text-blue-600 font-mono flex flex-wrap gap-x-4">
                    <a href={formatUrl(personalInfo.email)} className="hover:underline">{personalInfo.email}</a>
                    <a href={formatUrl(personalInfo.website)} target="_blank" rel="noopener noreferrer" className="hover:underline">{personalInfo.website}</a>
                    <a href={formatUrl(personalInfo.linkedin)} target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>
                </div>
            </header>

            <main className="grid grid-cols-3 gap-x-8">
                {/* Main content */}
                <div className="col-span-2">
                    <Section title="Summary" isPresent={!!summary}>
                        <p className="text-xs leading-relaxed">{summary}</p>
                    </Section>
                    <Section title="Experience" isPresent={experience && experience.length > 0}>
                        {experience.map(exp => (
                            <div key={exp.id} className="mb-4">
                                <h3 className="font-bold">{exp.jobTitle}</h3>
                                <div className="flex justify-between text-xs text-gray-600 italic">
                                    <span>{exp.company}</span>
                                    <span>{exp.startDate} - {exp.endDate}</span>
                                </div>
                                <ul className="list-disc list-outside ml-5 mt-1 text-xs space-y-1">
                                    {exp.description.map((desc, i) => <li key={i}>{desc}</li>)}
                                </ul>
                            </div>
                        ))}
                    </Section>
                        <Section title="Projects" isPresent={projects && projects.length > 0}>
                    {projects.map(proj => (
                        <div key={proj.id} className="mb-4">
                            <h3 className="font-bold">
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
                </div>

                {/* Sidebar */}
                <aside className="col-span-1 border-l-2 border-gray-100 pl-6">
                    <Section title="Skills" isPresent={skills && skills.length > 0}>
                        <ul className="text-xs space-y-1 font-mono">
                            {skills.map(skill => <li key={skill.id}>{skill.name}</li>)}
                        </ul>
                    </Section>
                    <Section title="Education" isPresent={education && education.length > 0}>
                        {education.map(edu => (
                            <div key={edu.id} className="text-xs">
                                <h3 className="font-semibold">{edu.institution}</h3>
                                <p>{edu.degree}</p>
                                <p className="text-gray-500">{edu.endDate}</p>
                            </div>
                        ))}
                    </Section>
                </aside>
            </main>
        </div>
    );
};

export default TechnicalTemplate;