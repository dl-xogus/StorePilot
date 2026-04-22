const fs = require('fs');
const path = require('path');

const DAYS = ['일', '월', '화', '수', '목', '금', '토'];

// ─── store ───────────────────────────────────────────────
const store = [
  {
    ownerId: 'qwe@email.com',
    storeId: '001',
    name: '바삭대장 치킨 의정부점',
    address: '경기도 의정부시 민락로 123',
    phone: '031-123-4567',
    openTime: '16:00',
    closeTime: '01:00',
  },
  {
    ownerId: 'aaayoo12345@gmail.com',
    storeId: '002',
    name: 'CAFE GATE 의정부점',
    address: '경기도 의정부시 ...',
    phone: '031-000-0000',
    openTime: '09:00',
    closeTime: '22:00',
  },
];

// ─── account ─────────────────────────────────────────────
const account = [
  { id: 'qwe@email.com', password: 'qweqwe' },
  { id: 'aaayoo12345@gmail.com', password: 'asd123' },
];

// ─── menu ─────────────────────────────────────────────────
const menu = [
  {
    ownerId: 'qwe@email.com',
    storeId: '001',
    menu: [
      { name: '후라이드 치킨',         price: '21900', category: '치킨',   status: '판매중' },
      { name: '양념 치킨',             price: '22900', category: '치킨',   status: '판매중' },
      { name: '간장 치킨',             price: '22900', category: '치킨',   status: '판매중' },
      { name: '파닭',                  price: '23900', category: '치킨',   status: '판매중' },
      { name: '반반 치킨',             price: '23900', category: '치킨',   status: '판매중' },
      { name: '고급수제어묵탕',        price: '22900', category: '탕',     status: '판매중' },
      { name: '통오징어한판떡볶이',    price: '22900', category: '분식',   status: '판매중' },
      { name: '치즈볼',               price: '8900',  category: '사이드', status: '판매중' },
      { name: '감자튀김',             price: '6900',  category: '사이드', status: '판매중' },
      { name: '생맥주 500cc',         price: '5000',  category: '음료',   status: '판매중' },
      { name: '소주',                 price: '5000',  category: '음료',   status: '판매중' },
      { name: '콜라',                 price: '3000',  category: '음료',   status: '판매중' },
      { name: '케이준브리또샐러드',   price: '15900', category: '분식',   status: '품절'   },
    ],
  },
];

// 매출 계산용 메뉴 (품절 제외)
const salesMenu = [
  { name: '후라이드 치킨',      price: 21900, baseCount: 6 },
  { name: '양념 치킨',          price: 22900, baseCount: 5 },
  { name: '간장 치킨',          price: 22900, baseCount: 4 },
  { name: '파닭',               price: 23900, baseCount: 2 },
  { name: '반반 치킨',          price: 23900, baseCount: 3 },
  { name: '고급수제어묵탕',     price: 22900, baseCount: 3 },
  { name: '통오징어한판떡볶이', price: 22900, baseCount: 4 },
  { name: '치즈볼',            price: 8900,  baseCount: 8 },
  { name: '감자튀김',          price: 6900,  baseCount: 7 },
  { name: '생맥주 500cc',      price: 5000,  baseCount: 20 },
  { name: '소주',              price: 5000,  baseCount: 15 },
  { name: '콜라',              price: 3000,  baseCount: 10 },
];

