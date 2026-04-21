import React from 'react'
import sales from '@/app/(pages)/sales/sales.module.scss'

export default function sale() {
  return (
    <div className={sales.sales}>
      <div className={sales.title}>
        <h1><span>매출</span> 관리</h1>
        <div className={sales.tab}>
          <button className={sales.active}>일별</button>
          <button>주별</button>
          <button>월별</button>
        </div>
      </div>

      <section>
        <article>
          <div className={sales.title}>
            <h3>매출 목록</h3>
            <div className={sales.btns}>
              <p><img src="./img/icon/ic-plus(black).svg" alt="추가버튼" /></p>
              <p><img src="./img/icon/ic-bin.svg" alt="삭제버튼" /></p>
            </div>
          </div>
        </article>
      </section>
    </div>
  )
}