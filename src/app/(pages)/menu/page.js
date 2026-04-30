
"use client"
import React, { useEffect, useState } from 'react'
import styles from './menu.module.scss'
import axios from 'axios';
import Ai from '@/components/menu/Ai';

function Menu() {
    const [menuData, setMenuData] = useState([]);
    useEffect(() => {
        axios.get('/api/menu/db', {
            params: {
                ownerId: 'qwe@email.com', // 추후 세션값으로 교체
                storeId: '001',
            }
        })
            .then(res => setMenuData(res.data.menu))
            .catch(err => console.error('menu 조회 실패', err));
    }, []);

    const [checkedAll, setCheckedAll] = useState(false); // 전체 선택 체크박스 상태
    const [checked, setChecked] = useState([]);          // 각 행의 체크박스 상태 배열


    // 표- 상태 추가 
    const [isAdding, setIsAdding] = useState(false);
    const [newItem, setNewItem] = useState({
        name: "",
        price: "",
        category: "",
        status: ""
    });

    const handleAdd = () => {
        setMenuList([
            {
                id: Date.now(),
                ...newItem,
                checked: false
            },
            ...menuList
        ]);

        setNewItem({
            name: "",
            price: "",
            sales: "",
            status: ""
        });

        setIsAdding(false);
    };

    return (
        <div className={styles.menu}>
            <section>
                <div className={styles.main_title}>
                    <span>메뉴</span> 관리
                </div>

                <div className={styles.searchBox}>
                    <div className={styles.searchtxt}>
                        <div className={styles.search}>
                            <img src='./img/icon/ic-search.svg' />
                            <input type="text" placeholder="" />
                        </div>
                        <div className={styles.text}>
                            <p>*최근 30일 기준</p>
                        </div>
                    </div>

                    <div className={styles.icon}>
                        <div className={styles.btn} onClick={() => setIsAdding(true)}>
                            <img src='./img/icon/ic-plus(black).svg' />
                        </div>
                        <div className={styles.btn}>
                            <img src='./img/icon/ic-bin.svg' />
                        </div>
                    </div>
                </div>

            </section>

            {/* 표 */}
            <section className={styles.section}>
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

                        <div className={styles.sortTxt}>
                            메뉴명
                            <img src='./img/icon/ic-sort-up.svg' />
                        </div>
                        <div className={styles.sortTxt}>
                            판매가
                            <img src='./img/icon/ic-sort-up.svg' />
                        </div>
                        <div className={styles.sortTxt}>
                            최근 판매량
                            <img src='./img/icon/ic-sort-up.svg' />
                        </div>
                        <div className={styles.sortTxt}>
                            카테고리
                            <img src='./img/icon/ic-sort-up.svg' />
                        </div>
                        <div className={styles.sortTxt}>
                            현재 상태
                            <img src='./img/icon/ic-sort-up.svg' />
                        </div>

                    </div>

                    {isAdding && (
                        <div className={styles.Line}>
                            <input type="checkbox" className={styles.checkbox} />


                            {/* 메뉴명 */}
                            <input
                                value={newItem.name}
                                onChange={e => setNewItem({ ...newItem, name: e.target.value })}
                                placeholder="메뉴명"
                            />


                            {/* 판매가 */}
                            <input
                                value={newItem.price}
                                onChange={e => setNewItem({ ...newItem, price: e.target.value })}
                                placeholder="가격"
                            />

                            {/* 최근 판매량 */}
                            <p> - </p>


                            {/* 카테고리 */}
                            <p> - </p>

                            {/* 현재 상태 */}
                            <input
                                value={newItem.status}
                                onChange={e => setNewItem({ ...newItem, status: e.target.value })}
                                placeholder="상태"
                            />

                            <button
                                onClick={handleAdd}
                                className={styles.inputBtn}>
                                추가
                            </button>
                            <button 
                            onClick={() => setIsAdding(false)} 
                            className={styles.inputBtn}>
                                취소
                                </button>
                        </div>
                    )}



                    {menuData.map((item, i) => {
                        return (
                            <div className={styles.Line} key={i}>
                                <input
                                    type="checkbox"
                                    className={styles.checkbox}
                                    checked={checkedAll}
                                    onChange={e => {
                                        setCheckedAll(e.target.checked)
                                        setChecked(checked.map(() => e.target.checked))
                                    }}
                                />



                                <div className={styles.Lines}>
                                    <p>{item.name}</p>
                                    <p>{item.price}</p>
                                    <p>122</p>
                                    <p>{item.category}</p>
                                    <p>{item.status}</p>
                                    <p className={styles.editBtn}>
                                        <img src="./img/icon/ic-edit.svg" alt="수정아이콘" />
                                    </p>
                                </div>
                            </div>
                        )

                    })}
                </div>
            </section>

            <Ai menuData={menuData}/>




        </div>

    )
}

export default Menu