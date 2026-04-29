'use client';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import TypeIt from 'typeit-react';

// ─── AI 매출 분석 컴포넌트 ────────────────────────────────────────────────────
// salesData: 부모(sales/page.jsx)에서 DB 조회 후 전달한 전체 매출 배열
//            [{ date, day, dailySales, details }, ...]
export default function SalesDashboard({ salesData }) {
    const [prediction, setPrediction] = useState(null); // AI 분석 결과
    const [loading, setLoading] = useState(true);
    const hasFetched = useRef(false); // 이미 호출했는지 여부 (한 번만 호출하기 위해)

    useEffect(() => {
        // 이미 호출했거나 salesData가 아직 비어있으면 생략 (부모 로딩 대기)
        if (hasFetched.current || !salesData || salesData.length === 0) return;
        hasFetched.current = true; // 호출 시작 전에 true로 설정

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
    }, [salesData]);

    if (loading) return (<p>AI 분석 중...</p>);
    if (!prediction) return (<p>매출 데이터가 없습니다.</p>);

    const trendColor = prediction.trend === '상승' ? '#85D575' : '#F34C4C';

    // prediction 구조: { predictedAmount, trend, summary, advice, ... }
    return (
        <TypeIt
            options={{ speed: 20, html: true, cursor: false }}
            getBeforeInit={(instance) => {
                instance
                    .type(`<strong style="font-size:20px">오늘 예상 매출: <span style="color:#76DE99">${prediction.predictedAmount.toLocaleString()}원</span></strong>`)
                    .pause(200)
                    .type(`<br/><br/>트렌드: <span style="color:${trendColor}">${prediction.trend}</span>`)
                    .pause(200)
                    .type(`<br/><br/>${prediction.summary}`)
                    .pause(200)
                    .type(`<br/><br/>💡 ${prediction.advice}`);
                return instance;
            }}
        />
    );
}
