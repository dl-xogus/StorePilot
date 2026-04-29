"use client"
import { useState, useEffect } from 'react'
import axios from 'axios'
import React from 'react'
import style from '@/app/(pages)/dashboard/dashboard.module.scss'
import Link from 'next/link'
import Chart from '@/components/sales/Chart'
import { calculatePredictedSales } from '@/app/api/sales/openai/route.js'

const getKoreaToday = () => {
  const now = new Date()
  return new Date(now.getTime() + now.getTimezoneOffset() * 60000 + 9 * 3600000)
}

const getWeekOfMonth = (date) => {
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  return Math.ceil((firstDay + date.getDate()) / 7)
}


function Dashboard() {
  const [salesData, setSalesData] = useState([])

  const today = getKoreaToday()
  const selected = {
    year: `${today.getFullYear()}년`,
    month: `${today.getMonth() + 1}월`,
    week: `${getWeekOfMonth(today)}주차`,
  }

  useEffect(() => {
    axios.get('/api/sales/db', {
      params: { ownerId: 'qwe@email.com', storeId: '001' }
    })
      .then(res => setSalesData(res.data.sales))
      .catch(err => console.error('매출 조회 실패', err))
  }, [])

  /* 예상 매출액 */
  const formatted = salesData.map(s => ({ date: s.date, amount: Number(s.dailySales) }));
  const prediction = calculatePredictedSales(formatted);

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
                <strong>{prediction?.predictedAmount.toLocaleString()} 원</strong>
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
            <Chart salesData={salesData} activeTab="일별" selected={selected} />
          </div>
        </section>

      </section>
    </div>
  )
}

export default Dashboard
