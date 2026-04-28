import { useEffect, useState } from 'react';
import axios from 'axios';

import styles from './front.module.scss';
import MenuAddForm from '@/components/sales/MenuAddForm';
import MenuRow from '@/components/sales/MenuRow';
// import styles from '@/app/(pages)/sales/popup/AddSalesPopup.module.scss';

export default function Front({ onClose }) {
  const [menuData, setMenuData] = useState([]);
  const [addInput, setAddInput] = useState(false);

  // ─── 인라인 수정 ─────────────────────────────────────────────
  const [edit, setEdit] = useState(null);

  // ─── 정렬 ────────────────────────────────────────────────────
  const columns = [
    { key: 'name', label: '메뉴명' },
    { key: 'status', label: '상태' },
    { key: 'price', label: '가격' },
  ];

  const [sortKey, setSortKey] = useState('name');
  const [sortDir, setSortDir] = useState('desc');

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('desc');
    }
  };

  const sortedMenus = [...menuData].sort((a, b) => {
    const cmp = sortKey === 'name'
      ? a.name.localeCompare(b.name, 'ko')
      : Number(a[sortKey]) - Number(b[sortKey]);
    return sortDir === 'asc' ? cmp : -cmp;
  });



  useEffect(() => {
    axios.get('/api/menu/db', {
      params: {
        ownerId: 'qwe@email.com',
        storeId: '001',
      }
    })
      .then(res => setMenuData(res.data.menu))
      .catch(err => console.error('메뉴 조회 실패', err));
  }, []);




  return (
    <div
      className={styles.back}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className={styles.popup}>
        <div className={styles.title}>
          <div className={styles.titleName}>
            <p><img src="./img/icon/ic-sales-detail.svg" alt="QuickOrder 아이콘" /></p>
            <h3>QuickOrder</h3>
          </div>
          <p className={styles.xbtn} onClick={onClose}>
            <img src="./img/icon/ic-x.svg" alt="x버튼" />
          </p>
        </div>

        <div className={styles.inner}>
          <div className={styles.graphTop}>
            <div className={styles.searchAndperiod}>
              <div>

              </div>
            </div>
          </div>




          {/* =========================================================================================== */}
          <div className={styles.graph}>
            <div className={styles.titleLine}>
              <div className={styles.text}>
                {columns.map(col => (
                  <div key={col.key} onClick={() => handleSort(col.key)} className={styles.sortTab}>
                    <p>{col.label}</p>
                    <p>
                      <img
                        src={
                          sortKey !== col.key ? './img/icon/ic-sort-none.svg'
                            : sortDir === 'asc' ? './img/icon/ic-sort-up.svg'
                              : './img/icon/ic-sort-down.svg'
                        }
                        alt="정렬아이콘"
                      />
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.lines}>
              {menuData.map((item, i) =>
                <div className={styles.oneline} key={i}>
                  <div className={styles.detail}>
                    <p>{item.name}</p>
                    <p>{item.status}</p>
                    <p>{item.price}</p>
                  </div>

                  <div className={styles.pmBtn}>
                    <p className={styles.btn}><img src="./img/icon/ic-minus.svg" alt="감소버튼" /></p>
                    <p>0</p>
                    <p className={styles.btn}><img src="./img/icon/ic-plus(white).svg" alt="증가버튼" /></p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className={styles.graphBot}>
            <p>총 금액</p>
            <p><img src="./img/icon/ic-right.svg" alt="right" /></p>
            <p>123123</p>
          </div>

          <div>
            주문하기
          </div>









        </div>
      </div>
    </div>
  )
}
