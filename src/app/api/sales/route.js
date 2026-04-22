import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

const DB = 'store_pilot'
const COL = 'sale'

async function getCollection() {
  const client = await clientPromise
  return client.db(DB).collection(COL)
}

// GET /api/sales?ownerId=xxx&storeId=xxx
// 특정 매장의 매출 전체 조회
export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const ownerId = searchParams.get('ownerId')
  const storeId = searchParams.get('storeId')

  const col = await getCollection()
  const doc = await col.findOne({ ownerId, storeId })

  if (!doc) return NextResponse.json({ sales: [] })
  return NextResponse.json({ sales: doc.sales })
}

// POST /api/sales
// 새 날짜 매출 추가
// body: { ownerId, storeId, date, day, dailySales, details }
export async function POST(request) {
  const { ownerId, storeId, date, day, dailySales, details } = await request.json()

  const col = await getCollection()
  const newEntry = { date, day, dailySales, details: details ?? [] }

  // 해당 문서가 없으면 생성, 있으면 sales 배열에 추가
  await col.updateOne(
    { ownerId, storeId },
    { $push: { sales: newEntry } },
    { upsert: true }
  )

  return NextResponse.json({ ok: true })
}

// PUT /api/sales
// 특정 날짜 매출 수정
// body: { ownerId, storeId, date, day, dailySales, details }
export async function PUT(request) {
  const { ownerId, storeId, date, day, dailySales, details } = await request.json()

  const col = await getCollection()

  // sales 배열에서 date가 일치하는 항목만 교체
  await col.updateOne(
    { ownerId, storeId, 'sales.date': date },
    { $set: { 'sales.$': { date, day, dailySales, details } } }
  )

  return NextResponse.json({ ok: true })
}

// DELETE /api/sales?ownerId=xxx&storeId=xxx&date=xxx
// 특정 날짜 매출 삭제
export async function DELETE(request) {
  const { searchParams } = new URL(request.url)
  const ownerId = searchParams.get('ownerId')
  const storeId = searchParams.get('storeId')
  const date = searchParams.get('date')

  const col = await getCollection()

  // sales 배열에서 해당 date 항목 제거
  await col.updateOne(
    { ownerId, storeId },
    { $pull: { sales: { date } } }
  )

  return NextResponse.json({ ok: true })
}
