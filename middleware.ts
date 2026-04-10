import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { createClient } from "@/lib/supabase/server";

export async function middleware(request: NextRequest) {
  const hostHeader = request.headers.get("host") ?? "";
  const hostname = hostHeader.split(":")[0];
  const canonicalHostname = "www.icebreakergames.site";
  const forwardedProto = request.headers.get("x-forwarded-proto") ?? "";

  if (
    hostname === "icebreakergames.site" ||
    (hostname === canonicalHostname && forwardedProto === "http")
  ) {
    const url = request.nextUrl.clone();
    url.hostname = canonicalHostname;
    url.protocol = "https:";
    return NextResponse.redirect(url, 308);
  }

  const pathname = request.nextUrl.pathname;

  // Handle UUID to slug redirects for game pages
  const gameUuidMatch = pathname.match(/^\/games\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})$/i);
  if (gameUuidMatch) {
    try {
      const supabase = await createClient();
      const { data: game } = await supabase
        .from("games")
        .select("slug")
        .eq("id", gameUuidMatch[1])
        .single();

      if (game?.slug) {
        const url = request.nextUrl.clone();
        url.pathname = `/games/${game.slug}`;
        return NextResponse.redirect(url, 301);
      }
    } catch (error) {
      console.error("Error redirecting UUID to slug:", error);
    }
  }

  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
