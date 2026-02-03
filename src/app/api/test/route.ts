import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET() {
  return NextResponse.json({ 
    message: 'API route works!',
    timestamp: new Date().toISOString() 
  });
}

export async function POST() {
  return NextResponse.json({ 
    message: 'POST works!',
    timestamp: new Date().toISOString() 
  });
}
