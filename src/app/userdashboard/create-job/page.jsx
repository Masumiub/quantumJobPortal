"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function CreateJob() {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [salary, setSalary] = useState("");
  const [requirements, setRequirements] = useState("");
  const [level, setLevel] = useState("mid"); // Default to mid level
  const [hiringCount, setHiringCount] = useState(1); // Default to 1
  const [tags, setTags] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { data: session } = useSession();

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
          hiringCount: parseInt(hiringCount),
          tags: tagsArray,
          userEmail: session.user.email, // Add user email to the request
          userName: session.user.name 
        }),
      });
      
      if (response.ok) {
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
      <h2 className="text-2xl font-bold mb-6">Create New Job</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-2">Job Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Company</label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">Level</label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="junior">Junior</option>
              <option value="mid">Mid-level</option>
              <option value="senior">Senior</option>
            </select>
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Hiring Count</label>
            <input
              type="number"
              min="1"
              value={hiringCount}
              onChange={(e) => setHiringCount(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Salary</label>
          <input
            type="text"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="e.g., $50,000 - $70,000"
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Tags (comma separated)</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="e.g., React, Node.js, MongoDB"
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            rows="3"
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">
            Requirements (one per line)
          </label>
          <textarea
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            rows="3"
          />
        </div>
        
        <div className="flex space-x-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {isSubmitting ? "Creating..." : "Create Job"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/userdashboard/manage-jobs")}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}