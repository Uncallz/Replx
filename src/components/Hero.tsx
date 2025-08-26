import { useEffect, useRef, useState } from 'react';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { useLanguage } from '../hooks/useLanguage';

const Hero = () => {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const { ref: contentRef, isVisible } = useRevealOnScroll();
  const [textColor, setTextColor] = useState('white');
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrolled = window.pageYOffset;
        const parallaxOffset = scrolled * 0.3;
        
        // Calculate text color based on scroll progress
        const maxScroll = window.innerHeight * 0.5; // Change color at 50% of viewport height
        const scrollProgress = Math.min(scrolled / maxScroll, 1);
        
        // Interpolate between white and black
        const colorValue = Math.round(255 * (1 - scrollProgress));
        const newTextColor = `rgb(${colorValue}, ${colorValue}, ${colorValue})`;
        setTextColor(newTextColor);
        
        // Calculate opacity for images fade-out effect
        const fadeMaxScroll = window.innerHeight * 0.8; // Start fading at 80% of viewport height
        const fadeProgress = Math.min(scrolled / fadeMaxScroll, 1);
        const imageOpacity = Math.max(1 - fadeProgress, 0); // Fade from 1 to 0
        
        parallaxRef.current.style.setProperty('--parallax-offset-left', `${-parallaxOffset}px`);
        parallaxRef.current.style.setProperty('--parallax-offset-right', `${parallaxOffset}px`);
        parallaxRef.current.style.setProperty('--image-opacity', imageOpacity.toString());
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-0">
      {/* Split Background with Parallax */}
      <div ref={parallaxRef} className="absolute inset-0">
        <div className="absolute left-0 top-0 w-1/2 h-full parallax-left overflow-hidden">
          <img 
            src="/basketball.jpg" 
            alt="Basketball" 
            className="w-full h-full object-cover transition-opacity duration-300 ease-out" 
            style={{ opacity: 'var(--image-opacity, 1)' }}
          />
        </div>
        <div className="absolute right-0 top-0 w-1/2 h-full parallax-right overflow-hidden">
          <img 
            src="/soccer.jpg" 
            alt="Soccer" 
            className="w-full h-full object-cover transition-opacity duration-300 ease-out" 
            style={{ opacity: 'var(--image-opacity, 1)' }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div ref={contentRef} className={`reveal-on-scroll ${isVisible ? 'revealed' : ''}`}>
          <p className="text-sm mb-6 font-medium" style={{ color: textColor }}>
            <span className="px-3 py-1 rounded-md" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
              {t('hero.tagline')}
            </span>
          </p>
          
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight" style={{ fontFamily: "'Impact', 'Bebas Neue', 'Oswald', 'Arial Black', sans-serif" }}>
            <span className="text-[#D32F2F]" style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", WebkitTextStroke: "1px white" }}>{t('hero.title1')}</span><br />
            <span className="text-[#FF0000]" style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", WebkitTextStroke: "1px white" }}>{t('hero.title2')}</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-10 max-w-4xl mx-auto leading-relaxed" style={{ color: textColor, textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}>
            {t('hero.subtitle1')}<br />
            {t('hero.subtitle2')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button
              onClick={() => scrollToSection('footer')}
              className="bg-[#0A84FF] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-500 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              {t('hero.joinExclusiveDrop')}
            </button>
            <button
              onClick={() => scrollToSection('social')}
              className="px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 text-white"
              style={{ backgroundColor: 'rgba(9, 176, 129, 0.8)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgb(9, 176, 129)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(9, 176, 129, 0.8)';
              }}
            >
              {t('hero.openVintedProfiles')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;