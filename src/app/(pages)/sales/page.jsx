"use client"
import { useState, useEffect } from 'react'

import axios from 'axios'

import DateSelectTab from '@/components/sales/DateSelectTab'
import AddSalesPopup from './popup/AddSalesPopup'

import sales from './sales.module.scss'
import DayWeekMonthTab from '@/components/sales/DayWeekMonthTab'
import Chart from '@/components/sales/Chart'

// 한국 시간(KST, UTC+9) 기준 오늘 날짜 반환
const getKoreaToday = () => {
  const now = new Date()
  return new Date(now.getTime() + now.getTimezoneOffset() * 60000 + 9 * 3600000)
  /* 
    getTime() : 로컬 타임
    getTimezoneOffset() : UTC기준으로 로컬 타임과의 차이 / 분단위로 값을 가져오기 때문에 밀리초로 바꿔줌(* 60000)
    getTime() + getTimezoneOffset() : 로컬 타임 오프셋을 제거해 UTC시간으로 만들어줌
    UTC시간에 + 9 * 3600000을 해주어 한국 시간으로 만들어줌
  */
}

// 특정 날짜가 해당 월의 몇 주차인지 계산
// ex) 2026-04-15 → 3주차
const getWeekOfMonth = (date) => {
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();   // 달력기준 1일 앞에 빈 칸이 몇개인지 ex)화요일(2)이면 (일,월) 2개
  return Math.ceil((firstDay + date.getDate()) / 7);   // ex) firstDay(2) + getDate(7) = 9  →  9 / 7 = 1.28...  →  Math.ceil(1.28) = 2  →  2주차
}

