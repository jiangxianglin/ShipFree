import { config } from "dotenv";
import { resolve } from "path";
import { readdirSync, readFileSync, statSync } from "fs";
import { createClient } from "@supabase/supabase-js";
import { seedGames } from "@/db/seed/games-supabase";

config({ path: resolve(process.cwd(), ".env.local") });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

function collectBlogPageFiles(dir: string): string[] {
  const entries = readdirSync(dir);
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = resolve(dir, entry);
    const stats = statSync(fullPath);

    if (stats.isDirectory()) {
      files.push(...collectBlogPageFiles(fullPath));
      continue;
    }

    if (entry === "page.tsx") {
      files.push(fullPath);
    }
  }

  return files;
}

function extractGameSlugsFromFile(filePath: string): string[] {
  const content = readFileSync(filePath, "utf8");
  const matches = content.matchAll(/\/games\/([a-z0-9-]+)/g);
  return [...new Set(Array.from(matches, (match) => match[1]))];
}

async function run() {
  const blogDir = resolve(process.cwd(), "src/app/blog");
  const blogFiles = collectBlogPageFiles(blogDir);
  const requiredSlugs = [...new Set(blogFiles.flatMap(extractGameSlugsFromFile))].sort();

  const { data: existingGames, error: fetchError } = await supabase
    .from("games")
    .select("slug")
    .in("slug", requiredSlugs);

  if (fetchError) {
    console.error("Error fetching existing blog-linked games:", fetchError);
    process.exit(1);
  }

  const existingSlugs = new Set((existingGames || []).map((game) => game.slug));
  const missingSlugs = requiredSlugs.filter((slug) => !existingSlugs.has(slug));

  if (missingSlugs.length === 0) {
    console.log("No missing blog-linked games found.");
    return;
  }

  const gamesToInsert = seedGames.filter((game) => missingSlugs.includes(game.slug));
  const unresolvedSlugs = missingSlugs.filter((slug) => !gamesToInsert.some((game) => game.slug === slug));

  if (unresolvedSlugs.length > 0) {
    console.error("Missing slugs not found in canonical seed data:");
    unresolvedSlugs.forEach((slug) => console.error(`- ${slug}`));
    process.exit(2);
  }

  const { error: insertError } = await supabase.from("games").insert(gamesToInsert);

  if (insertError) {
    console.error("Error inserting missing blog-linked games:", insertError);
    process.exit(1);
  }

  console.log(`Inserted ${gamesToInsert.length} missing blog-linked games:`);
  gamesToInsert.forEach((game) => {
    console.log(`- ${game.slug} -> ${game.title}`);
  });
}

run().catch((error) => {
  console.error("Unexpected error:", error);
  process.exit(1);
});
