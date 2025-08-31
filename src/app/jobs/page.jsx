import { getServerSession } from "next-auth/next";
import JobsList from "./JobsList";
import clientPromise from "../lib/db";
import { authOptions } from "../lib/auth";
import { redirect } from "next/navigation";


// This function can be directly used to fetch jobs without HTTP calls
async function getJobs(search = '') {
  try {
    const client = await clientPromise;
    const db = client.db("quantumJobPortalDB");
    
    // Create search filter
    let filter = {};
    if (search) {
      filter = {
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { company: { $regex: search, $options: 'i' } },
          { location: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { tags: { $in: [new RegExp(search, 'i')] } }
        ]
      };
    }
    
    const jobs = await db.collection("jobs")
      .find(filter)
      .sort({ createdAt: -1 })
      .toArray();

    // Convert MongoDB objects to plain JavaScript objects
    // and convert ObjectId to string
    const serializedJobs = jobs.map(job => ({
      ...job,
      _id: job._id.toString(), // Convert ObjectId to string
      createdAt: job.createdAt.toISOString(), // Convert Date to string
      updatedAt: job.updatedAt.toISOString() // Convert Date to string
    }));

    return serializedJobs;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }
}

export default async function JobsPage({ searchParams }) {
  const session = await getServerSession(authOptions);


    // Redirect to login if not authenticated
  if (!session) {
    redirect("/Login");
  }


  const search = searchParams?.search || '';
  
  // Fetch jobs directly from database
  const jobs = await getJobs(search);

  return <JobsList jobs={jobs} search={search} session={session} />;
}

export const revalidate = 60; // ISR: Revalidate every 60 seconds