// React import not needed for JSX in React 17+
import { useLanguage } from '../hooks/useLanguage';

const Rating = () => {
  const { t } = useLanguage();
  return (
    <div className="bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex justify-center items-center space-x-2 mb-2">
            <span className="text-2xl">⭐⭐⭐⭐⭐</span>
          </div>
          <p className="text-gray-700 font-medium">
            {t('rating.customerRating')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Rating;