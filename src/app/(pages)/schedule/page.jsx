import React from 'react'
import styles from './schedule.module.scss';

function Schedule() {
  return (
    <section className={styles.schedule}>
      <div className={styles.container}>
        <div className={styles['shedule-contents']}>


          <div className={styles['schedule-title']}>

            <h2><span className={styles.title}>근무표</span> 관리</h2>
            <div className={styles.total}>
              <img src='./img/icon/ic_schedul-person.svg' /><p>total : -명</p>
            </div>

          </div>



          <div className={styles['schedule-box']}>

            <div className={styles.top}>
              <div className={styles['ic-arrow']}>
                <img src='./img/icon/ic-schedul-left.svg' /><b>n월 n주차</b>
              </div>

              <div className={styles['ic-calendar']}>
                <img src='./img/icon/ic_schedul-calendar.svg' /><p>n월 n일 - n월 n일</p>
              </div>
            </div>

            <div className={styles.weeks}>
              <p>월</p>
              <p>화</p>
              <p>수</p>
              <p>목</p>
              <p>금</p>
              <p>토</p>
              <p>일</p>
            </div>

            <div className={styles['work-schedule']}>

              <div className={styles['schedule-day']}>
                <b>월요일</b><p>n일</p>
                <img src='./img/icon/ic_schedule-bin.svg' />
              </div>


              <div className={styles['schedule-card']}>
                <input type="checkbox" className={styles.checkbox} />

                <div className={styles.card}>
                  <img src='./img/icon/ic_schedul-edit.svg' alt='수정아이콘' />
                  <div className={styles.line}>

                    <div className={styles['card-text']}>

                      <div className={styles.text}>
                        <div className={styles.up}>
                          <p>이름</p>
                          <p>김민수</p>
                        </div>
                        <div className={styles.down}>
                          <p>근무시간</p>
                          <p>10 : 00 ~ 16 : 00</p>
                        </div>
                      </div>

                      <div className={styles.text}>
                        <div className={styles.up}>
                          <p>파트</p>
                          <p>홀1</p>
                        </div>
                        <div className={styles.down}>
                          <p>전화번호</p>
                          <p>010-1234-5678</p>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
              <div className={styles['schedule-card']}>
                <input type="checkbox" className={styles.checkbox} />

                <div className={styles.card}>
                  <img src='./img/icon/ic_schedul-edit.svg' alt='수정아이콘' />
                  <div className={styles.line}>

                    <div className={styles['card-text']}>

                      <div className={styles.text}>
                        <div className={styles.up}>
                          <p>이름</p>
                          <p>김민수</p>
                        </div>
                        <div className={styles.down}>
                          <p>근무시간</p>
                          <p>10 : 00 ~ 16 : 00</p>
                        </div>
                      </div>

                      <div className={styles.text}>
                        <div className={styles.up}>
                          <p>파트</p>
                          <p>홀1</p>
                        </div>
                        <div className={styles.down}>
                          <p>전화번호</p>
                          <p>010-1234-5678</p>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
              <div className={styles['schedule-card']}>
                <input type="checkbox" className={styles.checkbox} />

                <div className={styles.card}>
                  <img src='./img/icon/ic_schedul-edit.svg' alt='수정아이콘' />
                  <div className={styles.line}>

                    <div className={styles['card-text']}>

                      <div className={styles.text}>
                        <div className={styles.up}>
                          <p>이름</p>
                          <p>김민수</p>
                        </div>
                        <div className={styles.down}>
                          <p>근무시간</p>
                          <p>10 : 00 ~ 16 : 00</p>
                        </div>
                      </div>

                      <div className={styles.text}>
                        <div className={styles.up}>
                          <p>파트</p>
                          <p>홀1</p>
                        </div>
                        <div className={styles.down}>
                          <p>전화번호</p>
                          <p>010-1234-5678</p>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>


            </div>


          </div>
        </div>

        <div className={styles.analytics}>

          <div className={styles.Ai}>
            <div className={styles['analytics-title']}>
              <img src='./img/icon/ic-AI.svg' /><h2>Ai 분석</h2>
            </div>

            <div className={styles['ai-list']}>
              <ul>
                <li>
                  <p>AI 분석 내용1</p>
                  <p>AI 추천 내용1</p>
                </li>
                <li>
                  <p>AI 분석 내용2</p>
                  <p>AI 추천 내용2</p>
                </li>
                <li>
                  <p>AI 분석 내용3</p>
                  <p>AI 추천 내용3</p>
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.employee}>
            <div className={styles['analytics-title']}>
              <img src='./img/icon/ic_schedul-analytics.svg' /><h2>직원별 인건비 분석</h2>
              <div className={styles.btn}>
                <button>일급</button>
                <button>주급</button>
                <button>월급</button>
              </div>
            </div>


            <div className={styles['employee-list']}>

              <div className={styles['employee-card']}>
                <p>김민수</p>
                <p>18시간 × 11,000원 = 175,000원 </p>
                <span></span><b>초과근무</b>
              </div>
              <div className={styles['employee-card']}>
                <p>김민수</p>
                <p>18시간 × 11,000원 = 175,000원 </p>
                <span></span><b>초과근무</b>
              </div>
              <div className={styles['employee-card']}>
                
                <div className={styles.totalText}>
                <p>김민수</p>
                <p>18시간 × 11,000원 = 175,000원 </p>
                <span></span><b>초과근무</b>
                </div>
              </div>

            </div>






          </div>
          <div className={styles['employee-total']}>
            <p>총 인건비 </p>
            <p>--원</p>
          </div>
        </div>


      </div>


    </section>
  )
}

export default Schedule