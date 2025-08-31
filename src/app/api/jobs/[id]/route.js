import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/lib/auth";
import clientPromise from "@/app/lib/db";
import { ObjectId } from "mongodb";

export async function PUT(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { id } = params;
    const body = await request.json();
    const { 
      title, 
      company, 
      location, 
      description, 
      requirements, 
      salary, 
      level, 
      hiringCount, 
      tags 
    } = body;
    
    if (!title || !company || !location || !level || !hiringCount) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const client = await clientPromise;
    const db = client.db("quantumJobPortalDB");
    
    // Check if job exists and belongs to user
    const existingJob = await db.collection("jobs").findOne({ 
      _id: new ObjectId(id), 
      userId: session.user.id // Verify ownership by userId
    });
    
    if (!existingJob) {
      return new Response(JSON.stringify({ error: "Job not found or you don't have permission to edit it" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const updatedJob = {
      ...existingJob,
      title,
      company,
      location,
      description: description || "",
      requirements: requirements || [],
      salary: salary || "",
      level,
      hiringCount: parseInt(hiringCount),
      tags: tags || [],
      updatedAt: new Date(),
    };

    const result = await db.collection("jobs").updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedJob }
    );
    
    return new Response(JSON.stringify(updatedJob), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { id } = params;

    const client = await clientPromise;
    const db = client.db("quantumJobPortalDB");
    
    // Check if job exists and belongs to user
    const existingJob = await db.collection("jobs").findOne({ 
      _id: new ObjectId(id), 
      userId: session.user.id // Verify ownership by userId
    });
    
    if (!existingJob) {
      return new Response(JSON.stringify({ error: "Job not found or you don't have permission to delete it" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    await db.collection("jobs").deleteOne({ _id: new ObjectId(id) });
    
    return new Response(JSON.stringify({ message: "Job deleted successfully" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}