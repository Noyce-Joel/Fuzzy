import { NextResponse } from "next/server";
import Fuse from "fuse.js";
import guitarists from "@/app/data/guitarists";

export async function POST(request: { json: () => PromiseLike<{ query: any; }> | { query: any; }; }) {
 try {
  const { query } = await request.json();

  const lowercaseQuery = query.toLowerCase();
  const fuse = new Fuse(guitarists, {
   keys: ["title", "bands"],
   includeScore: true,
   threshold: 0,
  });

  const searchResults = fuse.search(lowercaseQuery);

  return NextResponse.json({
   success: true,
   results: searchResults.map((result) => result.item),
   message: "Here are your search results",
  });
 } catch (error) {
  return NextResponse.json({
   message: "Something went wrong",
  });
 }
}