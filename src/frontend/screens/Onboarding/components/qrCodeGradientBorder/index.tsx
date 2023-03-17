import React from 'react'
import QrCodeGradientStyles from './index.module.scss'

interface QrCodeProps {
  qrUrl: string
  imageMargin: string
}

const QrCodeGradientBorder: React.FC<QrCodeProps> = function (props) {
  const imgStyle = {
    margin: props.imageMargin
  }
  return (
    <div className={QrCodeGradientStyles.borderWrap}>
      <div className={QrCodeGradientStyles.qrCodeContainer}>
        <img
          src={props.qrUrl}
          className={QrCodeGradientStyles.qrCodeImage}
          style={imgStyle}
        ></img>
      </div>
    </div>
  )
}

export default QrCodeGradientBorder
