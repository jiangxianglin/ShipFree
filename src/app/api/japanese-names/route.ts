import { NextResponse } from 'next/server';
// @ts-ignore
import enamdict from 'enamdict';

let initialized = false;
const initPromise = new Promise<void>((resolve) => {
  enamdict.init(() => {
    initialized = true;
    resolve();
  });
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name');

  if (!name) {
    return NextResponse.json({ error: 'Name parameter is required' }, { status: 400 });
  }

  try {
    if (!initialized) {
      await initPromise;
    }

    // Try finding by Kanji first (as requested for "readings of surnames")
    const entries = enamdict.findKanji(name);
    
    // If no results found by Kanji, maybe they entered Romaji?
    // But the user specifically asked for "Japanese surnames have different readings", 
    // usually implying Kanji input -> Kana readings.
    
    return NextResponse.json({
      original: name,
      kana: entries.kana(),
      romaji: entries.romaji(),
      type: entries.type(),
      entries: entries.entries()
    });
  } catch (error) {
    console.error('Error in japanese-names API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
