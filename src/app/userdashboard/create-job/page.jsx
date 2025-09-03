"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";

export default function CreateJob() {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [salary, setSalary] = useState("");
  const [requirements, setRequirements] = useState("");
  const [level, setLevel] = useState("mid"); // Default to mid level
  const [category, setCategory] = useState("development-it"); // Default category
  const [hiringCount, setHiringCount] = useState(1); // Default to 1
  const [tags, setTags] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { data: session } = useSession();

  const categories = [
    { value: "design-creative", label: "Design & Creative" },
    { value: "development-it", label: "Development & IT" },
    { value: "music-audio", label: "Music & Audio" },
    { value: "programming-tech", label: "Programming & Tech" },
    { value: "marketing-sales", label: "Marketing & Sales" },
    { value: "writing-translation", label: "Writing & Translation" },
    { value: "other", label: "Other" }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    
    try {
      const requirementsArray = requirements 
        ? requirements.split("\n").filter(req => req.trim() !== "")
        : [];
      
      const tagsArray = tags 
        ? tags.split(",").map(tag => tag.trim()).filter(tag => tag !== "")
        : [];
      
      const response = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          company,
          location,
          description,
          salary,
          requirements: requirementsArray,
          level,
          category,
          hiringCount: parseInt(hiringCount),
          tags: tagsArray,
          userEmail: session.user.email,
          userName: session.user.name 
        }),
      });
      
      if (response.ok) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Job Creation successful!",
          showConfirmButton: false,
          timer: 1500
        });

        router.push("/userdashboard/manage-jobs");
      } else {
        const data = await response.json();
        setError(data.error || "Failed to create job");
      }
    } catch (error) {
      setError("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-3xl font-bold mb-6 text-green-500">Create New Job</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-500 mb-2 font-semibold">Job Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
              placeholder="e.g., Senior React Developer"
            />
          </div>
          
          <div>
            <label className="block text-gray-500 mb-2 font-semibold">Company *</label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
              placeholder="e.g., TechCorp Inc."
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-500 mb-2 font-semibold">Location *</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
              placeholder="e.g., Remote, New York, NY"
            />
          </div>
          
          <div>
            <label className="block text-gray-500 mb-2 font-semibold">Salary</label>
            <input
              type="text"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="e.g., $50,000 - $70,000"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-500 mb-2 font-semibold">Level *</label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent "
              required
            >
              <option value="junior">Junior</option>
              <option value="mid">Mid-level</option>
              <option value="senior">Senior</option>
              <option value="lead">Lead</option>
              <option value="executive">Executive</option>
            </select>
          </div>
          
          <div>
            <label className="block text-gray-500 mb-2 font-semibold">Category *</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent "
              required
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-500 mb-2 font-semibold">Hiring Count *</label>
            <input
              type="number"
              min="1"
              max="100"
              value={hiringCount}
              onChange={(e) => setHiringCount(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-500 mb-2 font-semibold">Tags (comma separated)</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="e.g., React, Node.js, MongoDB, AWS"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-gray-500 mb-2 font-semibold">Description *</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            rows="4"
            placeholder="Describe the job responsibilities, company culture, and what you're looking for in a candidate..."
            required
          />
        </div>
        
        <div>
          <label className="block text-gray-500 mb-2 font-semibold">
            Requirements (one per line) *
          </label>
          <textarea
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            rows="4"
            placeholder="List the required skills, experience, and qualifications...
Example:
3+ years of React experience
Knowledge of Node.js
Experience with databases"
            required
          />
        </div>
        
        <div className="flex space-x-4 pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Creating...
              </>
            ) : (
              "Create Job"
            )}
          </button>
          <button
            type="button"
            onClick={() => router.push("/userdashboard/manage-jobs")}
            className="bg-gray-300 hover:bg-gray-400 text-gray-500 font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}