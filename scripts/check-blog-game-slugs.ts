import { config } from "dotenv";
import { resolve } from "path";
import { readdirSync, readFileSync, statSync } from "fs";
import { createClient } from "@supabase/supabase-js";

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

  const { data, error } = await supabase
    .from("games")
    .select("slug, title")
    .in("slug", requiredSlugs)
    .order("slug");

  if (error) {
    console.error("Error checking blog game slugs:", error);
    process.exit(1);
  }

  const found = new Set((data || []).map((item) => item.slug));
  const missing = requiredSlugs.filter((slug) => !found.has(slug));

  console.log("Required slugs:", requiredSlugs.length);
  console.log("Found in database:", found.size);
  console.log("Blog pages scanned:", blogFiles.length);

  if (data && data.length > 0) {
    console.log("\nFound:");
    data.forEach((item) => {
      console.log(`- ${item.slug} -> ${item.title}`);
    });
  }

  if (missing.length > 0) {
    console.log("\nMissing:");
    missing.forEach((slug) => console.log(`- ${slug}`));
    process.exit(2);
  }

  console.log("\nAll blog-linked game slugs exist in the database.");
}

run().catch((error) => {
  console.error("Unexpected error:", error);
  process.exit(1);
});
