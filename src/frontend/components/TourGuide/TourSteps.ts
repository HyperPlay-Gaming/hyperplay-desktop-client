import { TFunction } from 'i18next'

export interface TourStep {
  element: string
  intro: string
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center'
  tooltipClass?: string
  highlightClass?: string
}

// Library tour steps
export const libraryTourSteps = (t: TFunction<'tour'>): TourStep[] => [
  {
    element: '.Library',
    intro: t(
      'tour.library.welcome',
      "Welcome to your Library! This is where all your games are displayed. Let's explore the main features."
    ),
    position: 'center'
  },
  {
    element: '[data-tour="library-top-header"]',
    intro: t(
      'tour.library.header',
      'This is the Library header. You can see how many games you have in your collection.'
    ),
    position: 'bottom'
  },
  {
    element: '[data-tour="refresh"]',
    intro: t(
      'tour.library.refresh',
      'Click here to refresh your game library to see the latest additions or updates.'
    ),
    position: 'bottom'
  },
  {
    element: '[data-tour="add-game"]',
    intro: t(
      'tour.library.add_game',
      'You can add custom games to your library by clicking this button.'
    ),
    position: 'bottom'
  },
  {
    element: '[data-tour="filters"]',
    intro: t(
      'tour.library.filters',
      "Use these filters to sort your games and find what you're looking for quickly."
    ),
    position: 'bottom'
  },
  {
    element: '[data-testid="searchBar"]',
    intro: t(
      'tour.library.search',
      'Search for specific games by title using the search bar.'
    ),
    position: 'bottom'
  },
  {
    element: '.Library',
    intro: t(
      'tour.library.games_list',
      'This is your games collection. Click on any game to install, launch, or modify it.'
    ),
    position: 'center'
  },
  {
    element: '#backToTopBtn',
    intro: t(
      'tour.library.back_to_top',
      'Once you have many games, use this button to quickly scroll back to the top.'
    ),
    position: 'left'
  },
  {
    element: '.Library',
    intro: t(
      'tour.library.finish',
      "That's it! You now know how to navigate your Library. Happy gaming!"
    ),
    position: 'center'
  }
]
