'use client';
import { useEffect, useRef } from 'react';
import TypeIt from 'typeit';
import useAIStore from '@/store/aiStore';

export default function SalesCallAi() {
    const { sales, loading } = useAIStore();
    const elRef = useRef(null);

    useEffect(() => {
        if (!sales || sales.predictedAmount == null || !elRef.current) return;

        const trendColor = sales.trend === '상승' ? '#85D575' : '#F34C4C';
        const instance = new TypeIt(elRef.current, { speed: 20, html: true, cursor: false })
            .type(`<strong style="font-size:20px">오늘 예상 매출: <span style="color:#76DE99">${sales.predictedAmount.toLocaleString()}원</span></strong>`)
            .pause(200)
            .type(`<br/><br/>트렌드: <span style="color:${trendColor}">${sales.trend}</span>`)
            .pause(200)
            .type(`<br/><br/>${sales.summary}`)
            .pause(200)
            .type(`<br/><br/>💡 ${sales.advice}`)
            .go();

        return () => instance.destroy();
    }, [sales]);

    if (loading.sales) return <p>AI 분석 중...</p>;
    if (!sales) return <p>매출 데이터가 없습니다.</p>;

    return <div ref={elRef} />;
}
