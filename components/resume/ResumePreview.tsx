import React, { useState, useRef, useLayoutEffect } from 'react';
import { useResume } from '../../context/ResumeContext';
import { TEMPLATES } from '../../constants';

const ResumePreview = React.forwardRef<HTMLDivElement>((_, ref) => {
    const { state } = useResume();
    const { data, templateId } = state;

    const SelectedTemplate = TEMPLATES.find(t => t.id === templateId)?.component;

    const containerRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(0);

    useLayoutEffect(() => {
        const currentContainer = containerRef.current;
        if (!currentContainer) return;

        const observer = new ResizeObserver((entries) => {
            if (entries[0]) {
                const containerWidth = entries[0].contentRect.width;
                if(containerWidth > 0) {
                    // The resume's base width is 850px.
                    // Calculate the scale factor needed to fit it into the container.
                    setScale(containerWidth / 850);
                }
            }
        });

        observer.observe(currentContainer);

        // Perform an initial measurement on mount
        const initialWidth = currentContainer.offsetWidth;
        if (initialWidth > 0) {
            setScale(initialWidth / 850);
        }

        return () => observer.disconnect();
    }, []);


    return (
        <div className="bg-gray-100 p-4 sm:p-6 rounded-2xl shadow-neumorphic">
            {/* This div is for measuring the container's width and clipping the scaled content */}
            <div 
                ref={containerRef} 
                className="aspect-[8.5/11] w-full bg-white shadow-lg overflow-hidden"
            >
                 {/* This wrapper div handles the scaling transformation */}
                 <div style={{
                     transform: `scale(${scale})`,
                     transformOrigin: 'top left',
                     // Hide until scaled to prevent a flicker of oversized content
                     visibility: scale > 0 ? 'visible' : 'hidden',
                 }}>
                    {/* 
                      The forwarded ref from EditorPage points to this div.
                      This ensures that the PDF generation logic gets the full-size, unscaled resume content.
                    */}
                    <div ref={ref} className="w-[850px] h-[1100px] bg-white">
                        {SelectedTemplate ? <SelectedTemplate data={data} /> : <div>Template not found.</div>}
                    </div>
                </div>
            </div>
        </div>
    );
});

export default ResumePreview;