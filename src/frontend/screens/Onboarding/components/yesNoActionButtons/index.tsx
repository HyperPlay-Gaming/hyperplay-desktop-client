import React from 'react'
import './index.scss'

interface QrCodeProps {
  onYes: () => void
  onNo: () => void
  yesText: string
  noText: string
}

const YesNoActionButtons: React.FC<QrCodeProps> = function (props) {
  return (
    <div className="actionButtonsContainer">
      <button onClick={props.onNo} className="downloadCancelButton button-s">
        {props.noText}
      </button>
      <button onClick={props.onYes} className="downloadConnectButton button-s">
        {props.yesText}
      </button>
    </div>
  )
}

export default YesNoActionButtons
