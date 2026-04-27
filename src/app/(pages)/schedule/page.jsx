import styles from './schedule.module.scss';
import ScheduleItem from './components/ScheduleItem';
import Analytics from './components/Analytics';

function Schedule() {




  return (
    <section className={styles.schedule}>
      <div className={styles.container}>

        <div className={styles.scheduleMain}>

          <div className={styles.scheduleHeader}>
            <h2>
              <span className={styles.scheduleTitle}>근무표</span> 관리
            </h2>
            <div className={styles.total}>
              <img src='./img/icon/ic_schedul-person.svg' />
              <p>Total : -명</p>
            </div>
          </div>

          <div className={styles.schedulePanel}>

            <div className={styles.scheduleNav}>
              <div className={styles.scheduleNavArrow}>
                <img src='./img/icon/ic-schedul-left.svg' />
                <b>n월 n주차</b>
              </div>

              <div className={styles.scheduleNavDate}>
                <img src='./img/icon/ic_schedul-calendar.svg' />
                <p>n월 n일 - n월 n일</p>
              </div>
            </div>

            <div className={styles.scheduleWeek}>
              <p>월</p>
              <p>화</p>
              <p>수</p>
              <p>목</p>
              <p>금</p>
              <p>토</p>
              <p>일</p>
            </div>

            <div className={styles.scheduleList}>

              <div className={styles.scheduleDayHeader}>
                <div className={styles.scheduleDay}>
                  <b>월요일</b>
                  <p>n일</p>
                </div>
                <img src='./img/icon/ic_schedule-bin.svg' />
              </div>

              <ScheduleItem />

            </div>
          </div>
        </div>

        <Analytics />

      </div>
    </section>
  );
}

export default Schedule;