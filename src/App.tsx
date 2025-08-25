// React import not needed for JSX in React 17+
import { Analytics } from '@vercel/analytics/react';
import Header from './components/Header';
import Hero from './components/Hero';
import Value from './components/Value';
import Drops from './components/Drops';
import Offer from './components/Offer';
import Compare from './components/Compare';
import HowToOrder from './components/HowToOrder';
import Social from './components/Social';
import FAQ from './components/FAQ';
import Rating from './components/Rating';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import CookieBanner from './components/CookieBanner';
import { useTheme } from './hooks/useTheme';
import './styles/globals.css';

function App() {
  // Initialize theme
  useTheme();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-inter transition-colors duration-300">
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <Value />
        <Drops />
        <Offer />
        <Compare />
        <HowToOrder />
        <Social />
        <FAQ />
      </main>
      <Rating />
      <Footer />
      <CookieBanner />
      <Analytics />
    </div>
  );
}

export default App;