export enum ONBOARDING_CONTENT {
  WELCOME = 'WELCOME',
  SCAN = 'SCAN',
  REJECTED = 'REJECTED',
  SUCCESS = 'SUCCESS',
  DOWNLOAD = 'DOWNLOAD'
}

export interface OnboardingModalConfig {
  title: string
  enableBackButton: boolean
  enableCloseButton: boolean
}
