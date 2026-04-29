import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

// Google AI Studio API 키로 클라이언트 초기화
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);

// ─── 매출 통계 계산 ───────────────────────────────────────────────────────────
// salesData: [{ date, amount }, ...] 형태의 배열
// 반환값: AI 프롬프트에 넘길 통계 + 예상 매출액
export function calculatePredictedSales(salesData) {
  // 최근 7일 데이터만 추출
  const recent = salesData.slice(-7);

  // 최근 7일 평균 → 예상 매출액으로 사용
  const average = recent.reduce((sum, d) => sum + d.amount, 0) / recent.length;

  // 트렌드: 가장 마지막 날 매출 vs 7일 전 매출 비교
  // 데이터가 7개 미만이면 첫 번째 날과 비교
  const last = salesData.at(-1)?.amount ?? 0;
  const prev = salesData.length >= 7 ? salesData.at(-7)?.amount ?? 0 : salesData.at(0)?.amount ?? 0;
  const trend = last > prev ? '상승' : '하락';

  return {
    predictedAmount: Math.round(average),  // 예상 매출액
    trend,                                  // 상승 / 하락
    recentAverage: Math.round(average),     // 최근 7일 평균 (predictedAmount와 동일)
    maxAmount: Math.max(...salesData.map(d => d.amount)),  // 전체 기간 최고 매출
    minAmount: Math.min(...salesData.map(d => d.amount)),  // 전체 기간 최저 매출
  };
}

// ─── POST /api/sales/openai ───────────────────────────────────────────────────
// 클라이언트에서 salesData를 받아 통계 계산 후 Gemma AI에게 분석 요청
// 응답: { predictedAmount, trend, recentAverage, maxAmount, minAmount, summary, advice }
export async function POST(req) {
  try {
    // 클라이언트에서 전달한 salesData: [{ date, amount }, ...]
    const { salesData } = await req.json();

    // 1단계: 직접 통계 계산 (AI 호출 전)
    const calculatedData = calculatePredictedSales(salesData);

    // 2단계: Gemma 모델 준비
    const model = genAI.getGenerativeModel({ model: 'gemma-4-31b-it' });

    // 3단계: 계산된 통계를 프롬프트에 담아 AI에게 분석 요청
    // JSON 형식으로만 응답하도록 강제
    const prompt = `다음은 매장의 매출 통계입니다.
- 예상 매출액: ${calculatedData.predictedAmount.toLocaleString()}원
- 트렌드: ${calculatedData.trend}
- 최근 7일 평균: ${calculatedData.recentAverage.toLocaleString()}원
- 최고 매출: ${calculatedData.maxAmount.toLocaleString()}원
- 최저 매출: ${calculatedData.minAmount.toLocaleString()}원

반드시 아래 JSON 형식으로만 응답하세요. 다른 텍스트 없이 JSON만 반환하세요.
{"summary": "2-3줄 분석", "advice": "한 줄 조언"}`;

    const result = await model.generateContent(prompt);

    // 4단계: AI 응답에서 JSON 추출
    // 모델이 JSON 외 텍스트를 붙일 수 있으므로 정규식으로 첫 번째 JSON 객체만 추출
    const text = result.response.text().trim();
    const jsonMatch = text.match(/\{(?:[^{}]|{[^{}]*})*\}/); // 중첩 없는 첫 번째 JSON 객체
    const analysisResult = jsonMatch
      ? JSON.parse(jsonMatch[0])
      : { summary: '분석 결과를 가져오지 못했습니다.', advice: '' }; // 파싱 실패 시 fallback

    // 5단계: 계산값 + AI 분석 합쳐서 반환
    return NextResponse.json({ ...calculatedData, ...analysisResult });
  } catch (e) {
    console.error('[AI] 에러:', e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
