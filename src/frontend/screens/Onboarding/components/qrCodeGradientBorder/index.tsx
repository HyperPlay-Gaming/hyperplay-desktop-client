import React from 'react'
import './index.scss'

interface QrCodeProps {
  qrUrl: string
  imageMargin: string
}

const QrCodeGradientBorder: React.FC<QrCodeProps> = function (props) {
  const imgStyle = {
    margin: props.imageMargin
  }
  return (
    <div className="borderWrap">
      <div className="qrCodeContainer">
        <img src={props.qrUrl} className="qrCodeImage" style={imgStyle}></img>
      </div>
    </div>
  )
}

export default QrCodeGradientBorder
