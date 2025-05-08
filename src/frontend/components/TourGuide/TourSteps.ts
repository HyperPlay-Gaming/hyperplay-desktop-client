import { TFunction } from 'i18next'

export interface TourStep {
  element?: string
  intro: string
  title?: string
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center'
  tooltipClass?: string
  highlightClass?: string
}

// First Welcome tour steps for new users landing on the Store Page
export const firstWelcomeTourSteps = (t: TFunction<'tour'>): TourStep[] => [
  {
    title: t('tour.first-welcome.welcome-title', 'Ready for Takeoff 🚀'),
    intro: t(
      'tour.first-welcome.welcome',
      'Begin your journey through the Web3 galaxy and discover top-tier games.'
    ),
    position: 'center'
  },
  {
    element: '[data-tour="topnav-store-links"]',
    title: t('tour.first-welcome.links-title', 'A Galaxy of Games'),
    intro: t(
      'tour.first-welcome.stores',
      'Explore all the titles from HyperPlay, Epic Games, and GOG.'
    ),
    position: 'bottom'
  },
  {
    element: '[data-tour="sidebar-quests"]',
    title: t('tour.first-welcome.rewards-title', 'Earn Real Rewards 🎁'),
    intro: t(
      'tour.first-welcome.quests',
      'Take on quests, make leaderboards, and earn along the way.'
    ),
    position: 'right'
  },
  {
    element: '[data-tour="topnav-account"]',
    title: t('tour.first-welcome.account-title', 'Start Your Journey'),
    intro: t(
      'tour.first-welcome.account',
      'Login and connect your primary wallet to track progress.'
    ),
    position: 'bottom'
  }
]
