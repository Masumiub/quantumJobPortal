import { getServerSession } from "next-auth/next";

import clientPromise from "@/app/lib/db";
import { authOptions } from "@/app/lib/auth";

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const client = await clientPromise;
    const db = client.db("quantumJobPortalDB");
    
    const jobs = await db.collection("jobs")
      .find({ userEmail: session.user.email })
      .sort({ createdAt: -1 })
      .toArray();

    return new Response(JSON.stringify(jobs), {
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

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const body = await request.json();
    const { 
      title, 
      company, 
      location, 
      description, 
      requirements, 
      salary, 
      level, 
      category,
      hiringCount, 
      tags, 
      userEmail,
      userName,
    } = body;
    
    if (!title || !company || !location || !level || !hiringCount) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const client = await clientPromise;
    const db = client.db("quantumJobPortalDB");
    
    const job = {
      title,
      company,
      location,
      description: description || "",
      requirements: requirements || [],
      salary: salary || "",
      level,
      category,
      hiringCount: parseInt(hiringCount),
      tags: tags || [],
      userId: session.user.id,
      userEmail: userEmail || session.user.email,
      userName: userName || session.user.name,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection("jobs").insertOne(job);
    
    return new Response(JSON.stringify({ ...job, _id: result.insertedId }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}