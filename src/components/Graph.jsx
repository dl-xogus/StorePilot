import styles from './Graph.module.scss'

export default function Graph() {
    const [checkedAll, setCheckedAll] = useState(false);
    const [checked, setChecked] = useState([]);

    return (
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
                    {["날짜", "매출", "지난주 보다"].map((item, i) => (
                        <div>
                            <p>{item}</p>
                            <p><img src="./img/icon/ic-sort-none.svg" alt="정렬아이콘" /></p>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                {salesData.map((item, i) => {
                    const prev = salesData[i - 7]   // 지난주 매출
                    const diff = prev ? Number(item.dailySales) - Number(prev.dailySales) : null
                    return (
                        <div key={item.date} className={styles.oneline}>
                            <input
                                type="checkbox"
                                className={styles.checkbox}
                                checked={checked[i] ?? false}
                                onChange={e => setChecked(prev => prev.map((v, j) => j === i ? e.target.checked : v))}
                            />
                            <div className={styles.text}>
                                <div>{item.date.slice(5).replace('-', '.')} ({item.day})</div>
                                <div className={styles.sale}>{Number(item.dailySales).toLocaleString()}</div>
                                <div className={diff === null ? '' : diff >= 0 ? styles.plus : styles.minus}>
                                    {diff === null ? '-' : `${diff >= 0 ? '+' : ''}${diff.toLocaleString()}`}
                                </div>
                            </div>
                            <p className={styles.editBtn}><img src="./img/icon/ic-edit.svg" alt="수정버튼" /></p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
