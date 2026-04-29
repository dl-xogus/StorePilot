import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'

export default function Ai({ menuData }) {
    const [prediction, setPrediction] = useState(null); // AI 분석 결과
    const [loading, setLoading] = useState(true);
    const hasFetched = useRef(false); // 이미 호출했는지 여부 (한 번만 호출하기 위해)

    useEffect(() => {
        console.log('useEffect 실행됨, menuData:', menuData?.length, 'hasFetched:', hasFetched.current);
        if (hasFetched.current || !menuData || menuData.length === 0) return;
        hasFetched.current = true; // 호출 시작 전에 true로 설정

        const formatted = menuData.map(s => ({ name: s.name, sales: s.sales }));

        async function fetchPrediction() {
            try {
                const { data } = await axios.post('/api/menu/ai', {
                    menuData: formatted,
                });
                setPrediction(data);
            } catch (e) {
                console.error('[menu AI] 에러:', e);
            } finally {
                setLoading(false);
            }
        }

        fetchPrediction();
    }, [menuData]);

    console.log('이태현의 로그');
    console.log(prediction);

    if (loading) return (<p>AI 분석 중...</p>);
    if (!prediction) return (<p>매출 데이터가 없습니다.</p>);



    return (
        <div className={styles.graph}>
            <div className={styles.AItitle}>
                <p><img src="./img/icon/ic-AI.svg" alt="AI아이콘" /></p>
                <h3>AI 분석</h3>
            </div>

            <div className={styles.AllaiBox}>
                <div className={styles.aiBox}>
                    <div className={styles.aiBox2_title}>
                        <p><img src="./img/icon/menu-ai1.svg" alt="AI아이콘" /></p>
                        <span>인기 메뉴</span>
                    </div>
                    <div className={styles.aiBox2_text}>
                        <ul className={styles.aiBox2_text}>
                            <li>메뉴명: 메뉴명</li>
                        </ul>
                        <ul className={styles.aiText}>
                            <li>AI 분석 내용</li>
                            <p>
                                <img src="./img/icon/arrow-right.svg" alt="AI화살표" />
                                내용
                            </p>
                        </ul>
                    </div>
                </div>
                <div className={styles.aiBox2}>
                    <div className={styles.aiBox2_title}>
                        <p><img src="./img/icon/menu-ai2.svg" alt="AI아이콘" /></p>
                        <span>판매 부진</span>
                    </div>
                    <div className={styles.aiBox2_text}>
                        <ul className={styles.aiBox2_text}>
                            <li>메뉴명: 블랙알리오</li>
                        </ul>
                        <ul className={styles.aiText}>
                            <li>블랙알리오는 전체 판매 비중이 낮고 최근 주문량이 감소하는 추세입니다.</li>
                            <p>
                                <img src="./img/icon/arrow-right.svg" alt="AI화살표" />
                                메뉴 노출을 상단으로 조정해보세요.
                            </p>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}