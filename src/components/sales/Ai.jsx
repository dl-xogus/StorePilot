'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

// ─── AI 매출 분석 컴포넌트 ────────────────────────────────────────────────────
// salesData: 부모(sales/page.jsx)에서 DB 조회 후 전달한 전체 매출 배열
//            [{ date, day, dailySales, details }, ...]
export default function SalesDashboard({ salesData }) {
    const [prediction, setPrediction] = useState(null); // AI 분석 결과
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // salesData가 없거나 비어있으면 API 호출 생략
        if (!salesData || salesData.length === 0) {
            setLoading(false);
            return;
        }

        // API가 기대하는 형태로 변환: { date, dailySales } → { date, amount }
        // dailySales가 문자열로 올 수 있어서 Number()로 변환
        const formatted = salesData.map(s => ({ date: s.date, amount: Number(s.dailySales) }));

        async function fetchPrediction() {
            // /api/sales/openai 에 매출 데이터 전송 → 통계 계산 + AI 분석 결과 수신
            const { data } = await axios.post('/api/sales/openai', {
                salesData: formatted,
            });
            setPrediction(data);
            setLoading(false);
        }

        fetchPrediction();
    }, [salesData]); // salesData가 바뀔 때마다 재분석

    if (loading) return (<p>AI 분석 중...</p>);
    if (!prediction) return (<p>매출 데이터가 없습니다.</p>);

    // prediction 구조: { predictedAmount, trend, summary, advice, ... }
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <p style={{ fontSize: 20, fontWeight: 'bold' }}>
                    오늘 예상 매출:
                </p>
                <p style={{ fontSize: 20, fontWeight: 'bold', color: '#76DE99'}}>
                    {prediction?.predictedAmount.toLocaleString()}원
                </p>
            </div>
            <p>
                트렌드:
                <span style={prediction.trend === '상승' ? {color: '#85D575'} : {color: '#F34C4C'}}>
                    {` ${prediction?.trend}`}
                </span>
            </p>
            <p style={{ lineHeight: '160%' }}>{prediction?.summary}</p>
            <p style={{ lineHeight: '160%' }}>💡 {prediction?.advice}</p>
        </div>
    );
}
