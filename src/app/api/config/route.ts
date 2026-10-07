import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { birthdayConfig as defaultConfig } from '@/config/birthdayConfig';

const CONFIG_FILE = path.join(process.cwd(), 'data_config.json');

export async function GET() {
  try {
    if (fs.existsSync(CONFIG_FILE)) {
      const raw = fs.readFileSync(CONFIG_FILE, 'utf-8');
      return NextResponse.json(JSON.parse(raw));
    }
  } catch (err) {
    console.error("Error reading config", err);
  }
  return NextResponse.json(defaultConfig);
}

export async function POST(req: NextRequest) {
  try {
    const newConfig = await req.json();
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(newConfig, null, 2), 'utf-8');
    return NextResponse.json({ success: true, config: newConfig });
  } catch (error) {
    console.error("Error writing config", error);
    return NextResponse.json({ error: 'Failed to save configuration' }, { status: 500 });
  }
}
