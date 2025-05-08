import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Button } from '@hyperplay/ui'
import { useTranslation } from 'react-i18next'
import './CustomButtons.scss'

interface CustomTourButtonsProps {
  onNext?: () => void
  onPrev?: () => void
  onFinish?: () => void
  isFirstStep: boolean
  isFinalStep: boolean
}

const CustomTourButtons: React.FC<CustomTourButtonsProps> = ({
  onNext,
  onPrev,
  onFinish,
  isFirstStep,
  isFinalStep
}) => {
  const { t } = useTranslation('tour')
  const containerRef = useRef<Element | null>(null)
  const [mounted, setMounted] = React.useState(false)
  const mountRetryCountRef = useRef(0)

  const findAndSetupButtons = () => {
    const tooltipButtons = document.querySelector('.introjs-tooltipbuttons')

    if (tooltipButtons) {
      containerRef.current = tooltipButtons
      setMounted(true)
      document.documentElement.classList.add('hp-custom-buttons-active')
      tooltipButtons.classList.add('hp-custom-buttons-container')
      return true
    }
    return false
  }

  useEffect(() => {
    if (!findAndSetupButtons()) {
      const intervalId = setInterval(() => {
        if (findAndSetupButtons() || mountRetryCountRef.current > 10) {
          clearInterval(intervalId)
        }
        mountRetryCountRef.current += 1
      }, 100)

      return () => clearInterval(intervalId)
    }

    return () => {
      document.documentElement.classList.remove('hp-custom-buttons-active')
      if (containerRef.current) {
        containerRef.current.classList.remove('hp-custom-buttons-container')
      }
    }
  }, [])

  const handleNext = () => {
    if (isFinalStep) {
      const doneBtn = document.querySelector('.introjs-donebutton')
      if (doneBtn && doneBtn instanceof HTMLElement) {
        doneBtn.click()
      }
      if (onFinish) onFinish()
    } else {
      const nextBtn = document.querySelector('.introjs-nextbutton')
      if (nextBtn && nextBtn instanceof HTMLElement) {
        nextBtn.click()
      }
      if (onNext) onNext()
    }
  }

  const handlePrev = () => {
    const prevBtn = document.querySelector('.introjs-prevbutton')
    if (prevBtn && prevBtn instanceof HTMLElement) {
      prevBtn.click()
    }
    if (onPrev) onPrev()
  }

  if (!mounted || !containerRef.current) {
    return null
  }

  const containerClass = isFirstStep
    ? 'custom-tour-buttons one-button'
    : 'custom-tour-buttons two-buttons'

  return createPortal(
    <div className={containerClass}>
      {!isFirstStep && (
        <Button type="secondary" onClick={handlePrev}>
          {t('tour.back', 'Back')}
        </Button>
      )}
      <Button type="primary" onClick={handleNext}>
        {isFinalStep ? t('tour.done', 'Done') : t('tour.next', 'Next')}
      </Button>
    </div>,
    containerRef.current
  )
}

export default CustomTourButtons
