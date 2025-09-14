import React from 'react';
import { ResumeData } from '../../../types';

const formatUrl = (url: string) => {
    if (!url) return url;
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    if (url.includes('@')) return `mailto:${url}`;
    return `https://${url}`;
};

const HarvardTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
    const { personalInfo, education, experience, skills, projects } = data;

    const Section: React.FC<{ title: string; children: React.ReactNode; isPresent: boolean }> = ({ title, children, isPresent }) => {
        if (!isPresent) return null;
        return (
             <section className="mb-4">
                <h2 className="text-md font-bold border-b-2 border-black pb-1 mb-2 uppercase tracking-wider">{title}</h2>
                {children}
            </section>
        );
    }

    return (
        <div className="w-full h-full bg-white p-10 font-serif text-black text-sm flex flex-col">
            <header className="text-center mb-6">
                <h1 className="text-3xl font-bold uppercase tracking-widest">{personalInfo.fullName}</h1>
                <div className="flex justify-center flex-wrap text-xs mt-2 text-gray-700">
                    {personalInfo.address && <span>{personalInfo.address}</span>}
                    {personalInfo.phone && <><span className="mx-2">|</span><span>{personalInfo.phone}</span></>}
                    {personalInfo.email && <><span className="mx-2">|</span><a href={formatUrl(personalInfo.email)} className="hover:underline">{personalInfo.email}</a></>}
                    {personalInfo.linkedin && <><span className="mx-2">|</span><a href={formatUrl(personalInfo.linkedin)} target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a></>}
                    {personalInfo.website && <><span className="mx-2">|</span><a href={formatUrl(personalInfo.website)} target="_blank" rel="noopener noreferrer" className="hover:underline">Website</a></>}
                </div>
            </header>

            <main>
                <Section title="Education" isPresent={education && education.length > 0}>
                    {education.map(edu => (
                        <div key={edu.id} className="mb-2">
                            <div className="flex justify-between items-baseline">
                                <p className="font-bold">{edu.institution}</p>
                                <p className="text-xs">{edu.location}</p>
                            </div>
                            <div className="flex justify-between items-baseline">
                                <p className="italic">{edu.degree}</p>
                                <p className="text-xs">{edu.startDate} - {edu.endDate}</p>
                            </div>
                        </div>
                    ))}
                </Section>

                <Section title="Experience" isPresent={experience && experience.length > 0}>
                    {experience.map(exp => (
                        <div key={exp.id} className="mb-3">
                            <div className="flex justify-between items-baseline">
                                <p className="font-bold">{exp.company}</p>
                                <p className="text-xs">{exp.location}</p>
                            </div>
                            <div className="flex justify-between items-baseline">
                                <p className="italic">{exp.jobTitle}</p>
                                <p className="text-xs">{exp.startDate} - {exp.endDate}</p>
                            </div>
                            <ul className="list-disc list-outside ml-5 mt-1 space-y-1 text-sm">
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
                            <ul className="list-disc list-outside ml-5 mt-1 space-y-1 text-sm">
                                {proj.description.map((desc, i) => <li key={i}>{desc}</li>)}
                            </ul>
                        </div>
                    ))}
                </Section>
            
                <Section title="Skills" isPresent={skills && skills.length > 0}>
                    <p className="text-sm">
                        {skills.map(skill => skill.name).join(', ')}
                    </p>
                </Section>
            </main>
        </div>
    );
};

export default HarvardTemplate;