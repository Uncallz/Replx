import React, { useState } from 'react';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { useCountdown } from '../hooks/useCountdown';
import { useLanguage } from '../hooks/useLanguage';
import { Copy, Check } from 'lucide-react';

const Offer = () => {
  const { t } = useLanguage();
  const { ref: sectionRef, isVisible } = useRevealOnScroll();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  
  // Countdown to Sep 30, 2025, 23:59:59 Europe/Rome
  const targetDate = new Date('2025-09-30T23:59:59+02:00');
  const { days, hours, minutes, seconds } = useCountdown(targetDate);

  const generateCode = () => {
    return 'REPLX09';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate discount code
    const code = generateCode();
    setGeneratedCode(code);
    setIsSubmitted(true);
  };

  const copyToClipboard = () => {
    try {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(generatedCode);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = generatedCode;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      // Failed to copy
      console.log('Failed to copy to clipboard');
    }
  };

  return (
    <section id="offer" className="py-20 bg-[#0A84FF] text-white">
      <div className="container mx-auto px-4">
        <div ref={sectionRef} className={`reveal-on-scroll ${isVisible ? 'revealed' : ''}`}>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">{t('offer.title')}</h2>
            <p className="text-xl mb-10 opacity-90">
              {t('offer.description')}<br />
              {t('offer.instructions')}
            </p>

            {/* Countdown Timer */}
            <div className="grid grid-cols-4 gap-4 mb-10">
              <div className="bg-white bg-opacity-20 rounded-lg p-4">
                <div className="text-3xl font-bold">{days.toString().padStart(2, '0')}</div>
                <div className="text-sm opacity-75">{t('offer.days')}</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-4">
                <div className="text-3xl font-bold">{hours.toString().padStart(2, '0')}</div>
                <div className="text-sm opacity-75">{t('offer.hours')}</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-4">
                <div className="text-3xl font-bold">{minutes.toString().padStart(2, '0')}</div>
                <div className="text-sm opacity-75">{t('offer.minutes')}</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-4">
                <div className="text-3xl font-bold">{seconds.toString().padStart(2, '0')}</div>
                <div className="text-sm opacity-75">{t('offer.seconds')}</div>
              </div>
            </div>

            {!isSubmitted ? (
              <div className="bg-white bg-opacity-10 rounded-xl p-8 backdrop-blur-sm">
                <form id="discountForm" className="space-y-4">
                  <div>
                    <input
                      type="email"
                      id="discountEmail"
                      placeholder="Enter your email address"
                      className="w-full px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    id="discountBtn"
                    className="w-full bg-white text-[#0A84FF] py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
                  >
                    Get Code
                  </button>
                </form>
                <div id="discountMessage" className="mt-4"></div>
              </div>
            ) : (
              <div className="bg-white bg-opacity-10 rounded-xl p-8 backdrop-blur-sm">
                <div className="text-2xl font-bold mb-4 text-green-300">✓ {t('offer.success')}</div>
                <p className="mb-6">{t('offer.yourCode')}</p>
                <div className="bg-white bg-opacity-20 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-mono font-bold">{generatedCode}</span>
                    <button
                      onClick={copyToClipboard}
                      className="ml-4 p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors duration-200"
                    >
                      {isCopied ? <Check size={20} /> : <Copy size={20} />}
                    </button>
                  </div>
                </div>
                <p className="text-sm opacity-90">
                  {t('offer.useCode')}
                </p>
              </div>
            )}

            <div className="mt-8 flex justify-center space-x-4 text-sm opacity-75">
              <a href="/privacy.html" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity">{t('offer.privacy')}</a>
              <span>•</span>
              <a href="/terms.html" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity">{t('offer.terms')}</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Offer;