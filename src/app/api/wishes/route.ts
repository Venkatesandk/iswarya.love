import { NextRequest, NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { getLocalWishes, addLocalWish } from '@/lib/store';

// Rate limiting in-memory map for POST requests
const ipRateMap = new Map<string, number>();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const includeUnapproved = searchParams.get('all') === 'true';

    if (isSupabaseConfigured && supabase) {
      let query = supabase.from('birthday_wishes').select('*').order('created_at', { ascending: false });
      if (!includeUnapproved) {
        query = query.eq('approved', true);
      }
      const { data, error } = await query;
      if (!error && data) {
        return NextResponse.json({ wishes: data });
      }
    }

    // Local Store Fallback
    const localData = getLocalWishes();
    const filtered = includeUnapproved ? localData : localData.filter((w) => w.approved);
    return NextResponse.json({ wishes: filtered });
  } catch (error) {
    console.error('Error fetching wishes:', error);
    return NextResponse.json({ wishes: getLocalWishes() }, { status: 200 });
  }
}

export async function POST(req: NextRequest) {
  try {
    // Basic IP rate limiting (max 5 wishes per 10 mins per IP)
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const now = Date.now();
    const lastRequestTime = ipRateMap.get(ip) || 0;

    if (now - lastRequestTime < 2000) {
      return NextResponse.json(
        { error: 'Please wait a moment before sending another wish ❤️' },
        { status: 429 }
      );
    }
    ipRateMap.set(ip, now);

    const body = await req.json();
    const { name, relationship, message, photo_url } = body;

    if (!name || !message || name.trim().length === 0 || message.trim().length === 0) {
      return NextResponse.json(
        { error: 'Please fill in both your name and your birthday message!' },
        { status: 400 }
      );
    }

    // Sanitize input lengths
    const sanitizedName = name.slice(0, 80).trim();
    const sanitizedRel = (relationship || 'Friend').slice(0, 50).trim();
    const sanitizedMsg = message.slice(0, 1000).trim();
    const sanitizedPhoto = photo_url && photo_url.startsWith('http') ? photo_url.slice(0, 500) : undefined;

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('birthday_wishes')
        .insert([
          {
            name: sanitizedName,
            relationship: sanitizedRel,
            message: sanitizedMsg,
            photo_url: sanitizedPhoto,
            approved: true,
            likes: 0
          }
        ])
        .select();

      if (!error && data && data.length > 0) {
        return NextResponse.json({ wish: data[0], message: 'Wish added successfully!' }, { status: 201 });
      }
    }

    // Fallback to local file store
    const newWish = addLocalWish({
      name: sanitizedName,
      relationship: sanitizedRel,
      message: sanitizedMsg,
      photo_url: sanitizedPhoto
    });

    return NextResponse.json({ wish: newWish, message: 'Wish added to birthday universe! ✨' }, { status: 201 });
  } catch (error) {
    console.error('Error submitting wish:', error);
    return NextResponse.json({ error: 'Failed to record wish' }, { status: 500 });
  }
}
