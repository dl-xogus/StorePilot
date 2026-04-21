import Link from 'next/link'
import React from 'react'
import sidebar from "@/app/sidebar.module.css"

export default function Sidebar() {
  return (
    <div className={sidebar.sidebar}>
        <Link href="/main">home</Link>
        <Link href="/sales">매출관리</Link>
    </div>
  )
}