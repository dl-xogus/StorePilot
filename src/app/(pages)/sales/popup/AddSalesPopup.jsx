import { useEffect, useState } from 'react';
import axios from 'axios';

import styles from './AddSalesPopup.module.scss'
import period from '@/components/sales/DateSelectTab.module.scss'

export default function AddSalesPopup({ onClose, salesData, getSortIcon, today }) {
  const [checkedAll, setCheckedAll] = useState(false); // 전체 선택 체크박스 상태
  const [checked, setChecked] = useState([]);          // 각 행의 체크박스 상태 배열
  const [salesCount, setSalesCount] = useState('');
  const [searchText, setSearchText] = useState('');
  const [openDropdown, setOpenDropdown] = useState(false);
  const [menuData, setMenuData] = useState([]);
  const [selected, setSelected] = useState('메뉴 선택');
  const [salesAmount, setSalesAmount] = useState('');
  const [addMenus, setAddMenus] = useState([]);
  const totalSales = addMenus.reduce((sum, item) => sum + Number(item.sales), 0);

  const columns = [
    { key: 'name', label: '메뉴명' },
    { key: 'count', label: '판매량' },
    { key: 'sales', label: '판매금액' }
  ];


  const toggleDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  useEffect(() => {
    axios.get('/api/menu/db', {
      params: {
        ownerId: 'qwe@email.com', // 추후 세션값으로 교체
        storeId: '001',
      }
    })
      .then(res => setMenuData(res.data.menu))
      .catch(err => console.error('메뉴 조회 실패', err));
  }, []);

  const handleSelect = (name) => {
    setSelected(name);
    setOpenDropdown(false);
  };

  const handleDelete = () => {
    const deleteMenu = addMenus
      .filter((_, i) => checked[i])
      .map(item => item.name);

    if (deleteMenu.length === 0) return;

    const remaining = addMenus.filter(item => !deleteMenu.includes(item.name));
    setAddMenus(remaining);
    setChecked(new Array(remaining.length).fill(false));
    setCheckedAll(false);
  };

  const [selDate, setSelDate] = useState({
    year: `${today.getFullYear()}년`,
    month: `${today.getMonth() + 1}월`,
    date: `${today.getDate()}일`
  });

  const tab = [
    { key: 'year', label: selDate.year },
    { key: 'month', label: selDate.month },
    { key: 'date', label: selDate.date },
  ];

  const currentYear = new Date().getFullYear();
  const daysInMonth = new Date(parseInt(selDate.year), parseInt(selDate.month), 0).getDate();

  const options = {
    year: Array.from({ length: currentYear - 1999 }, (_, i) => `${2000 + i}년`).reverse(),
    month: Array.from({ length: 12 }, (_, i) => `${i + 1}월`),
    date: Array.from({ length: daysInMonth }, (_, i) => `${i + 1}일`),
  };

  const [dateOpenDropdown, setDateOpenDropdown] = useState(null);

  const dateToggleDropdown = (key) => {
    setDateOpenDropdown(prev => prev === key ? null : key);
  };

  const handleDateSelect = (key, value) => {
    setSelDate(prev => {
      const next = { ...prev, [key]: value };
      if (key === 'year' || key === 'month') {
        const ny = parseInt(key === 'year' ? value : next.year);
        const nm = parseInt(key === 'month' ? value : next.month);
        const days = new Date(ny, nm, 0).getDate();
        if (parseInt(next.date) > days) next.date = `${days}일`;
      }
      return next;
    });
    setDateOpenDropdown(null);
  };

  const year = parseInt(selDate.year);
  const month = parseInt(selDate.month) - 1;
  const date = parseInt(selDate.date);
  const target = new Date(year, month, date);
  const prev7 = new Date(year, month, date - 7);

  const fmt = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

  // const targetSales = salesData.find(item => item.date === fmt(target));
  const prev7Sales = salesData.find(item => item.date === fmt(prev7));
  const compareSales = totalSales - prev7Sales.dailySales;

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

        <div className={styles.inner}>
          <div className={styles.graphTop}>
            <div className={styles.searchAndperiod}>
              <div className={styles.searchBar}>
                <button><img src="./img/icon/ic-search.svg" alt="검색아이콘" /></button>
                <input
                  type="text"
                  placeholder='검색'
                  value={searchText}
                  onChange={e => setSearchText(e.target.value)}
                />
              </div>

              <div className={`${period.period} ${styles.period}`}>
                {tab.map(({ key, label }) => (
                  <div key={key} className={period.periodItem}>
                    <button
                      className={`${period.periodBtn} ${dateOpenDropdown === key ? period.periodBtnOpen : ''}`}
                      onClick={() => dateToggleDropdown(key)}
                    >
                      {label}
                      <p><img src="./img/icon/ic-down.svg" alt="펼침아이콘" /></p>
                    </button>

                    {dateOpenDropdown === key && (
                      <ul className={`${period.dropdown} ${styles.dropdown}`}>
                        {options[key].map(opt => (
                          <li
                            key={opt}
                            className={selDate[key] === opt ? period.dropdownActive : ''}
                            onClick={() => handleDateSelect(key, opt)}
                          >
                            {opt}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.btns}>
              <p>
                <img src="./img/icon/ic-plus(black).svg" alt="추가버튼" />
              </p>

              <p onClick={handleDelete}>
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
                  <div key={col.key} onClick={() => { }} className={styles.sortTab}>
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

                    const newItem = { name: selected, count: Number(salesCount), sales: salesAmount };
                    const existing = addMenus.find(item => item.name === selected);

                    if (existing) {
                      setAddMenus(prev => prev.map(item =>
                        item.name === selected
                          ? { ...item, count: item.count + Number(salesCount), sales: item.sales + salesAmount }
                          : item
                      ));
                    } else {
                      setAddMenus(prev => [...prev, newItem]);
                      setChecked(prev => [...prev, false]);
                    }
                  }}
                >
                  <div className={`${period.period} ${styles.period}`}>
                    <div className={`${period.periodItem} ${styles.periodItem}`}>
                      <div
                        className={`${period.periodBtn} ${styles.periodBtn}`}
                        onClick={() => toggleDropdown()}
                      >
                        {selected}
                        <p><img src="./img/icon/ic-down.svg" alt="펼침아이콘" /></p>
                      </div>

                      {openDropdown && (
                        <ul className={`${period.dropdown} ${styles.dropdown}`}>
                          {menuData.map((item, key) => (
                            <li
                              key={key}
                              className={selected === item.name ? period.dropdownActive : ''}
                              onClick={() => handleSelect(item.name)}
                            >
                              {item.name}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="판매량 입력"
                      value={salesCount}
                      onChange={e => {
                        const count = e.target.value;
                        const selectedMenu = menuData.find(item => item.name === selected);
                        setSalesCount(count);
                        setSalesAmount(selectedMenu.price * Number(count));
                      }}
                    />
                  </div>

                  <div>{Number(salesAmount).toLocaleString()}</div>

                  <button style={{ display: 'none' }} />  {/* button이 있어야 form태그의 엔터키 submit이 작동함 */}
                </form>
              </div>

              {addMenus.map((item, i) => {
                const idx = addMenus.indexOf(addMenus.find(d => d.name === item.name));

                return (
                  <div
                    key={i}
                    className={styles.oneline}
                  >
                    <input
                      type="checkbox"
                      className={styles.checkbox}
                      checked={checked[idx] ?? false}
                      onChange={e => setChecked(prev => prev.map((v, j) => j === idx ? e.target.checked : v))}
                    />

                    <div className={styles.text}>
                      <div>
                        {item.name}
                      </div>

                      <div>
                        {item.count}
                      </div>

                      <div>
                        {Number(item.sales).toLocaleString()}
                      </div>
                    </div>

                    <p className={styles.editBtn}>
                      <img src="./img/icon/ic-edit.svg" alt="수정아이콘" />
                    </p>
                  </div>
                )
              })}
            </div>
          </div>

          <div className={styles.graphBot}>
            <div>
              <div className={styles.text}>
                <p>총 매출</p>
                <p><img src="./img/icon/ic-right.svg" alt="right" /></p>
                <p>
                  {Number(totalSales).toLocaleString()}
                </p>
              </div>
            </div>

            <div>
              <div className={styles.text}>
                <p>지난주 매출</p>
                <p><img src="./img/icon/ic-right.svg" alt="right" /></p>
                <p className={styles.compare}>
                  {Number(prev7Sales.dailySales).toLocaleString()}
                </p>
              </div>
            </div>

            <div>
              <div className={styles.text}>
                <p>지난주 보다</p>
                <p><img src="./img/icon/ic-right.svg" alt="right" /></p>
                <p className={compareSales >= 0 ? styles.plus : styles.minus}>
                  {compareSales >= 0 ? `+${Number(compareSales).toLocaleString()}` : Number(compareSales).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <button className={styles.saveBtn}>저장하기</button>
        </div>
      </div>
    </div>
  )
}
