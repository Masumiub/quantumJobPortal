import clientPromise from "@/app/lib/db";


export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    
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

    return new Response(JSON.stringify(jobs), {
      status: 200,
      headers: { 
        "Content-Type": "application/json",
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30"
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}