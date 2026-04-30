import React from 'react'
import style from '@/app/(pages)/dashboard/dashboard.module.scss'
import Link from 'next/link'

function Dashboard() {
  function getTodayFormatted() {
    const date = new Date();

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    const week = ['일', '월', '화', '수', '목', '금', '토'];
    const weekday = week[date.getDay()];

    return `${year}.${month}.${day} (${weekday})`;
  }
  return (
    <div className={style.dashboard}>
      <section className={style.inner}>

        <div className={style.top}>
          <h1>대시보드</h1>

          <div className={style.dateWrap}>
            <p>{getTodayFormatted()}</p>
          </div>
        </div>

        <Link href="/main" className={style.backBtn}>
          <img src="/img/icon/ic-dashboard-backBtn.png" alt="" />
        </Link>

        <div className={style.cardWrap}>

          <Link href="/sales" className={style.summaryCard}>
              <div className={style.summaryInner}>
                <p><img src='/img/icon/ic-main-sales.png' /></p>
                <div className={style.summaryText}>
                  <p>예상 매출</p>
                  <strong>1,240,000원</strong>
                </div>
              </div>
          </Link>

          <Link href="/schedule" className={style.summaryCard}>
            <div className={style.summaryInner}>
              <p><img src='/img/icon/ic-main-staff.png' /></p>
              <div className={style.summaryText}>
                <p>예상 인건비</p>
                <strong>380,000원</strong>
              </div>
            </div>
          </Link>

          <Link href="/stock" className={`${style.summaryCard} ${style.caution}`}>
            <div className={`${style.summaryInner} ${style.caution}`}>
              <p><img src='/img/icon/ic-dashboard-stock.png' /></p>
              <div className={style.summaryText}>
                <p>부족 재고</p>
                <strong>2개</strong>
              </div>
            </div>
          </Link>
          
          <Link href="/stock" className={`${style.summaryCard} ${style.danger}`}>
            <div className={`${style.summaryInner} ${style.danger}`}>
              <p><img src='/img/icon/ic-dashboard-danger.png' /></p>
              <div className={style.summaryText}>
                <p>폐기 위험</p>
                <strong>1개</strong>
              </div>
            </div>
          </Link>

        </div>


        <section className={style.chartSection}>
          <h2>이번주 매출 그래프</h2>

          <div className={style.chartBox}>
            {/* 차트 들어갈 자리 */}
          </div>

        </section>

        <section className={style.infoList}>
          <article className={style.infoCard}>
            <Link href="/schedule">
              <div className={style.cardTitle}>
                <h3>오늘 추천 근무 인원</h3>
                <span><img src="/img/icon/ic-dashboard-right-arrow.png" /></span>
              </div>

            <ul>
              <li>홀 2명</li>
              <li>현재 배정 3명</li>
            </ul>
            </Link>
          </article>

          <article className={style.infoCard}>
            <Link href="/stock">
              <div className={style.cardTitle}>
                <h3>발주 추천</h3>
                <span><img src="/img/icon/ic-dashboard-right-arrow.png" /></span>
              </div>

            <ul>
              <li>닭 20마리</li>
              <li>무 2개</li>
            </ul>
            </Link>
          </article>

          <article className={style.infoCard}>
            <Link href="/stock">
              <div className={style.cardTitle}>
                <h3>폐기 위험 품목</h3>
                <span><img src="/img/icon/ic-dashboard-right-arrow.png" /></span>
              </div>

            <ul>
              <li>양배추 1개</li>
              <li>마요네즈 1개</li>
            </ul>
            </Link>
            
          </article>
        </section>


        <section className={style.aiBox}>
          <div className={style.aiTitle}>
            <img src="/img/icon/ic-AI.svg" alt="아이콘" />
            <h2>
              AI 운영 브리핑
            </h2>
          </div>
          <div className={style.aiContent}>
            <p>오늘 저녁 인력 배치가 가능합니다</p>
            <p>치킨, 콜라 재고 주의</p>
          </div>
        </section>

      </section>

    </div>
  )
}

export default Dashboard