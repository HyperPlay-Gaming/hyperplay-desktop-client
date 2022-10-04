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
      <button onClick={props.onNo} className="downloadCancelButton button-sm">
        {props.noText}
      </button>
      <button onClick={props.onYes} className="downloadConnectButton button-sm">
        {props.yesText}
      </button>
    </div>
  )
}

export default YesNoActionButtons
