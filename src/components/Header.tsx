import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { useLanguage } from '../hooks/useLanguage';
import ThemeToggle from './ThemeToggle';
import LanguageSelector from './LanguageSelector';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { ref: headerRef, isVisible } = useRevealOnScroll();
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header ref={headerRef} className={`fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-65 dark:bg-gray-900 dark:bg-opacity-65 backdrop-blur-sm transition-all duration-300 ${
      isScrolled ? 'shadow-md dark:shadow-gray-700/20' : ''
    } reveal-on-scroll ${isVisible ? 'revealed' : ''}`}>
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center relative group">
          {/* Sfondo sferico bianco che appare al hover */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white rounded-full opacity-0 group-hover:opacity-80 transition-all duration-300 pointer-events-none shadow-lg scale-75 group-hover:scale-100 z-0"></div>
          <img 
            src="/Progetto senza titolo.png" 
            alt="REPLX" 
            className="h-16 w-auto transition-all duration-300 relative z-10"
          />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6 lg:space-x-8 xl:space-x-10">
          <button
            onClick={() => scrollToSection('drops')}
            className="text-gray-700 dark:text-gray-300 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-yellow-500 hover:text-white"
            style={{
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.textShadow = '1px 1px 2px black';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.textShadow = 'none';
            }}
          >
            {t('header.drops')}
          </button>
          <button
            onClick={() => scrollToSection('how')}
            className="text-gray-700 dark:text-gray-300 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-yellow-500 hover:text-white"
            style={{
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.textShadow = '1px 1px 2px black';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.textShadow = 'none';
            }}
          >
            {t('header.howToOrder')}
          </button>
          <button
            onClick={() => scrollToSection('compare')}
            className="text-gray-700 dark:text-gray-300 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-yellow-500 hover:text-white"
            style={{
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.textShadow = '1px 1px 2px black';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.textShadow = 'none';
            }}
          >
            {t('header.whyReplx')}
          </button>
          <button
            onClick={() => scrollToSection('offer')}
            className="text-gray-700 dark:text-gray-300 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-yellow-500 hover:text-white"
            style={{
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.textShadow = '1px 1px 2px black';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.textShadow = 'none';
            }}
          >
            {t('header.getDiscount')}
          </button>
          <button
            onClick={() => scrollToSection('faq')}
            className="text-gray-700 dark:text-gray-300 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-yellow-500 hover:text-white"
            style={{
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.textShadow = '1px 1px 2px black';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.textShadow = 'none';
            }}
          >
            {t('header.faq')}
          </button>
          <button
            onClick={() => scrollToSection('social')}
            className="text-gray-700 dark:text-gray-300 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-yellow-500 hover:text-white"
            style={{
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.textShadow = '1px 1px 2px black';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.textShadow = 'none';
            }}
          >
            {t('header.vintedProfiles')}
          </button>
        </div>

        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex items-center space-x-3">
            <LanguageSelector />
            <ThemeToggle />
          </div>
          <button
            onClick={() => scrollToSection('footer')}
            className="bg-[#0A84FF] text-white px-6 py-2 rounded-lg font-medium hover:bg-yellow-500 transition-colors duration-200 transform hover:scale-105 whitespace-nowrap ml-4"
          >
            {t('header.joinExclusiveDrop')}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-700 dark:text-gray-300"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-700 shadow-lg">
          <div className="px-4 py-2 space-y-2">
            <button
              onClick={() => scrollToSection('drops')}
              className="block w-full text-left py-2 px-3 rounded-lg text-gray-700 dark:text-gray-300 transition-all duration-200 hover:bg-yellow-500 hover:text-white"
              onMouseEnter={(e) => {
                e.currentTarget.style.textShadow = '1px 1px 2px black';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.textShadow = 'none';
              }}
            >
              {t('header.drops')}
            </button>
            <button
              onClick={() => scrollToSection('how')}
              className="block w-full text-left py-2 px-3 rounded-lg text-gray-700 dark:text-gray-300 transition-all duration-200 hover:bg-yellow-500 hover:text-white"
              onMouseEnter={(e) => {
                e.currentTarget.style.textShadow = '1px 1px 2px black';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.textShadow = 'none';
              }}
            >
              {t('header.howToOrder')}
            </button>
            <button
              onClick={() => scrollToSection('compare')}
              className="block w-full text-left py-2 px-3 rounded-lg text-gray-700 dark:text-gray-300 transition-all duration-200 hover:bg-yellow-500 hover:text-white"
              onMouseEnter={(e) => {
                e.currentTarget.style.textShadow = '1px 1px 2px black';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.textShadow = 'none';
              }}
            >
              {t('header.whyReplx')}
            </button>
            <button
              onClick={() => scrollToSection('offer')}
              className="block w-full text-left py-2 px-3 rounded-lg text-gray-700 dark:text-gray-300 transition-all duration-200 hover:bg-yellow-500 hover:text-white"
              onMouseEnter={(e) => {
                e.currentTarget.style.textShadow = '1px 1px 2px black';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.textShadow = 'none';
              }}
            >
              {t('header.getDiscount')}
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="block w-full text-left py-2 px-3 rounded-lg text-gray-700 dark:text-gray-300 transition-all duration-200 hover:bg-yellow-500 hover:text-white"
              onMouseEnter={(e) => {
                e.currentTarget.style.textShadow = '1px 1px 2px black';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.textShadow = 'none';
              }}
            >
              {t('header.faq')}
            </button>
            <button
              onClick={() => scrollToSection('social')}
              className="block w-full text-left py-2 px-3 rounded-lg text-gray-700 dark:text-gray-300 transition-all duration-200 hover:bg-yellow-500 hover:text-white"
              onMouseEnter={(e) => {
                e.currentTarget.style.textShadow = '1px 1px 2px black';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.textShadow = 'none';
              }}
            >
              {t('header.vintedProfiles')}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;