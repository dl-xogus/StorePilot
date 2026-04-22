import Graph from '@/components/Graph'
import styles from './DataList.module.scss'

// 헤더 + 데이터 rows를 가진 리스트 컴포넌트
// columns: 헤더 컬럼 배열 (JSX 가능)
// checkedAll / onCheckAll: 전체 체크박스 제어
// children: DataList.Row들
export default function DataList({ columns, checkedAll, onCheckAll, children }) {
  return (
    <Graph>
      <div className={styles.titleLine}>
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={checkedAll}
          onChange={onCheckAll}
        />
        <div className={styles.text}>
          {columns.map((col, i) => (
            <div key={i}>{col}</div>
          ))}
        </div>
      </div>
      <div>{children}</div>
    </Graph>
  )
}

// 각 행 컴포넌트
// checked / onChange: 개별 체크박스
// cells: 각 셀 내용 배열 [{ content, className }]
// actions: 수정/삭제 버튼 등 우측 액션 영역
DataList.Row = function Row({ checked, onChange, cells, actions }) {
  return (
    <div className={styles.oneline}>
      <input
        type="checkbox"
        className={styles.checkbox}
        checked={checked}
        onChange={onChange}
      />
      <div className={styles.text}>
        {cells.map((cell, i) => (
          <div key={i} className={cell.className ?? ''}>{cell.content}</div>
        ))}
      </div>
      {actions}
    </div>
  )
}
