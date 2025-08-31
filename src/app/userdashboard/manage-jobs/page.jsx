"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Swal from "sweetalert2";

export default function ManageJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingJob, setEditingJob] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("/api/jobs");
        if (response.ok) {
          const jobsData = await response.json();
          setJobs(jobsData);
        } else {
          setError("Failed to fetch jobs");
        }
      } catch (error) {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this job?")) {
      try {
        const response = await fetch(`/api/jobs/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Job Deletion successful!",
            showConfirmButton: false,
            timer: 1500
          });
          setJobs(jobs.filter(job => job._id !== id));
        } else {
          const data = await response.json();
          setError(data.error || "Failed to delete job");
        }
      } catch (error) {
        setError("Something went wrong");
      }
    }
  };

  const openEditModal = (job) => {
    setEditingJob({ ...job });
  };

  const closeEditModal = () => {
    setEditingJob(null);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const requirementsArray = editingJob.requirements
        ? editingJob.requirements.split("\n").filter(req => req.trim() !== "")
        : [];

      const tagsArray = editingJob.tags
        ? editingJob.tags.split(",").map(tag => tag.trim()).filter(tag => tag !== "")
        : [];

      const response = await fetch(`/api/jobs/${editingJob._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: editingJob.title,
          company: editingJob.company,
          location: editingJob.location,
          description: editingJob.description,
          salary: editingJob.salary,
          requirements: requirementsArray,
          level: editingJob.level,
          hiringCount: parseInt(editingJob.hiringCount),
          tags: tagsArray,
        }),
      });

      if (response.ok) {
        const updatedJob = await response.json();
        setJobs(jobs.map(job => job._id === updatedJob._id ? updatedJob : job));

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Job Update successful!",
          showConfirmButton: false,
          timer: 1500
        });

        closeEditModal();
      } else {
        const data = await response.json();
        setError(data.error || "Failed to update job");
      }
    } catch (error) {
      setError("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingJob({
      ...editingJob,
      [name]: value
    });
  };

  if (loading) return <div className="text-center p-8"><span className="loading loading-spinner loading-sm"></span></div>;
  if (error) return <div className="text-red-500 text-center p-8">{error}</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Manage Jobs</h2>

      {jobs.length === 0 ? (
        <div className="text-center p-8">
          <p className="text-gray-600 mb-4">You haven't posted any jobs yet.</p>
          <Link
            href="/userdashboard/create-job"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Create Your First Job
          </Link>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Company</th>
                  <th>Location</th>
                  <th>Level</th>
                  <th>Hiring</th>
                  <th>Salary</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr key={job._id}>
                    <td>
                      <div className="font-bold">{job.title}</div>
                      <div className="text-sm text-gray-500">{job.description.substring(0, 50)}...</div>
                    </td>
                    <td>{job.company}</td>
                    <td>{job.location}</td>
                    <td>
                      <span className="btn btn-xs bg-green-500 text-white rounded-full border-0">
                        {job.level}
                      </span>
                    </td>
                    <td>{job.hiringCount}</td>
                    <td>{job.salary || "Not specified"}</td>
                    <td>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => openEditModal({
                            ...job,
                            requirements: job.requirements.join("\n"),
                            tags: job.tags.join(", ")
                          })}
                          className="btn btn-sm btn-primary rounded-full"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(job._id)}
                          className="btn btn-sm btn-error rounded-full text-white"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Edit Modal */}
          {editingJob && (
            <dialog id="edit_modal" className="modal modal-open">
              <div className="modal-box max-w-4xl">
                <h3 className="font-bold text-lg mb-4">Edit Job</h3>

                <form onSubmit={handleEditSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="label">
                        <span className="label-text">Job Title</span>
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={editingJob.title}
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                        required
                      />
                    </div>

                    <div>
                      <label className="label">
                        <span className="label-text">Company</span>
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={editingJob.company}
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="label">
                        <span className="label-text">Location</span>
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={editingJob.location}
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                        required
                      />
                    </div>

                    <div>
                      <label className="label">
                        <span className="label-text">Level</span>
                      </label>
                      <select
                        name="level"
                        value={editingJob.level}
                        onChange={handleInputChange}
                        className="select select-bordered w-full"
                        required
                      >
                        <option value="junior">Junior</option>
                        <option value="mid">Mid-level</option>
                        <option value="senior">Senior</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="label">
                        <span className="label-text">Hiring Count</span>
                      </label>
                      <input
                        type="number"
                        name="hiringCount"
                        min="1"
                        value={editingJob.hiringCount}
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                        required
                      />
                    </div>

                    <div>
                      <label className="label">
                        <span className="label-text">Salary</span>
                      </label>
                      <input
                        type="text"
                        name="salary"
                        value={editingJob.salary}
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                        placeholder="e.g., $50,000 - $70,000"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="label">
                      <span className="label-text">Tags (comma separated)</span>
                    </label>
                    <input
                      type="text"
                      name="tags"
                      value={editingJob.tags}
                      onChange={handleInputChange}
                      className="input input-bordered w-full"
                      placeholder="e.g., React, Node.js, MongoDB"
                    />
                  </div>

                  <div>
                    <label className="label">
                      <span className="label-text">Description</span>
                    </label>
                    <textarea
                      name="description"
                      value={editingJob.description}
                      onChange={handleInputChange}
                      className="textarea textarea-bordered w-full"
                      rows="3"
                    />
                  </div>

                  <div>
                    <label className="label">
                      <span className="label-text">Requirements (one per line)</span>
                    </label>
                    <textarea
                      name="requirements"
                      value={editingJob.requirements}
                      onChange={handleInputChange}
                      className="textarea textarea-bordered w-full"
                      rows="3"
                    />
                  </div>

                  <div className="modal-action">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary rounded-full"
                    >
                      {isSubmitting ? "Updating..." : "Update Job"}
                    </button>
                    <button
                      type="button"
                      onClick={closeEditModal}
                      className="btn rounded-full"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>

              {/* Close modal when clicking on backdrop */}
              <form method="dialog" className="modal-backdrop">
                <button onClick={closeEditModal}>close</button>
              </form>
            </dialog>
          )}
        </>
      )}
    </div>
  );
}