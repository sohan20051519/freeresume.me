import React from 'react';
import { ResumeData } from '../../../types';

const formatUrl = (url: string) => {
    if (!url) return url;
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    if (url.includes('@')) return `mailto:${url}`;
    return `https://${url}`;
};

const FinancierTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
    const { personalInfo, summary, experience, education, skills, projects, certifications } = data;

    const Section: React.FC<{ title: string; children: React.ReactNode; isPresent: boolean }> = ({ title, children, isPresent }) => {
        if(!isPresent) return null;
        return (
            <section className="mb-4">
                <h2 className="text-sm font-bold uppercase tracking-widest text-gray-700 border-b border-gray-400 pb-1 mb-2">{title}</h2>
                {children}
            </section>
        );
    }
    
    const contactInfo = [
        personalInfo.address,
        personalInfo.phone,
        personalInfo.email && <a href={formatUrl(personalInfo.email)} className="hover:underline">{personalInfo.email}</a>,
        personalInfo.linkedin && <a href={formatUrl(personalInfo.linkedin)} target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>,
        personalInfo.website && <a href={formatUrl(personalInfo.website)} target="_blank" rel="noopener noreferrer" className="hover:underline">Website</a>,
    ].filter(Boolean);

    return (
        <div className="w-full h-full bg-white p-10 font-serif text-black text-[10.5pt] leading-snug flex flex-col">
            <header className="text-center mb-4">
                <h1 className="text-2xl font-bold tracking-wider">{personalInfo.fullName}</h1>
                 <div className="text-xs mt-1 text-gray-600 flex justify-center flex-wrap gap-x-2">
                    {contactInfo.map((item, index) => (
                        <React.Fragment key={index}>
                            {item}
                            {index < contactInfo.length - 1 && <span className="mx-1 text-gray-300">|</span>}
                        </React.Fragment>
                    ))}
                </div>
            </header>

            <main>
                <Section title="Summary" isPresent={!!summary}>
                    <p>{summary}</p>
                </Section>
                
                <Section title="Experience" isPresent={experience && experience.length > 0}>
                    {experience.map(exp => (
                        <div key={exp.id} className="mb-3">
                            <div className="flex justify-between items-baseline">
                                <p className="font-bold">{exp.company}</p>
                                <p className="text-[9.5pt]">{exp.location}</p>
                            </div>
                            <div className="flex justify-between items-baseline italic">
                                <p>{exp.jobTitle}</p>
                                <p className="text-[9.5pt]">{exp.startDate} - {exp.endDate}</p>
                            </div>
                            <ul className="list-disc list-outside ml-4 mt-1 space-y-0.5">
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
                            <ul className="list-disc list-outside ml-4 mt-1 space-y-0.5">
                                {proj.description.map((desc, i) => <li key={i}>{desc}</li>)}
                            </ul>
                        </div>
                    ))}
                </Section>

                <Section title="Education" isPresent={education && education.length > 0}>
                    {education.map(edu => (
                        <div key={edu.id} className="mb-2">
                                <div className="flex justify-between items-baseline">
                                <p className="font-bold">{edu.institution}</p>
                                <p className="text-[9.5pt]">{edu.location}</p>
                            </div>
                            <div className="flex justify-between items-baseline italic">
                                <p>{edu.degree}</p>
                                <p className="text-[9.5pt]">{edu.startDate} - {edu.endDate}</p>
                            </div>
                        </div>
                    ))}
                </Section>
                
                <Section title="Skills & Certifications" isPresent={(skills && skills.length > 0) || (certifications && certifications.length > 0)}>
                    <p>{skills.map(s => s.name).join(' • ')}</p>
                    {certifications.length > 0 && (
                        <div className="mt-2">
                            {certifications.map(cert => (
                                <p key={cert.id} className="text-xs">
                                    <span className="font-semibold">{cert.name}</span>, {cert.organization} ({cert.date})
                                </p>
                            ))}
                        </div>
                    )}
                </Section>
            </main>
        </div>
    );
};

export default FinancierTemplate;