
import { Search, Users, Briefcase, TrendingUp, Zap, Shield, Clock, Star, Plus, Minus, Check } from 'lucide-react';
import Link from 'next/link';

const Home = () => {

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header Component */}
      <header className="border-b border-gray-800">


        {/* Hero Section */}
        <header className="relative overflow-hidden border-b border-gray-800">
          {/* Green Glow Background Effects */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-green-500/10 rounded-full blur-3xl"></div>
          </div>

          {/* Animated Particles/Orbs */}
          <div className="absolute top-20 right-20 w-4 h-4 bg-green-400 rounded-full opacity-60 animate-bounce"></div>
          <div className="absolute top-40 right-40 w-2 h-2 bg-green-300 rounded-full opacity-40 animate-bounce delay-300"></div>
          <div className="absolute bottom-20 left-20 w-3 h-3 bg-emerald-400 rounded-full opacity-50 animate-bounce delay-700"></div>
          <div className="absolute top-1/3 left-1/4 w-3 h-3 bg-green-500 rounded-full opacity-40 animate-ping"></div>

          {/* Main Content */}
          <div className="container relative z-10 mx-auto px-6 py-24 text-center">
            {/* Animated Title */}
            <div className="mb-8">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 transform hover:scale-105 transition-transform duration-700">
                Find Your{' '}
                <span className="relative">
                  <span className="bg-gradient-to-r from-green-400 via-green-500 to-emerald-400 bg-clip-text text-transparent animate-gradient">
                    Dream Job
                  </span>
                  {/* Glow effect */}
                  <span className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 blur-xl opacity-30 -z-10 animate-pulse"></span>
                </span>
              </h1>
            </div>

            {/* Subtitle with enhanced styling */}
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed backdrop-blur-sm">
              Connect with top companies and discover opportunities that match your skills.
              Your next career move starts here.
            </p>

            {/* CTA Button with enhanced effects */}
            <div className="max-w-2xl mx-auto transform hover:scale-105 transition-transform duration-300">
              <Link
                href='/Login'
                className="relative inline-flex items-center justify-center px-12 py-5 text-lg font-bold text-black bg-gradient-to-r from-green-400 to-green-600 rounded-full shadow-2xl hover:shadow-green-500/30 hover:from-green-300 hover:to-green-500 transition-all duration-300 group overflow-hidden hover:text-green-500 hover:border-2"
              >
                {/* Button glow */}
                <span className="absolute inset-0 bg-green-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md group-hover:animate-pulse"></span>

                {/* Button content */}
                <span className="relative z-10 flex items-center">
                  Join Now
                  <svg className="w-5 h-5 ml-3 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>

                {/* Animated border */}
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-1 -m-1">
                  <span className="absolute inset-0 rounded-full bg-black animate-spin-slow"></span>
                </span>
              </Link>
            </div>

            {/* Stats Counter */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">

            <div className="text-center p-8 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-green-500/50 transition-all group">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg group-hover:shadow-green-500/50 transition-all">
                <Briefcase className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-3xl font-bold text-green-400 mb-2">50K+</h3>
              <p className="text-gray-400">Active Jobs</p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-green-500/50 transition-all group">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg group-hover:shadow-green-500/50 transition-all">
                <Users className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-3xl font-bold text-green-400 mb-2">100K+</h3>
              <p className="text-gray-400">Job Seekers</p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-green-500/50 transition-all group">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg group-hover:shadow-green-500/50 transition-all">
                <TrendingUp className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-3xl font-bold text-green-400 mb-2">95%</h3>
              <p className="text-gray-400">Success Rate</p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-green-500/50 transition-all group">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg group-hover:shadow-green-500/50 transition-all">
                <Star className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-3xl font-bold text-green-400 mb-2">5K+</h3>
              <p className="text-gray-400">Companies</p>
            </div>


            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="w-6 h-10 border-2 border-green-500/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-green-400 rounded-full mt-2 animate-bounce"></div>
            </div>
          </div>
        </header>
      </header>




      {/* Features Component */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Choose{' '}
              <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                QuantumEdge?
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Advanced technology meets human insight to deliver the most effective job matching platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-gradient-to-b from-gray-900 to-black border border-gray-800 hover:border-green-500/50 transition-all group">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-green-500/50 transition-all">
                <Zap className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-green-400">AI-Powered Matching</h3>
              <p className="text-gray-400 leading-relaxed">
                Our quantum-enhanced algorithms analyze skills, experience, and culture fit to connect you with perfect opportunities faster than ever before.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-b from-gray-900 to-black border border-gray-800 hover:border-green-500/50 transition-all group">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-green-500/50 transition-all">
                <Shield className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-green-400">Verified Companies</h3>
              <p className="text-gray-400 leading-relaxed">
                Every company on our platform is thoroughly vetted. Apply with confidence knowing you are connecting with legitimate, reputable employers.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-b from-gray-900 to-black border border-gray-800 hover:border-green-500/50 transition-all group">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-green-500/50 transition-all">
                <Clock className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-green-400">Real-Time Updates</h3>
              <p className="text-gray-400 leading-relaxed">
                Get instant notifications about new job matches, application status updates, and interview invitations. Never miss an opportunity.
              </p>
            </div>
          </div>
        </div>
      </section>



      {/* Subscription Component */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto ">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Choose Your{' '}
              <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                Plan
              </span>
            </h2>
            <p className="text-xl text-gray-400">Unlock premium features and accelerate your job search</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Free Plan */}
            <div className="p-8 rounded-2xl bg-gray-900 border border-gray-800 hover:border-gray-700 transition-all">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">Free</h3>
                <div className="text-4xl font-bold mb-4">$0<span className="text-lg text-gray-400">/month</span></div>
                <p className="text-gray-400">Perfect for getting started</p>
              </div>

              <ul className="space-y-4 mb-8">
                {[
                  "Basic job search",
                  "5 applications per month",
                  "Standard profile",
                  "Email notifications"
                ].map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="w-5 h-5 text-green-400 mr-3" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button className="w-full py-3 border border-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors">
                Get Started
              </button>
            </div>

            {/* Pro Plan */}
            <div className="p-8 rounded-2xl bg-gradient-to-b from-green-500/10 to-black border-2 border-green-500 relative hover:shadow-2xl hover:shadow-green-500/20 transition-all">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-green-500 text-black px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2 text-green-400">Pro</h3>
                <div className="text-4xl font-bold mb-4">$29<span className="text-lg text-gray-400">/month</span></div>
                <p className="text-gray-400">For serious job seekers</p>
              </div>

              <ul className="space-y-4 mb-8">
                {[
                  "Unlimited applications",
                  "Priority AI matching",
                  "Advanced profile analytics",
                  "Direct messaging with recruiters",
                  "Resume optimization tools",
                  "Interview preparation"
                ].map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="w-5 h-5 text-green-400 mr-3" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button className="w-full py-3 bg-green-500 hover:bg-green-600 text-black rounded-lg font-semibold transition-all hover:shadow-lg hover:shadow-green-500/50">
                Start Pro Trial
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="p-8 rounded-2xl bg-gray-900 border border-gray-800 hover:border-gray-700 transition-all">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
                <div className="text-4xl font-bold mb-4">$99<span className="text-lg text-gray-400">/month</span></div>
                <p className="text-gray-400">For companies & recruiters</p>
              </div>

              <ul className="space-y-4 mb-8">
                {[
                  "Unlimited job postings",
                  "Advanced candidate search",
                  "Team collaboration tools",
                  "Analytics dashboard",
                  "Priority support",
                  "Custom integrations"
                ].map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="w-5 h-5 text-green-400 mr-3" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button className="w-full py-3 border border-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Features Section */}
      <section className="py-20 bg-gradient-to-b from-black to-green-900/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Advanced{' '}
              <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                Features
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-green-500/50 transition-all group">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-green-500/50 transition-all">
                <Search className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Smart Search</h3>
              <p className="text-gray-400">Advanced filtering and intelligent search suggestions</p>
            </div>

            <div className="p-6 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-green-500/50 transition-all group">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-green-500/50 transition-all">
                <Users className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Network Building</h3>
              <p className="text-gray-400">Connect with industry professionals and expand your network</p>
            </div>

            <div className="p-6 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-green-500/50 transition-all group">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-green-500/50 transition-all">
                <TrendingUp className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Career Analytics</h3>
              <p className="text-gray-400">Track your application progress and career growth metrics</p>
            </div>
          </div>
        </div>
      </section>



    </div>
  );
};

export default Home;