import React from 'react'
import './index.scss'
import { LoadingSpinner } from '@hyperplay/ui'

interface Props {
  text: string
  onClick?: () => void
}

export default function TextWithProgress({ text, onClick }: Props) {
  return (
    <div
      className="textWithProgress"
      role={onClick ? 'button' : 'status'}
      onClick={onClick}
    >
      <LoadingSpinner className="progress" size={24} />
      <span className="feedback-text">{text}</span>
    </div>
  )
}
