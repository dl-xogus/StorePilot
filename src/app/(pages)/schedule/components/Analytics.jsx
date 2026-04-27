import styles from './Analytics.module.scss';

function Analytics() {
  return (
    <div className={styles.analytics}>

      <div className={styles.analyticsAi}>
        <div className={styles.analyticsHeader}>
          <img src='./img/icon/ic-AI.svg' />
          <h2>AI 분석</h2>
        </div>

        <div className={styles.analyticsList}>
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
        <div className={styles.analyticsHeader}>
          <img src='./img/icon/ic_schedul-analytics.svg' />
          <h2>직원별 인건비 분석</h2>

          <div className={styles.btn}>
            <button>일급</button>
            <button>주급</button>
            <button>월급</button>
          </div>
        </div>

        <div className={styles.employeeList}>
          <div className={styles.employeeItem}>
            <p>김민수</p>
            <p>18시간 × 11,000원 = 175,000원</p>
            <b>초과근무</b>
          </div>
        </div>
      </div>

      <div className={styles.employeeTotal}>
        <p>총 인건비</p>
        <p>--원</p>
      </div>

    </div>
  );
}

export default Analytics;