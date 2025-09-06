// React import not needed for JSX in React 17+
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { useLanguage } from '../hooks/useLanguage';
import { Check, X } from 'lucide-react';
import { useEffect, useRef } from 'react';

const Compare = () => {
  const { ref: sectionRef, isVisible } = useRevealOnScroll();
  const { t } = useLanguage();
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (backgroundRef.current) {
        const rect = backgroundRef.current.getBoundingClientRect();
        const scrollProgress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)));
        
        const scale = 1 + (scrollProgress * 0.1);
        const opacity = Math.max(0.8, 1 - (scrollProgress * 0.2));
        
        backgroundRef.current.style.transform = `scale(${scale})`;
        backgroundRef.current.style.opacity = opacity.toString();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const comparisonData = [
    { criteria: t('compare.priceQualityRatio'), replx: t('compare.priceQualityReplx'), competitorA: t('compare.priceQualityCompA'), competitorB: t('compare.priceQualityCompB') },
    { criteria: t('compare.fabricStitching'), replx: t('compare.fabricStitchingReplx'), competitorA: t('compare.fabricStitchingCompA'), competitorB: t('compare.fabricStitchingCompB') },
    { criteria: t('compare.qualityCheck'), replx: t('compare.qualityCheckReplx'), competitorA: t('compare.qualityCheckCompA'), competitorB: t('compare.qualityCheckCompB') },
    { criteria: t('compare.shipping'), replx: t('compare.shippingReplx'), competitorA: t('compare.shippingCompA'), competitorB: t('compare.shippingCompB') },
    { criteria: t('compare.returns'), replx: t('compare.returnsReplx'), competitorA: t('compare.returnsCompA'), competitorB: t('compare.returnsCompB') },
    { criteria: t('compare.customization'), replx: t('compare.customizationReplx'), competitorA: t('compare.customizationCompA'), competitorB: t('compare.customizationCompB') },
    { criteria: t('compare.sizeRange'), replx: t('compare.sizeRangeReplx'), competitorA: t('compare.sizeRangeCompA'), competitorB: t('compare.sizeRangeCompB') },
    { criteria: t('compare.liveChat'), replx: t('compare.liveChatReplx'), competitorA: t('compare.liveChatCompA'), competitorB: t('compare.liveChatCompB') },
  ];

  const getCellIcon = (value: string, isReplx: boolean) => {
    if (value === '—') return <X size={16} className="text-gray-400" />;
    if (isReplx) return <Check size={16} className="text-green-500" />;
    if (value.includes('Limited') || value.includes('Basic') || value.includes('Slower')) {
      return <X size={16} className="text-red-500" />;
    }
    return <Check size={16} className="text-yellow-500" />;
  };

  return (
    <section 
      id="compare" 
      className="py-20 bg-gray-50 dark:bg-gray-900 relative overflow-hidden"
    >
      <div 
         ref={backgroundRef}
         className="absolute inset-0 transition-all duration-300 ease-out"
         style={{
           backgroundImage: 'url(/pugno.png)',
           backgroundSize: 'cover',
           backgroundPosition: 'center',
           backgroundRepeat: 'no-repeat',
           transformOrigin: 'center'
         }}
       ></div>
      {/* Background overlay */}
      <div className="absolute inset-0 bg-white dark:bg-gray-900 bg-opacity-70 dark:bg-opacity-80"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div ref={sectionRef} className={`reveal-on-scroll ${isVisible ? 'revealed' : ''}`}>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">{t('compare.title')}</h2>
          </div>

          <div className="overflow-x-auto">
            <div className="max-w-5xl mx-auto">
              <table className="w-full bg-white dark:bg-gray-800 bg-opacity-85 dark:bg-opacity-90 rounded-xl shadow-sm overflow-hidden">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-700">
                    <th className="text-left py-3 px-3 sm:px-4 font-semibold text-gray-900 dark:text-white text-sm sm:text-base">{t('compare.criteria')}</th>
                    <th className="text-left py-3 px-3 sm:px-4 font-semibold text-[#0A84FF] text-sm sm:text-base">{t('compare.replx')}</th>
                    <th className="text-left py-3 px-2 sm:px-4 font-semibold text-gray-600 dark:text-gray-300 text-sm sm:text-base">{t('compare.competitorA')}</th>
                    <th className="text-left py-3 px-2 sm:px-4 font-semibold text-gray-600 dark:text-gray-300 text-sm sm:text-base">{t('compare.competitorB')}</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <tr key={index} className="border-t border-gray-200 dark:border-gray-600">
                      <td className="py-3 px-3 sm:px-4 font-medium text-gray-900 dark:text-white text-sm sm:text-base">{row.criteria}</td>
                      <td className="py-3 px-3 sm:px-4">
                        <div className="flex items-center space-x-1 sm:space-x-2">
                          {getCellIcon(row.replx, true)}
                          <span className="font-medium text-[#0A84FF] text-sm sm:text-base">{row.replx}</span>
                        </div>
                      </td>
                      <td className="py-3 px-2 sm:px-4">
                        <div className="flex items-center space-x-1 sm:space-x-2">
                          {getCellIcon(row.competitorA, false)}
                          <span className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">{row.competitorA}</span>
                        </div>
                      </td>
                      <td className="py-3 px-2 sm:px-4">
                        <div className="flex items-center space-x-1 sm:space-x-2">
                          {getCellIcon(row.competitorB, false)}
                          <span className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">{row.competitorB}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Compare;