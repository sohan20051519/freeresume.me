import React from 'react';
import { ResumeData } from '../../../types';

const formatUrl = (url: string) => {
    if (!url) return url;
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    if (url.includes('@')) return `mailto:${url}`;
    return `https://${url}`;
};

const MinimalistTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
    const { personalInfo, summary, experience, education, skills, projects } = data;

    const Section: React.FC<{ title: string; children: React.ReactNode; isPresent: boolean }> = ({ title, children, isPresent }) => {
        if (!isPresent) return null;
        return (
            <section className="mt-5">
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-2">{title}</h2>
                {children}
            </section>
        );
    };

    return (
        <div className="w-full h-full bg-white p-10 font-sans text-gray-800 text-sm flex flex-col">
            <header className="text-left mb-8">
                <h1 className="text-4xl font-light tracking-wider">{personalInfo.fullName}</h1>
                <p className="text-md font-light text-gray-600 mt-1">{personalInfo.jobTitle}</p>
            </header>

            <main className="grid grid-cols-3 gap-10">
                {/* Left Column (Contact & Skills) */}
                <aside className="col-span-1">
                    <Section title="Contact" isPresent={true}>
                        <div className="text-xs space-y-1">
                            {personalInfo.email && <p><a href={formatUrl(personalInfo.email)} className="hover:underline">{personalInfo.email}</a></p>}
                            {personalInfo.phone && <p>{personalInfo.phone}</p>}
                            {personalInfo.address && <p>{personalInfo.address}</p>}
                            {personalInfo.linkedin && <p><a href={formatUrl(personalInfo.linkedin)} target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a></p>}
                            {personalInfo.website && <p><a href={formatUrl(personalInfo.website)} target="_blank" rel="noopener noreferrer" className="hover:underline">Portfolio</a></p>}
                        </div>
                    </Section>

                    <Section title="Skills" isPresent={skills && skills.length > 0}>
                        <ul className="text-xs space-y-1">
                            {skills.map(skill => <li key={skill.id}>{skill.name}</li>)}
                        </ul>
                    </Section>

                    <Section title="Education" isPresent={education && education.length > 0}>
                        {education.map(edu => (
                            <div key={edu.id} className="text-xs">
                                <p className="font-semibold">{edu.degree}</p>
                                <p>{edu.institution}</p>
                                <p className="text-gray-500">{edu.endDate}</p>
                            </div>
                        ))}
                    </Section>
                </aside>

                {/* Right Column (Main Content) */}
                <div className="col-span-2">
                    <Section title="Profile" isPresent={!!summary}>
                        <p className="text-xs leading-relaxed">{summary}</p>
                    </Section>

                    <Section title="Experience" isPresent={experience && experience.length > 0}>
                        {experience.map(exp => (
                            <div key={exp.id} className="mb-4">
                                <div className="flex justify-between items-baseline">
                                    <h3 className="text-sm font-semibold">{exp.jobTitle}</h3>
                                    <p className="text-xs text-gray-500">{exp.startDate} - {exp.endDate}</p>
                                </div>
                                <p className="text-xs italic text-gray-600">{exp.company}</p>
                                <ul className="list-disc list-outside ml-4 mt-1 space-y-1 text-xs">
                                    {exp.description.map((desc, i) => <li key={i}>{desc}</li>)}
                                </ul>
                            </div>
                        ))}
                    </Section>
                    
                    <Section title="Projects" isPresent={projects && projects.length > 0}>
                        {projects.map(proj => (
                            <div key={proj.id} className="mb-4">
                                <h3 className="text-sm font-semibold">
                                    {proj.link ? (
                                        <a href={formatUrl(proj.link)} target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:underline">{proj.name}</a>
                                    ) : (
                                        proj.name
                                    )}
                                </h3>
                                 <ul className="list-disc list-outside ml-4 mt-1 space-y-1 text-xs">
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

export default MinimalistTemplate;