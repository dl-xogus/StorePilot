import { NextResponse } from 'next/server'
import { getMenus } from '@/lib/db/menu'

/* 메뉴 목록 조회 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const ownerId = searchParams.get('ownerId');
  const storeId = searchParams.get('storeId');

  const menu = await getMenus(ownerId, storeId);

  return NextResponse.json({ menu });
};