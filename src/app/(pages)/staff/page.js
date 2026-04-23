'use client'

import React from 'react'
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';


function Staff() {
    return (
        <section className='staff'>


            <div className='staff-title'>
                <h2>직원 관리</h2>
                <p>total : -명</p>
            </div>

            <div className='staff-box'>
                <Paper
                    component="form"
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                >
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        inputProps={{ 'aria-label': 'search google maps' }}
                    />
                </Paper>
            </div>

            <div className='staff-table'>

                <div className='title'>
                    <input type='checkbox' />
                    <p>이름</p>
                    <p>나이</p>
                    <p>시급</p>
                    <p>파트</p>
                    <p>근무요일</p>
                    <p>근무시간</p>
                    <p>전화번호</p>
                </div>

                <div className='row'>
                    <input type='checkbox' />
                    <p>name</p>
                    <p>age</p>
                    <p>hourlyWage</p>
                    <p>part</p>
                    <p>days</p>
                    <p>time</p>
                    <p>phone</p>

                </div>

            </div>



        </section>
    )
}

export default Staff