import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import EditorForm from '../components/editor/EditorForm';
import ResumePreview from '../components/resume/ResumePreview';

export default function EditorPage() {
    const navigate = useNavigate();
    const resumePreviewRef = useRef<HTMLDivElement>(null);
    const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

    const handlePrint = () => {
        const resumeNode = resumePreviewRef.current;
        if (!resumeNode) {
            alert("Could not find resume content to print.");
            return;
        }

        const printWindow = window.open('', '_blank');
        if (!printWindow) {
            alert("Could not open print window. Please disable your popup blocker for this site.");
            return;
        }

        printWindow.document.write(`
            <html>
                <head>
                    <title>Your Resume</title>
                    <script src="https://cdn.tailwindcss.com"></script>
                    <script>
                      tailwind.config = {
                        theme: {
                          extend: {
                            colors: {
                               'brand-primary': '#4f46e5',
                               'brand-secondary': '#7c3aed',
                            }
                          }
                        }
                      }
                    </script>
                    <style>
                        @page {
                            size: letter;
                            margin: 0; /* Remove browser default margins */
                        }
                        body {
                            margin: 0;
                            -webkit-print-color-adjust: exact; /* For Chrome, Safari */
                            print-color-adjust: exact; /* For Firefox */
                        }
                        /* Override fixed preview dimensions for printing */
                        .w-\\[816px\\] {
                            width: 100% !important;
                        }
                        .h-\\[1056px\\] {
                            height: 100vh !important; /* Fit to one page exactly */
                            overflow: hidden !important; /* Crop anything that overflows */
                            box-sizing: border-box !important;
                        }
                    </style>
                </head>
                <body>
                    ${resumeNode.outerHTML}
                </body>
            </html>
        `);

        printWindow.document.close();

        // The timeout is crucial to let TailwindCSS initialize in the new window
        setTimeout(() => {
            printWindow.focus();
            printWindow.print();
            printWindow.close();
        }, 1000);
    };

    const ActionButtons = () => (
        <>
            <button
                onClick={() => navigate('/templates')}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-700 font-bold rounded-full shadow-neumorphic-sm hover:shadow-neumorphic-sm-inset transform hover:scale-105 transition-all duration-300 ease-in-out"
            >
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                    <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                </svg>
                <span>Change Template</span>
            </button>
            <button
                onClick={handlePrint}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v6a2 2 0 002 2h12a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd" />
                </svg>
                <span>Print / Save as PDF</span>
            </button>
        </>
    );

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-200">
            {/* Left Side: Editor Form */}
            <div className="w-full md:w-1/2 lg:w-2/5 p-4 md:p-6 lg:p-8">
                <div className="bg-gray-100 rounded-2xl shadow-neumorphic-inset p-6">
                    <EditorForm />
                </div>
            </div>

            {/* Right Side: Resume Preview (Desktop) */}
            <div className="hidden md:block w-full md:w-1/2 lg:w-3/5 p-4 md:p-6 lg:p-8">
                <div className="sticky top-24">
                    <div className="mb-4 flex flex-col sm:flex-row justify-end gap-3">
                        <ActionButtons />
                    </div>
                    <ResumePreview ref={resumePreviewRef} />
                </div>
            </div>

            {/* Floating Preview Button (Mobile) */}
            <button
                onClick={() => setIsPreviewModalOpen(true)}
                className="md:hidden fixed bottom-6 right-6 z-30 flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out"
                aria-haspopup="true"
                aria-expanded={isPreviewModalOpen}
                aria-label="Open resume preview"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.022 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
                <span>Preview</span>
            </button>
            
            {/* Preview Modal (Mobile) */}
            {isPreviewModalOpen && (
                <div className="md:hidden fixed inset-0 bg-gray-100 z-50 flex flex-col" role="dialog" aria-modal="true">
                    <header className="flex justify-between items-center p-4 border-b bg-white/50 backdrop-blur-sm shrink-0">
                        <h3 className="font-bold text-gray-800 text-lg">Resume Preview</h3>
                        <button 
                            onClick={() => setIsPreviewModalOpen(false)}
                            className="text-2xl p-1 rounded-full text-gray-500 hover:bg-gray-200 leading-none"
                            aria-label="Close preview"
                        >
                            &times;
                        </button>
                    </header>
    
                    <div className="flex-grow p-4 overflow-y-auto">
                        <ResumePreview ref={resumePreviewRef} />
                    </div>
    
                    <footer className="p-4 border-t bg-white/50 backdrop-blur-sm flex flex-col sm:flex-row justify-center gap-3 shrink-0">
                        <ActionButtons />
                    </footer>
                </div>
            )}
        </div>
    );
}