import React, { useState, useEffect } from 'react'
import { Steps } from 'intro.js-react'
import 'intro.js/introjs.css'
import { useTranslation } from 'react-i18next'
import { useTourGuide } from './TourContext'
import {
  libraryTourSteps,
  sidebarTourSteps,
  gamePageTourSteps,
  topNavTourSteps,
  firstWelcomeTourSteps,
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

  // Disabled tours for now until product decides what to do with them
  const disabledTours = ['sidebar', 'gamepage', 'topnav', 'library']

  useEffect(() => {
    if (isTourActive && currentTour) {
      let steps: TourStep[] = []

      // Check if the current tour is disabled
      if (disabledTours.includes(currentTour)) {
        setStepsEnabled(false)
        return
      }

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
        case 'topnav':
          steps = topNavTourSteps(t)
          break
        case 'first-welcome':
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
    if (currentTour) {
      markTourAsComplete(currentTour)
    }
    deactivateTour()
  }

  const onComplete = () => {
    if (currentTour) {
      markTourAsComplete(currentTour)
    }
    deactivateTour()
  }

  const onClose = () => {
    setStepsEnabled(false)
    if (currentTour) {
      markTourAsComplete(currentTour)
    }
    deactivateTour()
  }

  const options = {
    onClose: onClose,
    showStepNumbers: false,
    showBullets: true,
    showProgress: false,
    exitOnEsc: true,
    exitOnOverlayClick: false,
    nextLabel: t('tour.next', 'Next'),
    prevLabel: t('tour.back', 'Back'),
    doneLabel: t('tour.done', 'Done'),
    overlayOpacity: 0.7,
    scrollToElement: true,
    showSkip: true
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
