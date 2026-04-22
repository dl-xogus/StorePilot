"use client"
import { useState, useEffect } from 'react'

import axios from 'axios'

import DateSelectTab from '@/components/DateSelectTab'
import SalesModal from './popup/SalesModal'

import sales from './sales.module.scss'

export default function sale() {
  const [activeTab, setActiveTab] = useState('일별');
  const [salesData, setSalesData] = useState([]);
  const [checkedAll, setCheckedAll] = useState(false);
  const [checked, setChecked] = useState([]);
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    axios.get('/api/sales', {
      params: {
        ownerId: 'qwe@email.com', // 추후 세션값으로 교체
        storeId: '001',
      }
    })
      .then(res => {
        console.log(res.data);

        setSalesData(res.data.sales)
        setChecked(new Array(res.data.sales.length).fill(false))
      })
      .catch(err => console.error('매출 조회 실패', err))
  }, [])

  return (
    <div className={sales.sales}>
      <div className={sales.title}>
        <h1><span>매출</span> 관리</h1>
        <div className={sales.tab}>
          {['일별', '주별', '월별'].map(tab => (
            <button
              key={tab}
              className={activeTab === tab ? sales.active : ''}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <DateSelectTab sales={sales} />

      <section className={sales.section}>
        <article className={`${sales.left} ${sales.content}`}>
          <div className={sales.title}>
            <h3>매출 목록</h3>
            <div className={sales.btns}>
              <p
                onClick={() => setPopupOpen(true)}
              >
                <img src="./img/icon/ic-plus(black).svg" alt="추가버튼" />
              </p>
              <p><img src="./img/icon/ic-bin.svg" alt="삭제버튼" /></p>
            </div>
          </div>










          <div className={sales.graph}>
            <div className={sales.titleLine}>
              <input
                type="checkbox"
                className={sales.checkbox}
                checked={checkedAll}
                onChange={e => {
                  setCheckedAll(e.target.checked)
                  setChecked(checked.map(() => e.target.checked))
                }}
              />
              <div className={sales.text}>
                {["날짜", "매출", "지난주 보다"].map((item, i) => (
                  <div>
                    <p>{item}</p>
                    <p><img src="./img/icon/ic-sort-none.svg" alt="정렬아이콘" /></p>
                  </div>
                ))}
              </div>
            </div>

            <div className={sales.lines}>
              {salesData.map((item, i) => {
                const prev = salesData[i + 1]
                const diff = prev ? Number(item.dailySales) - Number(prev.dailySales) : null
                
                return (
                  <div key={item.date} className={sales.oneline}>
                    <input
                      type="checkbox"
                      className={sales.checkbox}
                      checked={checked[i] ?? false}
                      onChange={e => setChecked(prev => prev.map((v, j) => j === i ? e.target.checked : v))}
                    />

                    <div className={sales.text}>
                      <div>
                        {item.date.slice(5).replace('-', '.')} ({item.day})
                      </div>
                      <div className={sales.sale}>
                        {Number(item.dailySales).toLocaleString()}
                      </div>
                      <div className={diff === null ? '' : diff >= 0 ? sales.plus : sales.minus}>
                        {diff === null ? '-' : `${diff >= 0 ? '+' : ''}${diff.toLocaleString()}`}
                      </div>
                    </div>

                    <p className={sales.editBtn}><img src="./img/icon/ic-edit.svg" alt="수정버튼" /></p>
                  </div>
                )
              })}
            </div>
          </div>



















        </article>

        <article className={sales.right}>
          <h3 className={sales.title}>매출 그래프</h3>

          <div className={sales.graphs}>
            <div className={sales.graph}>
              그래프





            </div>

            <div className={sales.graph}>
              <div className={sales.AItitle}>
                <p><img src="./img/icon/ic-AI.svg" alt="AI아이콘" /></p>
                <h3>AI 분석</h3>
              </div>

              <p className={sales.aiText}>
                수요일 매출이 평균 대비 낮습니다.<br />
                원인 후보 : 평일 중간 요일, 날씨 영향, 이벤트 부재
              </p>
            </div>
          </div>
        </article>
      </section>


      {popupOpen && <SalesModal onClose={() => setPopupOpen(false)} sales={sales} />}
    </div>
  )
}