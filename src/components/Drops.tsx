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
      images: ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png", "8.png", "9.png"]
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
      images: ["k 1.png", "k 2.png", "k 3.png", "k 4.png", "k 5.png"]
    },
    {
      title: t('drops.iconicRetro'),
      badge: t('drops.curatedQuality'),
      icon: Clock,
      images: ["r 1.png", "r 2.png", "r 3.png", "r 4.png", "r 5.png", "r 6.png", "r 7.png", "r 8.png", "r 9.png", "r 10.png", "r 11.png", "r 12.png", "r 13.png", "r 14.png", "r 15.png", "r 16.png", "r 17.png", "r 18.png", "r 19.png", "r 20.png"]
    }
  ], [t]);

  const [currentImageIndexes, setCurrentImageIndexes] = useState(
    featuredShirts.map(() => 0)
  );
  const [isTransitioning, setIsTransitioning] = useState(
    featuredShirts.map(() => true)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndexes(prevIndexes =>
        prevIndexes.map((currentIndex, shirtIndex) => {
          const nextIndex = currentIndex + 1;
          const maxIndex = featuredShirts[shirtIndex].images.length;
          
          if (nextIndex >= maxIndex) {
            // Quando raggiungiamo la fine, disabilitiamo la transizione e resettiamo
            setTimeout(() => {
              setIsTransitioning(prev => {
                const newState = [...prev];
                newState[shirtIndex] = false;
                return newState;
              });
              setCurrentImageIndexes(prev => {
                const newIndexes = [...prev];
                newIndexes[shirtIndex] = 0;
                return newIndexes;
              });
              // Riabilitiamo la transizione dopo un frame
              setTimeout(() => {
                setIsTransitioning(prev => {
                  const newState = [...prev];
                  newState[shirtIndex] = true;
                  return newState;
                });
              }, 50);
            }, 1000); // Aspettiamo che finisca l'animazione corrente
          }
          
          return nextIndex;
        })
      );
    }, 4000); // Cambia immagine ogni 4 secondi

    return () => clearInterval(interval);
  }, [featuredShirts]);

  return (
    <section id="drops" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div ref={sectionRef} className={`reveal-on-scroll ${isVisible ? 'revealed' : ''}`}>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">{t('drops.title')}</h2>
          </div>

          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
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
                          className={`flex h-full ${
                            isTransitioning[index] ? 'transition-transform duration-1000 ease-in-out' : ''
                          }`}
                          style={{
                            transform: `translateX(-${currentImageIndexes[index] * 100}%)`
                          }}
                        >
                          {/* Duplica le immagini per l'effetto infinito */}
                          {[...shirt.images, ...shirt.images].map((image, imgIndex) => (
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
      </div>
    </section>
  );
};

export default Drops;