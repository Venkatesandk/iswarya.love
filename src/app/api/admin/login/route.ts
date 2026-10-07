import { NextRequest, NextResponse } from 'next/server';
import { birthdayConfig } from '@/config/birthdayConfig';

export async function POST(req: NextRequest) {
  try {
    const { pin } = await req.json();

    if (pin === birthdayConfig.ADMIN_PIN) {
      // In a real app, set a JWT or session cookie here
      return NextResponse.json({ success: true, token: 'dummy-admin-token' });
    }

    return NextResponse.json({ error: 'Invalid PIN' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}
