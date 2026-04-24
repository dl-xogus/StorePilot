import React from 'react'
import style from '@/app/(pages)/dashboard/dashboard.module.scss'
import Link from 'next/link'

function Dashboard() {
  return (
    <div className={style.dashboard}>
      <section className={style.inner}>

        <div className={style.top}>
          <h1>대시보드</h1>

          <div className={style.dateWrap}>
            <p>2026.04.14 (화)</p>
          </div>
        </div>

        <Link href="/main" className={style.backBtn}>
          <img src="/img/icon/ic-dashboard-backBtn.png" alt="" />
        </Link>

        <div className={style.cardWrap}>
          <div className={style.summaryCard}>
            <div className={style.summaryInner}>
              <p><img src='/img/icon/ic-main-sales.png' /></p>
              <div className={style.summaryText}>
                <p>예상 매출</p>
                <strong>1,240,000원</strong>
              </div>
            </div>
          </div>

          <div className={style.summaryCard}>
            <div className={style.summaryInner}>
              <p><img src='/img/icon/ic-main-staff.png' /></p>
              <div className={style.summaryText}>
                <p>예상 인건비</p>
                <strong>380,000원</strong>
              </div>
            </div>
          </div>

          <div className={`${style.summaryCard} ${style.caution}`}>
            <div className={style.summaryInner}>
              <p><img src='/img/icon/ic-main-stock.png' /></p>
              <div className={style.summaryText}>
                <p>부족 재고</p>
                <strong>2개</strong>
              </div>
            </div>
          </div>

          <div className={`${style.summaryCard} ${style.danger}`}>
            <div className={style.summaryInner}>
              <p><img src='/img/icon/ic-main-danger.png' /></p>
              <div className={style.summaryText}>
                <p>폐기 위험</p>
                <strong>1개</strong>
              </div>
            </div>
          </div>
        </div>


        <section className={style.chartSection}>
          <h2>이번주 매출 그래프</h2>

          <div className={style.chartBox}>
            {/* 차트 들어갈 자리 */}
          </div>
        </section>


      </section>

    </div>
  )
}

export default Dashboard