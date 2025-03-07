import React, { createContext, useState, useContext, ReactNode } from 'react'

type TourState = {
  isTourActive: boolean
  currentTour: string | null
  completedTours: string[]
  activateLibraryTour: () => void
  activateSidebarTour: () => void
  activateGamePageTour: () => void
  activateTopNavTour: () => void
  deactivateTour: () => void
  markTourAsComplete: (tourId: string) => void
  isTourCompleted: (tourId: string) => boolean
}

const initialState: TourState = {
  isTourActive: false,
  currentTour: null,
  completedTours: [],
  activateLibraryTour: () => {},
  activateSidebarTour: () => {},
  activateGamePageTour: () => {},
  activateTopNavTour: () => {},
  deactivateTour: () => {},
  markTourAsComplete: () => {},
  isTourCompleted: () => false
}

const TourContext = createContext<TourState>(initialState)

interface TourProviderProps {
  children: ReactNode
}

export const TourProvider: React.FC<TourProviderProps> = ({ children }) => {
  const [isTourActive, setIsTourActive] = useState(false)
  const [currentTour, setCurrentTour] = useState<string | null>(null)
  const [completedTours, setCompletedTours] = useState<string[]>(() => {
    // Load completed tours from localStorage if available
    const saved = localStorage.getItem('hp-completed-tours')
    return saved ? JSON.parse(saved) : []
  })

  const activateLibraryTour = () => {
    setCurrentTour('library')
    setIsTourActive(true)
  }

  const activateSidebarTour = () => {
    setCurrentTour('sidebar')
    setIsTourActive(true)
  }

  const activateGamePageTour = () => {
    setCurrentTour('gamepage')
    setIsTourActive(true)
  }

  const activateTopNavTour = () => {
    setCurrentTour('topnav')
    setIsTourActive(true)
  }

  const deactivateTour = () => {
    setIsTourActive(false)
    setCurrentTour(null)
  }

  const markTourAsComplete = (tourId: string) => {
    if (!completedTours.includes(tourId)) {
      const updatedTours = [...completedTours, tourId]
      setCompletedTours(updatedTours)
      localStorage.setItem('hp-completed-tours', JSON.stringify(updatedTours))
    }
  }

  const isTourCompleted = (tourId: string): boolean => {
    return completedTours.includes(tourId)
  }

  return (
    <TourContext.Provider
      value={{
        isTourActive,
        currentTour,
        completedTours,
        activateLibraryTour,
        activateSidebarTour,
        activateGamePageTour,
        activateTopNavTour,
        deactivateTour,
        markTourAsComplete,
        isTourCompleted
      }}
    >
      {children}
    </TourContext.Provider>
  )
}

export const useTourGuide = (): TourState => useContext(TourContext)
