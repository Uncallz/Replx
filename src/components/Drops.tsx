import { useState, useEffect, useMemo } from 'react';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { useLanguage } from '../hooks/useLanguage';
import { Clock, MessageCircle, Shield } from 'lucide-react';

const Drops = () => {
  const { ref: sectionRef, isVisible } = useRevealOnScroll();
  const { t } = useLanguage();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const featuredShirts = useMemo(() => [
    {
      title: t('drops.classicFootball'),
      badge: t('drops.dispatch48h'),
      icon: Clock,
      images: ["milan.png", "barcellona.png", "inter.png", "roma.png"]
    },
    {
      title: t('drops.nbaShirt'),
      badge: t('drops.sizeAdvice'),
      icon: MessageCircle,
      images: ["b 1.png", "b 2.png", "b 3.png", "b 4.png"]
    },
    {
      title: t('drops.kidsFullKit'),
      badge: t('drops.customization'),
      icon: Shield,
      images: ["kid mbappe.png", "kid messi.png", "kid ronaldo.png", "kid yamine.png"]
    },
    {
      title: t('drops.iconicRetro'),
      badge: t('drops.curatedQuality'),
      icon: Clock,
      images: ["roma inas.png", "fiorentina.png"]
    },
    {
      title: t('drops.limitedEdition'),
      badge: t('drops.liveChatSupport'),
      icon: MessageCircle,
      images: ["atene milan.png"]
    }
  ], [t]);

  const [currentImageIndexes, setCurrentImageIndexes] = useState(
    featuredShirts.map(() => 0)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndexes(prevIndexes =>
        prevIndexes.map((currentIndex, shirtIndex) => {
          const maxIndex = featuredShirts[shirtIndex].images.length - 1;
          return currentIndex >= maxIndex ? 0 : currentIndex + 1;
        })
      );
    }, 2000); // Cambia immagine ogni 2 secondi

    return () => clearInterval(interval);
  }, [featuredShirts]);

  return (
    <section id="drops" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div ref={sectionRef} className={`reveal-on-scroll ${isVisible ? 'revealed' : ''}`}>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">{t('drops.title')}</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {featuredShirts.map((shirt, index) => {
              const IconComponent = shirt.icon;
              return (
                <div
                  key={index}
                  className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 text-center min-h-[500px] flex flex-col"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Image Display */}
                  <div className="w-full h-48 bg-gray-100 dark:bg-gray-700 rounded-lg mb-4 overflow-hidden relative flex-shrink-0">
                    {shirt.images.length > 0 ? (
                      <>
                        <div 
                          className="flex transition-transform duration-1000 ease-in-out h-full"
                          style={{
                            transform: `translateX(-${currentImageIndexes[index] * 100}%)`
                          }}
                        >
                          {shirt.images.map((image, imgIndex) => (
                            <div key={imgIndex} className="w-full h-full flex-shrink-0">
                              <img 
                                src={image} 
                                alt={`${shirt.title} ${imgIndex + 1}`}
                                className="w-full h-full object-contain"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = 'none';
                                }}
                              />
                            </div>
                          ))}
                        </div>
                        
                        {/* Indicators */}
                        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                          {shirt.images.map((_, imgIndex) => (
                            <div
                              key={imgIndex}
                              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                                currentImageIndexes[index] === imgIndex 
                                  ? 'bg-[#0A84FF]' 
                                  : 'bg-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    ) : (
                      /* PNG Placeholder */
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <span className="text-gray-500 text-sm">PNG</span>
                          </div>
                          <p className="text-gray-500 text-sm">Shirt image placeholder</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex-grow flex flex-col">
                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white leading-tight min-h-[3rem] flex items-center justify-center">{shirt.title}</h3>

                      {/* Trust Badge */}
                      <div className="flex items-center justify-center mb-6 text-sm text-gray-600 dark:text-gray-300">
                        <IconComponent size={16} className="mr-2 text-[#0A84FF] flex-shrink-0" />
                        <span className="text-center">{shirt.badge}</span>
                      </div>
                    </div>

                    {/* CTAs */}
                    <div className="space-y-3 mt-auto">
                      <button
                        onClick={() => scrollToSection('social')}
                        className="w-full bg-[#0A84FF] text-white py-3 rounded-lg font-medium hover:bg-yellow-500 transition-colors duration-200"
                      >
                        {t('drops.dmToOrder')}
                      </button>
                      <button
                        onClick={() => scrollToSection('footer')}
                        className="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 rounded-lg text-sm hover:border-[#0A84FF] hover:text-[#0A84FF] transition-colors duration-200"
                      >
                        {t('drops.joinExclusiveDrop')}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Drops;