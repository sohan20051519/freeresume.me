import React from 'react';
import { ResumeData } from '../../../types';

const formatUrl = (url: string) => {
    if (!url) return url;
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    if (url.includes('@')) return `mailto:${url}`;
    return `https://${url}`;
};

const GaramondTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
    const { personalInfo, summary, experience, education, skills, projects } = data;
    
    const Section: React.FC<{ title: string; children: React.ReactNode; isPresent: boolean }> = ({ title, children, isPresent }) => {
        if (!isPresent) return null;
        return (
            <section className="mb-6">
                <h2 className="text-center text-sm font-bold tracking-[.25em] text-gray-700 uppercase mb-2">{title}</h2>
                {children}
            </section>
        );
    };

    const contactInfo = [
        personalInfo.email && <a href={formatUrl(personalInfo.email)} className="hover:underline">{personalInfo.email}</a>,
        personalInfo.phone,
        personalInfo.address,
        personalInfo.linkedin && <a href={formatUrl(personalInfo.linkedin)} target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>,
        personalInfo.website && <a href={formatUrl(personalInfo.website)} target="_blank" rel="noopener noreferrer" className="hover:underline">Website</a>,
    ].filter(Boolean);

    return (
        <div className="w-full h-full bg-white p-10 font-serif text-gray-800 text-sm leading-normal flex flex-col">
            <header className="text-center mb-8">
                <h1 className="text-3xl font-bold tracking-wide">{personalInfo.fullName}</h1>
                <p className="text-md text-gray-600 mt-1">{personalInfo.jobTitle}</p>
                 <div className="text-xs text-gray-500 mt-2 flex justify-center items-center flex-wrap gap-x-2">
                    {contactInfo.map((item, index) => (
                        <React.Fragment key={index}>
                            {item}
                            {index < contactInfo.length - 1 && <span className="mx-1">&bull;</span>}
                        </React.Fragment>
                    ))}
                </div>
            </header>

            <main>
                <Section title="Summary" isPresent={!!summary}>
                    <p className="text-center">{summary}</p>
                </Section>

                <Section title="Experience" isPresent={experience && experience.length > 0}>
                    {experience.map(exp => (
                        <div key={exp.id} className="mb-4">
                            <div className="text-center mb-1">
                                <h3 className="text-md font-bold">{exp.jobTitle}</h3>
                                <p className="text-sm italic text-gray-700">{exp.company} | {exp.startDate} - {exp.endDate}</p>
                            </div>
                            <ul className="list-disc list-outside ml-5 space-y-1 text-sm">
                                {exp.description.map((desc, i) => <li key={i}>{desc}</li>)}
                            </ul>
                        </div>
                    ))}
                </Section>

                <Section title="Projects" isPresent={projects && projects.length > 0}>
                    {projects.map(proj => (
                        <div key={proj.id} className="mb-4">
                            <h3 className="text-md font-bold text-center">
                                {proj.link ? (
                                    <a href={formatUrl(proj.link)} target="_blank" rel="noopener noreferrer" className="text-black hover:underline">{proj.name}</a>
                                ) : (
                                    proj.name
                                )}
                            </h3>
                            <ul className="list-disc list-outside ml-5 space-y-1 text-sm">
                                {proj.description.map((desc, i) => <li key={i}>{desc}</li>)}
                            </ul>
                        </div>
                    ))}
                </Section>

                <div className="grid grid-cols-2 gap-x-8">
                    <Section title="Education" isPresent={education && education.length > 0}>
                        {education.map(edu => (
                            <div key={edu.id} className="mb-2 text-center">
                                <h3 className="text-md font-bold">{edu.institution}</h3>
                                <p className="text-sm italic text-gray-700">{edu.degree}</p>
                                <p className="text-xs text-gray-500">{edu.startDate} - {edu.endDate}</p>
                            </div>
                        ))}
                    </Section>

                    <Section title="Skills" isPresent={skills && skills.length > 0}>
                        <ul className="columns-2 text-center">
                            {skills.map(skill => <li key={skill.id}>{skill.name}</li>)}
                        </ul>
                    </Section>
                </div>
            </main>
        </div>
    );
};

export default GaramondTemplate;