import { Check } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function Subscription() {
    return (
        <div>
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

                            <Link href='/Login'>
                                <button className="w-full py-3 border border-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors">
                                    Get Started
                                </button>
                            </Link>
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

                            <Link href='/Login'>
                                <button className="w-full py-3 bg-green-500 hover:bg-green-600 text-black rounded-lg font-semibold transition-all hover:shadow-lg hover:shadow-green-500/50">
                                    Start Pro Trial
                                </button>
                            </Link>

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

                            <Link href='/Login'>
                                <button className="w-full py-3 border border-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors">
                                    Contact Sales
                                </button>
                            </Link>

                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
