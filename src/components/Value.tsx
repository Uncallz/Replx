// React import not needed for JSX in React 17+
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { useLanguage } from '../hooks/useLanguage';
import { Heart, Star, Zap } from 'lucide-react';

const Value = () => {
  const { ref: sectionRef, isVisible } = useRevealOnScroll();
  const { t } = useLanguage();

  const values = [
    {
      icon: Heart,
      title: t('value.forFansTitle'),
      description: t('value.forFansDescription')
    },
    {
      icon: Star,
      title: t('value.forCollectorsTitle'),
      description: t('value.forCollectorsDescription')
    },
    {
      icon: Zap,
      title: t('value.forAthletesTitle'),
      description: t('value.forAthletesDescription')
    }
  ];

  return (
    <section id="value" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div ref={sectionRef} className={`reveal-on-scroll ${isVisible ? 'revealed' : ''}`}>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-700 ease-in-out hover:bg-gradient-to-br hover:from-yellow-400 hover:to-yellow-600 group text-center"
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="w-12 h-12 bg-[#0A84FF] bg-opacity-10 rounded-lg flex items-center justify-center mb-5 group-hover:bg-white group-hover:bg-opacity-20 transition-all duration-700 mx-auto">
                    <Icon className="text-[#0A84FF] group-hover:text-white transition-colors duration-700" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white group-hover:text-white transition-colors duration-700">{value.title}</h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed group-hover:text-white transition-colors duration-700">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Value;