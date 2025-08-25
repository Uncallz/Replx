// React import not needed for JSX in React 17+
import { MessageCircle, Instagram } from 'lucide-react';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { useLanguage } from '../hooks/useLanguage';

const Social = () => {
  const { ref: sectionRef, isVisible } = useRevealOnScroll();
  const { t } = useLanguage();

  const vintedProfiles = [
    {
      name: t('social.vintedNBA'),
      link: 'https://www.vinted.it/member/82183886',
      description: t('social.vintedNBADescription'),
      available: true
    },
    {
      name: t('social.vintedKids'),
      link: 'https://www.vinted.it/member/274101998',
      description: t('social.vintedKidsDescription'),
      available: true
    },
    {
      name: t('social.vintedFootball'),
      link: '#',
      description: t('social.vintedFootballDescription'),
      available: false
    }
  ];

  return (
    <section id="social" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div ref={sectionRef} className={`reveal-on-scroll ${isVisible ? 'revealed' : ''}`}>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">{t('social.title')}</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
              {t('social.subtitle')}
            </p>
          </div>

          {/* Vinted Profiles Section */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-center mb-10 text-gray-900 dark:text-white">
              {t('social.vintedProfilesTitle')}
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {vintedProfiles.map((profile, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="text-center mb-4">
                    <div className="text-2xl mb-3">⭐⭐⭐⭐⭐</div>
                  </div>
                  <div className="flex items-center justify-center mb-4">
                    <MessageCircle className="w-8 h-8 text-[#0A84FF] mr-3" />
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white">{profile.name}</h4>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">{profile.description}</p>
                  {profile.available ? (
                    <a
                      href={profile.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-[#0A84FF] text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors duration-200"
                    >
                      {t('social.visitProfile')}
                    </a>
                  ) : (
                    <button className="inline-block bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 px-6 py-3 rounded-lg font-semibold cursor-not-allowed">
                      {t('social.comingSoon')}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Follow Us Section */}
          <div className="text-center">
            <h3 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900 dark:text-white">
              {t('social.followUs')}
            </h3>
            <div className="flex justify-center space-x-8">
              <a
                href="https://www.instagram.com/replx_official/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full hover:scale-110 transition-transform duration-200 animate-pulse"
              >
                <Instagram className="w-12 h-12 text-white" />
              </a>
              <a
                href="https://www.tiktok.com/@replx_official"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black p-3 rounded-full hover:scale-110 transition-transform duration-200 animate-pulse"
              >
                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
              <a
                href="https://t.me/+IBINZPL548g4ZGY0"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#0088cc] p-3 rounded-full hover:scale-110 transition-transform duration-200 animate-pulse"
              >
                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Social;