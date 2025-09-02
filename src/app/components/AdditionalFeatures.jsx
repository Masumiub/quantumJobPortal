import { Search, TrendingUp, Users } from 'lucide-react'
import React from 'react'

export default function AdditionalFeatures() {
    return (
        <div>
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
    )
}
