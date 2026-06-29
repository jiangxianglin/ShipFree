import { createClient } from "@supabase/supabase-js";
import { unstable_cache } from "next/cache";
import type { Game } from "@/types/game";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY"
  );
}

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
  },
});

/**
 * Get all games from the database, ordered by creation date (newest first)
 */
async function fetchAllGames(): Promise<Game[]> {
  try {
    const { data, error } = await supabase
      .from("games")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Failed to fetch all games:", error);
      throw new Error("Unable to load games. Please try again later.");
    }

    return (data || []) as Game[];
  } catch (error) {
    console.error("Failed to fetch all games:", error);
    throw new Error("Unable to load games. Please try again later.");
  }
}

export const getAllGames = unstable_cache(fetchAllGames, ["getAllGames"], {
  revalidate: 60 * 60 * 24,
  tags: ["games"],
});

/**
 * Get a single game by its ID
 */
async function fetchGameById(id: string): Promise<Game | null> {
  try {
    const { data, error } = await supabase
      .from("games")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        // Not found
        return null;
      }
      console.error(`Failed to fetch game with id ${id}:`, error);
      throw new Error("Unable to load game. Please try again later.");
    }

    return data as Game;
  } catch (error) {
    console.error(`Failed to fetch game with id ${id}:`, error);
    return null;
  }
}

export const getGameById = unstable_cache(fetchGameById, ["getGameById"], {
  revalidate: 60 * 60 * 24,
  tags: ["games"],
});

/**
 * Get a single game by its slug
 */
async function fetchGameBySlug(slug: string): Promise<Game | null> {
  try {
    const { data, error } = await supabase
      .from("games")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        // Not found
        return null;
      }
      console.error(`Failed to fetch game with slug ${slug}:`, error);
      throw new Error("Unable to load game. Please try again later.");
    }

    return data as Game;
  } catch (error) {
    console.error(`Failed to fetch game with slug ${slug}:`, error);
    return null;
  }
}

export const getGameBySlug = unstable_cache(fetchGameBySlug, ["getGameBySlug"], {
  revalidate: 60 * 60 * 24,
  tags: ["games"],
});

/**
 * Get all games in a specific category
 */
async function fetchGamesByCategory(category: string): Promise<Game[]> {
  try {
    const { data, error } = await supabase
      .from("games")
      .select("*")
      .eq("category", category)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(`Failed to fetch games in category ${category}:`, error);
      throw new Error("Unable to load games. Please try again later.");
    }

    return (data || []) as Game[];
  } catch (error) {
    console.error(`Failed to fetch games in category ${category}:`, error);
    throw new Error("Unable to load games. Please try again later.");
  }
}

export const getGamesByCategory = unstable_cache(
  fetchGamesByCategory,
  ["getGamesByCategory"],
  {
    revalidate: 60 * 60 * 24,
    tags: ["games"],
  }
);
