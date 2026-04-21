import Link from 'next/link'
import React from 'react'

export default function Sidebar() {
  return (
    <div>
        <Link href="/main">home</Link>
        <Link href="/sales">매출관리</Link>
    </div>
  )
}
