// AI tools 정의 및 실행

import { runSalesTool } from './salesTools'

export const toolDescriptions = [
  {
    name: 'get_today_sales',
    description: '오늘 매출을 조회할 때 사용'
  },
  {
    name: 'get_this_week_sales',
    description: '이번 주 매출 합계를 조회할 때 사용'
  },
  {
    name: 'get_last_week_sales',
    description: '지난주 매출 합계를 조회할 때 사용'
  },
  {
    name: 'compare_this_week_last_week',
    description: '이번 주 매출과 지난주 매출을 비교할 때 사용'
  },
  {
    name: 'get_average_sales',
    description: '최근 평균 매출을 조회할 때 사용'
  },
  {
    name: 'get_best_sales_day',
    description: '매출이 가장 높은 날짜를 찾을 때 사용'
  },
  {
    name: 'get_best_menu',
    description: '지정한 기간 동안 가장 많이 판매된 메뉴를 조회할 때 사용 (판매량 기준)'
  },
  {
    name: 'get_worst_menu',
    description: '지정한 기간 동안 판매량이 가장 저조한 메뉴를 조회할 때 사용'
  },
  {
    name: 'unknown',
    description: '사용 가능한 도구가 없을 때 사용'
  }
]

export async function runTool(toolName, params) {
  const salesResult = await runSalesTool(toolName, params)

  if (salesResult) return salesResult

  return null
}