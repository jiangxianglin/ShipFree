import { config } from "dotenv";
import { resolve } from "path";
import { createClient } from "@supabase/supabase-js";

config({ path: resolve(process.cwd(), ".env.local") });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

const tagUpdates: Record<string, string[]> = {
  "two-truths-and-a-lie": ["students", "high-school", "college", "classroom", "non-cheesy"],
  "human-bingo": ["students", "classroom", "high-school", "college", "orientation", "first-day"],
  "virtual-background-story": ["students", "online", "classroom", "college"],
  "speed-networking": ["students", "college", "orientation"],
  "one-word-check-in": ["students", "classroom", "first-day", "shy-students", "low-prep"],
  "show-and-tell": ["students", "classroom", "elementary", "middle-school"],
  "emoji-introduction": ["students", "online", "classroom", "low-prep"],
  "common-ground": ["students", "classroom", "shy-students", "college"],
  "scavenger-hunt": ["students", "classroom", "orientation", "large-group"],
  "line-up": ["students", "classroom", "high-school", "non-cheesy", "low-prep"],
  "icebreaker-bingo": ["students", "college", "orientation", "first-day"],
  "this-or-that-questions": ["students", "classroom", "online", "shy-students", "low-prep"],
};

async function run() {
  for (const [slug, additions] of Object.entries(tagUpdates)) {
    const { data, error } = await supabase
      .from("games")
      .select("tags")
      .eq("slug", slug)
      .single();

    if (error) {
      throw new Error(`Failed to fetch ${slug}: ${error.message}`);
    }

    const mergedTags = Array.from(new Set([...(data.tags ?? []), ...additions]));

    const { error: updateError } = await supabase
      .from("games")
      .update({ tags: mergedTags })
      .eq("slug", slug);

    if (updateError) {
      throw new Error(`Failed to update ${slug}: ${updateError.message}`);
    }

    console.log(`Updated ${slug}: ${mergedTags.join(", ")}`);
  }
}

run()
  .then(() => {
    console.log("Student audience tags synced successfully.");
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
