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

// Sidebar tour steps
export const sidebarTourSteps = (t: TFunction): TourStep[] => [
  {
    element: '[data-tour="sidebar-store"]',
    intro: t(
      'tour.sidebar.store',
      'This is the Store navigation. Access the HyperPlay Store, Epic Games, and GOG stores to browse and purchase games.'
    ),
    position: 'right'
  },
  {
    element: '[data-tour="sidebar-library"]',
    intro: t(
      'tour.sidebar.library',
      'This is your Library where all your games are displayed. Click here to access your game collection.'
    ),
    position: 'right'
  },
  /*   {
    element: '[data-tour="sidebar-achievements"]',
    intro: t(
      'tour.sidebar.achievements',
      "Track your achievements across games. See what you've unlocked and what's still to conquer."
    ),
    position: 'right'
  }, */
  {
    element: '[data-tour="sidebar-quests"]',
    intro: t(
      'tour.sidebar.quests',
      'Complete quests to earn rewards. Participate in challenges and boost your gaming experience.'
    ),
    position: 'right'
  },
  {
    element: '[data-tour="sidebar-downloads"]',
    intro: t(
      'tour.sidebar.downloads',
      'Check the status of your downloads, updates, and installations in the Download Manager.'
    ),
    position: 'right'
  },
  {
    element: '[data-tour="sidebar-settings"]',
    intro: t(
      'tour.sidebar.settings',
      'Configure your app settings, manage accounts, and customize your HyperPlay experience.'
    ),
    position: 'right'
  },
  {
    element: '[data-tour="sidebar-discord"]',
    intro: t(
      'tour.sidebar.discord',
      'Join our Discord community to get help, share experiences, and stay updated.'
    ),
    position: 'right'
  },
  {
    element: '[data-tour="sidebar-x"]',
    intro: t(
      'tour.sidebar.x',
      'Follow us on X (formerly Twitter) for news, updates, and announcements.'
    ),
    position: 'right'
  },
  {
    element: '[data-tour="sidebar-docs"]',
    intro: t(
      'tour.sidebar.docs',
      'Access documentation and guides to help you get the most out of HyperPlay.'
    ),
    position: 'right'
  },
  {
    element: '.SidebarLinks',
    intro: t(
      'tour.sidebar.finish',
      "That's it! Now you know how to navigate through HyperPlay using the sidebar."
    ),
    position: 'right'
  }
]
