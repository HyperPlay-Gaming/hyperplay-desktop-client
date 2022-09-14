export enum ONBOARDING_CONTENT {
  WELCOME = 'WELCOME',
  SCAN = 'SCAN',
  REJECTED = 'REJECTED',
  SUCCESS = 'SUCCESS',
  DOWNLOAD = 'DOWNLOAD'
}

// keep this state in top level Onboarding
// but pass callback to set state to content
// call from useEffect in content component only once ([] capture params)
export interface OnboardingModalConfig {
  title: string
  enableBackButton: boolean
  enableCloseButton: boolean
  // linkButtonEnabled: boolean,
  // linkButtonExternalLink: string
  //double action buttons or single
  //handlers for action buttons?
}
