import { notFound } from "next/navigation";
import { getServerSession } from "next-auth/next";



import { 
  MapPin, 
  Calendar, 
  Users, 
  DollarSign, 
  ChevronLeft,
  Clock,
  Building,
  Mail,
  Shield,
  Star,
  Share2,
  Bookmark,
  CheckCircle
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import clientPromise from "@/app/lib/db";
import { authOptions } from "@/app/lib/auth";
import { ObjectId } from "mongodb";

async function getJobDetails(id) {
  try {
    const client = await clientPromise;
    const db = client.db("quantumJobPortalDB");
    
    const job = await db.collection("jobs").findOne({ 
      _id: new ObjectId(id) 
    });

    if (!job) {
      return null;
    }

    // Convert MongoDB object to plain JavaScript object
    return {
      ...job,
      _id: job._id.toString(),
      createdAt: job.createdAt.toISOString(),
      updatedAt: job.updatedAt.toISOString()
    };
  } catch (error) {
    console.error("Error fetching job details:", error);
    return null;
  }
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
}

function getLevelBadge(level) {
  const levels = {
    junior: { color: 'bg-blue-100 text-blue-600', label: 'Junior' },
    mid: { color: 'bg-green-100 text-green-600', label: 'Mid-level' },
    senior: { color: 'bg-purple-100 text-purple-600', label: 'Senior' }
  };
  
  return levels[level] || levels.mid;
}

export default async function JobDetailsPage({ params }) {
  const session = await getServerSession(authOptions);
  const job = await getJobDetails(params.id);

  if (!job) {
    notFound();
  }

  const levelBadge = getLevelBadge(job.level);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link 
            href="/jobs" 
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Back to Jobs
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Job Header */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                      {job.company?.charAt(0) || 'C'}
                    </div>
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
                      <p className="text-xl text-gray-600">{job.company}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 mb-4">
                    <span className="flex items-center bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                      <MapPin className="w-4 h-4 mr-1" />
                      {job.location}
                    </span>
                    <span className={`flex items-center ${levelBadge.color} px-3 py-1 rounded-full text-sm`}>
                      <Shield className="w-4 h-4 mr-1" />
                      {levelBadge.label}
                    </span>
                    <span className="flex items-center bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm">
                      <Users className="w-4 h-4 mr-1" />
                      Hiring: {job.hiringCount}
                    </span>
                    {job.salary && (
                      <span className="flex items-center bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
                        <DollarSign className="w-4 h-4 mr-1" />
                        {job.salary}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                    <Bookmark className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                    <Share2 className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  Posted {formatDate(job.createdAt)}
                </span>
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  Updated {formatDate(job.updatedAt)}
                </span>
                <span className="flex items-center">
                  <Building className="w-4 h-4 mr-1" />
                  {job.company}
                </span>
              </div>
            </div>

            {/* Job Description */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Description</h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed">{job.description}</p>
              </div>
            </div>

            {/* Requirements */}
            {job.requirements && job.requirements.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Requirements</h2>
                <div className="grid gap-3">
                  {job.requirements.map((requirement, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{requirement}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            {job.tags && job.tags.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Skills & Technologies</h2>
                <div className="flex flex-wrap gap-2">
                  {job.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Company Info */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">About {job.company}</h3>
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <Building className="w-5 h-5 mr-3" />
                  <span>Technology Company</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="w-5 h-5 mr-3" />
                  <span>50-200 employees</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Star className="w-5 h-5 mr-3" />
                  <span>4.8/5 rating</span>
                </div>
              </div>
            </div>

            {/* Posted By */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Posted By</h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {job.userName?.charAt(0) || 'U'}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{job.userName}</p>
                  <p className="text-sm text-gray-600">{job.userEmail}</p>
                </div>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="w-4 h-4 mr-2" />
                Verified Recruiter
              </div>
            </div>

            {/* Apply Section */}
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white">
              <h3 className="text-xl font-semibold mb-4">Ready to Apply?</h3>
              <p className="text-green-100 mb-6">
                This position is accepting applications. Apply now to join the {job.company} team!
              </p>
              
              <div className="space-y-3">
                <button className="w-full bg-white text-green-600 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Apply Now
                </button>
                <button className="w-full border border-white/30 text-white py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                  Save for Later
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-white/20">
                <div className="flex items-center justify-between text-sm text-green-100">
                  <span>Applications</span>
                  <span className="font-semibold">24 applied</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                  <div 
                    className="bg-white h-2 rounded-full transition-all duration-1000" 
                    style={{ width: '65%' }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Insights</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Views</span>
                  <span className="font-semibold text-gray-900">1.2K</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Applications</span>
                  <span className="font-semibold text-gray-900">24</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Response Rate</span>
                  <span className="font-semibold text-green-600">85%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const revalidate = 300; // Revalidate every 5 minutes