import React from 'react';
import { ResumeData } from '../../../types';

const formatUrl = (url: string) => {
    if (!url) return url;
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    if (url.includes('@')) return `mailto:${url}`;
    return `https://${url}`;
};

const ExecutiveTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
    const { personalInfo, summary, experience, education, skills, projects } = data;

    const Section: React.FC<{ title: string; children: React.ReactNode; isPresent: boolean; className?: string }> = ({ title, children, isPresent, className = '' }) => {
        if (!isPresent) return null;
        return (
            <section className={`mb-5 ${className}`}>
                <h2 className="text-sm font-bold uppercase tracking-[.2em] text-gray-600 border-b border-gray-200 pb-1 mb-3">{title}</h2>
                {children}
            </section>
        );
    };
    
    const contactInfo = [
        personalInfo.address,
        personalInfo.phone,
        personalInfo.email && <a href={formatUrl(personalInfo.email)} className="hover:underline">{personalInfo.email}</a>,
        personalInfo.linkedin && <a href={formatUrl(personalInfo.linkedin)} target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>,
        personalInfo.website && <a href={formatUrl(personalInfo.website)} target="_blank" rel="noopener noreferrer" className="hover:underline">Website</a>
    ].filter(Boolean);

    return (
        <div className="w-full h-full bg-white px-12 py-10 font-serif text-gray-800 text-[11pt] leading-relaxed flex flex-col">
            <header className="text-center mb-8">
                <h1 className="text-4xl font-bold tracking-wide">{personalInfo.fullName}</h1>
                <p className="text-lg text-gray-600 mt-1">{personalInfo.jobTitle}</p>
                <div className="text-xs mt-2 text-gray-500">
                    {contactInfo.map((item, index) => (
                        <React.Fragment key={index}>
                            {item}
                            {index < contactInfo.length - 1 && <span className="mx-2">&bull;</span>}
                        </React.Fragment>
                    ))}
                </div>
            </header>

            <main>
                <p className="text-center mb-6 italic">{summary}</p>
                
                <Section title="Professional Experience" isPresent={experience && experience.length > 0}>
                    {experience.map(exp => (
                        <div key={exp.id} className="mb-4">
                            <div className="flex justify-between items-baseline">
                                <h3 className="text-md font-bold">{exp.company}</h3>
                                <p className="text-sm text-gray-600">{exp.startDate} &mdash; {exp.endDate}</p>
                            </div>
                            <p className="italic text-md">{exp.jobTitle}</p>
                            <ul className="list-disc list-outside ml-5 mt-1 space-y-1 text-sm">
                                {exp.description.map((desc, i) => <li key={i}>{desc}</li>)}
                            </ul>
                        </div>
                    ))}
                </Section>
                
                <Section title="Projects" isPresent={projects && projects.length > 0}>
                    {projects.map(proj => (
                        <div key={proj.id} className="mb-4">
                            <h3 className="text-md font-bold">
                                {proj.link ? (
                                    <a href={formatUrl(proj.link)} target="_blank" rel="noopener noreferrer" className="text-black hover:underline">{proj.name}</a>
                                ) : (
                                    proj.name
                                )}
                            </h3>
                            <ul className="list-disc list-outside ml-5 mt-1 space-y-1 text-sm">
                                {proj.description.map((desc, i) => <li key={i}>{desc}</li>)}
                            </ul>
                        </div>
                    ))}
                </Section>

                <div className="grid grid-cols-2 gap-x-10">
                    <Section title="Education" isPresent={education && education.length > 0}>
                        {education.map(edu => (
                            <div key={edu.id} className="mb-2 text-sm">
                                <p className="font-bold">{edu.institution}</p>
                                <p>{edu.degree}</p>
                                <p className="text-xs text-gray-600">{edu.endDate}</p>
                            </div>
                        ))}
                    </Section>
                    
                    <Section title="Core Competencies" isPresent={skills && skills.length > 0}>
                        <ul className="columns-2 text-sm">
                            {skills.map(skill => <li key={skill.id}>{skill.name}</li>)}
                        </ul>
                    </Section>
                </div>
            </main>
        </div>
    );
};

export default ExecutiveTemplate;