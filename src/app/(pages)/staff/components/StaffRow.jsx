import styles from '../staff.module.scss';

function StaffRow() {
  return (
    <>
        <div className={styles.tableRow}>
        <input type="checkbox" className={styles.checkbox} />
        <p>김민수</p>
        <p>24</p>
        <p>11,000원</p>
        <p>홀1</p>
        <p>월/수/목</p>
        <p>10:00~16:00</p>
        <p>010-1234-5678</p>
        <img src='./img/icon/ic-edit.svg' />
      </div>
    </>
  );
}

export default StaffRow;