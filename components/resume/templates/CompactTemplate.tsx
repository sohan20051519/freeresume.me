import React from 'react';
import { ResumeData } from '../../../types';

const formatUrl = (url: string) => {
    if (!url) return url;
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    if (url.includes('@')) return `mailto:${url}`;
    return `https://${url}`;
};

const CompactTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
    const { personalInfo, summary, experience, education, skills, projects } = data;

    const Section: React.FC<{ title: string; children: React.ReactNode; isPresent: boolean; className?: string }> = ({ title, children, isPresent, className = '' }) => {
        if (!isPresent) return null;
        return (
            <section className={`mb-3 ${className}`}>
                <h2 className="text-[9pt] font-bold uppercase tracking-wider text-gray-700 border-b border-gray-200 pb-1 mb-2">{title}</h2>
                {children}
            </section>
        );
    };

    const contactInfo = [
        personalInfo.email && <a href={formatUrl(personalInfo.email)} className="hover:underline">{personalInfo.email}</a>,
        personalInfo.phone,
        personalInfo.address,
        personalInfo.linkedin && <a href={formatUrl(personalInfo.linkedin)} target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>,
        personalInfo.website && <a href={formatUrl(personalInfo.website)} target="_blank" rel="noopener noreferrer" className="hover:underline">Website</a>
    ].filter(Boolean);


    return (
        <div className="w-full h-full bg-white p-6 font-sans text-gray-800 text-[9.5pt] leading-snug flex flex-col">
            <header className="text-center mb-4">
                <h1 className="text-2xl font-bold">{personalInfo.fullName}</h1>
                <div className="text-xs mt-1 text-gray-500 flex justify-center flex-wrap gap-x-2">
                     {contactInfo.map((item, index) => (
                        <React.Fragment key={index}>
                            {item}
                            {index < contactInfo.length - 1 && <span className="mx-1">&bull;</span>}
                        </React.Fragment>
                    ))}
                </div>
            </header>
             <p className="text-center text-xs mb-3">{summary}</p>
            
            <main className="grid grid-cols-5 gap-x-6">
                {/* Left Column */}
                <aside className="col-span-2">
                    <Section title="Education" isPresent={education && education.length > 0}>
                         {education.map(edu => (
                            <div key={edu.id} className="mb-2 text-xs">
                                <p className="font-bold">{edu.degree}</p>
                                <p>{edu.institution}</p>
                                <p className="text-gray-500">{edu.endDate}</p>
                            </div>
                        ))}
                    </Section>
                    <Section title="Skills" isPresent={skills && skills.length > 0}>
                        <ul className="text-xs list-disc list-outside ml-3">
                            {skills.map(skill => <li key={skill.id}>{skill.name}</li>)}
                        </ul>
                    </Section>
                </aside>

                {/* Right Column */}
                <div className="col-span-3">
                    <Section title="Experience" isPresent={experience && experience.length > 0}>
                        {experience.map(exp => (
                            <div key={exp.id} className="mb-3">
                                <div className="flex justify-between items-baseline text-xs">
                                    <p className="font-bold">{exp.jobTitle}</p>
                                    <p className="text-gray-500">{exp.startDate} - {exp.endDate}</p>
                                </div>
                                <p className="italic text-xs text-gray-600">{exp.company}</p>
                                <ul className="list-disc list-outside ml-3 mt-1 space-y-0.5 text-xs">
                                    {exp.description.map((desc, i) => <li key={i}>{desc}</li>)}
                                </ul>
                            </div>
                        ))}
                    </Section>
                    <Section title="Projects" isPresent={projects && projects.length > 0}>
                        {projects.map(proj => (
                            <div key={proj.id} className="mb-3">
                                <p className="font-bold text-xs">
                                    {proj.link ? (
                                        <a href={formatUrl(proj.link)} target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:underline">{proj.name}</a>
                                    ) : (
                                        proj.name
                                    )}
                                </p>
                                <ul className="list-disc list-outside ml-3 mt-1 space-y-0.5 text-xs">
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

export default CompactTemplate;