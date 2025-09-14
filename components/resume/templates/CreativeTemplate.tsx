import React from 'react';
import { ResumeData } from '../../../types';

const formatUrl = (url: string) => {
    if (!url) return url;
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    if (url.includes('@')) return `mailto:${url}`;
    return `https://${url}`;
};

const CreativeTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
    const { personalInfo, summary, experience, education, skills, projects } = data;

    const Section: React.FC<{ title: string; children: React.ReactNode; isPresent: boolean }> = ({ title, children, isPresent }) => {
        if (!isPresent) return null;
        return (
            <section className="mb-6">
                <h2 className="text-lg font-semibold tracking-wider text-brand-primary mb-2">{title}</h2>
                {children}
            </section>
        );
    };

    return (
        <div className="w-full h-full bg-white font-sans text-gray-700 text-sm flex flex-col">
            <header className="p-10 bg-gray-50">
                <div className="grid grid-cols-3 gap-8 items-center">
                    <div className="col-span-2">
                        <h1 className="text-5xl font-extrabold text-gray-800">{personalInfo.fullName}</h1>
                        <p className="text-xl text-gray-600 mt-2">{personalInfo.jobTitle}</p>
                    </div>
                    <div className="col-span-1 text-right text-xs">
                        {personalInfo.email && <p><a href={formatUrl(personalInfo.email)} className="hover:underline">{personalInfo.email}</a></p>}
                        {personalInfo.phone && <p>{personalInfo.phone}</p>}
                        {personalInfo.address && <p>{personalInfo.address}</p>}
                        {personalInfo.linkedin && <p><a href={formatUrl(personalInfo.linkedin)} target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a></p>}
                        {personalInfo.website && <p><a href={formatUrl(personalInfo.website)} target="_blank" rel="noopener noreferrer" className="hover:underline">Portfolio</a></p>}
                    </div>
                </div>
            </header>

            <main className="p-10 grid grid-cols-3 gap-10">
                <div className="col-span-2">
                    <Section title="About Me" isPresent={!!summary}>
                        <p className="text-sm leading-relaxed">{summary}</p>
                    </Section>

                    <Section title="Experience" isPresent={experience && experience.length > 0}>
                        {experience.map(exp => (
                            <div key={exp.id} className="mb-4">
                                <h3 className="font-semibold text-md">{exp.jobTitle} at {exp.company}</h3>
                                <p className="text-xs text-gray-500">{exp.startDate} - {exp.endDate}</p>
                                <ul className="list-disc list-outside ml-5 mt-1 text-xs space-y-1">
                                    {exp.description.map((desc, i) => <li key={i}>{desc}</li>)}
                                </ul>
                            </div>
                        ))}
                    </Section>
                </div>

                <div className="col-span-1">
                    <Section title="Skills" isPresent={skills && skills.length > 0}>
                        <div className="flex flex-wrap gap-2">
                            {skills.map(skill => (
                                <span key={skill.id} className="bg-brand-primary/10 text-brand-primary text-xs font-semibold px-2.5 py-1 rounded-full">{skill.name}</span>
                            ))}
                        </div>
                    </Section>

                    <Section title="Education" isPresent={education && education.length > 0}>
                            {education.map(edu => (
                            <div key={edu.id} className="mb-3">
                                <h3 className="font-semibold">{edu.degree}</h3>
                                <p className="text-xs text-gray-600">{edu.institution}</p>
                                <p className="text-xs text-gray-500">{edu.endDate}</p>
                            </div>
                        ))}
                    </Section>
                    
                        <Section title="Projects" isPresent={projects && projects.length > 0}>
                            {projects.map(proj => (
                            <div key={proj.id} className="mb-3">
                                <h3 className="font-semibold">
                                    {proj.link ? (
                                        <a href={formatUrl(proj.link)} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:underline">{proj.name}</a>
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
            </main>
        </div>
    );
};

export default CreativeTemplate;