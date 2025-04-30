import React, { useState, useEffect } from 'react'
import { Steps } from 'intro.js-react'
import 'intro.js/introjs.css'
import { useTranslation } from 'react-i18next'
import { useTourGuide } from './TourContext'
import { firstWelcomeTourSteps, TourStep } from './TourSteps'
import './TourGuide.scss'
import { FIRST_TIME_TOUR } from './constants'

export const TourGuide: React.FC = () => {
  const { t } = useTranslation('tour')
  const { isTourActive, currentTour, deactivateTour, markTourAsComplete } =
    useTourGuide()
  const [stepsEnabled, setStepsEnabled] = useState(false)
  const [currentSteps, setCurrentSteps] = useState<TourStep[]>([])
  const [initialStep, setInitialStep] = useState(0)

  useEffect(() => {
    if (isTourActive && currentTour) {
      let steps: TourStep[] = []

      // Add more tours here as needed
      switch (currentTour) {
        case FIRST_TIME_TOUR:
          steps = firstWelcomeTourSteps(t)
          break
        default:
          steps = []
      }

      setCurrentSteps(steps)
      setInitialStep(0)
      setStepsEnabled(true)
    } else {
      setStepsEnabled(false)
    }
  }, [isTourActive, currentTour, t])

  const onExit = () => {
    setStepsEnabled(false)
    deactivateTour()
  }

  const onComplete = () => {
    if (currentTour) {
      markTourAsComplete(currentTour)
    }
    deactivateTour()
  }

  const options = {
    showStepNumbers: false,
    showBullets: true,
    showProgress: false,
    exitOnEsc: true,
    exitOnOverlayClick: false,
    nextLabel: t('tour.next', 'Next'),
    prevLabel: t('tour.back', 'Back'),
    doneLabel: t('tour.done', 'Done'),
    overlayOpacity: 0.9,
    scrollToElement: true
  }

  return (
    <Steps
      enabled={stepsEnabled}
      steps={currentSteps}
      initialStep={initialStep}
      onExit={onExit}
      onComplete={onComplete}
      options={options}
    />
  )
}

export default TourGuide
