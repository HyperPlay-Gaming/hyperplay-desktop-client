import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@hyperplay/ui'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import { useTourGuide } from './TourContext'

interface TourTriggerButtonProps {
  tourId?: string // If not provided, uses the 'library' tour by default
  className?: string
}

export const TourTriggerButton: React.FC<TourTriggerButtonProps> = ({
  tourId = 'library',
  className = ''
}) => {
  const { t } = useTranslation('tour')
  const { activateLibraryTour } = useTourGuide()

  const handleClick = () => {
    if (tourId === 'library') {
      activateLibraryTour()
    }
    // Add additional tour activation functions as needed
  }

  return (
    <Button
      type="tertiary"
      className={className}
      onClick={handleClick}
      title={t('tour.start_tour', 'Start guided tour')}
      leftIcon={
        <FontAwesomeIcon icon={faQuestionCircle} height={14} width={14} />
      }
    >
      {t('tour.help', 'Help')}
    </Button>
  )
}

export default TourTriggerButton
