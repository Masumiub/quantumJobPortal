import { Clock, Shield, Zap } from 'lucide-react'
import React from 'react'

export default function Features() {
    return (
        <div>
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
        </div>
    )
}
