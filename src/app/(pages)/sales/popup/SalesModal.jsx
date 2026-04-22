import popup from '@/app/(pages)/sales/popup/SalesModal.module.scss'

export default function SalesModal({ onClose, sales }) {
  return (
    <div className={popup.back}>
      <div className={popup.popup}>
        <div className={popup.title}>
          <div className={popup.titleName}>
            <p><img src="./img/icon/ic-sales-edit.svg" alt="매출상세아이콘" /></p>
            <h3>매출 추가</h3>
          </div>
          <p
            className={popup.xbtn}
            onClick={onClose}
          >
            <img src="./img/icon/ic-x.svg" alt="x버튼" />
          </p>
        </div>
        
        <div className={sales.graph}>

        </div>
      </div>
    </div>
  )
}
