import { useEffect, useRef, useState } from 'react';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { useLanguage } from '../hooks/useLanguage';

const Hero = () => {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const { ref: contentRef, isVisible } = useRevealOnScroll();
  const [textColor, setTextColor] = useState('white');
  const [currentLeftImage, setCurrentLeftImage] = useState(0);
  const [currentRightImage, setCurrentRightImage] = useState(0);
  const [isLeftTransitioning, setIsLeftTransitioning] = useState(false);
  const [isRightTransitioning, setIsRightTransitioning] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const leftInterval = setInterval(() => {
      setIsLeftTransitioning(true);
      setTimeout(() => {
        setCurrentLeftImage(prev => prev === 0 ? 1 : 0);
        setIsLeftTransitioning(false);
      }, 1000);
    }, 5000);

    const rightInterval = setInterval(() => {
      setIsRightTransitioning(true);
      setTimeout(() => {
        setCurrentRightImage(prev => prev === 0 ? 1 : 0);
        setIsRightTransitioning(false);
      }, 1000);
    }, 5500); // Slightly offset timing

    return () => {
      clearInterval(leftInterval);
      clearInterval(rightInterval);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrolled = window.pageYOffset;
        const parallaxOffset = scrolled * 0.3;
        const heroHeight = window.innerHeight;
        
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
        
        // Calculate scale effect for images
        // Scale increases as we scroll down, but returns to normal when back in hero section
        const scaleMaxScroll = heroHeight * 1.2; // Scale effect over 120% of viewport height
        const scaleProgress = Math.min(scrolled / scaleMaxScroll, 1);
        const imageScale = 1 + (scaleProgress * 0.3); // Scale from 1 to 1.3
        
        // Calculate separation effect - images move away from center during scroll
        const separationMaxScroll = heroHeight * 1.0; // Separation effect over 100% of viewport height
        const separationProgress = Math.min(scrolled / separationMaxScroll, 1);
        const separationOffset = separationProgress * 100; // Move up to 100px away from center
        
        parallaxRef.current.style.setProperty('--parallax-offset-left', `${-parallaxOffset - separationOffset}px`);
        parallaxRef.current.style.setProperty('--parallax-offset-right', `${parallaxOffset + separationOffset}px`);
        parallaxRef.current.style.setProperty('--image-opacity', imageOpacity.toString());
        parallaxRef.current.style.setProperty('--image-scale', imageScale.toString());
        parallaxRef.current.style.setProperty('--separation-offset', separationOffset.toString());
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
            className="w-full h-full object-cover transition-all duration-300 ease-out" 
            style={{ 
              opacity: 'var(--image-opacity, 1)',
              transform: 'scale(var(--image-scale, 1))'
            }}
          />
        </div>
        <div className="absolute right-0 top-0 w-1/2 h-full parallax-right overflow-hidden">
          <img 
            src="/soccer.jpg" 
            alt="Soccer" 
            className="w-full h-full object-cover transition-all duration-300 ease-out" 
            style={{ 
              opacity: 'var(--image-opacity, 1)',
              transform: 'scale(var(--image-scale, 1))'
            }}
          />
        </div>
        
        {/* Left side - Messi and Ronaldo alternating */}
        <div className="absolute left-0 top-0 w-1/2 h-full parallax-left overflow-hidden">
          <img
            src={currentLeftImage === 0 ? '/messi.jpg' : '/ronaldo.jpg'}
            alt={currentLeftImage === 0 ? 'Messi' : 'Ronaldo'}
            className={`w-full h-full object-cover brightness-75 hover:brightness-90`}
            style={{
              transform: `scale(var(--image-scale, 1))`,
              opacity: isLeftTransitioning ? 0 : 1,
              transition: 'opacity 1000ms ease-in-out, transform 100ms ease-out'
            }}
          />
        </div>

        {/* Right side - LeBron and Jordan alternating */}
        <div className="absolute right-0 top-0 w-1/2 h-full parallax-right overflow-hidden">
          <img
            src={currentRightImage === 0 ? '/lebron james.jpg' : '/m jordan.jpg'}
            alt={currentRightImage === 0 ? 'LeBron James' : 'Michael Jordan'}
            className={`w-full h-full object-cover brightness-75 hover:brightness-90`}
            style={{
              transform: `scale(var(--image-scale, 1))`,
              opacity: isRightTransitioning ? 0 : 1,
              transition: 'opacity 1000ms ease-in-out, transform 100ms ease-out'
            }}
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