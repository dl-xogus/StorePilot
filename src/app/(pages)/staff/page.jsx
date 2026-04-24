import React from 'react'
import styles from './staff.module.scss';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';



function Staff() {
    return (
        <section className={styles.staff}>
            <div className={styles.container}>
                <div className={styles['staff-contents']}>






                    <div className={styles['staff-title']}>

                        <h2><span className={styles.title}>직원</span> 관리</h2>
                        <div className={styles.total}>
                            <img src='./img/icon/ic_schedul-person.svg' /><p>total : -명</p>
                        </div>
                    </div>






                    <div className={styles.actions}>
                        <Paper className={styles.paper}
                            component="form"
                            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                        >
                            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                                <SearchIcon />
                            </IconButton>
                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="검색"
                                inputProps={{ 'aria-label': 'search google maps' }}
                            />

                        </Paper>

                        <div className={styles['staff-icon']}>
                            <img src='./img/icon/ic-plus(black).svg' />
                            <img src='./img/icon/ic-bin.svg' />
                        </div>
                    </div>



                    <div className={styles.table}>

                        <div className={styles.tableHeader}>
                            <input type="checkbox" className={styles.checkbox} />
                            <p>이름</p>
                            <p>나이</p>
                            <p>시급</p>
                            <p>파트</p>
                            <p>근무요일</p>
                            <p>근무시간</p>
                            <p>전화번호</p>
                        </div>

                        <div className={styles.tableRow}>
                            <input type="checkbox" className={styles.checkbox} />
                            <p>name</p>
                            <p>age</p>
                            <p>Wage</p>
                            <p>part</p>
                            <p>days</p>
                            <p>time</p>
                            <p>phone</p>
                            <img src='./img/icon/ic-edit.svg' />

                        </div>

                    </div>
                </div>
            </div>







        </section>
    )
}

export default Staff