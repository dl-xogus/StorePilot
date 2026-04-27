import styles from './ScheduleItem.module.scss';

function ScheduleItem() {
  return (
    <div className={styles.scheduleItem}>
      <input type="checkbox" className={styles.checkbox} />

      <div className={styles.card}>
        <img src='./img/icon/ic_schedul-edit.svg' alt='수정' />

        <div className={styles.line}>
          <div className={styles.scheduleItemContent}>

            <div className={styles.scheduleItemGroup}>
              <div className={styles.scheduleItemRow1}>
                <b>이름</b>
                <p>김민수</p>
                <b>파트</b>
                <p>홀1</p>
              </div>

              <div className={styles.scheduleItemRow2}>
                <b>근무시간</b>
                <p>10 : 00 ~ 16 : 00</p>
                <b>전화번호</b>
                <p>010-1234-5678</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default ScheduleItem;