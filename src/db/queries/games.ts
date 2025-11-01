import { createClient } from "@/lib/supabase/server";
import type { Game } from "@/types/game";

/**
 * Get all games from the database, ordered by creation date (newest first)
 */
export async function getAllGames(): Promise<Game[]> {
  try {
    const supabase = await createClient();
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

/**
 * Get a single game by its ID
 */
export async function getGameById(id: string): Promise<Game | null> {
  try {
    const supabase = await createClient();
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

/**
 * Get a single game by its slug
 */
export async function getGameBySlug(slug: string): Promise<Game | null> {
  try {
    const supabase = await createClient();
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

/**
 * Get all games in a specific category
 */
export async function getGamesByCategory(category: string): Promise<Game[]> {
  try {
    const supabase = await createClient();
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
