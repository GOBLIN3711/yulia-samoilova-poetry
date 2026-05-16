import { NextRequest, NextResponse } from "next/server";
import poems from "@/data/poems.json";
import { promises as fs } from "fs";
import path from "path";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "20", 10);
  const action = searchParams.get("action");

  // Handle tracks list request from MusicPlayer
  if (action === "tracks") {
    try {
      // Try Supabase first
      if (isSupabaseConfigured) {
        const { data, error } = await supabase
          .from("tracks")
          .select("*")
          .order("created_at", { ascending: true });

        if (!error && data) {
          const tracks = data.map((t) => ({
            id: t.id,
            title: t.title,
            duration: t.duration || "0:00",
            file: t.file_url || "",
            date: t.created_at?.split("T")[0] || "",
          }));
          return NextResponse.json({ tracks });
        }
      }

      // Fallback to local JSON
      const tracksFile = path.join(process.cwd(), "src", "data", "tracks.json");
      const data = await fs.readFile(tracksFile, "utf-8");
      const tracks = JSON.parse(data);
      return NextResponse.json({ tracks });
    } catch {
      return NextResponse.json({ tracks: [] });
    }
  }

  // Try Supabase first for poems
  if (isSupabaseConfigured) {
    try {
      if (!category) {
        // Get category list with counts
        const { data: poemsData, error } = await supabase
          .from("poems")
          .select("category");

        if (!error && poemsData) {
          const grouped: Record<string, number> = {};
          for (const p of poemsData) {
            const cat = p.category || "Другие";
            grouped[cat] = (grouped[cat] || 0) + 1;
          }

          const categories = Object.entries(grouped)
            .map(([label, count]) => ({ label, count }))
            .sort((a, b) => b.count - a.count);

          return NextResponse.json({ categories, total: poemsData.length });
        }
      } else {
        // Get poems for specific category with pagination
        const from = (page - 1) * limit;
        const to = from + limit - 1;

        const { data: poemsData, error, count } = await supabase
          .from("poems")
          .select("*", { count: "exact" })
          .eq("category", category)
          .order("date", { ascending: false, nullsFirst: false })
          .range(from, to);

        if (!error && poemsData) {
          const poems = poemsData.map((p) => ({
            id: p.id,
            title: p.title,
            text: p.text,
            url: p.url || "",
            date: p.date || "",
            category: p.category || "Другие",
          }));

          return NextResponse.json({
            poems,
            total: count || poemsData.length,
            page,
            limit,
            hasMore: (count || 0) > to + 1,
          });
        }
      }
    } catch {
      // Fall through to local fallback
    }
  }

  // Fallback: read from local JSON
  const grouped: Record<string, typeof poems> = {};
  for (const poem of poems) {
    const cat = poem.category || "Другие";
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(poem);
  }

  const categories = Object.entries(grouped)
    .map(([label, items]) => ({ label, count: items.length }))
    .sort((a, b) => b.count - a.count);

  if (!category) {
    return NextResponse.json({ categories, total: poems.length });
  }

  const categoryPoems = grouped[category] || [];
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedPoems = categoryPoems.slice(start, end);

  return NextResponse.json({
    poems: paginatedPoems,
    total: categoryPoems.length,
    page,
    limit,
    hasMore: end < categoryPoems.length,
  });
}
