import React from 'react';
import { ResumeData } from '../../../types';

const HarvardTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
    const { personalInfo, education, experience, skills, projects } = data;

    return (
        <div className="h-full bg-white p-10 font-serif text-black text-sm">
            {/* Header */}
            <header className="text-center mb-6">
                <h1 className="text-3xl font-bold uppercase tracking-widest">{personalInfo.fullName}</h1>
                <div className="flex justify-center flex-wrap text-xs mt-2 text-gray-700">
                    <span>{personalInfo.address}</span>
                    <span className="mx-2">|</span>
                    <span>{personalInfo.phone}</span>
                    <span className="mx-2">|</span>
                    <span>{personalInfo.email}</span>
                    {personalInfo.linkedin && <><span className="mx-2">|</span><span>{personalInfo.linkedin}</span></>}
                    {personalInfo.website && <><span className="mx-2">|</span><span>{personalInfo.website}</span></>}
                </div>
            </header>

            {/* Education */}
            <section className="mb-4">
                <h2 className="text-md font-bold border-b-2 border-black pb-1 mb-2 uppercase tracking-wider">Education</h2>
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
            </section>

            {/* Experience */}
            <section className="mb-4">
                <h2 className="text-md font-bold border-b-2 border-black pb-1 mb-2 uppercase tracking-wider">Experience</h2>
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
            </section>
            
            {/* Projects */}
            {projects.length > 0 && (
                <section className="mb-4">
                    <h2 className="text-md font-bold border-b-2 border-black pb-1 mb-2 uppercase tracking-wider">Projects</h2>
                    {projects.map(proj => (
                         <div key={proj.id} className="mb-3">
                            <div className="flex justify-between items-baseline">
                                <p className="font-bold">{proj.name}</p>
                                {proj.link && <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline">View Project</a>}
                            </div>
                            <ul className="list-disc list-outside ml-5 mt-1 space-y-1 text-sm">
                                {proj.description.map((desc, i) => <li key={i}>{desc}</li>)}
                            </ul>
                        </div>
                    ))}
                </section>
            )}

            {/* Skills */}
            <section>
                <h2 className="text-md font-bold border-b-2 border-black pb-1 mb-2 uppercase tracking-wider">Skills</h2>
                <p className="text-sm">
                    {skills.map(skill => skill.name).join(', ')}
                </p>
            </section>
        </div>
    );
};

export default HarvardTemplate;