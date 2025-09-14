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

const CorporateTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
    const { personalInfo, summary, experience, education, skills, projects, certifications, languages } = data;

    const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
        <section className="mb-5">
            <h2 className="text-sm font-bold uppercase tracking-[.2em] text-gray-600 border-b-2 border-gray-300 pb-1 mb-3">{title}</h2>
            {children}
        </section>
    );

    return (
        <div className="h-full bg-white p-10 font-sans text-gray-800 text-sm flex flex-col">
            <header className="text-center mb-8 shrink-0">
                <h1 className="text-4xl font-serif font-bold tracking-wider">{personalInfo.fullName}</h1>
                <p className="text-lg font-light text-gray-700 mt-1">{personalInfo.jobTitle}</p>
                 <div className="text-xs text-gray-500 mt-3 flex justify-center flex-wrap gap-x-4">
                    {personalInfo.email && <a href={formatUrl(personalInfo.email)} className="hover:underline">{personalInfo.email}</a>}
                    {personalInfo.phone && <span>{personalInfo.phone}</span>}
                    {personalInfo.linkedin && <a href={formatUrl(personalInfo.linkedin)} target="_blank" rel="noopener noreferrer" className="hover:underline">{personalInfo.linkedin}</a>}
                </div>
            </header>

            <main>
                <Section title="Summary">
                    <p className="leading-relaxed">{summary}</p>
                </Section>

                <Section title="Experience">
                    {experience.map(exp => (
                        <div key={exp.id} className="mb-4">
                            <div className="flex justify-between items-baseline">
                                <h3 className="text-md font-semibold">{exp.jobTitle}, <span className="font-normal italic">{exp.company}</span></h3>
                                <p className="text-xs text-gray-500">{exp.startDate} - {exp.endDate}</p>
                            </div>
                            <ul className="list-disc list-outside ml-5 mt-1 space-y-1 text-gray-700">
                                {exp.description.map((desc, i) => <li key={i}>{desc}</li>)}
                            </ul>
                        </div>
                    ))}
                </Section>
                
                {projects.length > 0 && (
                    <Section title="Projects">
                        {projects.map(proj => (
                            <div key={proj.id} className="mb-4">
                                <div className="flex justify-between items-baseline">
                                    <h3 className="text-md font-semibold">{proj.name}</h3>
                                    {proj.link && <a href={formatUrl(proj.link)} target="_blank" rel="noopener noreferrer" className="text-xs text-brand-primary hover:underline">View Project</a>}
                                </div>
                                <ul className="list-disc list-outside ml-5 mt-1 space-y-1 text-gray-700">
                                    {proj.description.map((desc, i) => <li key={i}>{desc}</li>)}
                                </ul>
                            </div>
                        ))}
                    </Section>
                )}
            </main>
            
            <footer className="shrink-0">
                <Section title="Education">
                    {education.map(edu => (
                        <div key={edu.id} className="mb-2">
                            <div className="flex justify-between items-baseline">
                                <h3 className="text-md font-semibold">{edu.institution}</h3>
                                <p className="text-xs text-gray-500">{edu.startDate} - {edu.endDate}</p>
                            </div>
                            <p className="italic">{edu.degree}</p>
                        </div>
                    ))}
                </Section>

                <Section title="Skills">
                    <p>{skills.map(skill => skill.name).join(' | ')}</p>
                </Section>
            </footer>
        </div>
    );
};

export default CorporateTemplate;
