"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, MapPin, Calendar, Users, DollarSign, ChevronDown, Shield } from "lucide-react";
import debounce from 'lodash/debounce';

export default function JobsList({ jobs: initialJobs, search: initialSearch, session }) {
    const [search, setSearch] = useState(initialSearch);
    const [jobs, setJobs] = useState(initialJobs);
    const [filteredJobs, setFilteredJobs] = useState(initialJobs);
    const [isSearching, setIsSearching] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const router = useRouter();


    // Filter jobs based on search and category
    const filterJobs = useCallback((jobsList, searchValue, category) => {
        let filtered = jobsList;

        // Filter by category if not "all"
        if (category !== "all") {
            filtered = filtered.filter(job =>
                job.category?.toLowerCase() === category.toLowerCase()
            );
        }

        // Filter by search if provided
        if (searchValue.trim()) {
            filtered = filtered.filter(job =>
                job.title?.toLowerCase().includes(searchValue.toLowerCase()) ||
                job.company?.toLowerCase().includes(searchValue.toLowerCase()) ||
                job.location?.toLowerCase().includes(searchValue.toLowerCase()) ||
                job.description?.toLowerCase().includes(searchValue.toLowerCase()) ||
                job.tags?.some(tag => tag.toLowerCase().includes(searchValue.toLowerCase()))
            );
        }

        return filtered;
    }, []);

    // Debounced search function
    const debouncedSearch = useCallback(
        debounce((searchValue, category) => {
            if (!searchValue.trim()) {
                setFilteredJobs(jobs);
                setIsSearching(false);
                return;
            }

            const filtered = jobs.filter(job =>
                job.title?.toLowerCase().includes(searchValue.toLowerCase()) ||
                job.company?.toLowerCase().includes(searchValue.toLowerCase()) ||
                job.location?.toLowerCase().includes(searchValue.toLowerCase()) ||
                job.description?.toLowerCase().includes(searchValue.toLowerCase()) ||
                job.tags?.some(tag => tag.toLowerCase().includes(searchValue.toLowerCase()))
            );
            setFilteredJobs(filtered);
            setIsSearching(false);
        }, 300),
        [jobs, filterJobs]
    );

    // Handle search input change
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearch(value);
        setIsSearching(true);
        debouncedSearch(value, selectedCategory);
    };


    // Handle category change
    const handleCategoryChange = (e) => {
        const category = e.target.value;
        setSelectedCategory(category);
        setIsSearching(true);

        // Update URL with category parameter
        const params = new URLSearchParams();
        if (search) {
            params.set('search', search);
        }
        if (category !== "all") {
            params.set('category', category);
        }

        router.push(`/jobs?${params.toString()}`);

        // Filter jobs based on the selected category
        const filtered = filterJobs(jobs, search, category);
        setFilteredJobs(filtered);
        setIsSearching(false);
    };

    // Handle form submission (Enter key)
    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        setIsSearching(true);

        // Update URL with search query
        const params = new URLSearchParams();
        if (search) {
            params.set('search', search);
        }

        router.push(`/jobs?${params.toString()}`);

        // Fetch search results from API for more comprehensive search
        try {
            const response = await fetch(`/api/jobs/public?search=${encodeURIComponent(search)}&category=${selectedCategory}`);
            if (response.ok) {
                const searchResults = await response.json();
                setJobs(searchResults);
                setFilteredJobs(searchResults);
            }
        } catch (error) {
            console.error("Search error:", error);
        } finally {
            setIsSearching(false);
        }
    };

    // Handle clear search
    const handleClearSearch = () => {
        setSearch("");
        const filtered = filterJobs(jobs, "", selectedCategory);
        setFilteredJobs(filtered);


        // Update URL to keep category but remove search parameter
        const params = new URLSearchParams();
        if (selectedCategory !== "all") {
            params.set('category', selectedCategory);
        }
        router.push(`/jobs?${params.toString()}`);
    };

    // Handle key press events
    const handleKeyPress = (e) => {
        if (e.key === 'Escape') {
            handleClearSearch();
        }
    };


    // Update filtered jobs when jobs prop changes
    useEffect(() => {
        const filtered = filterJobs(jobs, search, selectedCategory);
        setFilteredJobs(filtered);
    }, [jobs, search, selectedCategory, filterJobs]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        }).format(date);
    };


    const categories = [
        { value: "all", label: "All Categories" },
        { value: "design-creative", label: "Design & Creative" },
        { value: "development-it", label: "Development & IT" },
        { value: "music-audio", label: "Music & Audio" },
        { value: "programming-tech", label: "Programming & Tech" },
        { value: "marketing-sales", label: "Marketing & Sales" },
        { value: "writing-translation", label: "Writing & Translation" },
        { value: "other", label: "Other" }
    ];


    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Banner with Green Glow */}
            <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
                {/* Green glow effects */}
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-green-500/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-0 right-1 w-96 h-96 bg-emerald-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-green-500/10 rounded-full blur-3xl"></div>
                </div>

                {/* Decorative elements */}
                <div className="absolute bottom-20 right-80 w-4 h-4 bg-green-400 rounded-full opacity-60"></div>
                <div className="absolute top-40 right-40 w-2 h-2 bg-green-300 rounded-full opacity-40"></div>
                <div className="absolute bottom-20 left-20 w-3 h-3 bg-emerald-400 rounded-full opacity-50"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Find Your Dream Job</h1>
                            <p className="text-gray-300 text-lg">Discover opportunities that match your skills and passion</p>
                        </div>

                    </div>

                    {/* Search Section */}

                    <form onSubmit={handleSearchSubmit} className="flex flex-col lg:flex-row gap-2 max-w-3xl">
                        {/* Search Input Container */}
                        <div className="flex-1 relative">

                            <input
                                type="text"
                                placeholder="Search jobs by title/company ..."
                                value={search}
                                onChange={handleSearchChange}
                                onKeyDown={handleKeyPress}
                                className="w-full bg-transparent border-2 border-green-500/30 rounded-2xl pl-4 pr-10 py-4 text-white placeholder-gray-400 focus:border-green-400 focus:outline-none transition-colors"
                            />
                            {search && (
                                <button
                                    type="button"
                                    onClick={handleClearSearch}
                                    className="absolute right-15 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                >
                                    ×
                                </button>
                            )}

                            
                                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 text-white bg-green-500 rounded-full p-1" />
                            
                        </div>

                        <div className="relative">
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="bg-transparent border-2 border-green-500/30 rounded-2xl px-6 py-4 text-white appearance-none cursor-pointer focus:border-green-400 focus:outline-none transition-colors min-w-[200px]"
                            >
                                {categories.map((cat) => (
                                    <option key={cat.value} value={cat.value}>
                                        {cat.label}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                        </div>



                        {/* Search Button */}
                        <button
                            type="submit"
                            disabled={isSearching}
                            className="bg-green-500 hover:bg-green-600 text-black font-semibold px-8 py-4 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[120px]"
                        >
                            {isSearching ? (
                                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    <Search className="w-5 h-5 mr-2" />
                                    Advance Search
                                </>
                            )}
                        </button>
                    </form>

                </div>
            </div>

            {/* Results Section */}
            <div className="max-w-7xl mx-auto px-4 py-8 pb-35">
                {/* Results Count and Clear Button */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                        {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} found
                        {search && ` for "${search}"`}
                    </h2>
                    {search && (
                        <button
                            onClick={handleClearSearch}
                            className="text-gray-500 hover:text-gray-700 flex items-center text-sm"
                        >
                            Clear search
                            <span className="ml-1">×</span>
                        </button>
                    )}
                </div>

                {/* Jobs Grid */}
                {filteredJobs.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <Search className="w-12 h-12 text-gray-400" />
                        </div>
                        <p className="text-gray-500 text-lg mb-2">
                            {search ? 'No jobs found matching your search.' : 'No jobs available at the moment.'}
                        </p>
                        <p className="text-gray-400">
                            {search ? 'Try adjusting your search terms or ' : ''}
                            Check back later for new opportunities.
                        </p>
                        {search && (
                            <button
                                onClick={handleClearSearch}
                                className="mt-4 text-green-600 hover:text-green-700 font-medium"
                            >
                                View all jobs
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredJobs.map((job) => (
                            <div key={job._id} className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden group">
                                <div className="p-6 space-y-4">
                                    {/* Header */}
                                    <div className="flex justify-between items-start">
                                        <div className="space-y-1">
                                            <p className="text-sm text-gray-500">
                                                {formatDate(job.createdAt)}
                                            </p>
                                            <h3 className="text-xl font-bold text-gray-800 group-hover:text-green-600 transition-colors">
                                                {job.title}
                                            </h3>
                                        </div>
                                    </div>

                                    {/* Project Type & Price */}
                                    <div className="flex items-center justify-between">
                                        <div className="bg-gray-100 flex items-center justify-between w-full py-2 px-2 rounded-xl">
                                            <span className="text-gray-600 text-sm font-medium">
                                                Fixed Price Project
                                            </span>
                                            <div className="text-right">
                                                <p className="font-bold text-gray-800">
                                                    {job.salary || '$1,200-$1,400'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div className="space-y-3">
                                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                                            {job.description}
                                        </p>
                                    </div>

                                    {/* Job Meta Information */}
                                    <div className="flex flex-wrap gap-2">
                                        <span className="flex items-center bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-xs font-medium">

                                            <MapPin className="w-4 h-4 mr-1" />
                                            Remote
                                        </span>
                                        <span className="flex items-center bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-medium">
                                            <Shield className="w-4 h-4 mr-1" />
                                            {job.level || 'Senior level'}
                                        </span>
                                        <span className="flex items-center bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-medium">
                                            <Users className="w-4 h-4 mr-1" />
                                            {job.hiringCount || '2'} Freelancer
                                        </span>
                                    </div>

                                    {/* Skills/Tags */}
                                    <div className="space-y-2">
                                        <div className="flex flex-wrap gap-2">
                                            {job.tags && job.tags.length > 0 ? (
                                                job.tags.slice(0, 3).map((tag, index) => (
                                                    <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm">
                                                        {tag}
                                                    </span>
                                                ))
                                            ) : (
                                                <>
                                                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm">App Design</span>
                                                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm">Art Generation</span>
                                                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm">Illustration</span>
                                                </>
                                            )}
                                            {job.tags && job.tags.length > 3 && (
                                                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm">
                                                    +{job.tags.length - 3} more
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Posted By */}
                                    <div className="pt-4 border-t border-gray-100">
                                        <p className="text-sm text-gray-500">
                                            Posted by: <span className="font-medium text-gray-700">{job.userName || 'Eamman Olio'}</span>
                                        </p>
                                    </div>

                                    {/* Apply Button */}
                                    <Link href={`/jobs/${job._id}`} className="btn border-0 bg-black hover:bg-green-500 text-white font-semibold py-3 rounded-full transition-all duration-300 group-hover:shadow-lg">
                                        Apply Now
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}