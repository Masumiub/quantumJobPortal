"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { 
  Briefcase, 
  Users, 
  FileText, 
  Plus, 
  Settings, 
  BarChart3,
  Mail,
  User,
  Shield,
  Calendar,
  Target
} from "lucide-react";

export default function Dashboard() {
  const { data: session } = useSession();
  const [stats, setStats] = useState({
    totalJobs: 0,
    activeJobs: 0,
    applications: 0,
    interviews: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/jobs");
        if (response.ok) {
          const jobs = await response.json();
          setStats({
            totalJobs: jobs.length,
            activeJobs: jobs.filter(job => job.status === "active").length,
            applications: Math.floor(Math.random() * 50) + 10, // Mock data
            interviews: Math.floor(Math.random() * 12) + 3 // Mock data
          });
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin':
        return <Shield className="w-5 h-5" />;
      case 'employer':
        return <Briefcase className="w-5 h-5" />;
      default:
        return <User className="w-5 h-5" />;
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin':
        return 'bg-red-500/20 text-red-600';
      case 'employer':
        return 'bg-blue-500/20 text-blue-600';
      default:
        return 'bg-green-500/20 text-green-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          Welcome back, <span className="bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">{session?.user?.name}</span>
        </h1>
        <p className="text-gray-600">Here's what's happening with your job portal today</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
            {/* Profile Header */}
            <div className="text-center mb-6">
              <div className="relative inline-block mb-4">
                <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                  {session?.user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              
              <h2 className="text-xl font-semibold text-gray-800">{session?.user?.name}</h2>
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full mt-2 ${getRoleColor(session?.user?.role)}`}>
                {getRoleIcon(session?.user?.role)}
                <span className="text-sm font-medium capitalize">{session?.user?.role || 'user'}</span>
              </div>
            </div>

            {/* User Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="text-gray-800 text-xs xl:text-lg">{session?.user?.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Member since</p>
                  <p className="text-gray-800 font-medium">January 2024</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Target className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <p className="text-green-600 font-medium">Active</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 space-y-3">
              <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:-translate-y-0.5">
                Edit Profile
              </button>
              <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                Settings
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {/* Total Jobs */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Total Jobs</p>
                  <p className="text-2xl font-bold text-gray-800">{stats.totalJobs}</p>
                </div>
                <div className="p-3 bg-blue-500/10 rounded-lg">
                  <Briefcase className="w-6 h-6 text-blue-500" />
                </div>
              </div>
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-1000" 
                    style={{ width: `${Math.min((stats.totalJobs / 50) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Active Jobs */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Active Jobs</p>
                  <p className="text-2xl font-bold text-green-600">{stats.activeJobs}</p>
                </div>
                <div className="p-3 bg-green-500/10 rounded-lg">
                  <FileText className="w-6 h-6 text-green-500" />
                </div>
              </div>
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-1000" 
                    style={{ width: `${stats.totalJobs > 0 ? (stats.activeJobs / stats.totalJobs) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Applications */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Applications</p>
                  <p className="text-2xl font-bold text-purple-600">{stats.applications}</p>
                </div>
                <div className="p-3 bg-purple-500/10 rounded-lg">
                  <Users className="w-6 h-6 text-purple-500" />
                </div>
              </div>
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-purple-500 h-2 rounded-full transition-all duration-1000" 
                    style={{ width: `${Math.min((stats.applications / 60) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Interviews */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Interviews</p>
                  <p className="text-2xl font-bold text-orange-600">{stats.interviews}</p>
                </div>
                <div className="p-3 bg-orange-500/10 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-orange-500" />
                </div>
              </div>
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-orange-500 h-2 rounded-full transition-all duration-1000" 
                    style={{ width: `${Math.min((stats.interviews / 15) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Quick Actions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a 
                href="/userdashboard/create-job" 
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1 group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Plus className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold">Create New Job</p>
                    <p className="text-sm text-white/80">Post a new job opportunity</p>
                  </div>
                </div>
              </a>
              
              <a 
                href="/userdashboard/manage-jobs" 
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1 group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Settings className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold">Manage Jobs</p>
                    <p className="text-sm text-white/80">Edit or delete existing jobs</p>
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="p-2 bg-green-100 rounded-full">
                  <Plus className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">New job posted</p>
                  <p className="text-sm text-gray-600">Senior Frontend Developer</p>
                </div>
                <span className="text-xs text-gray-500 ml-auto">2 hours ago</span>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="p-2 bg-blue-100 rounded-full">
                  <Users className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">New application</p>
                  <p className="text-sm text-gray-6 00">John Doe applied to your job</p>
                </div>
                <span className="text-xs text-gray-500 ml-auto">5 hours ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}