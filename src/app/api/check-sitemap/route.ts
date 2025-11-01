import { NextResponse } from 'next/server';
import { db } from '@/db';
import { gamesTable } from '@/db/schema';

export async function GET() {
  try {
    const games = await db
      .select({ id: gamesTable.id, title: gamesTable.title })
      .from(gamesTable);
    
    return NextResponse.json({
      success: true,
      gamesCount: games.length,
      sampleGames: games.slice(0, 5),
      sitemapUrl: 'https://icebreakergames.site/sitemap.xml',
      message: 'Database connection successful',
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      message: 'Database connection failed',
    }, { status: 500 });
  }
}