// ─── employee ─────────────────────────────────────────────
const employee = [
  {
    ownerId: 'qwe@email.com',
    storeId: '001',
    employees: [
      {
        name: '김태식', age: '38', phone: '010-2345-6789',
        part: '주방장', hourlyWage: '15000',
        schedules: [
          { day: '월', startTime: '15:00', endTime: '01:00' },
          { day: '화', startTime: '15:00', endTime: '01:00' },
          { day: '수', startTime: '15:00', endTime: '01:00' },
          { day: '목', startTime: '15:00', endTime: '01:00' },
          { day: '금', startTime: '15:00', endTime: '01:00' },
        ],
      },
      {
        name: '이민준', age: '25', phone: '010-3456-7890',
        part: '주방', hourlyWage: '12000',
        schedules: [
          { day: '화', startTime: '16:00', endTime: '24:00' },
          { day: '수', startTime: '16:00', endTime: '24:00' },
          { day: '목', startTime: '16:00', endTime: '24:00' },
          { day: '금', startTime: '16:00', endTime: '24:00' },
          { day: '토', startTime: '14:00', endTime: '24:00' },
        ],
      },
      {
        name: '박소연', age: '22', phone: '010-4567-8901',
        part: '홀', hourlyWage: '11500',
        schedules: [
          { day: '월', startTime: '17:00', endTime: '23:00' },
          { day: '수', startTime: '17:00', endTime: '23:00' },
          { day: '금', startTime: '17:00', endTime: '01:00' },
          { day: '토', startTime: '15:00', endTime: '01:00' },
          { day: '일', startTime: '15:00', endTime: '23:00' },
        ],
      },
      {
        name: '최지우', age: '21', phone: '010-5678-9012',
        part: '홀', hourlyWage: '11000',
        schedules: [
          { day: '화', startTime: '17:00', endTime: '23:00' },
          { day: '목', startTime: '17:00', endTime: '23:00' },
          { day: '토', startTime: '15:00', endTime: '01:00' },
          { day: '일', startTime: '15:00', endTime: '23:00' },
        ],
      },
      {
        name: '정현우', age: '26', phone: '010-6789-0123',
        part: '홀', hourlyWage: '11000',
        schedules: [
          { day: '월', startTime: '18:00', endTime: '24:00' },
          { day: '화', startTime: '18:00', endTime: '24:00' },
          { day: '수', startTime: '18:00', endTime: '24:00' },
          { day: '목', startTime: '18:00', endTime: '24:00' },
          { day: '금', startTime: '18:00', endTime: '01:00' },
        ],
      },
      {
        name: '강민호', age: '29', phone: '010-7890-1234',
        part: '배달', hourlyWage: '12500',
        schedules: [
          { day: '금', startTime: '17:00', endTime: '01:00' },
          { day: '토', startTime: '14:00', endTime: '01:00' },
          { day: '일', startTime: '14:00', endTime: '23:00' },
        ],
      },
      {
        name: '신짱구', age: '5', phone: '010-1234-5678',
        part: '주방', hourlyWage: '12000',
        schedules: [
          { day: '월', startTime: '16:00', endTime: '24:00' },
          { day: '화', startTime: '16:00', endTime: '24:00' },
          { day: '수', startTime: '16:00', endTime: '24:00' },
        ],
      },
      {
        name: '김철수', age: '5', phone: '010-1111-2222',
        part: '홀', hourlyWage: '11000',
        schedules: [
          { day: '월', startTime: '18:00', endTime: '22:00' },
          { day: '화', startTime: '18:00', endTime: '22:00' },
          { day: '수', startTime: '18:00', endTime: '22:00' },
          { day: '목', startTime: '18:00', endTime: '22:00' },
          { day: '금', startTime: '18:00', endTime: '22:00' },
        ],
      },
    ],
  },
];