export default function sale() {
  const [salesData, setSalesData] = useState([]);      // API에서 받아온 전체 매출 데이터
  const [checkedAll, setCheckedAll] = useState(false); // 전체 선택 체크박스 상태
  const [checked, setChecked] = useState([]);          // 각 행의 체크박스 상태 배열
  const [popupOpen, setPopupOpen] = useState(false);   // 매출 추가 팝업 열림 여부

  // DayWeekMonthTab에서 선택한 탭 ('일별' | '주별' | '월별')
  // 이 값에 따라 DateSelectTab의 활성 항목과 매출 목록 필터링 기준이 달라짐
  const [activeTab, setActiveTab] = useState('일별');

  // DateSelectTab 내 드롭다운 열림 상태 ('year' | 'month' | 'week' | null)
  // page.jsx에서 관리하는 이유: 탭 전환 시 열린 드롭다운을 닫아야 하기 때문
  const [openDropdown, setOpenDropdown] = useState(null);

  // DateSelectTab에서 선택된 년/월/주차 값 (초기값: 오늘 날짜 기준)
  const today = getKoreaToday()
  const [selected, setSelected] = useState({
    year: `${today.getFullYear()}년`,
    month: `${today.getMonth() + 1}월`,     // getMonth()는 zero-base값이기 때문에 +1을 해주어야 함
    week: `${getWeekOfMonth(today)}주차`,
  });

  // 탭 전환 시 열려있던 드롭다운을 닫음
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setOpenDropdown(null);
  };

  // 컴포넌트 마운트 시 매출 데이터 API 호출
  useEffect(() => {
    axios.get('/api/sales/db', {
      params: {
        ownerId: 'qwe@email.com', // 추후 세션값으로 교체
        storeId: '001',
      }
    })
      .then(res => {
        setSalesData(res.data.sales);
        setChecked(new Array(res.data.sales.length).fill(false));
      })
      .catch(err => console.error('매출 조회 실패', err));
  }, []);

  // activeTab + selected 기준으로 salesData 필터링
  // - 월별: 선택한 연도의 데이터만 표시
  // - 주별: 선택한 연도 + 월의 데이터만 표시
  // - 일별: 선택한 연도 + 월 + 주차의 데이터만 표시
  const filteredData = salesData.filter(item => {
    const date = new Date(item.date);
    const itemYear = date.getFullYear();
    const itemMonth = date.getMonth() + 1;
    const itemWeek = getWeekOfMonth(date);

    const selYear = parseInt(selected.year);     // parseInt() : 문자열을 숫자로 변경
    const selMonth = parseInt(selected.month);
    const selWeek = parseInt(selected.week);

    if (activeTab === '월별') return itemYear === selYear;
    if (activeTab === '주별') return itemYear === selYear && itemMonth === selMonth;

    return itemYear === selYear && itemMonth === selMonth && itemWeek === selWeek;
  });

  const getCompare = () => {
    switch (activeTab) {
      case '월별': return '작년';
      case '주별': return '지난달';
      case '일별': return '지난주';
    }
  };

  // activeTab에 따라 비교 기준 날짜를 계산해서 salesData에서 해당 항목을 찾아 반환
  // - 일별: 7일 전 (저번주 같은 요일)
  // - 주별: 1달 전 같은 날짜 (저번달 같은 주차 근사값)
  // - 월별: 1년 전 같은 날짜 (작년 같은 달)
  const getCompareItem = (item) => {
    const date = new Date(item.date);
    const compareDate = new Date(date);

    if (activeTab === '일별') {
      compareDate.setDate(date.getDate() - 7);
    } else if (activeTab === '주별') {
      compareDate.setMonth(date.getMonth() - 1);
    } else {
      compareDate.setFullYear(date.getFullYear() - 1);
    }

    // 날짜를 'YYYY-MM-DD' 형식으로 변환해서 salesData에서 일치하는 항목 탐색
    const compareDateStr = compareDate.toISOString().slice(0, 10);
    return salesData.find(d => d.date === compareDateStr) ?? null;
  };

  // 체크된 항목들을 DB에서 일괄 삭제하고 로컬 상태도 갱신
  const handleDelete = async () => {
    const datesToDelete = salesData
      .filter((_, i) => checked[i])
      .map(item => item.date);

    if (datesToDelete.length === 0) return;

    await axios.delete('/api/sales/db', {
      params: {
        ownerId: 'qwe@email.com',
        storeId: '001',
        dates: datesToDelete.join(','),
      }
    });

    const remaining = salesData.filter(item => !datesToDelete.includes(item.date));
    setSalesData(remaining);
    setChecked(new Array(remaining.length).fill(false));
    setCheckedAll(false);
  };

  // 기본값: 날짜 내림차순 (최신이 위)
  const [sortKey, setSortKey] = useState('date');   // 정렬 기준 ('date' | 'sales' | 'diff')
  const [sortDir, setSortDir] = useState('desc');   // 정렬 방향 ('desc' | 'asc')

  // 같은 컬럼 클릭 시 asc ↔ desc 토글, 다른 컬럼 클릭 시 해당 컬럼 내림차순으로 초기화
  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir(prev => prev === 'desc' ? 'asc' : 'desc');
    } else {
      setSortKey(key);
      setSortDir('desc');
    }
  };

  // 현재 정렬 상태에 맞는 아이콘 경로 반환
  const getSortIcon = (key) => {
    if (sortKey !== key) return './img/icon/ic-sort-none.svg';
    return sortDir === 'desc' ? './img/icon/ic-sort-down.svg' : './img/icon/ic-sort-up.svg';
  };

  // filteredData에 diff를 미리 계산해서 붙인 뒤 정렬
  // diff를 여기서 계산하는 이유: 정렬 기준으로 diff 값이 필요하기 때문
  const sortedData = [...filteredData]
    .map(item => {
      const prev = getCompareItem(item);
      const diff = prev ? Number(item.dailySales) - Number(prev.dailySales) : null;
      return { ...item, diff };
    })
    .sort((a, b) => {
      let valA, valB;
      if (sortKey === 'date') {             // 'date'일때 비교방식 지정 (날짜)
        valA = new Date(a.date).getTime();
        valB = new Date(b.date).getTime();
      } else if (sortKey === 'sales') {     // 'sales'일때 비교방식 지정 (숫자)
        valA = Number(a.dailySales);
        valB = Number(b.dailySales);
      } else {                              // 'diff'일때 비교방식 지정
        valA = a.diff ?? (sortDir === 'desc' ? -Infinity : Infinity);   // 어떤 정렬 방식이던지 diff가 null이라면 무조건 맨뒤로 보냄
        valB = b.diff ?? (sortDir === 'desc' ? -Infinity : Infinity);   // 내림차순일때 infinity는 맨뒤, 오름차순일때 -infinity도 맨뒤
      }
      return sortDir === 'desc' ? valB - valA : valA - valB;            // 오름차순, 내림차순 지정
    });

  // 헤더 컬럼 정의
  const columns = [
    { key: 'date', label: '날짜' },
    { key: 'sales', label: '매출' },
    { key: 'diff', label: `${getCompare()} 보다` },
  ];


  return (
    <div className={sales.sales}>
      <div className={sales.title}>
        <h1><span>매출</span> 관리</h1>

        {/* activeTab 상태를 props로 내려줘서 선택된 탭을 표시하고 변경할 수 있게 함 */}
        <DayWeekMonthTab activeTab={activeTab} setActiveTab={handleTabChange} />
      </div>

      {/*
        activeTab에 따라 비활성화할 항목이 달라짐
        selected/setSelected: 년, 월, 주차 선택값 (page에서 관리해야 filteredData에 반영됨)
        openDropdown/setOpenDropdown: 탭 전환 시 드롭다운을 닫기 위해 page에서 관리
      */}
      <DateSelectTab
        activeTab={activeTab}
        selected={selected}
        setSelected={setSelected}
        openDropdown={openDropdown}
        setOpenDropdown={setOpenDropdown}
      />

      <section className={sales.section}>
        <article className={`${sales.left} ${sales.content}`}>
          <div className={sales.title}>
            <h3>매출 목록</h3>
            <div className={sales.btns}>
              <p onClick={() => setPopupOpen(true)}>
                <img src="./img/icon/ic-plus(black).svg" alt="추가버튼" />
              </p>
              <p onClick={handleDelete}><img src="./img/icon/ic-bin.svg" alt="삭제버튼" /></p>
            </div>
          </div>

          <div className={sales.graph}>
            {/* 헤더 행: 전체 선택 체크박스 + 컬럼명 */}
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
                {columns.map(col => (
                  <div key={col.key} onClick={() => handleSort(col.key)} className={sales.sortTab}>
                    <p>{col.label}</p>
                    <p><img src={getSortIcon(col.key)} alt="정렬아이콘" /></p>
                  </div>
                ))}
              </div>
            </div>

            {/* 이미 필터링 + 정렬된 배열(sortedData)을 사용해 .map()으로 출력 */}
            <div className={sales.lines}>
              {sortedData.map((item) => {
                const { diff } = item;

                // 체크박스는 sortedData 기준이 아닌 원본 salesData 기준 인덱스로 관리
                // 이유: sortedData는 정렬 + diff 이기때문에 원본 salesData와 순서도 다르고 객체도 새로 만들어진 상태 이기 때문에
                const idx = salesData.indexOf(salesData.find(d => d.date === item.date));    // indexOf() : 배열의 특정요소 index를 반환

                return (
                  <div key={item.date} className={sales.oneline}>
                    <input
                      type="checkbox"
                      className={sales.checkbox}
                      checked={checked[idx] ?? false}
                      onChange={e => setChecked(prev => prev.map((v, j) => j === idx ? e.target.checked : v))}
                    />

                    <div className={sales.text}>
                      <div className={sales.date}>
                        {item.date.slice(5).replace('-', '.')} ({item.day})
                      </div>

                      <div className={sales.sale}>
                        {Number(item.dailySales).toLocaleString()
                        /*
                          toLocaleString() : 숫자를 지역 형식에 맞는 문자열로 변환하는 메서드
                            const num = 1500000;
                            num.toLocaleString();        // → "1,500,000"  (한국/미국 환경)
                            num.toLocaleString('ko-KR'); // → "1,500,000"  (한국 명시)
                            num.toLocaleString('de-DE'); // → "1.500.000"  (독일식, 점으로 구분)

                          Number()로 먼저 숫자 타입으로 변환한 이유는 dailySales가 문자열로 올 경우 toLocaleString()이 문자열엔 쉼표를 안 찍기 때문
                        */}
                      </div>

                      {/* diff가 null이면 비교 데이터 없음, 양수면 증가(초록), 음수면 감소(빨강) */}
                      <div className={diff === null ? '' : diff >= 0 ? sales.plus : sales.minus}>
                        {diff === null ? '-' : `${diff >= 0 ? '+' : ''}${diff.toLocaleString()}`}
                      </div>
                    </div>

                    <p className={sales.editBtn}>
                      <img src="./img/icon/ic-edit.svg" alt="수정아이콘" />
                    </p>
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
              <Chart/>
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

      {
        popupOpen &&
          <AddSalesPopup
            onClose={() => setPopupOpen(false)}
            salesData={salesData}
            getSortIcon={getSortIcon}
            today={today}
          />
      }
    </div>
  )
}
