import { NextRequest, NextResponse } from 'next/server';
import { validatePromoCode } from '@/data/menu-data';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code')?.trim().toUpperCase();
    const subtotal = Number(searchParams.get('subtotal') || 0);

    if (!code) {
      return NextResponse.json({ valid: false, error: 'Promo code is required' }, { status: 400 });
    }

    const result = validatePromoCode(code, subtotal);

    if (!result.valid) {
      return NextResponse.json({ valid: false, error: result.error || 'Invalid promo code' }, { status: 400 });
    }

    return NextResponse.json({
      valid: true,
      promo: {
        code: result.promo?.code,
        type: result.promo?.type,
        value: result.promo?.value,
      },
      calculatedDiscount: result.calculatedDiscount,
    });
  } catch (error) {
    return NextResponse.json({ valid: false, error: 'Failed to validate promo code' }, { status: 500 });
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
