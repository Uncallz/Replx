// React import not needed for JSX in React 17+
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { useLanguage } from '../hooks/useLanguage';
import { ShoppingBag, MessageCircle, Gift } from 'lucide-react';

const HowToOrder = () => {
  const { ref: sectionRef, isVisible } = useRevealOnScroll();
  const { t } = useLanguage();

  const steps = [
    {
      icon: ShoppingBag,
      step: '1',
      title: t('howToOrder.step1Title'),
      description: t('howToOrder.step1Description')
    },
    {
      icon: MessageCircle,
      step: '2',
      title: t('howToOrder.step2Title'),
      description: t('howToOrder.step2Description')
    },
    {
      icon: Gift,
      step: '3',
      title: t('howToOrder.step3Title'),
      description: t('howToOrder.step3Description')
    }
  ];

  return (
    <section id="how" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div ref={sectionRef} className={`reveal-on-scroll ${isVisible ? 'revealed' : ''}`}>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">{t('howToOrder.title')}</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">{t('howToOrder.subtitle')}</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div
                    key={index}
                    className="text-center group border-2 border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:border-[#0A84FF] transition-all duration-300 hover:shadow-lg bg-white dark:bg-gray-800"
                    style={{ transitionDelay: `${index * 200}ms` }}
                  >
                    <div className="relative mb-5">
                      <div className="w-20 h-20 bg-[#0A84FF] rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                        <Icon className="text-white" size={32} />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-900 dark:bg-gray-700 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {step.step}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{step.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{step.description}</p>
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

export default HowToOrder;