import { TFunction } from 'i18next'

export interface TourStep {
  element?: string
  intro: string
  title?: string
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center'
  tooltipClass?: string
  highlightClass?: string
}

// Library tour steps
export const libraryTourSteps = (t: TFunction<'tour'>): TourStep[] => [
  {
    title: t('tour.library.title', 'Welcome to HyperPlay Library'),
    intro: t(
      'tour.library.welcome',
      "Welcome to your Library! This is where all your games are displayed. Let's explore the main features."
    )
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

// Game page tour steps
export const gamePageTourSteps = (t: TFunction): TourStep[] => [
  {
    element: '[data-tour="game-page-container"]',
    intro: t(
      'tour.gamepage.welcome',
      'Welcome to the Game Page. This is where you can view details about a game, install it, or launch it.'
    ),
    position: 'center'
  },
  {
    element: '[data-tour="game-page-back-button"]',
    intro: t(
      'tour.gamepage.back',
      'Click here to go back to the previous page.'
    ),
    position: 'right'
  },
  {
    element: '[data-tour="game-page-title"]',
    intro: t('tour.gamepage.title', 'This is the name of the game.'),
    position: 'bottom'
  },
  {
    element: '[data-tour="game-page-settings"]',
    intro: t(
      'tour.gamepage.settings',
      'Click here to access game settings, such as compatibility options, launch arguments, and more.'
    ),
    position: 'left'
  },
  {
    element: '[data-tour="game-page-actions"]',
    intro: t(
      'tour.gamepage.actions',
      'This menu offers additional actions like visiting the store page, showing system requirements, and checking for updates.'
    ),
    position: 'left'
  },
  {
    element: '[data-tour="game-page-description"]',
    intro: t('tour.gamepage.description', "This is the game's description."),
    position: 'top'
  },
  {
    element: '[data-tour="game-page-details"]',
    intro: t(
      'tour.gamepage.details',
      'Here you can find technical details about the game, such as install size, version, and whether it supports web3 features.'
    ),
    position: 'top'
  },
  {
    element: '[data-tour="game-page-status"]',
    intro: t(
      'tour.gamepage.status',
      'This shows the current status of the game (installed, not installed, downloading, etc).'
    ),
    position: 'top'
  },
  {
    element: '[data-tour="game-page-buttons"]',
    intro: t(
      'tour.gamepage.buttons',
      'Use these buttons to install, update, or launch the game.'
    ),
    position: 'top'
  },
  {
    element: '[data-tour="game-page-report"]',
    intro: t(
      'tour.gamepage.report',
      'If you encounter any issues with the game, click here to report a problem.'
    ),
    position: 'top'
  },
  {
    element: '[data-tour="game-page-container"]',
    intro: t(
      'tour.gamepage.finish',
      "That's it! Now you know how to navigate and use the game page."
    ),
    position: 'center'
  }
]

// TopNav tour steps
export const topNavTourSteps = (t: TFunction): TourStep[] => [
  {
    element: '[data-tour="topnav-container"]',
    intro: t(
      'tour.topnav.welcome',
      "Welcome to HyperPlay! Let's explore the navigation bar and its features."
    ),
    position: 'bottom'
  },
  {
    element: '[data-tour="topnav-hyperplay-store"]',
    intro: t(
      'tour.topnav.hyperplay_store',
      'Access the HyperPlay Store to discover exciting web3 games.'
    ),
    position: 'bottom'
  },
  {
    element: '[data-tour="topnav-epic-store"]',
    intro: t(
      'tour.topnav.epic_store',
      'Browse and buy games from the Epic Games Store.'
    ),
    position: 'bottom'
  },
  {
    element: '[data-tour="topnav-gog-store"]',
    intro: t(
      'tour.topnav.gog_store',
      'Browse and buy games from the GOG Store.'
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
    element: '[data-tour="topnav-metamask"]',
    intro: t(
      'tour.topnav.metamask',
      'Quick access to your MetaMask wallet for web3 transactions.'
    ),
    position: 'left'
  },
  {
    element: '[data-tour="topnav-account"]',
    intro: t(
      'tour.topnav.account',
      'Change your connected wallet, manage connected stores, view your portfolio, and more.'
    ),
    position: 'left'
  },
  {
    element: '[data-tour="topnav-container"]',
    intro: t(
      'tour.topnav.finish',
      "That's it! You now know how to navigate HyperPlay's top bar and account features."
    ),
    position: 'center'
  }
]

// First Welcome tour steps for new users landing on the Store Page
export const firstWelcomeTourSteps = (t: TFunction): TourStep[] => [
  {
    title: t('tour.first-welcome.title1', 'Ready for takeoff 🚀'),
    intro: t(
      'tour.first-welcome.welcome',
      'Begin your journey through the Web3 galaxy and discover top-tier games.'
    ),
    position: 'center'
  },
  {
    element: '[data-tour="topnav-store-links"]',
    title: t('tour.first-welcome.title2', 'A galaxy of games'),
    intro: t(
      'tour.first-welcome.stores',
      'Explore all the titles from HyperPlay, Epic Games, and GOG.'
    ),
    position: 'bottom'
  },
  {
    element: '[data-tour="sidebar-quests"]',
    title: t('tour.first-welcome.title3', 'Earn real rewards 🎁'),
    intro: t(
      'tour.first-welcome.quests',
      'Take on quests, make leaderboards, and earn along the way.'
    ),
    position: 'right'
  },
  {
    element: '[data-tour="topnav-account"]',
    title: t('tour.first-welcome.title4', 'Start your journey'),
    intro: t(
      'tour.first-welcome.account',
      'Login and connect your primary wallet to track progress.'
    ),
    position: 'left'
  }
]
