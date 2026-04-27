import React from 'react'
import styles from './staff.module.scss';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import StaffRow from './components/StaffRow';


function Staff() {
    return (
        <section className={styles.staff}>
            <div className={styles.staffContainer}>
                <div className={styles.staffMain}>

                    <div className={styles.staffHeader}>
                        <h2>
                            <span className={styles.staffTitle}>직원</span> 관리
                        </h2>

                        <div className={styles.staffTotal}>
                            <img src='./img/icon/ic_schedul-person.svg' />
                            <p>Total : -명</p>
                        </div>
                    </div>


                    <div className={styles.staffActions}>
                        <Paper className={styles.searchBar}>
                            <IconButton sx={{ p: '5px', color: '#aaa' }}>
                                <SearchIcon />
                            </IconButton>

                            <InputBase placeholder="검색" />
                        </Paper>

                        <div className={styles.staffActionButtons}>
                            <img src='./img/icon/ic-plus(black).svg' />
                            <img src='./img/icon/ic-bin.svg' />
                        </div>
                    </div>


                    <div className={styles.staffTable}>

                        <div className={styles.tableHeader}>
                            <input type="checkbox" className={styles.checkbox} />
                            <p>
                                이름 <img src={'./img/icon/ic-sort-down.svg'} />
                            </p>
                            <p>
                                나이 <img src={'./img/icon/ic-sort-down.svg'} />
                            </p>
                            <p>
                                시급 <img src={'./img/icon/ic-sort-down.svg'} />
                            </p>
                            <p>
                                파트 <img src={'./img/icon/ic-sort-down.svg'} />
                            </p>
                            <p>근무요일</p>
                            <p>근무시간</p>
                            <p>전화번호</p>
                        </div>


                        <StaffRow />

                    </div>

                </div>
            </div>
        </section>
    )
}

export default Staff