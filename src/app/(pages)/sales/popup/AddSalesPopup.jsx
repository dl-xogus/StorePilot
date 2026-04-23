import { useState } from 'react';
import styles from './AddSalesPopup.module.scss'

export default function AddSalesPopup({ onClose, sortedData, salesData, handleSort, getSortIcon }) {
  const [checkedAll, setCheckedAll] = useState(false); // 전체 선택 체크박스 상태
  const [checked, setChecked] = useState([]);          // 각 행의 체크박스 상태 배열

  const [menuName, setMenuName] = useState('');
  const [salesCount, setSalesCount] = useState('');

  const columns = [
    { key: 'name', label: '메뉴명' },
    { key: 'count', label: '판매량' },
    { key: 'sales', label: '판매액' }
  ];

  const idx = 0;
  // const idx = salesData.indexOf(salesData.find(d => d.date === item.date));

  return (
    <div
      className={styles.back}
      onClick={e => e.target === e.currentTarget && onClose()}  // 팝업 바깥배경만 해당되게
    >
      <div className={styles.popup}>
        <div className={styles.title}>
          <div className={styles.titleName}>
            <p><img src="./img/icon/ic-sales-edit.svg" alt="매출상세아이콘" /></p>
            <h3>매출 추가</h3>
          </div>
          <p
            className={styles.xbtn}
            onClick={onClose}
          >
            <img src="./img/icon/ic-x.svg" alt="x버튼" />
          </p>
        </div>

        <div>
          <div>
            <div>
              <input
                type="text"
              />
            </div>

            <div>
              <p>
                <img src="./img/icon/ic-plus(black).svg" alt="추가버튼" />
              </p>

              <p>
                <img src="./img/icon/ic-bin.svg" alt="삭제버튼" />
              </p>
            </div>
          </div>

          <div className={styles.graph}>
            <div className={styles.titleLine}>
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={checkedAll}
                onChange={e => {
                  setCheckedAll(e.target.checked)
                  setChecked(checked.map(() => e.target.checked))
                }}
              />
              <div className={styles.text}>
                {columns.map(col => (
                  <div key={col.key} onClick={() => handleSort(col.key)} className={styles.sortTab}>
                    <p>{col.label}</p>
                    <p><img src={getSortIcon(col.key)} alt="정렬아이콘" /></p>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.lines}>
              <div className={styles.inputLine}>
                <form
                  className={styles.text}
                  onSubmit={e => { 
                    e.preventDefault();
                    
                    alert('서브밋');

                    setMenuName('');
                    setSalesCount('');
                  }}
                >
                  <div>
                    <input
                      type="text"
                      placeholder="메뉴명 입력"
                      value={menuName}
                      onChange={e => setMenuName(e.target.value)}
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="판매량 입력"
                      value={salesCount}
                      onChange={e => setSalesCount(e.target.value)}
                    />
                  </div>

                  <div>0</div>

                  <button style={{ display: 'none' }} />  {/* button이 있어야 form태그의 엔터키 submit이 작동함 */}
                </form>
              </div>

              <div className={styles.oneline}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={checked[idx] ?? false}
                  onChange={e => setChecked(prev => prev.map((v, j) => j === idx ? e.target.checked : v))}
                />
                <div className={styles.text}>
                  <div className={styles.date}>
                    후라이드 치킨
                  </div>
                  <div className={styles.sale}>
                    8
                  </div>
                  <div className=''>
                    123123
                  </div>
                </div>
                <p className={styles.editBtn}>
                  <img src="./img/icon/ic-edit.svg" alt="수정아이콘" />
                </p>
              </div>
              {/* {sortedData.map((item) => {
                const { diff } = item;
                const idx = salesData.indexOf(salesData.find(d => d.date === item.date))    // indexOf() : 배열의 특정요소 index를 반환
                return (
                  <div key={item.date} className={styles.oneline}>
                    <input
                      type="checkbox"
                      className={styles.checkbox}
                      checked={checked[idx] ?? false}
                      onChange={e => setChecked(prev => prev.map((v, j) => j === idx ? e.target.checked : v))}
                    />
                    <div className={styles.text}>
                      <div className={styles.date}>
                        {item.date.slice(5).replace('-', '.')} ({item.day})
                      </div>
                      <div className={styles.sale}>
                        {Number(item.dailySales).toLocaleString()}
                      </div>
                      <div className={diff === null ? '' : diff >= 0 ? styles.plus : styles.minus}>
                        {diff === null ? '-' : `${diff >= 0 ? '+' : ''}${diff.toLocaleString()}`}
                      </div>
                    </div>
                    <p className={styles.editBtn}>
                      <img src="./img/icon/ic-edit.svg" alt="수정아이콘" />
                    </p>
                  </div>
                )
              })} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