// ─── stock ────────────────────────────────────────────────
const stock = [
  {
    ownerId: 'qwe@email.com',
    storeId: '001',
    stocks: [
      { name: '뼈닭 (1kg)',    quantity: '30', unit: 'kg',  expirationDate: '2026-04-26', purchaseDate: '2026-04-20' },
      { name: '닭날개',        quantity: '10', unit: 'kg',  expirationDate: '2026-04-24', purchaseDate: '2026-04-20' },
      { name: '튀김가루',      quantity: '15', unit: 'kg',  expirationDate: '2026-10-01', purchaseDate: '2026-04-01' },
      { name: '식용유',        quantity: '20', unit: 'L',   expirationDate: '2026-12-01', purchaseDate: '2026-04-01' },
      { name: '양념소스',      quantity: '8',  unit: 'kg',  expirationDate: '2026-07-01', purchaseDate: '2026-04-10' },
      { name: '간장소스',      quantity: '6',  unit: 'kg',  expirationDate: '2026-07-01', purchaseDate: '2026-04-10' },
      { name: '어묵',          quantity: '12', unit: 'kg',  expirationDate: '2026-04-28', purchaseDate: '2026-04-18' },
      { name: '떡',            quantity: '20', unit: 'kg',  expirationDate: '2026-04-29', purchaseDate: '2026-04-15' },
      { name: '오징어',        quantity: '15', unit: 'kg',  expirationDate: '2026-04-25', purchaseDate: '2026-04-18' },
      { name: '양배추',        quantity: '5',  unit: '통',  expirationDate: '2026-04-27', purchaseDate: '2026-04-20' },
      { name: '무',            quantity: '10', unit: 'kg',  expirationDate: '2026-04-30', purchaseDate: '2026-04-17' },
      { name: '감자',          quantity: '8',  unit: 'kg',  expirationDate: '2026-04-28', purchaseDate: '2026-04-18' },
      { name: '생맥주 케그',   quantity: '3',  unit: '통',  expirationDate: '2026-05-10', purchaseDate: '2026-04-15' },
      { name: '소주',          quantity: '5',  unit: '박스', expirationDate: '2027-01-01', purchaseDate: '2026-04-10' },
      { name: '콜라',          quantity: '3',  unit: '박스', expirationDate: '2026-12-01', purchaseDate: '2026-04-10' },
      { name: '치즈',          quantity: '4',  unit: 'kg',  expirationDate: '2026-05-01', purchaseDate: '2026-04-15' },
      { name: '일회용기',      quantity: '200', unit: '개', expirationDate: null,          purchaseDate: '2026-04-01' },
    ],
  },
];

// ─── sale (1년 4개월치 생성) ──────────────────────────────
function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateSalesData() {
  const salesArr = [];
  const start = new Date('2025-01-01');
  const end   = new Date('2026-04-22');

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().slice(0, 10);
    const dayIdx  = d.getDay();
    const month   = d.getMonth() + 1;

    const isWeekend = dayIdx === 0 || dayIdx === 6;
    const isFriday  = dayIdx === 5;

    // 요일 가중치
    const dayFactor = isWeekend ? 1.5 : isFriday ? 1.25 : 1.0;

    // 계절 가중치
    let seasonFactor = 1.0;
    if (month >= 6 && month <= 8) seasonFactor = 1.2;   // 여름 성수기
    if (month === 12)              seasonFactor = 1.3;   // 연말 성수기
    if (month === 1 || month === 2) seasonFactor = 0.85; // 겨울 비수기

    // 랜덤 변동 ±20%
    const noise = 0.8 + Math.random() * 0.4;

    const details = salesMenu.map(m => {
      const count = Math.max(1, Math.round(m.baseCount * dayFactor * seasonFactor * noise * (0.6 + Math.random() * 0.8)));
      return { name: m.name, count: String(count) };
    });

    const dailySales = details.reduce((sum, d, i) => sum + parseInt(d.count) * salesMenu[i].price, 0);

    salesArr.push({
      date: dateStr,
      day: DAYS[dayIdx],
      dailySales: String(Math.round(dailySales / 1000) * 1000),
      details,
    });
  }

  return [{ ownerId: 'qwe@email.com', storeId: '001', sales: salesArr }];
}

// ─── 파일 저장 ────────────────────────────────────────────
const out = path.join(__dirname);
const sale = generateSalesData();

fs.writeFileSync(path.join(out, 'store.json'),    JSON.stringify(store,    null, 2), 'utf8');
fs.writeFileSync(path.join(out, 'account.json'),  JSON.stringify(account,  null, 2), 'utf8');
fs.writeFileSync(path.join(out, 'menu.json'),     JSON.stringify(menu,     null, 2), 'utf8');
fs.writeFileSync(path.join(out, 'employee.json'), JSON.stringify(employee, null, 2), 'utf8');
fs.writeFileSync(path.join(out, 'stock.json'),    JSON.stringify(stock,    null, 2), 'utf8');
fs.writeFileSync(path.join(out, 'sale.json'),     JSON.stringify(sale,     null, 2), 'utf8');

const days = sale[0].sales.length;
console.log(`완료! 매출 ${days}일치 생성됨 (${sale[0].sales[0].date} ~ ${sale[0].sales[days-1].date})`);
