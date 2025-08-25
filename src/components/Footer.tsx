import React from 'react';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { useLanguage } from '../hooks/useLanguage';

const Footer = () => {
  const { t } = useLanguage();
  const { ref: footerRef, isVisible } = useRevealOnScroll();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };



  return (
    <footer id="footer" ref={footerRef} className={`bg-gray-900 dark:bg-black text-white py-20 reveal-on-scroll ${isVisible ? 'revealed' : ''}`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Navigation Links */}
          <div className="mb-8 md:mb-0">
            <h3 className="text-lg font-semibold mb-3">{t('footer.quickLinks')}</h3>
            <div className="flex flex-col space-y-2">
              <button
                onClick={() => scrollToSection('drops')}
                className="text-gray-400 hover:text-white transition-colors text-left"
              >
                {t('footer.drops')}
              </button>
              <button
                onClick={() => scrollToSection('how')}
                className="text-gray-400 hover:text-white transition-colors text-left"
              >
                {t('footer.howToOrder')}
              </button>
              <button
                onClick={() => scrollToSection('compare')}
                className="text-gray-400 hover:text-white transition-colors text-left"
              >
                {t('footer.whyReplx')}
              </button>
              <button
                onClick={() => scrollToSection('offer')}
                className="text-gray-400 hover:text-white transition-colors text-left"
              >
                {t('footer.get10Off')}
              </button>
              <button
                onClick={() => scrollToSection('faq')}
                className="text-gray-400 hover:text-white transition-colors text-left"
              >
                {t('footer.faq')}
              </button>
              <button
                onClick={() => scrollToSection('social')}
                className="text-gray-400 hover:text-white transition-colors text-left"
              >
                {t('footer.social')}
              </button>
            </div>
          </div>

          <div className="mb-8 md:mb-0 md:flex-1">
            <p className="text-gray-400 max-w-md">
              {t('footer.description')}<br />
              {t('footer.tagline')}
            </p>
            <div className="mt-6">
              <p className="text-gray-400 text-sm">
                {t('footer.contactUs')} <a href="mailto:replx.co@outlook.com" className="text-[#0A84FF] hover:text-blue-400 transition-colors">replx.co@outlook.com</a>
              </p>
            </div>
          </div>

          {/* Info Section */}
          <div className="bg-gray-800 dark:bg-gray-900 p-6 rounded-xl md:flex-1 w-full">
            <h3 className="text-lg font-semibold mb-3">{t('footer.joinDropList')}</h3>
            <p className="text-gray-400 text-sm mb-5">{t('footer.dropListDescription')}</p>
            <div className="text-center">
              <p className="text-sm text-gray-400">{t('footer.thankYou')}</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
          <p>
            {t('footer.copyright')}{' '}
            <a href="/privacy.html" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">{t('footer.privacy')}</a>
            {' · '}
            <a href="/terms.html" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">{t('footer.terms')}</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;