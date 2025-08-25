import { useState } from 'react';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { useLanguage } from '../hooks/useLanguage';
import { getFAQs } from '../utils/faqData';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
  const { ref: sectionRef, isVisible } = useRevealOnScroll();
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = getFAQs(t);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div ref={sectionRef} className={`reveal-on-scroll ${isVisible ? 'revealed' : ''}`}>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">{t('faq.title')}</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">{t('faq.subtitle')}</p>
          </div>

          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="mb-4 bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <span className="font-semibold text-gray-900 dark:text-white">{faq.question}</span>
                  {openIndex === index ? (
                    <ChevronUp className="text-[#0A84FF]" size={20} />
                  ) : (
                    <ChevronDown className="text-gray-500 dark:text-gray-400" size={20} />
                  )}
                </button>
                
                {openIndex === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
