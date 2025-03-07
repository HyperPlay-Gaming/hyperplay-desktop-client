import React, { useState, useEffect } from 'react'
import { Steps } from 'intro.js-react'
import 'intro.js/introjs.css'
import { useTranslation } from 'react-i18next'
import { useTourGuide } from './TourContext'
import {
  libraryTourSteps,
  sidebarTourSteps,
  gamePageTourSteps,
  TourStep
} from './TourSteps'
import './TourGuide.scss'

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

      switch (currentTour) {
        case 'library':
          steps = libraryTourSteps(t)
          break
        case 'sidebar':
          steps = sidebarTourSteps(t)
          break
        case 'gamepage':
          steps = gamePageTourSteps(t)
          break
        // Add more tour types here as needed
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
    showProgress: true,
    hideNext: false,
    hidePrev: false,
    exitOnOverlayClick: false,
    nextLabel: t('tour.next', 'Next'),
    prevLabel: t('tour.prev', 'Prev'),
    doneLabel: t('tour.done', 'Done'),
    overlayOpacity: 0.7,
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
