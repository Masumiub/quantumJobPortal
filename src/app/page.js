
import { Search, Users, Briefcase, TrendingUp, Zap, Shield, Clock, Star, Plus, Minus, Check } from 'lucide-react';
import Link from 'next/link';
import TestimonialSection from './components/TestimonialSection';
import FAQSection from './components/FAQSection';
import Header from './components/Header';
import Features from './components/Features';
import Subscription from './components/Subscription';
import AdditionalFeatures from './components/AdditionalFeatures';

const Home = () => {

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header Component */}
      <Header></Header>

      {/* Features Component */}
      <Features></Features>


      {/* Subscription Component */}
      <Subscription></Subscription>

      <TestimonialSection></TestimonialSection>

      {/* Additional Features Section */}
      <AdditionalFeatures></AdditionalFeatures>

      <FAQSection></FAQSection>

    </div>
  );
};

export default Home;