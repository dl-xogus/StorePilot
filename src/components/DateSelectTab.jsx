import React, { useState } from 'react'

export default function DateSelectTab({ sales }) {
    // 한국 시간(KST, UTC+9) 기준 현재 날짜 반환
    const getKoreaToday = () => {
        const now = new Date()
        return new Date(now.getTime() + now.getTimezoneOffset() * 60000 + 9 * 3600000)
    }

    // 선택된 년/월 기준으로 해당 월의 총 주차 수를 계산
    // 첫째 날의 요일(0=일~6=토)과 총 일수로 몇 줄짜리 달력인지 구함
    const getWeeksInMonth = (year, month) => {
        const firstDay = new Date(year, month - 1, 1).getDay()
        const daysInMonth = new Date(year, month, 0).getDate()
        return Math.ceil((firstDay + daysInMonth) / 7)
    }

    // 특정 날짜가 해당 월의 몇 주차인지 계산
    const getWeekOfMonth = (date) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay()
        return Math.ceil((firstDay + date.getDate()) / 7)
    }

    // 현재 열려있는 드롭다운의 key 저장 ('year' | 'month' | 'week' | null)
    // null이면 아무것도 안 열려있음
    const [openDropdown, setOpenDropdown] = useState(null)

    // 각 탭에서 현재 선택된 값 (초기값: 한국 시간 기준 오늘 날짜)
    const today = getKoreaToday()
    const [selected, setSelected] = useState({
        year: `${today.getFullYear()}년`,
        month: `${today.getMonth() + 1}월`,
        week: `${getWeekOfMonth(today)}주차`,
    })

    // 현재 선택된 년/월로 week 선택지 개수를 실시간 계산
    const y = parseInt(selected.year)
    const m = parseInt(selected.month)
    const options = {
        // year: ['2022년', '2023년', '2024년', '2025년', '2026년'],
        year: Array.from({ length: 27 }, (_, i) => `${i + 2000}년`).reverse(),
        month: Array.from({ length: 12 }, (_, i) => `${i + 1}월`),
        // getWeeksInMonth 결과만큼 '1주차', '2주차'... 배열 생성
        week: Array.from({ length: getWeeksInMonth(y, m) }, (_, i) => `${i + 1}주차`),
    }

    // 버튼 클릭 시 해당 드롭다운 열기/닫기 토글
    // 이미 열려있는 걸 누르면 닫히고, 다른 걸 누르면 그걸로 전환됨
    const toggleDropdown = (key) => setOpenDropdown(prev => prev === key ? null : key)

    const handleSelect = (key, value) => {
        setSelected(prev => {
            const next = { ...prev, [key]: value }
            // 년/월이 바뀌면 주차 수가 달라질 수 있으므로
            // 현재 선택된 주차가 새 달의 최대 주차를 초과하면 마지막 주차로 자동 보정
            if (key === 'year' || key === 'month') {
                const ny = parseInt(key === 'year' ? value : next.year)
                const nm = parseInt(key === 'month' ? value : next.month)
                const maxWeeks = getWeeksInMonth(ny, nm)
                if (parseInt(next.week) > maxWeeks) next.week = `${maxWeeks}주차`
            }
            return next
        })
        // 선택 후 드롭다운 닫기
        setOpenDropdown(null)
    }

    return (
        <div className={sales.period}>
            {[
                { key: 'year', label: selected.year },
                { key: 'month', label: selected.month },
                { key: 'week', label: selected.week },
            ].map(({ key, label }) => (
                <div key={key} className={sales.periodItem}>
                    <button
                        className={`${sales.periodBtn} ${openDropdown === key ? sales.periodBtnOpen : ''}`}
                        onClick={() => toggleDropdown(key)}
                    >
                        {label}
                        <p><img src="./img/icon/ic-down.svg" alt="펼침아이콘" /></p>
                    </button>
                    {openDropdown === key && (
                        <ul className={sales.dropdown}>
                            {options[key].map(opt => (
                                <li
                                    key={opt}
                                    className={selected[key] === opt ? sales.dropdownActive : ''}
                                    onClick={() => handleSelect(key, opt)}
                                >
                                    {opt}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            ))}
        </div>
    )
}
