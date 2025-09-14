import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
    const location = useLocation();
    const isLandingPage = location.pathname === '/';
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinkClasses = "font-semibold text-gray-600 hover:text-brand-primary transition-colors pb-1 border-b-2";
    const activeLinkClasses = "text-brand-primary border-brand-primary";
    const inactiveLinkClasses = "border-transparent";
    
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <>
            <header className="bg-gray-100/80 backdrop-blur-lg z-40 shadow-sm border-b border-gray-200 sticky top-0">
                <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <Link to="/" className="text-2xl font-bold text-gray-800">
                        freeresume.me
                    </Link>
                    
                    {/* Desktop Navigation */}
                    {!isLandingPage && (
                        <div className="hidden md:flex items-center gap-8">
                            <Link
                                to="/"
                                className={`${navLinkClasses} ${isLandingPage ? activeLinkClasses : inactiveLinkClasses}`}
                            >
                                Home
                            </Link>
                            <Link
                                to="/templates"
                                className={`${navLinkClasses} ${location.pathname.startsWith('/templates') ? activeLinkClasses : inactiveLinkClasses}`}
                            >
                                Templates
                            </Link>
                            <Link
                                to="/editor"
                                className={`${navLinkClasses} ${location.pathname.startsWith('/editor') ? activeLinkClasses : inactiveLinkClasses}`}
                            >
                                Editor
                            </Link>
                        </div>
                    )}

                    {/* Mobile Menu Button */}
                    {!isLandingPage && (
                        <div className="md:hidden">
                            <button 
                                onClick={() => setIsMenuOpen(true)}
                                aria-label="Open menu" 
                                className="text-gray-800 focus:outline-none"
                                aria-haspopup="true"
                                aria-expanded={isMenuOpen}
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                            </button>
                        </div>
                    )}
                </nav>
            </header>
            
             {/* Mobile Menu Overlay */}
            {isMenuOpen && !isLandingPage && (
                 <div 
                    className="fixed inset-0 z-50 md:hidden" 
                    role="dialog" 
                    aria-modal="true"
                 >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/30" onClick={closeMenu} aria-hidden="true"></div>
                    
                    {/* Menu Panel */}
                    <div className="absolute top-0 right-0 h-full w-2/3 max-w-sm bg-gray-100 shadow-xl p-6 transform transition-transform ease-in-out duration-300">
                        <div className="flex justify-between items-center mb-8">
                             <h2 className="text-xl font-bold text-gray-800">Menu</h2>
                             <button 
                                onClick={closeMenu} 
                                aria-label="Close menu" 
                                className="text-gray-600 hover:text-gray-900"
                             >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        </div>
                        <nav className="flex flex-col space-y-6">
                            <Link to="/" onClick={closeMenu} className="text-lg font-semibold text-gray-700 hover:text-brand-primary">Home</Link>
                            <Link to="/templates" onClick={closeMenu} className="text-lg font-semibold text-gray-700 hover:text-brand-primary">Templates</Link>
                            <Link to="/editor" onClick={closeMenu} className="text-lg font-semibold text-gray-700 hover:text-brand-primary">Editor</Link>
                        </nav>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;