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

const GaramondTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
    const { personalInfo, summary, experience, education, skills, projects } = data;
    
    const Section: React.FC<{ title: string; children: React.ReactNode; }> = ({ title, children }) => (
        <section className="mb-5">
            <h2 className="text-center text-sm font-bold tracking-[.25em] text-gray-700 uppercase mb-3">{title}</h2>
            {children}
        </section>
    );

    return (
        <div className="h-full bg-white p-10 font-serif text-gray-800 text-sm leading-relaxed">
            {/* Header */}
            <header className="text-center mb-8">
                <h1 className="text-4xl font-bold tracking-wide">{personalInfo.fullName}</h1>
                <p className="text-md text-gray-600 mt-2">{personalInfo.jobTitle}</p>
                 <div className="text-xs text-gray-500 mt-3 flex justify-center items-center flex-wrap gap-x-2">
                    {personalInfo.email && <a href={formatUrl(personalInfo.email)} className="hover:underline">{personalInfo.email}</a>}
                    {personalInfo.phone && <><span>&bull;</span><span>{personalInfo.phone}</span></>}
                    {personalInfo.address && <><span>&bull;</span><span>{personalInfo.address}</span></>}
                </div>
            </header>

            <main>
                <Section title="Summary">
                    <p className="text-center">{summary}</p>
                </Section>

                <Section title="Experience">
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
                </section>
                
                <div className="grid grid-cols-2 gap-x-8">
                    <Section title="Education">
                        {education.map(edu => (
                            <div key={edu.id} className="mb-2 text-center">
                                <h3 className="text-md font-bold">{edu.institution}</h3>
                                <p className="text-sm italic text-gray-700">{edu.degree}</p>
                                <p className="text-xs text-gray-500">{edu.startDate} - {edu.endDate}</p>
                            </div>
                        ))}
                    </Section>

                    <Section title="Skills">
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
