import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@hyperplay/ui'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import { useTourGuide } from './TourContext'

export type TourType = 'library' | 'sidebar' | 'gamepage' | 'topnav'

interface TourTriggerButtonProps {
  tourId?: TourType
  className?: string
  buttonType?: 'primary' | 'secondary' | 'tertiary'
  showIcon?: boolean
  showText?: boolean
}

export const TourTriggerButton: React.FC<TourTriggerButtonProps> = ({
  tourId = 'library',
  className = '',
  buttonType = 'tertiary',
  showIcon = true,
  showText = true
}) => {
  const { t } = useTranslation('tour')
  const {
    activateLibraryTour,
    activateSidebarTour,
    activateGamePageTour,
    activateTopNavTour
  } = useTourGuide()

  const handleClick = () => {
    switch (tourId) {
      case 'library':
        activateLibraryTour()
        break
      case 'sidebar':
        activateSidebarTour()
        break
      case 'gamepage':
        activateGamePageTour()
        break
      case 'topnav':
        activateTopNavTour()
        break
      default:
        activateLibraryTour()
    }
  }

  return (
    <Button
      type={buttonType}
      className={className}
      onClick={handleClick}
      title={t('tour.start_tour', 'Start guided tour')}
      leftIcon={
        showIcon ? (
          <FontAwesomeIcon icon={faQuestionCircle} height={14} width={14} />
        ) : undefined
      }
    >
      {showText && t('tour.help', 'Help')}
    </Button>
  )
}

export default TourTriggerButton
