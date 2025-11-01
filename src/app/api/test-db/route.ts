import { NextResponse } from 'next/server';
import { db } from '@/db';
import { gamesTable } from '@/db/schema';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Test database connection and query games
    const games = await db
      .select({
        id: gamesTable.id,
        slug: gamesTable.slug,
        title: gamesTable.title,
      })
      .from(gamesTable);

    return NextResponse.json({
      success: true,
      count: games.length,
      games: games,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    }, { status: 500 });
  }
}
