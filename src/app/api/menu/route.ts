import { NextResponse } from 'next/server';
import { getAllCategories } from '@/data/menu-data';

export async function GET() {
  try {
    const categories = getAllCategories();
    return NextResponse.json({ categories }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch menu' }, { status: 500 });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
